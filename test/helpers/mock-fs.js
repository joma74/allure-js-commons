'use strict';

/**
 * @typedef {import ("../../types").KeysAndAnyValues<string, any>} KeysAndAnyValues
 */

module.exports = {
	/**
	 * @type {KeysAndAnyValues}
	 */
	files: {},
	/**
	 * @todo Write TS issue for typeof Object.prototype
	 * @see [T.constructor should be of type T|https://github.com/Microsoft/TypeScript/issues/3841]
	 * 
	 * @param {string} path 
	 * @param {typeof Object.prototype} content 
	 */
    outputFileSync: function(path, content) {
        this.files[path] = content.toString();
    },
    '@global': true
};
