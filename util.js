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
	 * @return {Object.<string, string>}
	 */
    getBufferInfo: function(buffer, type) {
        var fileMime = 'text/plain';
        var fileExtension = 'txt';

        var fileInfo = fileType(buffer);
		
        if(type) {
            fileMime = type;
            var fileMimeExtension = mime.getExtension(fileMime);
            if(fileMimeExtension){
                fileExtension = fileMimeExtension;
            }
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
