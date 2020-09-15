/**
 * 反转32位数字
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let result = 0;
  while (x !== 0) {
    // 余10余数乘10后叠加
    result = result * 10 + x % 10;
    // 数字除以10后的整数
    x = (x / 10) | 0;
  }
  return (result | 0) === result ? result : 0;
};
console.log(reverse(123123123))

/**
 * 判断回文数(反转后全等) 不可转字符串
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x >= Math.pow(2, 53)) { return false; } // js 精度问题
  if (x < 0) { return false; } // 负数为false
  if (x < 10) { return true; } // 大于0小于10的数为true
  if (x % 10 === 0) { return false; } // 大于10余10为0的数为false
  let lastNum = Math.floor(Math.log10(x));
  let firstNum = 0;
  while (firstNum <= lastNum) {
    // 比较最后一位是否不等于第一位
    let first = parseInt(x / Math.pow(10,lastNum)) % 10;
    let last = parseInt(x / Math.pow(10,firstNum)) % 10;
    if(first != last){
      return false;
    }
    firstNum++;
    lastNum--;
  }
  return true;
};
console.log(isPalindrome(123321123321))