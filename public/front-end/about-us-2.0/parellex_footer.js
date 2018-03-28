siteFooter();

$(window).resize(function () {
    siteFooter();
});

function siteFooter() {
    let siteContent = $('#site_content');

    let siteFooter = $('#footer_container');
    let siteFooterHeight = siteFooter.height();

    siteContent.css({
        "margin-bottom": siteFooterHeight
    });
}