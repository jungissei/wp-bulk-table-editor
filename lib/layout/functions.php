<?php

/**
 * Regist Post Type: import_by_table
*/
function register_cpt_import_by_table()
{
    $plugin_name = PLUGIN_NAME;
    $plugin_post_type = PLUGIN_POST_TYPE;

	$labels = [
		"name" => __( $plugin_name, $plugin_post_type ),
		"singular_name" => __( $plugin_name, $plugin_post_type ),
	];

	$args = [
		"label" => __( $plugin_name, $plugin_post_type ),
		"labels" => $labels,
		"description" => "",
		"public" => false,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => true,
		"rest_base" => "",
		"rest_controller_class" => "WP_REST_Posts_Controller",
		"has_archive" => false,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"delete_with_user" => false,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
        "rewrite" => [ "slug" => $plugin_post_type, "with_front" => true ],
		"query_var" => true,
		"menu_icon" => "dashicons-grid-view",
		"supports" => [ "title" ],
	];

	register_post_type( $plugin_post_type, $args );
}
add_action( 'init', 'register_cpt_import_by_table' );

/**
 * Add Custom fields : import_by_table custom post type post edit page
*/
function add_custom_fields()
{
    add_meta_box(
        'custom_setting',
        '抽出条件',
        'insert_custom_fields',
        PLUGIN_POST_TYPE,
        'normal'
    );
}
add_action('admin_menu', 'add_custom_fields');


/**
 * Enqueue scripts
*/
function enqueue_import_by_table_scripts($hook) {
    global $post;
    if (
        $hook == 'post-new.php' && PLUGIN_POST_TYPE == $post->post_type
        || $hook == 'post.php' && PLUGIN_POST_TYPE == $post->post_type
    ) {
        wp_enqueue_style( PLUGIN_POST_TYPE, PLUGIN_DIR_URL.'/style/style.css' );
        wp_enqueue_style( 'handsontable', PLUGIN_DIR_URL.'/style/handsontable.full.min.css' );
        wp_enqueue_script( 'handsontable', PLUGIN_DIR_URL.'/js/post-type-import_by_table.js', ['jquery'], '', true);
    }
}
add_action( 'admin_enqueue_scripts', 'enqueue_import_by_table_scripts' );



/**
 * Insert custom fields
*/
function insert_custom_fields()
{
    global $post;
    $hoge_name = get_post_meta(
        $post->ID,
        'hoge_name',
        true
    );

    echo '<input id="plugin_dir_url" name="plugin_dir_url" type="hidden" value="'.PLUGIN_DIR_URL.'">';
    echo '
        <div class="extract-field">
            <div class="extract__label">
                <label>ルール</label>
                <p class="extract__description">どの編集画面でカスタムフィールドを表示するかを決定するルールを作成します。</p>
                <div id="displayaaaa"></div>
            </div>
            <div class="extract__input">
                <div>
                    <div>
                        <h4>このフィールドグループを表示する条件</h4>
                        <table class="extract-table">
                            <tbody>

                            </tbody>
                        </table>

                    </div>
                    <h4>または</h4>
                    <a href="#" class="button add-location-group">ルールを追加</a>
                </div>
            </div>
        </div>
    ';

    echo '
    <script>
        let params = '.json_encode(get_extract_params()).';
        let operators = '.json_encode(get_extract_operators()).';

        let inits = [
            {
                "group": 0,
                "rule": 0,
                "param": "post_type",
                "operator": "!=",
                "value": "recruit"
            }
        ]

	</script>
    ';
}



function get_extract_params(): array
{
    return [
        ['key' => 'post_type', 'value' => '投稿タイプ'],
        ['key' => 'post_status', 'value' => '投稿ステータス'],
        ['key' => 'post_category', 'value' => '投稿カテゴリー']
    ];
}

function get_extract_operators() :array
{
    return [
        ['key' => '==', 'value' => '等しい'],
        ['key' => '!=', 'value' => '等しくない'],
    ];
}

function get_options(array $options): string
{
    $value = '';
    foreach($options as $option){
        $value .= '<option value="'.$option['key'].'">';
        $value .= $option['value'];
        $value .= '</option>';
    }

    return $value;
}

function get_array_post_types() :array
{
    $obj_post_types = get_post_types('',['public' => true,'_builtin' => false]);
    foreach($obj_post_types as $obj_post_type){
        $post_types[] = [
            'key' => $obj_post_type->name,
            'value' => $obj_post_type->label
        ];
    }

    return $post_types;
}

function get_post_categories() :array
{
    if($taxonomies_obj = get_object_taxonomies( 'post' )){
        foreach($taxonomies_obj as $taxonomy_name){
            $taxonomies[] = [
                'key' => get_taxonomy($taxonomy_name),
                'value' => $taxonomy_obj->label
            ];
        }

        return $taxonomies;
    }
}

function get_statuses() :array
{
    $init_statuses = [
        'publish' => '公開済み',
        'pending' => 'レビュー待ち',
        'draft' => '下書き',
        'auto-draft' => 'auto-draft',
        'future' => '予約済み',
        'private' => '非公開',
        'inherit' => 'inherit',
        'trash' => 'ゴミ箱にある投稿',
    ];

    foreach($init_statuses as $key => $value){
        $statuses[] = [
            'key' => $key,
            'value' => $value
        ];
    }

    return $statuses;
}

function loop_optgroup($optgroup_params) :string
{
    $value = '';
    foreach($optgroup_params as $optgroup_key => $params){
        $value .= '<optgroup label="'.$optgroup_key.'">';
        $value .= loop_options($params);
        $value .='</optgroup>';
    }
    echo $value;
}

function loop_options($params) :string
{
    $value = '';
    foreach($params as $param_key => $param){
        $value .= '<option value="'.$param.'">';
        $value .= $param;
        $value .='</option>';
    }
    echo $value;
}


//php file include
function display_template(string $body_class)
{
    $filename = PLUGIN_DIR_PATH.'lib/layout/'.$body_class.'.php';
    if(file_exists($filename)&&$body_class) include($filename);
}

//include class files
$classes = ['data', 'draw', 'save'];
foreach($classes as $class){
    $filename = PLUGIN_DIR_PATH.'lib/class/'.$class.'.php';
    if(file_exists($filename)) include($filename);
}


function get_formats() :array
{
    return [
        'bigint(20)' => '%s',
        'datetime' => '%s',
        'longtext' => '%s',
        'text' => '%s',
        'varchar(20)' => '%s',
        'varchar(100)' => '%s',
        'varchar(200)' => '%s',
        'varchar(255)' => '%s',
        'bigint(20) unsigned' => '%d',
        'int(11)' => '%d',
    ];
}

function get_json_col_headers(array $col_headers_array)
{
    $col_headers = array_column($col_headers_array, 'Field');
    return json_encode($col_headers);

}

function get_insert_formats(array $data_types): string
{
    $formats = get_formats();
    foreach($data_types as $data_type){
        $insert_formats[] = $formats[$data_type];
    }

    return json_encode($insert_formats);
}

function get_post_vals(array $conditions): string
{
    global $wpdb;
    $post_type = $conditions['post_type'];
    $post_vals = $wpdb->get_results( 'SELECT * FROM wp_posts WHERE post_type = "'.$post_type.'" AND post_status = "publish"', ARRAY_A );
    return json_encode($post_vals);
}

function get_js_values(array $js_values)
{
    echo '<script type="text/javascript">';

    foreach($js_values as $key => $js_value){
        echo 'const '.$key.' = '.$js_value.';';
    }

    echo '</script>';
}