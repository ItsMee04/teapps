export function initDataTable(selector = '.datanew') {
    const $tables = $(selector);

    if ($tables.length === 0) return;

    $tables.each(function () {
        const $table = $(this);

        // Destroy jika sudah di-init sebelumnya
        if ($.fn.DataTable.isDataTable(this)) {
            $table.DataTable().destroy();
        }

        $table.DataTable({
            bFilter: true,
            sDom: 'fBtlpi',
            ordering: true,
            language: {
                search: ' ',
                sLengthMenu: '_MENU_',
                searchPlaceholder: "Search",
                info: "_START_ - _END_ of _TOTAL_ items",
                paginate: {
                    next: ' <i class=" fa fa-angle-right"></i>',
                    previous: '<i class="fa fa-angle-left"></i> '
                },
            },
            initComplete: (settings, json) => {
                $('.dataTables_filter').appendTo('#tableSearch');
                $('.dataTables_filter').appendTo('.search-input');
            },
        });
    });
}
