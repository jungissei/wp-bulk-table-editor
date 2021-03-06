jQuery.noConflict();
let j$ = jQuery;
let plugin_dir_url = j$('#plugin_dir_url').val();


/*
* セレクトボックス(param)変更時にセレクトボックス(value)のオプションをセッティングする
*/
let change_select_option = (element) => {
    let name = j$('select[name^="extract_field_group"]');
    let data_num = name.data('row');
    name.prop("disabled", true);

    j$.ajax({
        url:plugin_dir_url + 'lib/ajax/post-type-import_by_table.php',
        type:'POST',
        data:{
            'extract_field_group':j$(element).val()
        }
    })
    .done( (data) => {
        name.html(data);
        name.prop("disabled", false);
    })
    .fail( (data) => {
        console.log('Ajax is failed at extraction.js');
    })
}

/*
* セレクトボックスのカラムを追加する
*/
let insert_rows = (inits) => {
    for (const num in inits) {
        insert_row(inits[num], num);
    }
}

let insert_row = (init, num) => {
    let html = `
        <tr>
            <td class="param">
                <select
                    id="extract_field_group-location-group_${num}-rule_${num}-param"
                    name="extract_field_group[location][group_${num}][rule_${num}][param]"
                    data-row="${num}"
                >
                    ${get_options(params, init.param)}
                </select>
            </td>
            <td class="operator">
                <select>
                    ${get_options(operators, init.operator)}
                </select>
            </td>
            <td class="value">
                <select
                    id="acf_field_group-location-group_${num}-rule_${num}-value"
                    name="acf_field_group[location][group_${num}][rule_${num}][value]"
                    data-row="${num}"
                >

                </select>
            </td>
            <td class="add"><a href="#" class="button add-location-rule">and</a></td>
            <td class="remove"><a href="#" class="acf-icon -minus remove-location-rule"></a></td>
        </tr>
    `;

    let name = j$('table[class="extract-table"]');

    name.children('tbody').append(html);
}

let get_options = (items, selected) => {
    let value = items.map(function(item){
        return `
            <option value="${item.key}" ${check_selected(item.key, selected)}selected>
                ${item.value}
            </option>
        `;
    });

    return value.join(',').replace(/,/g, '');
}

let check_selected = (item, selected) => {
    if(item == selected){
        return ` selected `;
    }
}

/*
* 読み込み時の処理
*/
j$(function(){
    if(inits){
        insert_rows(inits);
    }

    //ページ読み込み時
    change_select_option(j$('select[name^="extract_field_group"]'));

    //セレクトボックス変更時
    j$(document).on('change', 'select[name^="extract_field_group"]', function(){
        change_select_option(this);
    });
});