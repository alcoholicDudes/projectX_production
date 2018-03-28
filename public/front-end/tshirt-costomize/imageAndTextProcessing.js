let imageInputFront = document.getElementById('img_input_front');
let imageInputBack = document.getElementById('img_input_back');

let designArea_front = $('#design_area_front');
let designArea_back = $('#design_area_back');

let textInput = $('#text_input');
let fontSizeInput = $('#font_size_input');

let frontInputContainer = $('#front_input_container');
let rareInputContainer = $('#rare_input_container');

let dimentionContainer = $('#dimension_container')

let costDiv = document.getElementById('cost_div');

let cost = 299;
let numberOfElementsAdded = 0;

function addImage(event, isFront) {
    let changedInput = event.target;
    cost += 50;
    updateCost();
    let image;
    isFront ? image = changedInput.files[0] : image = changedInput.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
        let newImageId = numberOfElementsAdded + 1;
        let newImageDiv = $(`<div class="image" data-id="${newImageId}" style="background-image: url(${reader.result})">
                <span onclick="deleteElement(${newImageId},${isFront})" class="floating-icon-container shadow delete-icon-container">
                <i class="fa fa-trash floating-icon"></i>
                </span>
            </div>`);
        isFront ? designArea_front.append(newImageDiv) : designArea_back.append(newImageDiv);
        numberOfElementsAdded++;
        setDraggable(newImageDiv);
        setResizable(newImageDiv);
    };
    pushNewInput(isFront);
}

function pushNewInput(isFront) {
    if (isFront) {
        $('.front-input').css('display', 'none');
        let newInput = `<input type="file" name="designImage" class="front-input" onchange="addImage(event, true)">`;
        frontInputContainer.append(newInput);
    } else {
        $('.rare-input').css('display', 'none');
        let newInput = `<input type="file" name="designImage" class="rare-input" onchange="addImage(event, false)">`;
        rareInputContainer.append(newInput);
    }
}

function setDraggable(jqueryElement) {
    jqueryElement.draggable({
        cursor: 'move',
        stop: alignImageInsideDesignArea
    })
}

function setResizable(jqueryElement) {
    jqueryElement.resizable({
        containment: 'parent',
        resize: showDimensions,
        stop: clearDimensions
    });
}

function alignImageInsideDesignArea(event) {
    let imageToBeMoved = $(event.target);
    let designArea = imageToBeMoved.parent();

    let borderWidthOfDesignArea = parseInt(designArea.css('border-width'));
    let widthOfDesignArea = parseInt(designArea.css('width')) - (2 * borderWidthOfDesignArea);
    let heightOfDesignArea = parseInt(designArea.css('height')) - (2 * borderWidthOfDesignArea);
    let widthOfImage = parseInt(imageToBeMoved.css('width'));
    let heightOfImage = parseInt(imageToBeMoved.css('height'));

    let minimumLeft = 0;
    let minimumTop = 0;
    let maximumLeft = widthOfDesignArea - widthOfImage;
    let maximumTop = heightOfDesignArea - heightOfImage;

    let currentLeft = parseInt(imageToBeMoved.css('left'));
    let currentTop = parseInt(imageToBeMoved.css('top'));

    let reAdjustedLeft;
    let reAdjustedTop;

    if (currentLeft < minimumLeft) {
        reAdjustedLeft = minimumLeft;
    } else if (currentLeft > maximumLeft) {
        reAdjustedLeft = maximumLeft;
    } else {
        reAdjustedLeft = currentLeft;
    }

    if (currentTop < minimumTop) {
        reAdjustedTop = minimumTop;
    } else if (currentTop > maximumTop) {
        reAdjustedTop = maximumTop;
    } else {
        reAdjustedTop = currentTop;
    }

    imageToBeMoved.animate({left: reAdjustedLeft, top: reAdjustedTop});
}

function showDimensions(event) {
    let image = $(event.target);
    let width = parseInt(image.css('width'));
    let height = parseInt(image.css('height'));
    dimentionContainer.html(width + ' X ' + height);
}

function clearDimensions() {
    dimentionContainer.html('');
}

function addText(isFront) {
    let text = textInput.val();
    let fontSize = fontSizeInput.val();
    let textId = numberOfElementsAdded + 1;

    let newTextElement = $(`<span class="text" data-id="${textId}">asd</span>`);
    let deleteIcon = $(`<span onclick="deleteElement(${textId})" class="floating-icon-container shadow delete-icon-container">
                <i class="fa fa-trash floating-icon"></i>
                </span>`);

    newTextElement.html(text);
    newTextElement.css({fontSize: fontSize + 'px'});
    newTextElement.append(deleteIcon);

    setDraggable(newTextElement);
    isFront ? designArea_front.append(newTextElement) : designArea_back.append(newTextElement);

    // Clear inputs
    textInput.val('');
    fontSizeInput.val('');

    cost += parseInt(fontSize);
    updateCost();
}

function deleteElement(imageId, front) {
    $(`[data-id='${imageId}']`).remove();
    cost -= 50;
    updateCost();
    if (front) {
        imageInputFront.value = '';
    } else {
        imageInputBack.value = '';
    }
}

function updateCost() {
    costDiv.innerHTML = 'Price : ' + cost;
}

pushNewInput(true);
pushNewInput(false);