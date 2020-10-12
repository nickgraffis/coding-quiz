/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
let result = [];for (j = 0; j < nums.length; j++) { for (k = j; k < nums.length; k++) {  if (nums[k] + nums[j] == target) {   result.push(nums.indexOf(nums[k]));   result.push(nums.indexOf(nums[j]));  } }}return result;
};console.log(twoSum([2,7,11,15], 9));
