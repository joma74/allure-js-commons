'use srtict';

/**
 * @typedef {import ("../types").DESCRIPTIONS} DESCRIPTIONS
 * @typedef {import ("../types").DESCRIPTIONTYPE_V} DESCRIPTIONTYPE_V
 * @typedef {import ("../types").DescriptionResultXML} DescriptionResultXML
 */

var hasAKey = require('./utils').hasKey;

/**
 * @type { DESCRIPTIONS };
 */
var TYPE_OF_DESCRIPTION = {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown'
};

var TYPES = Object.freeze(TYPE_OF_DESCRIPTION);

/** 
 * param type is guarded for a value of undefined
 * 
 * @constructor
 * @this {Description}
 * @param {string} value 
 * @param {DESCRIPTIONTYPE_V | undefined =} type 
 */
function Description(value, type) {
    this.value = value;
    this.type = isAvailableType(type) ? type : Description.TYPES.TEXT;
}

/**
 * 
 * @param {DESCRIPTIONTYPE_V=} type one of Description.TYPES.values
 * @return {boolean} parm type is oneof  Description.TYPES.values
 */
function isAvailableType(type) {
    if(type != undefined) {
        return Object.keys(TYPES).some(
            function(key) {
                if(hasAKey(TYPES, key)){
                    return TYPES[key] === type;
                }
                return false;
            }
        );
    }
    return false;
}

/**
 * @returns {DescriptionResultXML}
 */
Description.prototype.toXML = function() {
    return {
        '@': {
            type: this.type
        },
        '#': this.value
    };
};

Description.TYPES = TYPES;

module.exports = Description;
