'use strict';

var Description = require('./description');

var STATUSES = ['passed', 'pending', 'skipped', 'failed', 'broken'];

/**
 * @typedef {import ("./step")} Step
 * @typedef {import ("./attachment")} Attachement
 * @typedef {import ("../types").Label} Label
 * @typedef {import ("../types").DESCRIPTIONTYPE_V} DESCRIPTIONTYPE_V
 * @typedef {import ("../types").Parameter} Parameter
 * @typedef {import ("../types").PARAMETERTYPE} PARAMETERTYPE
 */

/**
 * @constructor
 * @param {string} name 
 * @param {number=} timestamp
 */
function Test(name, timestamp) {
    this.name = name;
    this.start = timestamp || Date.now();
    /** @type {Step[]} */
    this.steps = [];
    /** @type {Attachement[]} */
    this.attachments = [];
    /** @type {Label[]} */
    this.labels = [];
    /** @type {Parameter[]} */
    this.parameters = [];
}

/**
 * 
 * @param {string} description 
 * @param {DESCRIPTIONTYPE_V} type 
 */
Test.prototype.setDescription = function (description, type) {
    this.description = new Description(description, type);
};

/**
 * @param {string} name 
 * @param {string} value 
 */
Test.prototype.addLabel = function (name, value) {
    this.labels.push({name: name, value: value});
};

/**
 * 
 * @param {PARAMETERTYPE} kind 
 * @param {string} name 
 * @param {any} value 
 */
Test.prototype.addParameter = function (kind, name, value) {
    this.parameters.push({kind: kind, name: name, value: value});
};

/**
 * @param {Step} step
 */
Test.prototype.addStep = function (step) {
    this.steps.push(step);
};

/**
 * 
 * @param {Attachement} attachment 
 */
Test.prototype.addAttachment = function (attachment) {
    this.attachments.push(attachment);
};

/**
 * 
 * @param {import("../types").TESTSTATUS} status
 * @param {Error=} error]
 * @param {number=} timestamp]
 */
Test.prototype.end = function (status, error, timestamp) {
    this.stop = timestamp || Date.now();
    if(status && this.status && (STATUSES.indexOf(status) > STATUSES.indexOf(this.status))) {
        this.status = status;
    }
    if (error) {
        this.failure = {
            message: error.message,
            'stack-trace': error.stack
        };
    }
};

Test.prototype.toXML = function () {
    var result = {
        '@': {
            start: this.start,
            status: this.status
        },
        name: this.name,
        title: this.name,
        labels: {
            label: this.labels.map(function (label) {
                return { '@': label };
            })
        },
        parameters: {
            parameter: this.parameters.map(function (param) {
                return { '@': param };
            })
        },
        steps: {
            step: this.steps.map(function (step) {
                return step.toXML();
            })
        },
        attachments: {
            attachment: this.attachments.map(function (attachment) {
                return attachment.toXML();
            })
        }
    };

    if (this.failure) {
        result.failure = this.failure;
    }

    if (this.description) {
        result.description = this.description.toXML();
    }

    if(this.stop) {
        result['@'].stop = this.stop;
    }

    return result;
};

module.exports = Test;
