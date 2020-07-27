<?php
display_template('header');

$data = new data;
$draw = new draw;
$save = new save;

if(empty($_POST)){

    $extractions = [
        'post_type' => '投稿タイプ',
    ]; ?>

    <form method="post">
        <div class="form__wrap form__extraction">
            <div class="form__item">
                <div>抽出情報を選択してください。</div>
                <div><?php echo $draw->select_box_tag('condition[extraction]', $extractions); ?></div>
            </div>
        </div>
        <div class="form__wrap form__acf">
            <div class="form__item">
                <div>ACFフィールド値を編集しますか？</div>
                <div>
                    <?php
                        echo $draw->radio_button_tag(
                            'acf_field',
                            $acf_field_bool = [
                                FALSE => '編集しない',
                                TRUE => '編集する',
                            ],
                            FALSE
                        );
                    ?>
                </div>
            </div>
        </div>
        <?php
            echo $draw->submit_tag();
            echo $draw->hidden_tag('plugin_dir_url', PLUGIN_DIR_URL);
        ?>
    </form>


<?php }else{
    $_post_keys = [
        'condition',
        'insert',
    ];

    foreach($_post_keys as $_post_key){
        if(isset($_POST[$_post_key])){
            if(file_exists($filename = PLUGIN_DIR_PATH.'lib/layout/index-'.$_post_key.'.php'))
                include($filename);
        }
    }
}


// $wp_query = new WP_Query(
//     [
//         'post_type' => 'acf-field-group',
//         'posts_per_page' => -1
//     ]
// );

// if($wp_query->have_posts()){
//     while($wp_query->have_posts()){
//         $wp_query->the_post();
//         $acf_field_groups[get_the_ID()] = get_the_title();
//     }
// }
// wp_reset_query();

// $post = get_post(237);
// $post_content = $post->post_content;
// $post_content = maybe_unserialize( $post_content );
// echo "<pre>";
// print_r($post_content);
// echo "</pre>";
// $post = get_post(283);
// $post_content = $post->post_content;
// $post_content = maybe_unserialize( $post_content );
// echo "<pre>";
// print_r($post_content);
// echo "</pre>";
// $post = get_post(196);
// $post_content = $post->post_content;
// $post_content = maybe_unserialize( $post_content );
// echo "<pre>";
// print_r($post_content);
// echo "</pre>";


display_template('footer');