/*
Given two promises promise1 and promise2, return a new promise. promise1 and promise2 will both resolve with a number. The returned promise should resolve with the sum of the two numbers.
 

Example 1:

Input: 
promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)), 
promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
Output: 7
Explanation: The two input promises resolve with the values of 2 and 5 respectively. The returned promise should resolve with a value of 2 + 5 = 7. The time the returned promise resolves is not judged for this problem.
*/

/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function(promise1, promise2) {
    const value1 = await promise1;
    const value2 = await promise2;
    return value1+value2;
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */

/*
Explanation
Function Definition: addTwoPromises is an asynchronous function that takes two promises (promise1 and promise2) as parameters.

Awaiting Resolved Values:

We use the await keyword to wait for promise1 and promise2 to resolve. The values they resolve with are stored in value1 and value2 respectively.
Summing the Values:

Once both promises are resolved, the function returns the sum of value1 and value2. Since addTwoPromises is an async function, it implicitly returns a promise that resolves with this sum.
*/