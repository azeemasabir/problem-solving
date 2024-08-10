/*
Given an array arr and a chunk size size, return a chunked array.

A chunked array contains the original elements in arr, but consists of subarrays each of length size. The length of the last subarray may be less than size if arr.length is not evenly divisible by size.

You may assume the array is the output of JSON.parse. In other words, it is valid JSON.

Please solve it without using lodash's _.chunk function.

 

Example 1:

Input: arr = [1,2,3,4,5], size = 1
Output: [[1],[2],[3],[4],[5]]
Explanation: The arr has been split into subarrays each with 1 element.
*/

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function(arr, size) {
    const chunkedArray = [];
    for(i=0;i<arr.length;i+=size){
        chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
};
/*
Example Input
Let's use arr = [1, 2, 3, 4, 5] and size = 2 as an example.

Initial Setup
arr = [1, 2, 3, 4, 5]
size = 2
result = [] (an empty array that will store the chunks)
Iteration 1 (i = 0)
Condition Check: i = 0, which is less than arr.length = 5. So, we enter the loop.
Slice Operation: arr.slice(0, 0 + 2) gives us [1, 2].
arr.slice(0, 2) means we take elements from index 0 up to, but not including, index 2.
Update result: We push [1, 2] into result.
result becomes [[1, 2]].
Update i: Increment i by size, so i is now 2.
Iteration 2 (i = 2)
Condition Check: i = 2, which is still less than arr.length = 5. We continue the loop.
Slice Operation: arr.slice(2, 2 + 2) gives us [3, 4].
arr.slice(2, 4) means we take elements from index 2 up to, but not including, index 4.
Update result: We push [3, 4] into result.
result becomes [[1, 2], [3, 4]].
Update i: Increment i by size, so i is now 4.
Iteration 3 (i = 4)
Condition Check: i = 4, which is still less than arr.length = 5. We continue the loop.
Slice Operation: arr.slice(4, 4 + 2) gives us [5].
arr.slice(4, 6) means we take elements from index 4 up to, but not including, index 6. Since arr only has one element left (5), it returns [5].
Update result: We push [5] into result.
result becomes [[1, 2], [3, 4], [5]].
Update i: Increment i by size, so i is now 6.
End of Loop
Now i = 6, which is not less than arr.length = 5. Therefore, the loop ends.
Final Output
The function returns result, which is [[1, 2], [3, 4], [5]].
Summary of Iterations:
Iteration 1: result = [[1, 2]]
Iteration 2: result = [[1, 2], [3, 4]]
Iteration 3: result = [[1, 2], [3, 4], [5]]
Each iteration slices the array into a subarray of length size and appends it to result. The loop continues until all elements of arr have been processed.
*/