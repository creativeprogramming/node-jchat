/**
 *
 * @type {*}
 */
module.exports = BBcode;

/* jshint ignore:start */
var smilies = {
    ':-\)': 'Cute.png',
    ';-\)': 'Cute_Winking.png'
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
function BBcode(str) {
    var res;
    for (var i in smilies) {
        res = str.replace(i, '<img src="' + imgPath + '/' + smilies[i] + '" />');
        str = res;
    }

    return res;
}