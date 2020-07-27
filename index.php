<?php
/*
Plugin Name: Import by Table
Plugin URI: https://ycomps.co.jp
Description: 表でインポートするプラグインです。
Version: beta
Author: ワイコム・パブリッシングシステムズ
Author URI: https://ycomps.co.jp
License: ライセンス名が入ります。
*/


/**
 * Define constants
*/
define('PLUGIN_NAME',"Import by Table");
define('PLUGIN_POST_TYPE',"import_by_table");
define('PLUGIN_DIR_PATH',plugin_dir_path( __FILE__ ));
define('PLUGIN_DIR_URL',plugin_dir_url(__FILE__));


/**
 * Include functions.php
*/
if(file_exists($filename = PLUGIN_DIR_PATH.'lib/layout/functions.php'))
    include($filename);









/**
 * Include functions.php
*/
// function add_plugin_admin_menu() {
//     $page_title = PLUGIN_NAME;
//     $menu_title = PLUGIN_NAME;
//     $capability = 'manage_options';
//     $menu_slug = 'table-imports-posts';
//     $function = 'display_plugin_admin_page';
//     $icon_url = 'dashicons-grid-view';
//     $position = 75;

//     add_menu_page(
//         $page_title,
//         $menu_title,
//         $capability,
//         $menu_slug,
//         $function,
//         $icon_url,
//         $position
//     );
// }
// add_action( 'admin_menu', 'add_plugin_admin_menu' );

// function display_plugin_admin_page() {
//     $filename = PLUGIN_DIR_PATH.'lib/layout/index.php';
//     if(file_exists($filename)) include($filename);
// }