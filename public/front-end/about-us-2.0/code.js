let tshirtsWrapper = $('#tshirts_wrapper')
let leftImage = $('#left_img');
let middleImage = $('#middle_img');
let rightImage = $('#right_img');
let name = $('#company_name');

let introTimeline = new TimelineMax();

introTimeline.add('leftAndRight')
    .from(leftImage, 0.8, {x: -200, y: -200, rotation: 0, opacity: 0, ease: Power4.easeOut}, 0)
    .from(rightImage, 0.8, {x: 200, y: -200, rotation: 0, opacity: 0, ease: Power4.easeOut}, 0)
    .add('topAndBottom')
    .from(middleImage, 1, {y: -200, opacity: 0, ease: Power4.easeOut}, 0)
    .from(name, 1, {scale: 0, ease: Power4.easeOut}, 0);

let outroTimeline = new TimelineMax();

outroTimeline.to(leftImage, 1, {x: -200, y: -200, rotation: 0, opacity: 0, ease: Power4.easeOut}, 0)
    .to(rightImage, 1, {x: 200, y: -200, rotation: 0, opacity: 0, ease: Power4.easeOut}, 0)
    .to(middleImage, 1, {y: -200, opacity: 0, ease: Power4.easeOut}, 0)
    .to(name, 1, {scale: 0, ease: Power4.easeOut}, 0);

let controller = new ScrollMagic.Controller();

let scene = new ScrollMagic.Scene({
    triggerElement: tshirtsWrapper,
    duration: '100%'
})
    .setTween(outroTimeline)
    // .addIndicators()
    .addTo(controller);

let parallexScene = new ScrollMagic.Scene({
    triggerElement: '.parallex',
    triggerHook: 1,
    duration: '100%'
})
    .setTween(TweenMax.from('.bcg', 1, {y: '-40%', ease: Power0.easeNone}))
    // .addIndicators()
    .addTo(controller);

$('.flaunting-container').each((index, element) => {
    let firstChild = $(element).find('.first-child');
    let secondChild = $(element).find('.second-child');

    let ourTimeline = new TimelineMax();

    ourTimeline.from(firstChild, 0.5, {x: -200, opacity: 0})
        .from(secondChild, 0.5, {x: 200, opacity: 0});

    let ourScene = new ScrollMagic.Scene({
        triggerElement: element,
    })
        .setTween(ourTimeline)
        // .addIndicators()
        .addTo(controller);
});

$('.testimonial').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 800,
    slidesToShow: 1,
    adaptiveHeight: true
});

