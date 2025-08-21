export function initSelectAllDataTable(tableSelector, selectAllSelector) {
    const table = $(tableSelector).DataTable();
    const selectAll = document.querySelector(selectAllSelector);

    if (!selectAll) return;

    // Klik select all
    selectAll.addEventListener("click", () => {
        const checked = selectAll.checked;
        table.rows({ search: "applied" }).nodes().to$().find("input[name='items[]']").prop("checked", checked);
    });

    // Klik checkbox individual -> update select all
    table.on("change", "input[name='items[]']", function () {
        const allBoxes = table.rows({ search: "applied" }).nodes().to$().find("input[name='items[]']");
        const allChecked = allBoxes.length && allBoxes.filter(":checked").length === allBoxes.length;
        selectAll.checked = allChecked;
    });
}
