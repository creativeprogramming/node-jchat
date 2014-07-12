/* jshint ignore:start */
var smilies = {
    ':-\)': 'Cute.png',
    ';-\)': 'Cute_Winking.png',
    ':-\(': 'Angry.png',
    ':-O': 'Gasping.png',
    ':up:': 'Thumb_Up.png',
    ':down:': 'Thumb_Down.png'
};
/* jshint ignore:end */

/**
 *
 * @type {string}
 */
var imgPath = '/img/emoticons';

/**
 *
 * @param str
 * @returns {XML|string|void}
 * @constructor
 */
exports.BBcode = function(str) {
    str = strip(str);
    var res;
    for (var i in smilies) {
        res = str.replace(i, '<img src="' + imgPath + '/' + smilies[i] + '" />');
        str = res;
    }

    return res;
};

function strip(str) {
    return str.replace(/(<([^>]+)>)/ig,"");
}