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
if(isset($_POST['extract_field_group'])){
    switch ($_POST['extract_field_group']) {
        case 'post_type':
            $data_array = $data->get_post_types();
            break;
        case 'post_status':
            $data_array = $data->get_post_status();
            break;
        case 'post_category':
            $data_array = $data->get_terms('category');
            break;
        case 'page':
            $data_array = $data->get_post_types();
            break;
        default:
            $data_array = [];
    }
    echo get_options($data_array);

}else{
    echo 'Ajax is failed at extraction.php';
}