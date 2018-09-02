'use srtict';

var TYPES = {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown'
};

/**
 * @todo keyof typeof Description.TYPES is not equal to their values
 * 
 * @constructor
 * @this {Description}
 * @param {string} value 
 * @param {keyof typeof Description.TYPES} type 
 */
function Description(value, type) {
    this.value = value;
    this.type = isAvailableType(type) ? type : Description.TYPES.TEXT;
}

/**
 * @todo keyof typeof Description.TYPES is not equal to their values
 * 
 * @param {keyof typeof Description.TYPES} type one of Description.TYPES
 */
function isAvailableType(type) {
    return Object.keys(TYPES).some(function(key) {
        return TYPES[key] === type;
    });
}

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
