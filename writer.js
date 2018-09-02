'use strict';

/**
 * @typedef { import("./beans/suite")} Suite
 * @typedef {import("types").BUFFERTYPE} BUFFERTYPE
 */

var fs = require('fs-extra'),
    path = require('path'),
    uuid = require('uuid'),
    xml = require('js2xmlparser');

module.exports = {
    /**
	 * 
	 * @param {string} targetDir 
	 * @param {Suite} suites 
	 */
    writeSuite: function(targetDir, suites) {
        fs.outputFileSync(path.join(targetDir, uuid.v4() + '-testsuite.xml'), xml.parse('ns2:test-suite', suites.toXML()));
    },
    /**
	 * 
	 * @param {string} targetDir 
	 * @param {BUFFERTYPE} buffer 
	 * @param {string} ext 
	 */
    writeBuffer: function(targetDir, buffer, ext) {
        var fileName = uuid.v4() + '-attachment.' + ext;
        fs.outputFileSync(path.join(targetDir, fileName), buffer);
        return fileName;
    }
};
