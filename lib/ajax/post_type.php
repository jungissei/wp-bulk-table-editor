<?php

//上の階層を取得：引数に取得したい上の階層数を代入する
function get_upper_dirname(int $num): string
{
    $dirname = dirname(__FILE__);

    for($i = 1; $i <= $num; $i++){
        $dirname = dirname($dirname);
    }

    return $dirname;
}

require_once( get_upper_dirname(5) . '/wp-load.php' );
require_once( get_upper_dirname(1) . '/layout/functions.php' );

$data = new data;
$draw = new draw;

header('Content-type: text/plain; charset= UTF-8');
if(isset($_POST['post_type'])){
    $post_data = $_POST['post_type'];
    $post_data = $data->get_taxonomies($post_data);
    $post_data = $draw->select_box_tag('condition[taxonomy]', $post_data);

    echo $draw->form_tag_items(
        ['抽出したいタクソノミーを選択してください。' => $post_data]
    );

}else{
    echo 'Ajax is failed at post_type.php';
}