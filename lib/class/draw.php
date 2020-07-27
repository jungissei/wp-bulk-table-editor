<?php
class draw {

    public function __construct() {

        $methods = [
            'form_tag',
            'form_tag_items',
            'form_tag_item',
            'radio_button_tag',
            'select_box_tag',
        ];
        foreach($methods as $method){
            add_action( 'wp', [$this, $method] );
        }
    }

    public function form_tag(array $tags): string
    {
            $content = '<form method="post">';
            $content .= $this->form_tag_items($tags);
            $content .= $this->submit_tag();
            $content .= '</form>';

            return $content;
    }

    public function form_tag_items(array $tags): string
    {
        $content = '';
        foreach($tags as $tag_key => $tag){
            $content .= $this->form_tag_item($tag_key, $tag);
        }
        return $content;
    }

    public function form_tag_item(string $tag_key, string $tag): string
    {
        $content = '<div class="form__item">';
        $content .= '<div>'.$tag_key.'</div>';
        $content .= '<div>'.$tag.'</div>';
        $content .= '</div>';

        return $content;
    }

    public function submit_tag(string $value = "選択"): string
    {
        if($value) return '<input id="submit" type="submit" value="'.$value.'">';
    }

    public function button_tag(string $name, string $value): string
    {
        $content = '<button type="button" name="'.$name.'">';
        $content .= $value;
        $content .= '</button>';
        return $content;
    }

    public function hidden_tag(string $name, string $value): string
    {
        return '<input id="'.$name.'" name="'.$name.'" type="hidden" value="'.$value.'">';
    }

    public function radio_button_tag(string $name, array $data, bool $bool): string
    {
        if(isset($name)&&isset($data)){
            $content = '';
            $content .= '<ul>';
            foreach($data as $key => $value){
                $content .= '<li><label><input id="'.$key.'" name="'.$name.'" type="radio" value="'.$key.'"';
                if(isset($bool)&&$bool == $key) $content .= ' checked="checked"';
                $content .= '>'.$value.'</label></li>';
            }
            $content .= '</ul>';

            return $content;
        }
    }

    public function check_box_tag(string $name, array $data): string
    {
        if(isset($name)&&isset($data)){
            $content = '';
            $content .= '<ul>';
            foreach($data as $key => $value){
                $content .= '<li><label><input name="'.$name.'" type="checkbox" value="'.$name.'['.$key.']">'.$value.'</label></li>';
            }
            $content .= '</ul>';

            return $content;
        }
    }

    public function select_box_tag(string $name, array $data): string
    {
        if(isset($name)&&isset($data)){
            $content = '';

            $content .= '<select name="'.$name.'">';
            $content .= '<option value="">選択してください。</option>';
            foreach($data as $key => $value){
                $content .= '<option value="'.$key.'">'.$value.'</option>';
            }
            $content .= '</select>';

            return $content;
        }
    }



}