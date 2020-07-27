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
if(isset($_POST['extraction'])){
    $post_data = $_POST['extraction'];
    if($post_data == 'post_type'){
        $post_data = $data->get_post_types();
        $post_data = $draw->select_box_tag('condition[post_type]', $post_data);

        echo $draw->form_tag_items(
            ['抽出したい投稿タイプを選択してください。' => $post_data]
        );

    }elseif($post_data == 'user'){
        echo $post_data;
    }
}else{
    echo 'Ajax is failed at extraction.php';
}