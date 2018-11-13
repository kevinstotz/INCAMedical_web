// Limit the length of txt displayed in drop down

function textLength(text, length, ellipsis=true) {
    return text.substring(0, length) + ( (ellipsis && text.length > length) ? '...' : '' );
}
