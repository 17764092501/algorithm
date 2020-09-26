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
// console.log(isValid("()"))
// console.log(isValid("({})"))
// console.log(isValid("(){}[]"))
// console.log(isValid("(())"))
// console.log(isValid("[({(())}[()])]"))
// console.log(isValid("{[}]"))