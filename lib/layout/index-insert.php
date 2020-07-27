<?php

$posts_array = $save->post_array_combine($post_key = $_POST['insert']['colHeaders'], $posts_array = $_POST['insert']['post']);

$formats = $_POST['insert']['formats'];
$formats = explode(',',$formats);

foreach($posts_array as $post_array){
    $post_id = $post_array['ID'];
    if(empty($post_id)){
        $save->insert_post($post_array, $formats);
    }else{
        $save->update_post($post_array, $formats, $post_id);
    }
}

echo '<div class="updated fade"><p><strong>saved</strong></p></div>';