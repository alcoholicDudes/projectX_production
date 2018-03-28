let timeline = new TimelineMax();
let letters = $('.letter');
let underline = $('#underline');

timeline.staggerFrom(letters, 0.5, {opacity: 0}, 0.05)
    .staggerFrom(letters, 1, {y: -600, ease: Bounce.easeOut}, 0.2)
    .from(underline, 2, {width: 0, ease: Expo.easeOut});

