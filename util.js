/**
 * @typedef {import("./types").BUFFERTYPE} BUFFERTYPE
 */

var fileType = require('file-type'),
    mime = require('mime');

module.exports = {
    /**
	 * 
	 * @param {BUFFERTYPE} buffer
	 * @param {string} [type] fileMime string e.g. text/plain
	 * @return {Object.<string, string | null>}
	 */
    getBufferInfo: function(buffer, type) {
		/**
		 * @type {string}
		 */
		var fileMime = 'text/plain'
		/**
		 * @type {string | null}
		 */
		var fileExtension = 'txt';

        var fileInfo = fileType(buffer);
        if(type) {
            fileMime = type;
            fileExtension = mime.getExtension(fileMime);
        } else if(fileInfo) {
            fileExtension = fileInfo.ext;
            fileMime = fileInfo.mime;
        }
        return {
            mime: fileMime,
            ext: fileExtension
        };
    }
};
