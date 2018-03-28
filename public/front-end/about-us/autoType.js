let stringQueue;

// Call funtion type(jqTextObject, str1, str2, str3...)
// Last string stays on screen

function type(...n) {
    let jqTextObject = n.shift();
    stringQueue = n;
    typeAndDeleteNextString(jqTextObject);
}

function typeAndDeleteNextString(jqTextObject) {
    if (stringQueue.length != 0) {
        typeString(jqTextObject, stringQueue.shift());
    }
}

function typeString(jqTextObject, str) {
    jqTextObject.text("");
    let typingDelay = 0;
    for (let i = 0; i < str.length; i++) {
        typingDelay += generateRandomNumber(50, 500);
        setTimeout(() => {
            jqTextObject.append(str.charAt(i));
        }, typingDelay)
    }
    if (stringQueue.length > 0) {
        setTimeout(() => {
            deleteText(jqTextObject);
        }, typingDelay + 2500)
    }
}

function deleteText(jqTextObject) {
    let text = jqTextObject.text();
    let deleteDelay = 0;
    for (let i = text.length - 1; i >= 0; i--) {
        deleteDelay += 50;
        setTimeout(() => {
            jqTextObject.text(text.substring(0, i));
        }, deleteDelay);
    }
    deleteDelay += 200;
    setTimeout(() => typeAndDeleteNextString(jqTextObject), deleteDelay)
}

function generateRandomNumber(min,max) {
    return Math.floor(Math.random() *( max - min + 1) + min);
}