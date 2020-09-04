<?php
/*
Plugin Name: WP Bulk Table Editor
Plugin URI: https://ycomps.co.jp
Description: 表で記事を作成するプラグインです。
Version: In development
Author: ワイコム・パブリッシングシステムズ
Author URI: https://ycomps.co.jp
License: ライセンス名が入ります。
*/


/**
 * Define constants
*/
define('PLUGIN_NAME',"WP Bulk Table Editor");
define('PLUGIN_POST_TYPE',"wp_bulk_table_editor");
define('PLUGIN_DIR_PATH',plugin_dir_path( __FILE__ ));
define('PLUGIN_DIR_URL',plugin_dir_url(__FILE__));


/**
 * Include functions.php
*/
$filename = PLUGIN_DIR_PATH.'lib/layout/functions.php';
if(file_exists($filename)) include($filename);