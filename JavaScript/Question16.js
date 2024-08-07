/*
Given an asynchronous function fn and a time t in milliseconds, return a new time limited version of the input function. fn takes arguments provided to the time limited function.

The time limited function should follow these rules:

If the fn completes within the time limit of t milliseconds, the time limited function should resolve with the result.
If the execution of the fn exceeds the time limit, the time limited function should reject with the string "Time Limit Exceeded".
 

Example 1:

Input: 
fn = async (n) => { 
  await new Promise(res => setTimeout(res, 100)); 
  return n * n; 
}
inputs = [5]
t = 50
Output: {"rejected":"Time Limit Exceeded","time":50}
Explanation:
const limited = timeLimit(fn, t)
const start = performance.now()
let result;
try {
   const res = await limited(...inputs)
   result = {"resolved": res, "time": Math.floor(performance.now() - start)};
} catch (err) {
   result = {"rejected": err, "time": Math.floor(performance.now() - start)};
}
console.log(result) // Output

The provided function is set to resolve after 100ms. However, the time limit is set to 50ms. It rejects at t=50ms because the time limit was reached.
*/

/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            // Create a timeout promise that rejects after t milliseconds
            const timer = setTimeout(() => {
                reject("Time Limit Exceeded");
            }, t);
            
            // Call the original async function
            fn(...args)
                .then((result) => {
                    clearTimeout(timer); // Clear the timeout if fn resolves in time
                    resolve(result);
                })
                .catch((error) => {
                    clearTimeout(timer); // Clear the timeout if fn rejects in time
                    reject(error);
                });
        });
    };
};

// Example usage
const limited = timeLimit(async (n) => { 
    await new Promise(res => setTimeout(res, 100)); 
    return n * n; 
}, 50);

const start = performance.now();

limited(5)
    .then(res => {
        console.log({"resolved": res, "time": Math.floor(performance.now() - start)});
    })
    .catch(err => {
        console.log({"rejected": err, "time": Math.floor(performance.now() - start)});
    });

/*
Explanation
Creating the Time-Limited Wrapper:

The timeLimit function takes fn and t as arguments and returns a new function.
The returned function accepts any number of arguments (...args) and returns a Promise.
Timeout Mechanism:

We set a timer using setTimeout that will reject the promise with "Time Limit Exceeded" after t milliseconds.
Original Function Execution:

The original function fn is called with the provided arguments.
If fn resolves before the timeout, we clear the timer and resolve the promise with the result.
If fn rejects before the timeout, we clear the timer and reject the promise with the error.
Handling the Promise Race:

By using Promise.race implicitly through the setup, whichever promise (the original function’s promise or the timeout promise) settles first determines the outcome.
Example Run
In the example provided:

fn is designed to take 100ms to resolve.
The time limit is set to 50ms.
The limited function will reject with "Time Limit Exceeded" because the function takes longer than the allowed time to complete.
This implementation ensures that any asynchronous function wrapped by timeLimit will be terminated if it exceeds the specified duration.
*/