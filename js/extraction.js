/* Base
------------------------------------------------------*/
jQuery.noConflict();
let j$ = jQuery;
let plugin_dir_url = j$('#plugin_dir_url').val();



/* Work Timing
------------------------------------------------------*/
/*
* Working when pege is loaded
*/
j$(() => {
    j$('#HtmlGroups').prepend(
        GetHtmlInitGroups(InitGroups)
    );

    j$('.extract-table > tbody > tr').hover(() => {

    });
});


/*
* Working when pege is loaded
*/




/* logic
------------------------------------------------------*/
/*
* Get HTML of groups extractions
* @param InitGroups array : initial value of groups extractions
*/
let GetHtmlInitGroups = (InitGroups) =>{
    let HtmlGroups = "";

    for (const GroupKey in InitGroups) {
        HtmlGroups += GetHtmlInitRules(InitGroups[GroupKey], GroupKey);
    }

    return HtmlGroups;
}



/*
* Get HTML of rule extractions which belongs to group
* @param InitRules array :initial value of rule extractions
* @param GroupKey int    :group key number
*/
let GetHtmlInitRules = (InitRules, GroupKey) =>{
    let HtmlRules = "";

    for (const RuleKey in InitRules) {
        // GroupKey, RuleKey, InitRules[RuleKey]
        HtmlRules += GetHtmlRule(
            init = {
                "group" : GroupKey,
                "rule" : RuleKey,
                "value" : InitRules[RuleKey]
            }
        );
    }

    return GetHtmlGroupTable(GroupKey, HtmlRules);
}



/*
* Get HTML of group extractions
* @param GroupRow int     : group key number
* @param HtmlRules string : html of rules
*/
let GetHtmlGroupTable = (GroupRow, HtmlRules) =>{
    return `
    <div class="rule-group" data-id="group_${GroupRow}">
        <table class="extract-table">
            <tbody>
                ${HtmlRules}
            </tbody>
        </table>
        <h4>または</h4>
    </div>
    `;
}



/*
* Get HTML of rile extractions
* @param init array : initial value of rule
*/
let GetHtmlRule = (init) =>{
    let GroupRow = init.group;
    let RuleRow = init.rule;

    return `
    <tr data-id="rule_${RuleRow}">
        <td class="param">
            <select
                id="extract_field_group-location-group_${GroupRow}-rule_${RuleRow}-param"
                name="extract_field_group[location][group_${GroupRow}][rule_${RuleRow}][param]"
                group-row="${GroupRow}" rule-row="${RuleRow}"
            >
                ${GetHtmlOptions(params, init.param)}
            </select>
        </td>
        <td class="operator">
            <select>
                ${GetHtmlOptions(operators, init.operator)}
            </select>
        </td>
        <td class="value">
            <select
                id="acf_field_group-location-group_${GroupRow}-rule_${RuleRow}-value"
                name="acf_field_group[location][group_${GroupRow}][rule_${RuleRow}][value]"
                group-row="${GroupRow}" rule-row="${RuleRow}"
            >

            </select>
        </td>
        <td class="add"><a href="#" class="button add-location-rule">and</a></td>
        <td class="remove"><a href="#" class="acf-icon -minus remove-location-rule"></a></td>
    </tr>
    `;
}



/*
* Get HTML of option tags
* @param items array     : related option info
* @param selected string : selected value
*/
let GetHtmlOptions = (items, selected) =>{
    let html = ``;
    for (const key in items) {
        html += `
            <option
                value="${items[key].key}"
                ${GetOptAttrSelected(items[key].key, selected)}
            >
                ${items[key].value}
            </option>
        `;
    }

    return html;
}



/*
* Get selected of option tag attribute
* @param item string     : item value
* @param selected string : seledted value
*/
let GetOptAttrSelected = (item, selected) => {
    if(!selected)
        return "";

    if(item == selected)
        return "selected";

    return "";
}