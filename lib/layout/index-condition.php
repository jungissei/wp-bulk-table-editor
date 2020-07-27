<?php


global $wpdb;

$conditions = $_POST['condition'];//送信されたpostデータ
$col_headers_array = $wpdb->get_results( 'SHOW COLUMNS FROM '.$wpdb->posts, ARRAY_A );//カラム名取得
$col_headers = get_json_col_headers($col_headers_array);//json化
$data_types = array_column($col_headers_array, 'Type');//
$insert_formats = get_insert_formats($data_types);//インサートのための型取得
$post_vals = get_post_vals($conditions);//レコード取得


//JSの変数に代入
get_js_values(
    [
        'col_headers' => $col_headers,
        'posts' => $post_vals,
        'formats' => $insert_formats,
    ]
);
?>

<div class="wrap">
<link rel="stylesheet" media="screen" href="<?php echo PLUGIN_DIR_URL; ?>style/handsontable.full.min.css">
<p>投稿を新規追加したい場合はIDを空にしてください。</p>
<div id="grid"></div>
<script src="<?php echo PLUGIN_DIR_URL; ?>js/handsontable.full.min.js"></script>
<script src="<?php echo PLUGIN_DIR_URL; ?>js/jscripts.js"></script>
<form action="" method="post">
<input id="submit-btn" type="submit" value="保存">
</form>
</div>