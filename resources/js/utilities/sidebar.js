export default function initSidebar() {
    const $slimScrolls = $(".slimscroll");

    // Cek & hapus slimScroll lama sebelum inisialisasi
    if ($slimScrolls.parent(".slimScrollDiv").length) {
        $slimScrolls.slimScroll({ destroy: true }).attr("style", "");
    }

    // Sidebar Slimscroll
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
            } else {
                $(this).removeClass("subdrop");
                $(this).next("ul").slideUp(350);
            }
        });

    // Active submenu
    $(".sidebar-menu ul li.submenu a.active")
        .parents("li:last")
        .children("a:first")
        .addClass("active")
        .trigger("click");

    // Hover expand for mini-sidebar
    $(document)
        .off("mouseover.sidebar")
        .on("mouseover.sidebar", function (e) {
            e.stopPropagation();
            if (
                $("body").hasClass("mini-sidebar") &&
                $("#toggle_btn").is(":visible")
            ) {
                const targ = $(e.target).closest(
                    ".sidebar, .header-left"
                ).length;
                if (targ) {
                    $("body").addClass("expand-menu");
                    $(".subdrop + ul").slideDown();
                } else {
                    $("body").removeClass("expand-menu");
                    $(".subdrop + ul").slideUp();
                }
                return false;
            }
        });

    //toggle_btn
    $(document).on("click", "#toggle_btn", function () {
        if ($("body").hasClass("mini-sidebar")) {
            $("body").removeClass("mini-sidebar");
            $(this).addClass("active");
            $(".subdrop + ul");
            localStorage.setItem("screenModeNightTokenState", "night");
            setTimeout(function () {
                $("body").removeClass("mini-sidebar");
                $(".header-left").addClass("active");
            }, 100);
        } else {
            $("body").addClass("mini-sidebar");
            $(this).removeClass("active");
            $(".subdrop + ul");
            localStorage.removeItem("screenModeNightTokenState", "night");
            setTimeout(function () {
                $("body").addClass("mini-sidebar");
                $(".header-left").removeClass("active");
            }, 100);
        }
        return false;
    });

    if (localStorage.getItem("screenModeNightTokenState") == "night") {
        setTimeout(function () {
            $("body").removeClass("mini-sidebar");
            $(".header-left").addClass("active");
        }, 100);
    }
}

export function destroySidebarScroll() {
    const $sidebar = $("#sidebar");
    $sidebar.slimScroll({ destroy: true });
    $sidebar.removeAttr("style");
}