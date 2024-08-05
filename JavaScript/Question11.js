/*
Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

You can assume there are 3 possible input functions: sum, fib, and factorial.

sum accepts two integers a and b and returns a + b. Assume that if a value has already been cached for the arguments (b, a) where a != b, it cannot be used for the arguments (a, b). For example, if the arguments are (3, 2) and (2, 3), two separate calls should be made.
fib accepts a single integer n and returns 1 if n <= 1 or fib(n - 1) + fib(n - 2) otherwise.
factorial accepts a single integer n and returns 1 if n <= 1 or factorial(n - 1) * n otherwise.
*/

function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

/**
 * Example Usage:
 * 
 * let callCount = 0;
 * const memoizedSum = memoize(function (a, b) {
 *     callCount += 1;
 *     return a + b;
 * });
 * console.log(memoizedSum(2, 3)); // 5
 * console.log(memoizedSum(2, 3)); // 5
 * console.log(callCount); // 1
 * 
 * let fibCallCount = 0;
 * const memoizedFib = memoize(function (n) {
 *     fibCallCount += 1;
 *     if (n <= 1) return 1;
 *     return memoizedFib(n - 1) + memoizedFib(n - 2);
 * });
 * console.log(memoizedFib(5)); // 8
 * console.log(fibCallCount); // Should be less than the number of recursive calls without memoization
 * 
 * let factorialCallCount = 0;
 * const memoizedFactorial = memoize(function (n) {
 *     factorialCallCount += 1;
 *     if (n <= 1) return 1;
 *     return n * memoizedFactorial(n - 1);
 * });
 * console.log(memoizedFactorial(5)); // 120
 * console.log(factorialCallCount); // Should be less than the number of recursive calls without memoization
 */
/*
Explanation
cache: An object used to store the results of function calls. The keys are string representations of the arguments, and the values are the results.

key = JSON.stringify(args): This converts the array of arguments into a string, which can be used as a unique key in the cache object. Using JSON.stringify ensures that different argument structures are treated differently.

Checking the cache: Before computing the result, the function checks if the result for the given arguments is already cached. If yes, it returns the cached value.

Storing the result: If the result isn't cached, the function computes the result, stores it in the cache, and then returns it.
*/