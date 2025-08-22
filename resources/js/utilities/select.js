export function initSelect2() {
    // Inisialisasi Select2 pada elemen dengan class .select
    if ($(".select").length > 0) {
        $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
        });
    }
}

export function initSelectSwall(selector = ".selectSwall") {
    // Inisialisasi Select2 pada elemen dengan class tertentu
    if ($(selector).length > 0) {
        $(selector).select2({
            minimumResultsForSearch: -1,
            width: "resolve", // ikut lebar elemen, bukan full width
            dropdownParent: $(".swal2-container"), // supaya dropdown muncul di atas SweetAlert
        });
    }
}

export function destrySelect2() {
    // Hancurkan Select2 pada elemen dengan class .select
    // Hancurkan Select2
    if ($(".select").length > 0) {
        $(".select").select2("destroy");
    }
}
