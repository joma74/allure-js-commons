'use strict';

/**
 * @typedef {import("../types").TESTSTATUS} TESTSTATUS
 * @typedef {import("../types").StepResultXML} StepResultXML
 * @typedef {import("./attachment")} Attachement
 */

/**
 * @class
 * @param {string} name 
 * @param {number=} timestamp
 */
function Step(name, timestamp) {
    this.name = name;
    this.start = timestamp || Date.now();
    /** @type {Step[]} */
    this.steps = [];
    /** @type {Attachement[]} */
    this.attachments = [];
    /** @type {Step} */
    this.parent;
}

/**
 * 
 * @param {Step} step 
 */
Step.prototype.addStep = function (step) {
    this.steps.push(step);
};

/**
 * 
 * @param {Attachement} attachment 
 */
Step.prototype.addAttachment = function (attachment) {
    this.attachments.push(attachment);
};

/**
 * 
 * @param {TESTSTATUS} status
 * @param {number=} timestamp
 */
Step.prototype.end = function (status, timestamp) {
    this.status = status;
    this.stop = timestamp || Date.now();
};

Step.prototype.toXML = function () {
    /**
	 * @type {StepResultXML}
	 */
    var result = {
        '@': {
            start: this.start,
            status: this.status
        },
        name: this.name,
        title: this.name,
        attachments: {
            attachment: this.attachments.map(function (attachment) {
                return attachment.toXML();
            })
        },
        steps: {
            step: this.steps.map(function (step) {
                return step.toXML();
            })
        }
    };

    if(this.stop) {
        result['@'].stop = this.stop;
    }

    return result;
};

module.exports = Step;
