jQuery.noConflict();
const j$ = jQuery;
const plugin_dir_url = j$('#plugin_dir_url').val();

j$(function(){
    j$(document).on('change', 'select[name="condition[extraction]"]', function(){
        j$.ajax({
            url:plugin_dir_url + 'lib/ajax/extraction.php',
            type:'POST',
            data:{
                'extraction':j$(this).val()
            }
        })
        .done( (data) => {
            const name = j$('select[name="condition[post_type]"]');
            insert_form_tags(name, data);
        })
        .fail( (data) => {
            console.log('Ajax is failed at extraction.js');
        })
    });

    j$(document).on('change', 'select[name="condition[post_type]"]', function(){
        j$.ajax({
            url:plugin_dir_url + 'lib/ajax/post_type.php',
            type:'POST',
            data:{
                'post_type':j$(this).val()
            }
        })
        .done( (data) => {
            const name = j$('select[name="condition[taxonomy]"]');
            insert_form_tags(name, data);
        })
        .fail( (data) => {
            console.log('Ajax is failed at extraction.js');
        })
    });

    j$(document).on('change', 'select[name="condition[taxonomy]"]', function(){
        j$.ajax({
            url:plugin_dir_url + 'lib/ajax/taxonomy.php',
            type:'POST',
            data:{
                'taxonomy':j$(this).val()
            }
        })
        .done( (data) => {
            const name = j$('select[name="condition[term]"]');
            insert_form_tags(name, data);
        })
        .fail( (data) => {
            console.log('Ajax is failed at extraction.js');
        })
    });

    // j$(document).on('change', 'select[name="condition[meta_info]"]', function(){
    //     j$.ajax({
    //         url:plugin_dir_url + 'lib/ajax/meta_info.php',
    //         type:'POST',
    //         data:{
    //             'taxonomy':j$(this).val()
    //         }
    //     })
    //     .done( (data) => {
    //         const name = j$('select[name="condition[term]"]');
    //         insert_form_tags(name, data);
    //     })
    //     .fail( (data) => {
    //         console.log('Ajax is failed at extraction.js');
    //     })
    // });

});

function insert_form_tags(name, data){
    if(name.length){
        name.closest('.form__item').replaceWith(data);
    }else{
        j$('.form__extraction').append(data);
    }
}