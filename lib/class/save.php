<?php
class save {

    public function __construct() {

        $methods = [
            'insert_post',
            'update_post',
            'post_array_combine',
        ];
        foreach($methods as $method){
            add_action( 'wp', [$this, $method] );
        }
    }

    public function insert_post($post_array, $formats)
    {

        global $wpdb;

        $result = $wpdb->insert(
            $wpdb->posts,
            $post_array,
            $formats
        );
    }

    public function update_post($post_array, $formats, $post_id)
    {

        global $wpdb;

        $result = $wpdb->update(
            $wpdb->posts,
            $post_array,
            ['ID' => $post_id],
            $formats,
            ['%d']
        );
    }

    public function post_array_combine($post_key, $posts_array)
    {
        $post_key = explode(',',$post_key);

        foreach($posts_array as $post_num => $post_string){
            $post_array = explode(',',$post_string);
            $post_array = array_combine($post_key, $post_array);
            $posts_array[$post_num] = $post_array;
        }

        return $posts_array;
    }

}