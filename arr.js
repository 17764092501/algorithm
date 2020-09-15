/**
 * 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]} 从左到右两数之和的下标
 */
var twoSum = (nums, target) => {
  // 用来存储出现过的数字 key为数字 value为索引
  let map = {};
  // 通过倒序可以变成从右到左
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    const targetNum = target - element;
    const targetNumIndex = map[targetNum];
    if (targetNumIndex != undefined) {
      return [targetNumIndex, index];
    } else {
      map[element] = index;
    }
  }
}
console.log(twoSum([5, 5, 4, 7, 6, 4, 3, 2, 5], 10))

/**
 * 两数之和(推荐)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]} 从左到右两数之和的下标
 */
var twoSum = (nums, target, i = 0, mapObj = {}) => {
  let map = mapObj;
  if (map[target - nums[i]] != undefined) {
    return [map[target - nums[i]], i];
  } else {
    map[nums[i]] = i;
    i++;
    // 防止大于数组长度
    if (i >= nums.length) { return; }
    // 递归返回
    return twoSum(nums, target, i, map);
  }
}
console.log(twoSum([5, 5, 4, 7, 6, 4, 3, 2, 5], 10))

/**
 * 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]} 从右到左两数之和的下标
 */
var twoSum = function (nums, target) {
  let arr = nums.concat();
  let i = arr.length; // 动态变化
  while (i > 1) {
    let targetNum = arr.pop(); // 防止两个数相同 取得index不对
    let index = arr.lastIndexOf(target - targetNum);
    let indexArr = [index, --i];
    if (index > -1) {
      return indexArr
    }
  }
};
console.log(twoSum([5, 5, 4, 7, 6, 4, 3, 2, 5], 10))