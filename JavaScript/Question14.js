/*
Given a function fn, an array of arguments args, and a timeout t in milliseconds, return a cancel function cancelFn.

After a delay of cancelTimeMs, the returned cancel function cancelFn will be invoked.

setTimeout(cancelFn, cancelTimeMs)
Initially, the execution of the function fn should be delayed by t milliseconds.

If, before the delay of t milliseconds, the function cancelFn is invoked, it should cancel the delayed execution of fn. Otherwise, if cancelFn is not invoked within the specified delay t, fn should be executed with the provided args as arguments.

 

Example 1:

Input: fn = (x) => x * 5, args = [2], t = 20
Output: [{"time": 20, "returned": 10}]
Explanation: 
const cancelTimeMs = 50;
const cancelFn = cancellable((x) => x * 5, [2], 20);
setTimeout(cancelFn, cancelTimeMs);

The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened after the execution of fn(2) at 20ms.
*/

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    // Create a variable to hold the timeout ID
    let timeoutId;
  
    // Schedule the function to be executed after `t` milliseconds
    timeoutId = setTimeout(() => {
      fn(...args);
    }, t);
  
    // Return the cancel function
    return function cancelFn() {
      // If the cancel function is called, clear the timeout
      clearTimeout(timeoutId);
    };
  };
  
  /**
   * Example usage:
   * const result = [];
   * const fn = (x) => x * 5;
   * const args = [2], t = 20, cancelTimeMs = 50;
   * const start = performance.now();
   *
   * const log = (...argsArr) => {
   *   const diff = Math.floor(performance.now() - start);
   *   result.push({"time": diff, "returned": fn(...argsArr)});
   * }
   * 
   * const cancel = cancellable(log, args, t);
   * 
   * const maxT = Math.max(t, cancelTimeMs);
   * setTimeout(cancel, cancelTimeMs);
   * 
   * setTimeout(() => {
   *   console.log(result); // [{"time":20,"returned":10}]
   * }, maxT + 15);
   */

  
  /*
  Explanation:
cancellable Function:

Parameters:
fn: The function to be executed after the delay.
args: An array of arguments to be passed to fn when it is called.
t: The delay in milliseconds before executing fn.
Logic:
A timeout is scheduled using setTimeout, which will execute fn(...args) after t milliseconds.
The timeoutId is stored to allow for the timeout to be cleared later.
A cancelFn function is returned, which, when called, cancels the execution of fn by clearing the timeout using clearTimeout(timeoutId).
Example Usage:

The fn function (x) => x * 5 multiplies the input by 5.
The log function is a wrapper that logs the time elapsed and the result of fn.
The cancellable function returns a cancelFn that can be used to cancel the execution of log.
In the example, setTimeout(cancel, cancelTimeMs); schedules the cancel function to be called after 50 milliseconds.
If the cancelFn is called before the 20 milliseconds delay, log won't be executed. Otherwise, log will run and record the output in the result array.
  */

/*
Intuition
The following problem and the next one **" Interval Cancellation " ** represent an important concept in JavaScript . It's gonna be a long but full through explanation so sit tight 😆😆😆

Motive : Return a function after a specifc time only if you didn't call other function , if we called the other function then the first function shouldn't be called at all !!
Pre - Requistes :
Familarity with callback functions
Rest parameter
clearTimeout and setTimeout methods
If you know those , Congrats 🎉 ! You can further continue reading , if not then please go back and understand those pretty well .

A QUESTION YOU MIGHT BE ASKING : WHY DO I NEED TO USE clearTimeout and setTimeout ?
In Javascript controlling the flow and exceution of tasks , is quite crucial. The following 2 questions (Execute Cancellable function with delay) and (Interval Cnacellation) , posses a really really important concept , sit tight and read well 😊 !

By using such methods , we can easily control timing and execution of a code , we can either delay or cancel them .

OKAY I SEE THEY'RE IMPORTANT , BUT WHERE MIGHT I USE THEM ?🤔
They're heavily used in scenarios such as :

Animation
Event Handling
Scheduling
Async Proggramming
OTHER QUESTION YOU MIGHT BE ASKING :
HUM .... I THOUGHT I UNDERSTOOD THEM TURNS OUT I ONLY KNOW THE SYNTAX

That is alright , I will explain them fully don't worry !
Let's start with the setTimeout Method :

The function takes two parameters: a callback function and a delay value in milliseconds. The callback function represents the code we want to execute after the delay.
When we call setTimeout, it registers the callback function and starts a timer. After the specified delay, the JavaScript engine adds the callback function to the event queue.
In case you don't know what an event Queue is , the event queue is a data structure that holds tasks to be processed by the JavaScript runtime. When the call stack is empty (all synchronous code has finished executing), the runtime picks the next task from the event queue and executes it.
By using setTimeout, we introduce an asynchronous behavior in our code. This means that while the delay is counting down, the JavaScript engine can continue executing other code without waiting for the setTimeout callback to be invoked AND THIS IS REALLY IMPORTANT .
BUT WHY DID WE USE CLEARTIMEOUT ?
Well , we need clearTimeout to cancel the scheduled execution before the delay expires.
We already know that setTimeout returns a unique identifier called a timeout ID , right ????

Well , clearTimeout is another built-in function that cancels a timeout previously set with setTimeout. By passing the timeout ID to clearTimeout, we prevent the execution of the callback function and stop the timer .

Still not convinced ? Let's ask ourselves what would happen if we didn't use clearTimeout in our code ?!!
Using clearTimeout in conjunction with setTimeout provides us with the ability to control the execution of a scheduled function. When we set a timeout using setTimeout, the function inside it will run after the specified delay. However, by using clearTimeout, we can cancel the scheduled function before it runs which is what we want here .

In simpler terms, clearTimeout allows you to say, "Hey, hold on! Don't run that function yet!" It gives you the ability to pause or cancel the scheduled execution, providing a smoother and more responsive user experience in situations where dynamic control is required.

CONCLUSION :
Without clearTimeout, you wouldn't have the option to stop or cancel the execution of a scheduled function. It would always run regardless of any subsequent logic or conditions. By using clearTimeout, you have the power to manage and adjust the timing of your code, ensuring it behaves exactly as you need it to.

Approach
The code defines a function named "cancellable" that takes three parameters: "fn" (a function), "args" (an array of arguments), and "t" (a time delay in milliseconds).
Inside the "cancellable" function, a nested function named "cancelFn" is defined. This function is responsible for canceling the execution of the scheduled function.
The "cancelFn" function calls clearTimeout with the timer identifier to cancel the scheduled function execution.
The setTimeout function is used to schedule the execution of a function, which is passed as the first parameter, after the specified time delay (t).
The setTimeout function returns a timer identifier, which is stored in the "timer" variable.
The scheduled function (fn) is executed using the spread operator (...args) to pass the arguments array to the function.
Finally, the "cancelFn" function is returned from the "cancellable" function, allowing you to call it later to cancel the scheduled function if needed.
A beginner Level Question you might be asking : why did you define cancelFn t the top ?
Well , The purpose of defining the "cancelFn" function at the top is to ensure that it is accessible within the scope of the "cancellable" function. This allows us to return the "cancelFn" function as part of the function's result, making it available for later use outside of the "cancellable" function. It's always a good practice to define functions at the top

FINAL CONCLUSION :
The concept of using clearTimeout and setTimeout provides a powerful mechanism for scheduling and canceling the execution of functions in JavaScript. By utilizing clearTimeout, you can prevent the scheduled function from running when it is no longer needed, allowing for more control and flexibility in managing asynchronous tasks. This concept is especially useful in scenarios where you want to delay the execution of code or schedule tasks to be performed in the future. Understanding and utilizing clearTimeout and setTimeout effectively can greatly enhance the efficiency and responsiveness of your JavaScript programs.

NOW THAT'S IT HOPE YOU ENJOYED MY EXPLANATION , CHECK OUT THE OTHER SOLUTION FOR THE NEXT PROBLEM (Interval Cnacellation) they're both similar problems with slight difference tho 🤔😊

Code
/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
const cancellable = function(fn, args, t) {
    // cancelFn function//
    const cancelFn = function (){
      clearTimeout(timer);
  };
  const timer = setTimeout(()=>{
      fn(...args)
  }, t);
  return cancelFn ;
};


/**
 *  const result = []
 *
 *  const fn = (x) => x * 5
 *  const args = [2], t = 20, cancelT = 50
 *
 *  const log = (...argsArr) => {
 *      result.push(fn(...argsArr))
 *  }
 *       
 *  const cancel = cancellable(fn, args, t);
 *           
 *  setTimeout(() => {
 *     cancel()
 *     console.log(result) // [{"time":20,"returned":10}]
 *  }, cancelT)
 
*/