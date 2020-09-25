/*
Sumally
---------------------------
# Base

# Extraction
## InitValue
## Related minus rule button
### Related hover minus button
### Related working minus button
## Related minus rule button

*/

/* # Base */
jQuery.noConflict();
let j$ = jQuery;
let plugin_dir_url = j$('#plugin_dir_url').val();


/* # Extraction */
class Extraction {
    /* # Related Rule */
    /*
    * Get HTML of rile extractions
    * @param init array : initial value of rule
    */
    getHtmlRule(init){
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
                    ${this.getHtmlOptions(params, init.param)}
                </select>
            </td>
            <td class="operator">
                <select>
                    ${this.getHtmlOptions(operators, init.operator)}
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
    getHtmlOptions(items, selected){
    let html = ``;
    for (const key in items) {
        html += `
            <option
                value="${items[key].key}"
                ${this.getOptAttrSelected(items[key].key, selected)}
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
    getOptAttrSelected(item, selected){
    if(!selected)
        return "";

    if(item == selected)
        return "selected";

    return "";
    }
}


/* ## InitValue */
j$(() => {
    //Add init extraction groups table
    const initValue = new InitValue;
    initValue.addHtmlInitGroups('#htmlGroups');
});

class InitValue extends Extraction {
    /*
    * Add HTML of groups extractions
    * @param selector string : ID name of the element to be added
    */
    addHtmlInitGroups(selector){
        j$(selector).prepend(
            this.getHtmlInitGroups(InitGroups)
        );
    }

    /*
    * Get HTML of groups extractions
    * @param initGroups array : initial value of groups extractions
    */
    getHtmlInitGroups(initGroups){
        let htmlGroups = "";

        for (const groupKey in initGroups) {
            htmlGroups += this.getHtmlInitRules(initGroups[groupKey], groupKey);
        }

        return htmlGroups;
    }

    /*
    * Get HTML of rule extractions which belongs to group
    * @param initRules array :initial value of rule extractions
    * @param groupKey int    :group key number
    */
    getHtmlInitRules(initRules, groupKey){
        let htmlRules = "";

        for (const ruleKey in initRules) {
            htmlRules += this.getHtmlRule(
                {
                    "group" : groupKey,
                    "rule" : ruleKey,
                    "value" : initRules[ruleKey]
                }
            );
        }

        return this.getHtmlGroupTable(groupKey, htmlRules);
    }

    /*
    * Get HTML of group extractions
    * @param groupRow int     : group key number
    * @param htmlRules string : html of rules
    */
    getHtmlGroupTable(groupRow, htmlRules){
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
}



/*
* ## Related minus rule button
*/
j$(() => {
    const removeRule = new RemoveRule;

    //Detect hover
    removeRule.detectRuleHover('.extract-table tr');

    //Detect clicking button
    removeRule.detectsMinusButtonClicks('.extract-table a.remove-location-rule');
});

class RemoveRule extends Extraction {

    /* ### Related hover minus button */
    /*
    * Detect Rule hover
    * @param selector string : Selector of hover target rules
    */
    detectRuleHover(selector){
        j$(document).on('mouseover', selector, event => {
            let currTarget = j$(event.currentTarget);

            if(this.isRuleHover(currTarget)){
                currTarget.find('.remove-icon').css('visibility', 'visible');
            }
        }).on('mouseout', selector, event => {
            let currTarget = j$(event.currentTarget);

            if(this.isRuleHover(currTarget)){
                currTarget.find('.remove-icon').css('visibility', 'hidden');
            }
        });
    }

    /*
    * Hovering conditional branch
    * @param e object : Elements of Hover Selector
    */
    isRuleHover(currTarget){
        let groupId = currTarget.attr('data-group');
        let ruleId = currTarget.attr('data-rule');
        if(groupId == 0 && ruleId == 0){
            return false;
        }

        return true;
    }



    /* ### Related working minus button */

    /*
    * Detects minus button clicks
    * @param selector string : Selector of minus button
    */
    detectsMinusButtonClicks(selector){
        j$(document).on('click', selector, event => {
            let currTarget = j$(event.currentTarget);
            this.removeRuleRow(currTarget);
        });
    }

    /*
    * Remove rule row
    * @param selector string : Elements of Clicked Selector
    */
    removeRuleRow(currTarget){

        let ruleLength = currTarget.closest('tbody').children('tr').length;

        if(ruleLength === 1){
            currTarget.closest('.rule-group').remove();
        }else{
            currTarget.closest('tr').remove();
        }
    }
}



/*
* ## Related add rule button
*/
j$(() => {
    const addRule = new AddRule;

    addRule.detectClickiing('.extract-table .add-location-rule');
});

class AddRule extends Extraction {

    /*
    * Detect clickiing of add rule button
    * @param selector string : Elements of Clicked Selector
    */
    detectClickiing(selector){
        j$(document).on('click', selector, event => {
            let currTarget = j$(event.currentTarget);
            this.addHtmlRule(currTarget);
        });
    }

    /*
    * Add HTML of rule
    * @param selector object : Elements of Clicked Selector
    */
    addHtmlRule(selector){
        let HtmlRule = this.getHtmlRuleSetPram(selector);
        selector.closest('tbody').append(HtmlRule);
    }

    /*
    * Get HTML of rule
    * @param selector object : Elements of Clicked Selector
    */
    getHtmlRuleSetPram(selector){
        let groupId = selector.closest('tr').attr('data-group');
        let ruleId = this.genRuleId();

        return this.getHtmlRule(
            {
                "group" : groupId,
                "rule" : ruleId
            }
        );
    }

    /*
    * Generate rule ID
    */
    genRuleId(){
        let S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let N = 13;
        return Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('');
    }
}