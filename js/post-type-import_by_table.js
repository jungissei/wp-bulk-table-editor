/*  Base
------------------------------------------------------*/
jQuery.noConflict();
let j$ = jQuery;
let plugin_dir_url = j$('#plugin_dir_url').val();



/* processing
------------------------------------------------------*/
j$(function(){
    LoopInits(inits);
});



/* functions
------------------------------------------------------*/

/*
* 
* @param
*   Groups：
*/
let LoopInits = (inits) =>{
    for (const key in inits) {
        AddExtractRowToGroup(inits[key]);
    }
}


/*
* どの条件グループに追加するか振り分け・追加する処理
* @param
*   group：どの条件group、ruleに追加するか使用
*   init：selected属性が追加される初期値
*/
let AddExtractRowToGroup = (init) =>{

    //HTML取得
    let html = GetExtractRowHtml(init);
    console.log(html);

    //初期値が存在した場合の処理
    // if(init){
    //     //パラメーターバリューの選択肢追加処理
    //     let options = GetParamValueOptions(init.param)
    //     //→設定する関数を呼び出し
    //     AddParamValue(options,init.value)
    // }

    //上記HTMLをどの条件グループに追加するか引数groupで振り分け・追加
}

/*
* 条件グループに追加するHTMLを返す
* @param
*   group：条件group、ruleに関する属性に使用
*/
let GetExtractRowHtml = (init) =>{
    let GroupRow = init.group;
    let RuleRow = init.rule;

    return `
    <tr>
        <td class="param">
            <select
                id="extract_field_group-location-group_${GroupRow}-rule_${RuleRow}-param"
                name="extract_field_group[location][group_${GroupRow}][rule_${RuleRow}][param]"
                group-row="${GroupRow}" rule-row="${RuleRow}"
            >
                ${GetOptions(params, init.param)}
            </select>
        </td>
        <td class="operator">
            <select>
                ${GetOptions(operators, init.operator)}
            </select>
        </td>
        <td class="value">
            <select
                id="acf_field_group-location-group_${GroupRow}-rule_${RuleRow}-value"
                name="acf_field_group[location][group_${GroupRow}][rule_${RuleRow}][value]"
                group-row="${GroupRow}" rule-row="${RuleRow}"
            >
                ${GetValueOptions(init.param, init.value)}
            </select>
        </td>
        <td class="add"><a href="#" class="button add-location-rule">and</a></td>
        <td class="remove"><a href="#" class="acf-icon -minus remove-location-rule"></a></td>
    </tr>
    `;

}


/*
* 
* @param
*   param：
*   selected：
*/
let GetValueOptions = (param, selected) =>{
    GetObjValueOptions(param).done(function(items) {
        console.log(items);
        console.log(GetOptions(items, selected));
        return GetOptions(items, selected);
    }).fail(function(items) {
        console.log('Ajax is failed at extraction.js');
    });

    // let items = GetObjValueOptions(param);
    // console.log(items);
    // return GetOptions(items, selected);

}

/*
* 
* @param
*   param：
*   selected：
*/
let GetObjValueOptions = (param) =>{
    return j$.ajax({
        url:plugin_dir_url + 'lib/ajax/post-type-import_by_table.php',
        type:'POST',
        data:{
            'param':param
        },
        dataType:'json'
    })
}


/*
* オプションタグを返す
* @param
*   items：オプションタグに使用するvalue属性・テキスト
*/
let GetOptions = (items, selected) =>{
    let html = ``;
    for (const key in items) {
        html += `
            <option
                value="${items[key].key}"
                ${GetSelected(items[key].key, selected)}
            >
                ${items[key].value}
            </option>
        `;
    }

    return html;
}


/*
* GetOptionsメソッドのオプションタグにselected属性を判定し返す
* @param
*   item：value属性の値
*   selected：selected属性が追加される値
*/
let GetSelected = (item, selected) => {
    if(!selected)
        return "";

    if(item == selected)
        return "selected";

    return "";
}