<?php
class data {

    public function __construct() {
        $methods = [
            'get_post_types',
            'get_taxonomies',
            'get_terms',
        ];
        foreach($methods as $method){
            add_action( 'wp', [$this, $method] );
        }
    }

    public function get_post_types(): array
    {
        $post_types_obj = get_post_types('',['public' => true,'_builtin' => false]);
        foreach($post_types_obj as $post_type_obj){
            $post_types[] = [
                'key' => $post_type_obj->name,
                'value' => $post_type_obj->label
            ];
        }

        return $post_types;
    }

    public function get_taxonomies(string $post_type_name): array
    {
        if($taxonomies_obj = get_object_taxonomies( $post_type_name )){
            foreach($taxonomies_obj as $taxonomy_name){
                $taxonomies[] = [
                    'key' => get_taxonomy($taxonomy_name),
                    'value' => $taxonomy_obj->label
                ];
            }

            return $taxonomies;
        }
    }

    public function get_terms(string $taxonomy_name): array
    {
        if($terms_obj = get_terms( $taxonomy_name )){
            foreach($terms_obj as $term_obj){
                $terms[] = [
                    'key' => $term_obj->name,
                    'value' => $term_obj->slug
                ];
            }

            return $terms;
        }
    }

    public function get_post_status(): array
    {

        $init_statuses = [
            'publish' => '公開済み',
            'pending' => 'レビュー待ち',
            'draft' => '下書き',
            'auto-draft' => 'auto-draft',
            'future' => '予約済み',
            'private' => '非公開',
            'inherit' => 'inherit',
            'trash' => 'ゴミ箱にある投稿',
        ];

        foreach($init_statuses as $key => $value){
            $statuses[] = [
                'key' => $key,
                'value' => $value
            ];
        }

        return $statuses;

    }
}