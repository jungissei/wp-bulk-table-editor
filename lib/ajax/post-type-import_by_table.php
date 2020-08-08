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

header("Content-Type: application/json; charset=UTF-8");
if(isset($_POST['param'])){
    switch ($_POST['param']) {
        case 'post_type':
            $items = get_array_post_types();
            break;
        case 'post_status':
            $items = get_post_status();
            break;
        case 'post_category':
            $items = get_terms('category');
            break;
        default:
            $items = [];
    }
    echo json_encode($items);

}else{
    echo 'Ajax is failed at extraction.php';
}
exit;