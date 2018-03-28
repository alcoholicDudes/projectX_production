$.fn.extend({
    intro: function (animationName, delay) {
        let objectBeingAnimated = $(this);
        if (delay) {
            objectBeingAnimated.css({'animation-delay': delay + 's'});
        }
        let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        objectBeingAnimated.removeClass('hidden').addClass('visible animated ' + animationName).one(animationEnd, () => {
            objectBeingAnimated.removeClass('animated ' + animationName);
            if (delay) {
                objectBeingAnimated.css({'animation-delay': '0s'}); // Reset animation delay
            }
        });
        return this;
    },
    outro: function (animationName) {
        let objectBeingAnimated = $(this);
        let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        objectBeingAnimated.addClass('animated ' + animationName).one(animationEnd, () => {
            objectBeingAnimated.addClass('hidden').removeClass('visible animated ' + animationName);
        });
        return this;
    },
    startle: function (animationName) {
        let objectBeingAnimated = $(this);
        let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        objectBeingAnimated.addClass('animated ' + animationName).one(animationEnd, () => {
            objectBeingAnimated.removeClass('animated ' + animationName);
        });
        return this;
    }
});

let cart = $('#cart_icon_holder');

let shakeThatCart = function () {
    cart.startle('wobble');
};

