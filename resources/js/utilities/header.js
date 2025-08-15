export function initHeaderMobile() {
    const $wrapper = $('.main-wrapper');

    // Pastikan overlay hanya ditambahkan sekali
    if (!$('.sidebar-overlay').length) {
        $('body').append('<div class="sidebar-overlay"></div>');
    }

    // Mobile menu toggle
    $(document).on('click', '#mobile_btn', function () {
        $wrapper.toggleClass('slide-nav');
        $('.sidebar-overlay').toggleClass('opened');
        $('html').addClass('menu-opened');
        $('#task_window').removeClass('opened');
        return false;
    });

    // Overlay click
    $(document).on('click', '.sidebar-overlay', function () {
        $('html').removeClass('menu-opened');
        $(this).removeClass('opened');
        $wrapper.removeClass('slide-nav');
        $('#task_window').removeClass('opened');
    });

    // Hide & Delete Buttons
    $(document).on('click', '.hideset', function () {
        $(this).closest('.set-parent').hide();
    });

    $(document).on('click', '.delete-set', function () {
        $(this).closest('.set-parent').hide();
    });

    document.getElementById('btnFullscreen').addEventListener('click', function () {
        toggleFullscreen();
    });

    function toggleFullscreen(elem) {
        elem = elem || document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    const dropdownElList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
    dropdownElList.forEach(el => {
        // Hapus instance lama jika ada
        const instance = bootstrap.Dropdown.getInstance(el);
        if (instance) instance.dispose();

        new bootstrap.Dropdown(el);
    });

    if ($('#collapse-header').length > 0) {
		document.getElementById('collapse-header').onclick = function () {
			this.classList.toggle('active');
			document.body.classList.toggle('header-collapse');
		}
	}
}