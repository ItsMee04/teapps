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
}