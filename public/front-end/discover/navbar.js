let tempBar = $('#temp-bar');
let logo = $('#logo');
let logoBackground = $('.hexagon');
let logoAfter = $('#logo-after');
let logoAfterBackground = $('.hexagon-after');

$(window).scroll(function () {
    let scroll = $(window).scrollTop();
    let os = tempBar.offset().top;
    let ht = tempBar.height();
    if (scroll > os + ht) {
        logo.removeClass('d-md-block').addClass('d-md-none');
        logoBackground.removeClass('d-md-block').addClass('d-md-none');
        logoAfter.removeClass('d-md-none').addClass('d-md-block');
        logoAfterBackground.removeClass('d-md-none').addClass('d-md-block');
    }
});
$(window).scroll(function () {
    let scroll = $(window).scrollTop();
    if (scroll < 20) {
        logo.removeClass('d-md-none').addClass('d-md-block');
        logoBackground.removeClass('d-md-none').addClass('d-md-block');
        logoAfter.removeClass('d-md-block').addClass('d-md-none');
        logoAfterBackground.removeClass('d-md-block').addClass('d-md-none');
    }
});

// ===== hiding logo-after when navbar toggler is pressed ======
$(function () {
    let logoAfter = $('#logo-after');
    let logoAfterBackground = $('.hexagon-after');
    let clicked = false;
    $('.navbar-toggler').on('click', () => {
        if (!clicked) {
            clicked = true;
            logoAfter.removeClass('d-block').addClass('d-none');
            logoAfterBackground.removeClass('d-block').addClass('d-none');
        } else {
            setTimeout(function () {
                clicked = false;
                logoAfter.removeClass('d-none').addClass('d-block');
                logoAfterBackground.removeClass('d-none').addClass('d-block');
            }, 500);

        }
    })
});