/*
Sumally
---------------------------
# Base
# Work Timing

# logic
## Related to initial extractions group
## Hover related
## Related working minus button

*/

/* # Base */
jQuery.noConflict();
let j$ = jQuery;
let plugin_dir_url = j$('#plugin_dir_url').val();



/* # Work Timing */
/*
* Related adding HTML of initial group table
*/
j$(() => {
    //Add init extraction groups table
    addHtmlInitGroups('#htmlGroups');
});

/*
* Related minus rule button
*/
j$(() => {

    //Detect hover
    detectRuleHover('.extract-table tr');

    //Detect clicking button
    detectsMinusButtonClicks('.extract-table a.remove-location-rule');
});



/* # logic */
/* ## Related to initial extractions group */

/*
* Add HTML of groups extractions
* @param selector string : ID name of the element to be added
*/
let addHtmlInitGroups = (selector) =>{
    j$(selector).prepend(
        getHtmlInitGroups(InitGroups)
    );
}



/*
* Get HTML of groups extractions
* @param initGroups array : initial value of groups extractions
*/
let getHtmlInitGroups = (initGroups) =>{
    let htmlGroups = "";

    for (const groupKey in initGroups) {
        htmlGroups += getHtmlInitRules(initGroups[groupKey], groupKey);
    }

    return htmlGroups;
}



/*
* Get HTML of rule extractions which belongs to group
* @param initRules array :initial value of rule extractions
* @param groupKey int    :group key number
*/
let getHtmlInitRules = (initRules, groupKey) =>{
    let htmlRules = "";

    for (const ruleKey in initRules) {
        htmlRules += getHtmlRule(
            init = {
                "group" : groupKey,
                "rule" : ruleKey,
                "value" : initRules[ruleKey]
            }
        );
    }

    return getHtmlGroupTable(groupKey, htmlRules);
}



/*
* Get HTML of group extractions
* @param groupRow int     : group key number
* @param htmlRules string : html of rules
*/
let getHtmlGroupTable = (groupRow, htmlRules) =>{
    return `
    <div class="rule-group" data-group="${groupRow}">
        <table class="extract-table">
            <tbody>
                ${htmlRules}
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
let getHtmlRule = (init) =>{
    let groupRow = init.group;
    let ruleRow = init.rule;

    return `
    <tr data-group="${groupRow}" data-rule="${ruleRow}">
        <td class="param">
            <select
                id="extract_field_group-location-group_${groupRow}-rule_${ruleRow}-param"
                name="extract_field_group[location][group_${groupRow}][rule_${ruleRow}][param]"
                group-row="${groupRow}" rule-row="${ruleRow}"
            >
                ${getHtmlOptions(params, init.param)}
            </select>
        </td>
        <td class="operator">
            <select>
                ${getHtmlOptions(operators, init.operator)}
            </select>
        </td>
        <td class="value">
            <select
                id="acf_field_group-location-group_${groupRow}-rule_${ruleRow}-value"
                name="acf_field_group[location][group_${groupRow}][rule_${ruleRow}][value]"
                group-row="${groupRow}" rule-row="${ruleRow}"
            >

            </select>
        </td>
        <td class="add"><a href="#" class="button add-location-rule">and</a></td>
        <td class="remove"><a href="#" class="remove-icon -minus remove-location-rule"></a></td>
    </tr>
    `;
}



/*
* Get HTML of option tags
* @param items array     : related option info
* @param selected string : selected value
*/
let getHtmlOptions = (items, selected) =>{
    let html = ``;
    for (const key in items) {
        html += `
            <option
                value="${items[key].key}"
                ${getOptAttrSelected(items[key].key, selected)}
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
let getOptAttrSelected = (item, selected) => {
    if(!selected)
        return "";

    if(item == selected)
        return "selected";

    return "";
}



/* ## Rule hover related */
/*
* Detect Rule hover
* @param selector string : Selector of hover target rules
*/
let detectRuleHover = (selector) => {
    j$(selector).mouseover(event => {
        let currTarget = j$(event.currentTarget);

        if(isRuleHover(currTarget)){
            currTarget.find('.remove-icon').css('visibility', 'visible');
        }
    }).mouseout(event => {
        let currTarget = j$(event.currentTarget);

        if(isRuleHover(currTarget)){
            currTarget.find('.remove-icon').css('visibility', 'hidden');
        }
    });
}



/*
* Hovering conditional branch
* @param e object : Elements of Hover Selector
*/
let isRuleHover = (currTarget) => {
    let groupId = currTarget.attr('data-group');
    let ruleId = currTarget.attr('data-rule');
    if(groupId == 0 && ruleId == 0){
        return false;
    }

    return true;
}


/* ## Related working minus button */
/*
* Detects minus button clicks
* @param selector string : Selector of minus button
*/
let detectsMinusButtonClicks = (selector) => {
    j$(selector).on('click', event => {
        let currTarget = j$(event.currentTarget);
        removeRuleRow(currTarget);
    });
}

/*
* Remove rule row
* @param selector string : Elements of Clicked Selector
*/
let removeRuleRow = (currTarget) => {
    currTarget.closest('tr').remove();
}