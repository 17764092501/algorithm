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
 * 递归两数之和(推荐)
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

/**
 * 最长公共长度
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  // 取最长可避免字符串长度为0或1取不到长度
  let longestLen = strs.reduce(function (a, b) {
    return a.length > b.length ? a.length : b.length
  }, "");
  let str = "";
  for (let index = 0; index < longestLen; index++) {
    // 取出同位的字符
    let arr = strs.map(ele => ele[index]);
    // 比较第一个是否和其他全都
    if (!arr.every(ele => ele === arr[0])) {
      break;
    }
    str += arr[0];
  }
  return str;
};
console.log(longestCommonPrefix(["flower", "flow", "flight111"]));

/**
 * 获取随机不重复数组
 * @param {Array} [arr = []] 源数组
 * @param {Number} [len = 0] 数组长度
 * @param {Number} [startRangeNum = 0] 起始范围
 * @param {Number} [endRangeNum = 0] 结束范围
 * @return {Array} 返回新数组
 */
var getRandomArr = function (arr = [], len = 0, startRangeNum = 0, endRangeNum = 0) {
  let array = [].concat.apply([], arr); // 数组
  let obj = {}; // hash 储存出现数字
  // 迭代函数
  let pushFn = function () {
    if (array.length < len) {
      let num = parseInt(Math.random() * (endRangeNum - startRangeNum) + startRangeNum);
      if (!obj[num]) {
        array.push(num);
      }
      return pushFn();
    } else {
      return array;
    }
  }
  return pushFn();
}
console.log(getRandomArr([1, 2, 3, 4, 5], 10, 1, 10));

/**
 * 合并有序链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode} 
 */
var ListNode = function (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  } else if (l2 === null) {
    return l1;
  } else if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
console.log(mergeTwoLists(new ListNode(1,new ListNode(2,null)),new ListNode(2,new ListNode(3,null))))

/**
 * 原地算法去重(用输出覆盖输入)
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums, j = 0) {
  nums.forEach((_,i) => {
    // i为快指针(跳过重复项) j为慢指针(数组length)
    if(i !== 0 && nums[i] !== nums[j]){
      j++;
      nums[j] = nums[i];
    }
  });
  return j + 1;
};
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))