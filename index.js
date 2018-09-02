'use strict';

/**
 * @typedef {import("types").BUFFERTYPE} BUFFERTYPE
 * @typedef {import("types").TESTSTATUS} TESTSTATUS
 */

var assign = require('object-assign'),
    Suite = require('./beans/suite'),
    Test = require('./beans/test'),
    Step = require('./beans/step'),
    Attachment = require('./beans/attachment'),
    util = require('./util'),
	writer = require('./writer');

/**
 * @constructor
 */
function Allure() {
	/** @type {Suite[]} */
	this.suites = [];
	
    this.options = {
        targetDir: 'allure-results'
    };
}
/**
 * 
 * @param {Object<string, string>} options 
 */
Allure.prototype.setOptions = function(options) {
    assign(this.options, options);
};

Allure.prototype.getCurrentSuite = function() {
    return this.suites[0];
};

Allure.prototype.getCurrentTest = function() {
    return this.getCurrentSuite().currentTest;
};

/**
 * 
 * @param {string} suiteName 
 * @param {number} [timestamp] 
 */
Allure.prototype.startSuite = function(suiteName, timestamp) {
    this.suites.unshift(new Suite(suiteName, timestamp));
};

Allure.prototype.endSuite = function(timestamp) {
    var suite = this.getCurrentSuite();
    suite.end(timestamp);
    if(suite.hasTests()) {
        writer.writeSuite(this.options.targetDir, suite);
    }
    this.suites.shift();
};

/**
 * @param {string} testName
 * @param {number} [timestamp]
 */
Allure.prototype.startCase = function(testName, timestamp) {
    var test = new Test(testName, timestamp),
        suite = this.getCurrentSuite();
    suite.currentTest = test;
    suite.currentStep = test;
    suite.addTest(test);
};

/**
 * 
 * @param {TESTSTATUS} status 
 * @param {Error} [err] 
 * @param {number} [timestamp]
 */
Allure.prototype.endCase = function(status, err, timestamp) {
    this.getCurrentTest().end(status, err, timestamp);
};

/**
 * 
 * @param {string} stepName 
 * @param {number} [timestamp]
 */
Allure.prototype.startStep = function(stepName, timestamp) {
    var step = new Step(stepName, timestamp),
        suite = this.getCurrentSuite();
    if (!suite || !suite.currentStep) {
        console.warn('allure-js-commons: Unexpected startStep() of ' + stepName + '. There is no parent step');
        return;
    }

    step.parent = /** @type {Step} */(suite.currentStep);
    step.parent.addStep(step);
    suite.currentStep = step;

};

/**
 * @param {TESTSTATUS} status
 * @param {number} [timestamp]
 */
Allure.prototype.endStep = function(status, timestamp) {
    var suite = this.getCurrentSuite();
    if (!suite || !(suite.currentStep instanceof Step)) {
        console.warn('allure-js-commons: Unexpected endStep(). There are no any steps running');
        return;
	}
	
	var currentStep  = /** @type {Step} */ (suite.currentStep);

    currentStep.end(status, timestamp);
    suite.currentStep = currentStep.parent;
};

Allure.prototype.setDescription = function(description, type) {
    this.getCurrentTest().setDescription(description, type);
};

/**
 * 
 * @param {string} attachmentName 
 * @param {Function | BUFFERTYPE | any} buffer
 * @param {string} [type] 
 */
Allure.prototype.addAttachment = function(attachmentName, buffer, type) {
    var info = util.getBufferInfo(buffer, type),
        name = writer.writeBuffer(this.options.targetDir, buffer, info.ext),
        attachment = new Attachment(attachmentName, name, buffer.length, info.mime),
        currentStep = /** @type {Step} */ (this.getCurrentSuite().currentStep);

    if (currentStep) {
        currentStep.addAttachment(attachment);
    } else {
        console.warn('Trying to add attachment ' + attachmentName + ' to non-existent step');
    }
};

/**
 * @param {string} testName
 * @param {number} timestamp
 */
Allure.prototype.pendingCase = function(testName, timestamp) {
    this.startCase(testName, timestamp);
    this.endCase('pending', {name: 'PendingCase', message: 'Test ignored'}, timestamp);
};

module.exports = Allure;
