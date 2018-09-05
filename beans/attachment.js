/**
 * Created by dolf on 12.05.15.
 */
/**
 * @typedef {import ("../types").AttachmentResultXML} AttachmentResultXML
 */

/**
 * @constructor
 * @this {Attachment}
 * @param {string} title 
 * @param {string} source 
 * @param {number} size 
 * @param {string} mime 
 */
function Attachment(title, source, size, mime) {
    this.title = title;
    this.type = mime;
    this.size = size;
    this.source = source;
}

/**
 * @return {AttachmentResultXML}
 */
Attachment.prototype.toXML = function () {
    return {
        '@': {
            title: this.title,
            source: this.source,
            type: this.type,
            size: this.size
        }
    };
};

module.exports = Attachment;
