let bigImage = $('#big_image');
let name = $('#name');
let aboutMe = $('#aboutMe');

let userDetails;
let designHolder = $('#designHolder');
// vars will pick up userId from query
let vars = {};
let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
});

getUserDetails();

function getUserDetails() {
    getDesigns();
    $.ajax({
        url: 'http://localhost:5252/users',
        data: {
            userId: vars.userId
        },
        method: 'GET',
        success: updateUserDetails
    });
}

function updateUserDetails(userData) {
    name.html(userData.userName);
    aboutMe.html(userData.about);
}

function getDesigns() {
    $.ajax({
        url: 'http://localhost:5252/designs/search',
        data: {
            designOwner: vars.userId
        },
        method: 'GET',
        success: renderDesigns,
    });
}

function renderDesigns(data) {
    data.rows.forEach(design => {
        let designArea = $('<div class="design-area away"></div>');
        let designAreaBack = $('<div class="design-area-back over"></div>');
        let card = $(`<div class="teaser-block card col-12 col-sm-6 col-md-3 mb-5 products mx-auto"></div>`);
        let link = $(`<a href="." class="productImages"></a>`);
        let cardImg = $(`<img class="card-img m-0 p-0 teaser-img away" src="../img/tshirt_front.png" style="background-color: ${design.color}">`);
        let cardImgBack = $(`<img class="card-img m-0 p-0 teaser-img over" src="../img/tshirt_back.png" style="background-color: ${design.color}">`);
        link.append(cardImg);
        link.append(cardImgBack);
        let designAttributes = JSON.parse(design.designAttributes);

        designAttributes.images.forEach(element => {
            if (element.isFront) {
                let image = $(`<img src="http://localhost:5252/images/${element.name}">`);
                image.css({
                    'height': element.height + '%',
                    'width': element.width + '%',
                    'position': 'absolute',
                    'top': element.top + '%',
                    'left': element.left + '%'
                });

                designArea.append(image);
            } else {
                let image = $(`<img src="http://localhost:5252/images/${element.name}">`);
                console.log(element.height);
                image.css({
                    'height': element.height + '%',
                    'width': element.width + '%',
                    'position': 'absolute',
                    'top': element.top + '%',
                    'left': element.left + '%'
                });

                designAreaBack.append(image);
            }
        });

        designAttributes.texts.forEach(element => {
            // temp solution
            let fontSize = element.fontSize / 2;
            if (element.isFront) {
                let text = $(`<p style="font-size: ${fontSize}px; color: ${element.color}">${element.content}</p>`);
                text.css({
                    'position': 'absolute',
                    'top': element.top + '%',
                    'left': element.left + '%'
                });

                designArea.append(text);
            } else {
                let text = $(`<p style="font-size: ${fontSize}px; color: ${element.color}">${element.content}</p>`);
                text.css({
                    'position': 'absolute',
                    'top': element.top + '%',
                    'left': element.left + '%'
                });

                designAreaBack.append(text);
            }
        });

        link.append(designArea);
        link.append(designAreaBack);
        card.append(link);
        designHolder.append(card);
    });
}

window.addEventListener('scroll', () => {
    scrolledDistance = $(window).scrollTop() / 3;
    bigImage.css({
        'transform': 'translate3d(0,' + scrolledDistance + 'px,0)',
        '-webkit-transform': 'translate3d(0,' + scrolledDistance + 'px,0)',
        '-ms-transform': 'translate3d(0,' + scrolledDistance + 'px,0)',
        '-o-transform': 'translate3d(0,' + scrolledDistance + 'px,0)'
    });
});