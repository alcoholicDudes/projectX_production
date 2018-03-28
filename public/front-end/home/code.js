let popularDesignWrapper = $('#popular_designs_wrapper');
let newArrivalsWrapper = $('#new_design_wrapper');

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particlesjs-config.json', function () {
    console.log('callback - particles.js config loaded');
});
particlesJS();

$('#carousel_wrapper').slick({
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: true,
    pauseOnHover: false,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});

$.ajax({
    url: '/designs/all',
    method: 'GET',
    success: renderShirtsPopular
});

function renderShirtsPopular(data) {
    data.forEach(design => {
        let teaserBlock = $(`<div class="teaser-block">
        <img class="teaser-img" src="../img/tshirt_front.png" alt="">
    </div>`);


        let designArea = $('<div class="design-area"></div>');

        let designAttributes = JSON.parse(design.designAttributes);

        designAttributes.images.forEach(element => {
            let image = $(`<img src="/images/${element.name}">`);
            image.css({
                'height': (parseInt(element.height) / 2) + 'px',
                'width': (parseInt(element.width) / 2) + 'px',
                'position': 'absolute',
                'top': (parseInt(element.top) / 2) + 'px',
                'left': (parseInt(element.left) / 2) + 'px'
            });

            designArea.append(image);
        });
        teaserBlock.append(designArea);
        popularDesignWrapper.append(teaserBlock);
    });
    initialiseCarousel(popularDesignWrapper);
}

$.ajax({
    url: '/designs/all',
    method: 'GET',
    success: renderShirtsNew
});

function renderShirtsNew(data) {
    data.forEach(design => {
        let teaserBlock = $(`<div class="teaser-block">
        <img class="teaser-img" src="../img/tshirt_front.png" alt="">
    </div>`);


        let designArea = $('<div class="design-area"></div>');

        let designAttributes = JSON.parse(design.designAttributes);

        designAttributes.images.forEach(element => {
            let image = $(`<img src="/images/${element.name}">`);
            image.css({
                'height': (parseInt(element.height) / 2) + 'px',
                'width': (parseInt(element.width) / 2) + 'px',
                'position': 'absolute',
                'top': (parseInt(element.top) / 2) + 'px',
                'left': (parseInt(element.left) / 2) + 'px'
            });

            designArea.append(image);
        });
        teaserBlock.append(designArea);
        newArrivalsWrapper.append(teaserBlock);
    });
    initialiseCarousel(newArrivalsWrapper);
}

function initialiseCarousel(parent) {
    parent.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
}
