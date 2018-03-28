// ==== showing images on hover =====
$(function () {
    let mainImageContainer = $('#mainImgContainer');
    let rightView = $('#rightView');
    let leftView = $('#leftView');
    let frontView = $('#frontView');
    let backView = $('#backView');
    frontView.mouseover(() => {
        let img = frontView.clone();
        mainImageContainer.empty();
        mainImageContainer.append(img);
        frontView.removeClass('border-transparent').addClass('border-solid');
    }).mouseout(() => {
        frontView.removeClass('border-solid').addClass('border-transparent');
    });
    rightView.mouseover(() => {
        let img = rightView.clone();
        mainImageContainer.empty();
        mainImageContainer.append(img);
        rightView.removeClass('border-transparent').addClass('border-solid');
    }).mouseout(() => {
        rightView.removeClass('border-solid').addClass('border-transparent');
    });
    leftView.mouseover(() => {
        let img = leftView.clone();
        mainImageContainer.empty();
        mainImageContainer.append(img);

        leftView.removeClass('border-transparent').addClass('border-solid');
    }).mouseout(() => {
        leftView.removeClass('border-solid').addClass('border-transparent');
    });
    backView.mouseover(() => {
        let img = backView.clone();
        mainImageContainer.empty();
        mainImageContainer.append(img);

        backView.removeClass('border-transparent').addClass('border-solid');
    }).mouseout(() => {
        backView.removeClass('border-solid').addClass('border-transparent');
    });
});


// ==== size selector =====
function setBackground(circle) {
    circle.siblings().css({'background': 'white', 'color': 'black'});
    circle.css({'background': 'black', 'color': 'white'})
}
