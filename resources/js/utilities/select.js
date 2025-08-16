export function initSelect2() {
    // Inisialisasi Select2 pada elemen dengan class .select
    if ($(".select").length > 0) {
        $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
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