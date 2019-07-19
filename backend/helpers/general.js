/**
 * Check to see if the passed in value is empty or not.
 * 
 * @param {string} str The string to test.
 * 
 * @return {boolean} True if empty otherwise false.
 */
export function isEmpty(str) {
    return !str || 0 === str.length;
}
