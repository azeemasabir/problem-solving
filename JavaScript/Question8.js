/*
Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.

The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).

The function composition of an empty list of functions is the identity function f(x) = x.

You may assume each function in the array accepts one integer as input and returns one integer as output.
*/
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
    
    return function(x) {
        return functions.reduceRight((acc,fn)=>fn(acc),x)
    }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */

//Explanation plus more detailed code
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
	if (functions.length === 0) {
    return function(x) { return x; };
  }

  return functions.reduceRight(function(prevFn, nextFn) {
    return function(x) {
      return nextFn(prevFn(x));
    };
  });

};


const fn = compose([x => x + 1, x => 2 * x]);
console.log(fn(4)); // 9