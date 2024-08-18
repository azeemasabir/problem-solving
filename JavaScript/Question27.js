/*
Given an object or array obj, return a compact object.

A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.

You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.

 

Example 1:

Input: obj = [null, 0, false, 1]
Output: [1]
Explanation: All falsy values have been removed from the array.
*/

/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    if (Array.isArray(obj)) {
    return obj.map(compactObject).filter(Boolean);
    } else if (typeof obj === 'object' && obj !== null) {
        const result = {};
        for (const key in obj) {
            const value = compactObject(obj[key]);
            if (Boolean(value)) { 
                 result[key] = value;
            }
        }
        return result;
    }
    return obj;
};

//DETAILED EXPLANATION
// https://chatgpt.com/share/af54a54a-59f7-4449-9434-1c4794cdc613