/*
Given an array of asynchronous functions functions, return a new promise promise. Each function in the array accepts no arguments and returns a promise. All the promises should be executed in parallel.

promise resolves:

When all the promises returned from functions were resolved successfully in parallel. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions. The promise should resolve when all the asynchronous functions in the array have completed execution in parallel.
promise rejects:

When any of the promises returned from functions were rejected. promise should also reject with the reason of the first rejection.
Please solve it without using the built-in Promise.all function.

 

Example 1:

Input: functions = [
  () => new Promise(resolve => setTimeout(() => resolve(5), 200))
]
Output: {"t": 200, "resolved": [5]}
Explanation: 
promiseAll(functions).then(console.log); // [5]

The single function was resolved at 200ms with a value of 5.
*/

var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completedPromises = 0;

        functions.forEach((func, index) => {
            // Execute the function which returns a promise
            func().then(value => {
                // Store the resolved value in the results array at the correct index
                results[index] = value;
                completedPromises += 1;

                // If all promises have been resolved, resolve the outer promise
                if (completedPromises === functions.length) {
                    resolve(results);
                }
            }).catch(error => {
                // If any promise rejects, reject the outer promise with the reason
                reject(error);
            });
        });

        // If there are no functions in the array, resolve immediately with an empty array
        if (functions.length === 0) {
            resolve(results);
        }
    });
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
const functions = [
    () => new Promise(resolve => setTimeout(() => resolve(5), 200)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 100)),
    () => new Promise(resolve => setTimeout(() => resolve(15), 150))
  ];
  
  const promise = promiseAll(functions);
  promise.then(console.log).catch(console.error); // [5, 10, 15]

  //DETAILED EXPLANATION

  var promiseAll = function(functions) {
   // Line 1: We define a function named promiseAll and assign it to the variable promiseAll. This function takes a single parameter functions, which is an array of functions. Each function in this array, when called, returns a promise.
        return new Promise((resolve, reject) => {
  //  Line 2: We return a new Promise object. The Promise constructor takes a function as an argument, which itself takes two parameters: resolve and reject. These are callbacks that you call to either resolve or reject the promise.
   
            const results = [];
   // Line 3: We initialize an empty array results to store the resolved values of each promise. The index of each resolved value in this array will correspond to the index of the function in the functions array.
   
            let completedPromises = 0;
   // Line 4: We create a variable completedPromises and set it to 0. This variable will keep track of how many promises have successfully resolved.
    
            functions.forEach((func, index) => {
   // Line 5: We iterate over each function in the functions array using forEach. The forEach method provides two arguments: func, the current function being processed, and index, the index of that function in the functions array.
    
                func().then(value => {
   // Line 6: We call the current function func(), which returns a promise. We attach a .then method to handle the promise once it resolves. The then method takes a callback function as an argument, which receives the resolved value value of the promise.
    
                    results[index] = value;
   // Line 7: When the promise resolves, we store the resolved value value in the results array at the position index. This ensures that the resolved values are stored in the same order as the functions in the original functions array.
                    completedPromises += 1;
   // Line 8: We increment the completedPromises counter by 1 to indicate that one more promise has successfully resolved.
   
                    if (completedPromises === functions.length) {
                        resolve(results);
                    }
    //Lines 9-11: We check if the number of completed promises (completedPromises) is equal to the total number of functions (functions.length). If they are equal, it means all promises have resolved, so we call resolve(results) to resolve the main promise with the results array.
    
                }).catch(error => {
                    reject(error);
                });
  //  Lines 12-14: We attach a .catch method to handle the case where a promise rejects. If a promise rejects, we immediately call reject(error) to reject the main promise with the rejection reason (error). This means that the promiseAll function will reject as soon as any single promise in the array rejects.
    
            });
    
            if (functions.length === 0) {
                resolve(results);
            }
    /*Lines 15-19: We check if the functions array is empty. If it is empty, we immediately resolve the main promise with the empty results array. This handles the edge case where there are no functions to process.
    javascript*/
        });
    };
    /*Lines 20-21: We close the body of the promise and the promiseAll function.
    Summary
    This code creates a custom promiseAll function that behaves like Promise.all.
    It runs all promises in parallel and collects their results in an array.
    The promise returned by promiseAll resolves when all promises in the array resolve, and it rejects as soon as any one promise rejects.
    The result is an array of resolved values in the order of the original function array, or an immediate rejection if any promise fails.
    */