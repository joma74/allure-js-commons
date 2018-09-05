module.exports = {

    /**
	 * Indexing objects in TypeScript
	 * 
	 * @template O
	 * @param {O} obj 
	 * @param {string} key
	 * @return {key is keyof O}
	 */
    hasKey: function(obj, key) {
        return key in obj;
    }
};