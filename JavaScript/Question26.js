/*
Given a multi-dimensional array arr and a depth n, return a flattened version of that array.

A multi-dimensional array is a recursive data structure that contains integers or other multi-dimensional arrays.

A flattened array is a version of that array with some or all of the sub-arrays removed and replaced with the actual elements in that sub-array. This flattening operation should only be done if the current depth of nesting is less than n. The depth of the elements in the first array are considered to be 0.

Please solve it without the built-in Array.flat method.
*/

/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    function flattenHelper(array, currentDepth) {
        let result = [];
        for (const element of array) {
            if (Array.isArray(element) && currentDepth < n) {
                result.push(...flattenHelper(element, currentDepth + 1));
            } else {
                result.push(element);
            }
        }
        
        return result;
    }
    return flattenHelper(arr, 0);
};
//Detailed Explanation
// https://chatgpt.com/share/087e1b2b-97b4-46c6-b04d-4e8e9ae7f887