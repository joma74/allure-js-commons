'use strict';

/**
 * @typedef {import("types").BUFFERTYPE} BUFFERTYPE
 * @typedef {import("types").IRuntime} IRuntime
 * @typedef {import("types").SEVERITYTYPE_V} SEVERITYTYPE_V
 * @typedef {import("types").SEVERITIES} SEVERITIES
 */

/**
 * @type {SEVERITIES}
 */
var SEVERITY = Object.freeze({
    BLOCKER: 'blocker',
    CRITICAL: 'critical',
    NORMAL: 'normal',
    MINOR: 'minor',
    TRIVIAL: 'trivial'
});

/**
 * @constructor
 * @param {import("index")} allure
 */
function Runtime(allure) {
    this._allure = allure;
}

/**
 * 
 * @param {any} obj
 * @returns {boolean}
 */
Runtime.prototype.isPromise = function(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

/**
 * @param {string} name 
 * @param {Function} stepFunc
 * @returns {Function}
 */
Runtime.prototype.createStep = function(name, stepFunc) {
    var that = this;
    return function() {
        var stepName = that._format(name, Array.prototype.slice.call(arguments, 0)),
            status = /** @type {import("types").TESTSTATUS} */('passed'),
            result;
        that._allure.startStep(stepName);
        try {
            result = stepFunc.apply(this, arguments);
        }
        catch(error) {
            status = /** @type {import("types").TESTSTATUS} */('broken');
            throw error;
        }
        finally {
            if(that.isPromise(result)) {
                result.then(function() {
                    that._allure.endStep('passed');
                }, function() {
                    that._allure.endStep('broken');
                });
            } else {
                that._allure.endStep(status);
            }
        }
        return result;
    };
};

/**
 * @todo See https://github.com/Microsoft/TypeScript/issues/407
 * 
 * @param {string} name 
 * @param {Function | BUFFERTYPE | any} [content]
 * @param {string} [type]
 * @return {Function | void}
 */
Runtime.prototype.createAttachment = function(name, content, type) {
    var that = this;
    if(typeof content === 'function') {
        return function() {
            var attachmentName = that._format(name, Array.prototype.slice.call(arguments, 0)),
                buffer = content.apply(this, arguments);
            return that.createAttachment(attachmentName, buffer, type);
        };
    } else {
        return that._allure.addAttachment(name, content, type);
    }
};

/**
 * 
 * @param {string} name 
 * @param {any} value 
 */
Runtime.prototype.addLabel = function(name, value) {
    this._allure.getCurrentTest().addLabel(name, value);
};

/**
 * 
 * @param {string} name 
 * @param {string} value 
 */
Runtime.prototype.addArgument = function(name, value) {
    this._allure.getCurrentTest().addParameter('argument', name, value);
};

/**
 * 
 * @param {string} name 
 * @param {string} value 
 */
Runtime.prototype.addEnvironment = function(name, value) {
    this._allure.getCurrentTest().addParameter('environment-variable', name, value);
};

Runtime.prototype.description = function(description, type) {
    this._allure.setDescription(description, type);
};

Runtime.SEVERITY = SEVERITY;

/**
 * 
 * @param {SEVERITYTYPE_V} severity 
 */
Runtime.prototype.severity = function(severity) {
    this.addLabel('severity', severity);
};

/**
 * 
 * @param {string} epic 
 */
Runtime.prototype.epic = function(epic) {
    this.addLabel('epic', epic);
};

/**
 * 
 * @param {string} feature 
 */
Runtime.prototype.feature = function(feature) {
    this.addLabel('feature', feature);
};

/**
 * 
 * @param {string} story 
 */
Runtime.prototype.story = function(story) {
    this.addLabel('story', story);
};

/**
 * 
 * @param {string} name 
 * @param {any[]} arr 
 */
Runtime.prototype._format = function(name, arr) {
    return name.replace(/(\{(\d+)\})/gi, function(match, submatch, index) {
        return arr[index];
    });
};


module.exports = Runtime;
