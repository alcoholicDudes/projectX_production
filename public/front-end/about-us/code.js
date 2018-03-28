type(
    $('#typewriter'),
    'We Are Passionate',
    'We Strive For Perfection',
    'We Deliver Quality',
    'We Push Limits To Give You Best Possible Experience'
);

$('.testimonial').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 800,
    slidesToShow: 1,
    adaptiveHeight: true
});