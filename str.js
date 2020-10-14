/**
 * 有效的括号
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (!s || s.length % 2 == 1) {
    return false
  }
  let stack = [];
  for (let index = 0; index < s.length; index++) {
    const element = s[index];
    // 当前和栈的首位比较ASCII码差值 1 2为正确闭合
    const flag = stack.length > 0 && (element.charCodeAt() - stack[0].charCodeAt() == 1 || element.charCodeAt() - stack[0].charCodeAt() == 2);
    if (stack.length == 0) {
      // 添加
      stack.push(element);
    } else if (flag) {
      // 删除头部
      stack.shift(element);
    } else {
      // 头部插入
      stack.unshift(element);
    }
  }
  return stack.length === 0;
};
console.log(isValid("()"))
console.log(isValid("({})"))
console.log(isValid("(){}[]"))
console.log(isValid("(())"))
console.log(isValid("[({(())}[()])]"))
console.log(isValid("{[}]"))

/**
 * 外观整数序列(正则)
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  let prev = '1'
  for (let i = 1; i < n; i++) {
    // 反向引用 第一个匹配项 {0,}数量 
    prev = prev.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`)
  }
  return prev;
};
console.log(countAndSay(6))

/**
 * 外观整数序列(循环)
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  let prev = curr = "1";
  for (let index = 1; index < n; index++) {
    // 双指针
    let left = right = 0;
    // 将现在赋值给上一个
    prev = curr;
    curr = "";
    while (right < prev.length) {
      // 求出连续相等的index
      while (prev[left] == prev[right] && right < prev.length) {
        right++;
      }
      // 累加
      curr += `${right - left}${prev[left]}`;
      left = right;
    }
  }
  return curr;
}
console.log(countAndSay(6))

/**
 * 最后一个单词长度(正则)
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let arr = s.match(/\w+/g);
  return arr!=null&&arr.length>0 ? arr[arr.length-1].length : 0;
};
console.log(lengthOfLastWord("Hello World"))

/**
 * 最后一个单词长度
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let count = 0;
  for (let index = s.length - 1; index >= 0; index--) {
    if(s[index]!=" "){
      count++;
    } else {
      if(count>0){
        return count;
      }
    }
  }
  return count;
};
console.log(lengthOfLastWord("Hello World"))