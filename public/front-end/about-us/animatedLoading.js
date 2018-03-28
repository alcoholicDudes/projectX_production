// Do not use this on transformed elements because it's transformation will be calculated after animation is finished

window.addEventListener('scroll', dramaticEntrance);
window.addEventListener('load', dramaticEntrance);

// To understand this function watch- https://www.youtube.com/watch?v=CBQGl6zokMs
// Get animation names from https://daneden.github.io/animate.css/
$.fn.extend({
    leftAndRight: function (animationName, delay) {
        let objectBeingAnimated = $(this);
        if (objectBeingAnimated.hasClass('hidden')) {
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
        }
    },
    outro: function (animationName) {
        let objectBeingAnimated = $(this);
        if (!objectBeingAnimated.hasClass('animated')) {
            let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            objectBeingAnimated.addClass('animated ' + animationName).one(animationEnd, () => {
                objectBeingAnimated.addClass('hidden').removeClass('visible animated ' + animationName);
            });
            return this;
        }
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

function dramaticEntrance(introAnimation) {
    let hiddenElements = document.getElementsByClassName('hidden');
    let visibleElements = document.getElementsByClassName('visible');

    let distanceScrolled = window.pageYOffset;
    let pageHeight = window.innerHeight;
    let amountOfPageSeen = distanceScrolled + pageHeight;

    for (let i = 0; i < hiddenElements.length; i++) {
        let element = hiddenElements[i];
        let elementHeight = parseInt(window.getComputedStyle(element).height);
        let elementAnimation = element.getAttribute('data-animation');
        let elementPosition = $(element).offset().top;


        let isvisible = amountOfPageSeen > elementPosition + elementHeight;

        if (isvisible) {
            setTimeout(() => $(element).leftAndRight(elementAnimation), 100); // Hard coded
            /* It is important to change class after the loop is iterated otherwise it somehow
             * messes up the DOM structure */
        }
    }

    for (let i = 0; i < visibleElements.length; i++) {
        let element = visibleElements[i];
        let elementPosition = $(element).offset().top;
        let elementHeight = parseInt(window.getComputedStyle(element).height);

        let isvisible = amountOfPageSeen > elementPosition;
        if (!isvisible) {
            setTimeout(() => $(element).removeClass('visible').addClass('hidden'), 100);
        }
    }
}