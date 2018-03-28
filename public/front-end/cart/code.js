// ===== Scroll to Top ====
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});


// ========= it's AJAX bitchh =========
let itemCountHolder = $('#numItems');
let itemHolder = $('#itemHolder');
let cartPriceHolder = $('#cartPrice');

let currentTotal = 0;
let taxInPercentage = 18;
let deliveryCharge = 30;

let subtotalOutput = $('#sub_total');
let taxOutput = $('#tax');
let deliveryOutput = $('#delivery');
let grandTotalOutput = $('#grand_total');

getCart();

function removeItem(designId) {
    let itemsInCart = localStorage.getItem('cart');
    itemsInCart = JSON.parse(itemsInCart);

    let index = itemsInCart.indexOf(designId);
    itemsInCart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(itemsInCart))

    getCart();
}

function getCart() {
    itemHolder.empty();
    currentTotal = 0;
    updateCartPrice(0);

    let itemsInCart = localStorage.getItem('cart');

    if (!itemsInCart) {
        return;
    }

    itemsInCart = JSON.parse(itemsInCart);
    setItemsCount(itemsInCart.length);
    itemsInCart.forEach(item => getDesigns(item));

}

function updateCartPrice(incrementalAmount) {
    currentTotal += incrementalAmount;
    let tax = (taxInPercentage / 100) * currentTotal;
    let grandTotal = currentTotal + tax + deliveryCharge;

    cartPriceHolder.empty();
    subtotalOutput.empty();
    taxOutput.empty();
    deliveryOutput.empty();
    grandTotalOutput.empty();

    cartPriceHolder.html(currentTotal);
    subtotalOutput.html('₹ ' + currentTotal);
    taxOutput.html('₹ ' + tax);
    deliveryOutput.html('₹ ' + deliveryCharge);
    grandTotalOutput.html('₹ ' + grandTotal);
}

function getDesigns(designId) {
    $.ajax({
        url: '/designs/designId',
        data: {
          designId
        },
        method: 'GET',
        success: renderShirts,
    });
}

function setItemsCount(newCount) {
    if (newCount === -1) {
        let oldCount = parseInt(itemCountHolder.text());
        let newCounter = oldCount - 1;
        itemCountHolder.empty();
        itemCountHolder.append(newCounter)
    } else {
        itemCountHolder.empty();
        itemCountHolder.append(newCount)
    }
}

function renderShirts(data) {
    let designArea = $('<div class="design-area away"></div>');
    let designAreaBack = $('<div class="design-area-back over"></div>');
    let cardImg = $(`<img class="card-img m-0 p-0 away" src="../img/tshirt_front.png" style="background-color: ${data.color}">`);
    let cardImgBack = $(`<img class="card-img m-0 p-0 over" src="../img/tshirt_back.png" style="background-color: ${data.color}">`);

    let newItem = $(`<div class="row mb-5 m-1 border-solid rounded items"></div>`);
    let imageWrapper = $(`<div class="col-12 col-md-3 p-0"></div>`);
    let imageInnerWrap = $(`<div class="card"> </div>`);
    let imageInnerLink = $(`<a href="." class="link"></a>`);
    updateCartPrice(data.designPrice);
    let otherDetailsWrapper = $(`<div class="col-12 col-md-9">
                    <div class="row mt-2">
                        <div class="col-8">
                            <h5 class="">${data.designName}</h5>
                        </div>
                        <div class="col-4">
                            <h5>Rs.${data.designPrice}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <p class="ml-3">
                            <small>Design by: <a href=".">${data.designOwner}</a></small>
                        </p>
                    </div>
                    <div class="row">
                        <div class="form-group ml-3">
                            <label for="size1">Size</label>
                            <select class="form-control" id="size1">
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>XXL</option>
                            </select>
                        </div>
                        <div class="form-group ml-3">
                            <label for="quantity1">Qty</label>
                            <select class="form-control" id="quantity1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div class="row border_top_light">
                        <button class="btn btn-outline-danger ml-3 my-2 remove-btn" onclick="removeItem(${data.designId})">remove
                        </button>
                    </div>
                </div>`);
    let designAttributes = JSON.parse(data.designAttributes);

    designAttributes.images.forEach(element => {
        if (element.isFront) {
            let images = $(`<img src="/images/${element.name}" class="">`);
            images.css({
                'height': element.height + '%',
                'width': element.width + '%',
                'position': 'absolute',
                'top': element.top + '%',
                'left': element.left + '%'
            });

            designArea.append(images);
        } else {
            let images = $(`<img src="/images/${element.name}" class="">`);
            console.log(element.height);
            images.css({
                'height': element.height + '%',
                'width': element.width + '%',
                'position': 'absolute',
                'top': element.top + '%',
                'left': element.left + '%'
            });

            designAreaBack.append(images);
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
    imageInnerLink.append(designArea);
    imageInnerLink.append(designAreaBack);
    imageInnerLink.append(cardImg);
    imageInnerLink.append(cardImgBack);
    imageInnerWrap.append(imageInnerLink);
    imageWrapper.append(imageInnerWrap);
    newItem.append(imageWrapper);
    newItem.append(otherDetailsWrapper);
    itemHolder.append(newItem);
}