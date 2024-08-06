/*
Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds. It can resolve any value.

 

Example 1:

Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
*/

/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
  }
  
  /** 
   * let t = Date.now()
   * sleep(100).then(() => console.log(Date.now() - t)) // 100
   */

  /*
  Explanation:
sleep(millis) Function:

The function takes an integer millis as an argument, which represents the number of milliseconds to sleep.
It returns a Promise that resolves after the specified time.
The Promise constructor accepts a function as its argument, which receives a resolve function. The setTimeout function is called with resolve and millis as arguments, ensuring that the Promise resolves after the specified delay.
  */