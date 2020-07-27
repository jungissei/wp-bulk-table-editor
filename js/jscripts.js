const grid = document.getElementById('grid'),
    table = new Handsontable(grid,
        {
            data: posts,
            // colHeaders: col_headers,
            colHeaders: true,
            nestedHeaders: [
                ['', {label: 'wp_posts', colspan: 22}],
                col_headers
            ],
            rowHeaders: true,
            fixedColumnsLeft: 1,
            contextMenu: true,
            manualRowMove: true,
            bindRowsWithHeaders: 'strict',
            manualRowResize: true,
            manualColumnResize: true,
            exportFile: true,
        }
    );

jQuery.noConflict();
const j$ = jQuery;

j$(function() {
    const form = j$('form');
    j$(form).submit(function() {

        posts.filter(function(element, index = 0, array){
            j$(form).append(j$('<input />', {
                type: 'hidden',
                name: 'insert[post][' + index + ']',
                value: table.getDataAtRow(index),
            }));
        });

        j$(form).append(j$('<input />', {
            type: 'hidden',
            name: 'insert[colHeaders]',
            value: col_headers,
        }));

        j$(form).append(j$('<input />', {
            type: 'hidden',
            name: 'insert[formats]',
            value: formats,
        }));

        // return false;
    });
});


