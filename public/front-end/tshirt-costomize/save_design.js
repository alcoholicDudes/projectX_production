// TODO: Send userID
let designArea = $('#design_area_front');
let designAreaWidth = parseInt(designArea.css('width'));
let designAreaHeight = parseInt(designArea.css('height'));
let designAttributes = {};
let topWear = 0;
let images = [];
let texts = [];


function sendDesign() {
    // designAttributes.tshirtColor = $('#tshirt_block').css('background-color');

    $('.image').each((index, element) => {
        let jqElement = $(element);
        let imageDetails = {};
        // lets send height, width, top, left in %
        let heightInPx = parseInt(jqElement.css('height'));
        let widthInPx = parseInt(jqElement.css('width'));
        let topInPx = parseInt(jqElement.css('top'));
        let leftInPx = parseInt(jqElement.css('left'));

        imageDetails.height = (heightInPx / designAreaHeight) * 100;
        imageDetails.width = (widthInPx / designAreaWidth) * 100;
        imageDetails.top = (topInPx / designAreaHeight) * 100;
        imageDetails.left = (leftInPx / designAreaWidth) * 100;
        imageDetails.isFront = jqElement.parent().attr('id') === 'design_area_front';
        images.push(imageDetails);
    });

    $('.text').each((index, element) => {
        let jqElement = $(element);
        let textDetails = {};
        let topInPx = parseInt(jqElement.css('top'));
        let leftInPx = parseInt(jqElement.css('left'));

        let fontSize = jqElement.css('font-size');
        textDetails.content = jqElement.text().replace(/\W/g, '');
        // we need relative or %value of font to make design cards responsive
        textDetails.fontSize = parseInt(fontSize);
        // textDetails.fontFamily = jqElement.css('font-family');
        textDetails.color = jqElement.css('color');
        textDetails.top = (topInPx / designAreaHeight) * 100;
        textDetails.left = (leftInPx / designAreaWidth) * 100;
        textDetails.isFront = jqElement.parent().attr('id') === 'design_area_front';

        texts.push(textDetails);
    });

    let color = $('#tshirt_block').css('background-color');
    designAttributes.images = images;
    designAttributes.texts = texts;
    let designAttributesInJson = JSON.stringify(designAttributes);
    $('#price_inp').val(cost);
    $('#color_inp').val(color);
    $('#json_inp').val(designAttributesInJson);

    document.getElementById('design_form').submit();
}

function openInNewTab(link) {
    let win = window.open('' + link, '_blank');
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }
}



