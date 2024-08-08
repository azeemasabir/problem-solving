/*
Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.

The class has three public methods:

set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.

get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.

count(): returns the count of un-expired keys.

 

Example 1:

Input: 
actions = ["TimeLimitedCache", "set", "get", "count", "get"]
values = [[], [1, 42, 100], [1], [], [1]]
timeDelays = [0, 0, 50, 50, 150]
Output: [null, false, 42, 1, -1]
Explanation:
At t=0, the cache is constructed.
At t=0, a key-value pair (1: 42) is added with a time limit of 100ms. The value doesn't exist so false is returned.
At t=50, key=1 is requested and the value of 42 is returned.
At t=50, count() is called and there is one active key in the cache.
At t=100, key=1 expires.
At t=150, get(1) is called but -1 is returned because the cache is empty.
*/

var TimeLimitedCache = function() {
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const currentTime = Date.now();
    const expiresAt = currentTime + duration;

    if (this.cache.has(key)) {
        const existingItem = this.cache.get(key);
        if (existingItem.expiresAt > currentTime) {
            this.cache.set(key, { value, expiresAt });
            return true;
        }
           }
    this.cache.set(key, { value, expiresAt });
    return false;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
      const currentTime = Date.now();

    if (this.cache.has(key)) {
        const item = this.cache.get(key);
        if (item.expiresAt > currentTime) {
            return item.value;
        } else {
            // Key has expired
            this.cache.delete(key);
        }
    }

    return -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    const currentTime = Date.now();
    let count = 0;

    for (const [key, item] of this.cache) {
        if (item.expiresAt > currentTime) {
            count++;
        } else {
            this.cache.delete(key);
        }
    }

    return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
//DETAILED EXPLANATION
class TimeLimitedCache {
    constructor() {
        this.cache = new Map();
    }
/*
class TimeLimitedCache {: This defines a class named TimeLimitedCache which will encapsulate the functionality of the cache.
constructor(): The constructor method is called when a new instance of the class is created. It initializes the class's state.
this.cache = new Map();: Inside the constructor, we create a Map object to store our cache data. A Map allows us to store key-value pairs, where each key is unique. This Map will hold our cache items, including their values and expiration times.
*/

    /**
     * @param {number} key
     * @param {number} value
     * @param {number} duration time until expiration in ms
     * @return {boolean} if un-expired key already existed
     */
    set(key, value, duration) {
        const currentTime = Date.now();
        const expiresAt = currentTime + duration;
/*
set(key, value, duration): This is a method of the TimeLimitedCache class that allows us to set a key-value pair in the cache with an expiration time.
const currentTime = Date.now();: We get the current time in milliseconds since the Unix epoch using Date.now(). This will be used to determine the expiration time of the key.
const expiresAt = currentTime + duration;: The expiration time is calculated by adding the specified duration (in milliseconds) to the currentTime.
*/

if (this.cache.has(key)) {
    const existingItem = this.cache.get(key);
    if (existingItem.expiresAt > currentTime) {
        // Key exists and is unexpired
        this.cache.set(key, { value, expiresAt });
        return true;
    }
}
/*
if (this.cache.has(key)) {: This checks if the cache already contains the given key.
const existingItem = this.cache.get(key);: If the key exists, retrieve the associated value and expiration time from the cache.
if (existingItem.expiresAt > currentTime) {: Check if the existing key has not yet expired. expiresAt is the time when the key should expire. If the current time is less than expiresAt, the key is still valid.
this.cache.set(key, { value, expiresAt });: If the key is valid, update the cache with the new value and expiration time.
return true;: Return true because the key already existed and was unexpired.
*/

        // Add new key or overwrite expired key
        this.cache.set(key, { value, expiresAt });
        return false;
    }
/*
this.cache.set(key, { value, expiresAt });: If the key doesn't exist or has expired, this line adds the key to the cache or overwrites the expired entry with the new value and expiration time.
return false;: Return false because either the key didn't exist before or it was expired.
*/

    /**
     * @param {number} key
     * @return {number} value associated with key
     */
    get(key) {
        const currentTime = Date.now();
/*
get(key): This method retrieves the value associated with a given key if it exists and hasn't expired.
const currentTime = Date.now();: Get the current time in milliseconds, which will be used to check if the key has expired.
*/

if (this.cache.has(key)) {
    const item = this.cache.get(key);
    if (item.expiresAt > currentTime) {
        return item.value;
    } else {
        // Key has expired
        this.cache.delete(key);
    }
}
/*
if (this.cache.has(key)) {: Check if the cache contains the key.
const item = this.cache.get(key);: Retrieve the value and expiration time associated with the key.
if (item.expiresAt > currentTime) {: Check if the key has not expired. If it's still valid:
return item.value;: Return the associated value.
this.cache.delete(key);: If the key has expired, remove it from the cache.
*/

return -1;
}

//return -1;: If the key doesn't exist or has expired, return -1 to indicate that the value is not available.

    /**
     * @return {number} count of non-expired keys
     */
    count() {
        const currentTime = Date.now();
        let count = 0;
/*
count(): This method returns the number of keys in the cache that have not expired.
const currentTime = Date.now();: Get the current time in milliseconds to check the validity of keys.
let count = 0;: Initialize a counter to keep track of the number of valid keys.
*/

for (const [key, item] of this.cache) {
    if (item.expiresAt > currentTime) {
        count++;
    } else {
        // Clean up expired keys
        this.cache.delete(key);
    }
}
/*
for (const [key, item] of this.cache) {: Loop through each key-value pair in the cache.
if (item.expiresAt > currentTime) {: Check if the key is still valid. If it is:
count++;: Increment the counter for valid keys.
this.cache.delete(key);: If the key has expired, remove it from the cache to keep the cache clean.
*/

return count;
}
}
//return count;: After checking all keys, return the total count of valid (non-expired) keys