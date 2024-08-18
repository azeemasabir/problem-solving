/*Given two arrays arr1 and arr2, return a new array joinedArray. All the objects in each of the two inputs arrays will contain an id field that has an integer value. 

joinedArray is an array formed by merging arr1 and arr2 based on their id key. The length of joinedArray should be the length of unique values of id. The returned array should be sorted in ascending order based on the id key.

If a given id exists in one array but not the other, the single object with that id should be included in the result array without modification.

If two objects share an id, their properties should be merged into a single object:

If a key only exists in one object, that single key-value pair should be included in the object.
If a key is included in both objects, the value in the object from arr2 should override the value from arr1.
 

Example 1:

Input: 
arr1 = [
    {"id": 1, "x": 1},
    {"id": 2, "x": 9}
], 
arr2 = [
    {"id": 3, "x": 5}
]
Output: 
[
    {"id": 1, "x": 1},
    {"id": 2, "x": 9},
    {"id": 3, "x": 5}
]
Explanation: There are no duplicate ids so arr1 is simply concatenated with arr2.
*/

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    const map = new Map();
    for(const obj of arr1){
        map.set(obj.id,{...obj});
    }
    for(const obj of arr2){
        if(map.has(obj.id)){
            const mergedObj = { ...map.get(obj.id), ...obj };
            map.set(obj.id, mergedObj);
        }
        else{
             map.set(obj.id,{...obj});
        }
    }
    const joinedArray = Array.from(map.values()).sort((a, b) => a.id - b.id);
    
    return joinedArray;
};

//DETAILED EXPLANATION
var join = function(arr1, arr2) {
    // Create a Map to store the objects by their id
    const map = new Map();
var join = function(arr1, arr2) {
//This defines a function named join that takes two parameters: arr1 and arr2. Both arr1 and arr2 are arrays of objects that need to be merged based on the id field.

const map = new Map();
//A Map object is created. Map is a data structure that stores key-value pairs. Here, the key will be the id from each object, and the value will be the corresponding object. Map automatically ensures that each key is unique, which helps us manage the merging of objects.

    // Add objects from arr1 to the map
    for (const obj of arr1) {
        map.set(obj.id, { ...obj });
    }
for (const obj of arr1) {
//This is a loop that iterates over each object in arr1. The for...of syntax iterates over iterable objects (like arrays), and in each iteration, obj represents the current object in arr1.

map.set(obj.id, { ...obj });
/*This line adds the current object to the map. The set() method adds or updates a key-value pair in the map. The key is obj.id, and the value is { ...obj }.
The { ...obj } is a new object that is a shallow copy of obj. This ensures that we are not mutating the original object in arr1.
*/
    // Add objects from arr2 to the map, merging if necessary
    for (const obj of arr2) {
        if (map.has(obj.id)) {
            // Merge properties with arr2 values overriding arr1's if the same key exists
            const mergedObj = { ...map.get(obj.id), ...obj };
            map.set(obj.id, mergedObj);
        } else {
            // Just add the new object
            map.set(obj.id, { ...obj });
        }
    }
for (const obj of arr2) {
//Similar to the previous loop, this loop iterates over each object in arr2.

if (map.has(obj.id)) {
//This checks if the map already contains an object with the same id as the current obj.id from arr2. The has() method checks whether a key exists in the map.

const mergedObj = { ...map.get(obj.id), ...obj };
//If an object with the same id exists, we merge the two objects.

/*map.get(obj.id) retrieves the object from the map that corresponds to the current id.
{ ...map.get(obj.id), ...obj } merges the properties of the existing object (from arr1) with the properties of the current object from arr2. The spread operator (...) copies all key-value pairs into the new mergedObj. If both objects have the same key, the value from arr2 (the second spread operation) will override the value from arr1.
map.set(obj.id, mergedObj);:
The merged object is then updated in the map for that id.

else { map.set(obj.id, { ...obj }); }:
If no object with the same id exists in the map, this block runs. It simply adds the current object from arr2 to the map. Again, { ...obj } creates a shallow copy of the object to avoid mutating the original.

*/
    // Convert the map values to an array and sort by id
    const joinedArray = Array.from(map.values()).sort((a, b) => a.id - b.id);
    
    return joinedArray;
};
const joinedArray = Array.from(map.values())
//The Array.from() method converts an iterable (in this case, the values of the map) into an array. map.values() returns an iterable containing all the values (objects) stored in the map.

.sort((a, b) => a.id - b.id)
//The sort() method sorts the array in place. The comparison function (a, b) => a.id - b.id compares the id properties of two objects. If a.id is smaller than b.id, the objects remain in the same order; if a.id is larger, they are swapped. This ensures that the final array is sorted by the id in ascending order.

return joinedArray;
//The sorted joinedArray is returned as the final output of the function. This array contains the merged objects, with all unique ids, sorted by id.
}
}
}
}