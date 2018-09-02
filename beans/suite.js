/**
 * @typedef {import ("./test")} Test
 * @typedef {import ("./step")} Step
 */

/**
 * @constructor
 * @this {Suite}
 * @param {string} name 
 * @param {number} [timestamp] 
 */
function Suite(name, timestamp) {
    this.name = name;
    this.start = timestamp || Date.now();
    /** @type {Test[]}} */
    this.testcases = [];
    /** @type {Test} */
    this.currentTest;
    /** @type {Test | Step} */
    this.currentStep;
}

/**
 * @this {Suite}
 * @param {number} timestamp 
 */
Suite.prototype.end = function(timestamp) {
    this.stop = timestamp || Date.now();
};

Suite.prototype.hasTests = function() {
    return this.testcases.length > 0;
};

/**
 * 
 * @param {Test} test 
 */
Suite.prototype.addTest = function(test) {
    this.testcases.push(test);
};

Suite.prototype.toXML = function() {
    var result = {
        '@': {
            'xmlns:ns2' : 'urn:model.allure.qatools.yandex.ru',
            start: this.start
        },
        name: this.name,
        title: this.name,
        'test-cases': {
            'test-case': this.testcases.map(function(testcase) {
                return testcase.toXML();
            })
        }
    };


    if(this.stop) {
        result['@'].stop = this.stop;
    }

    return result;
};

module.exports = Suite;
