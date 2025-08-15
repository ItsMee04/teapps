export default function initSidebar() {
    const $slimScrolls = $(".slimscroll");

    // === Tambahan: Ambil state open menu dari localStorage ===
    const savedOpenMenu = localStorage.getItem("openSubmenu");

    // Hapus slimScroll lama
    if ($slimScrolls.parent(".slimScrollDiv").length) {
        $slimScrolls.slimScroll({ destroy: true }).attr("style", "");
    }

    // Slimscroll init
    if ($slimScrolls.length > 0) {
        $slimScrolls.slimScroll({
            height: "auto",
            width: "100%",
            position: "right",
            size: "7px",
            color: "#ccc",
            wheelStep: 10,
            touchScrollStep: 100,
        });

        const setHeight = () => {
            const wHeight = $(window).height() - 60;
            $slimScrolls.height(wHeight);
            $(".sidebar .slimScrollDiv").height(wHeight);
        };

        setHeight();
        $(window).off("resize.sidebar").on("resize.sidebar", setHeight);
    }

    // Sidebar Menu Toggle
    $(".sidebar-menu a")
        .off("click.sidebar")
        .on("click.sidebar", function (e) {
            if ($(this).parent().hasClass("submenu")) {
                e.preventDefault();
            }

            if (!$(this).hasClass("subdrop")) {
                $("ul", $(this).parents("ul:first")).slideUp(250);
                $("a", $(this).parents("ul:first")).removeClass("subdrop");

                $(this).next("ul").slideDown(350);
                $(this).addClass("subdrop");

                // === Simpan ID/menu text ke localStorage ===
                localStorage.setItem("openSubmenu", $(this).text().trim());
            } else {
                $(this).removeClass("subdrop");
                $(this).next("ul").slideUp(350);

                // === Hapus state dari localStorage ===
                localStorage.removeItem("openSubmenu");
            }
        });

    // === Restore submenu kalau savedOpenMenu ada ===
    if (savedOpenMenu) {
        $(".sidebar-menu a").each(function () {
            if ($(this).text().trim() === savedOpenMenu) {
                $(this).addClass("subdrop");
                $(this).next("ul").slideDown(0);
            }
        });
    }

    // Active submenu highlight
    $(".sidebar-menu ul li.submenu a.active")
        .parents("li:last")
        .children("a:first")
        .addClass("active");
}

export function destroySidebarScroll() {
    const $sidebar = $("#sidebar");
    $sidebar.slimScroll({ destroy: true });
    $sidebar.removeAttr("style");
}
