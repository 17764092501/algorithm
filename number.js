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
    let first = parseInt(x / Math.pow(10, lastNum)) % 10;
    let last = parseInt(x / Math.pow(10, firstNum)) % 10;
    if (first != last) {
      return false;
    }
    firstNum++;
    lastNum--;
  }
  return true;
};
console.log(isPalindrome(123321123321))

/**
 * 罗马数字转阿拉伯数字
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  // 对应规则
  let hashNum = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }
  let result = 0;
  for (let index = 0; index < s.length; index++) {
    const num = hashNum[s[index]];
    const nextNum = hashNum[s[index + 1]];
    if (!num) {
      return "输入字符串不合规";
    }
    // 下一个数大于当前数 result减去当前数
    if (nextNum > num) {
      result -= num;
    } else {
      result += num;
    }
  }
  return result
};
console.log(romanToInt("IV")) // 4
console.log(romanToInt("LVIII")) // 50 5 3
console.log(romanToInt("MCMXCIV")) // 1000 900 9 4
console.log(romanToInt("CMXCIX")) // 900 99 9
console.log(romanToInt("MDCCCLXXXIV")) // 1000 500 300 50 30 4

/**
 * 二进制求和(进制转换)
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  return (BigInt("0b" + a) + BigInt("0b" + b)).toString(2);
};
console.log(addBinary("1010", "1011"))

/**
 * 二进制求和(遍历)
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  // 求出循环length 字符串补0
  let lenDiff = a.length - b.length;
  if (lenDiff > 0) {
    len = a.length;
    b = Array(Math.abs(lenDiff)).fill("0").join("") + b;
  } else if (lenDiff < 0) {
    len = b.length;
    a = Array(Math.abs(lenDiff)).fill("0").join("") + a;
  } else {
    len = a.length;
  }
  let get = function (index = 0, str = "", count = 0) {
    if (index > len - 1) {
      if (count > 0) {
        str = count + str;
      }
      return str;
    }
    let num = Number(a[len - index - 1] || 0) + Number(b[len - index - 1] || 0);
    let sum = num + count;
    // 逢2进1
    if (sum >= 2) {
      if (sum == 2) {
        str = "0" + str;
      } else {
        str = "1" + str;
      }
      count = 1;
    } else {
      str = String(sum) + str;
      count = 0;
    }
    index++;
    return get(index, str, count);
  }
  return get(0, "", 0);
}
console.log(addBinary("1", "111"))
console.log(addBinary("0", "0"))
console.log(addBinary("11", "11"))

/**
 * 整数平方根(二分法)
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x < 2) {
    return x;
  }
  let left = 1,
    right = Math.ceil(x / 2);
  // 直到左右相邻
  while (left + 1 < right) {
    let mid = Math.ceil((left + right) / 2);
    // 左右边界赋值
    if (mid * mid > x) {
      right = mid;
    } else if (mid * mid < x) {
      left = mid;
    } else {
      return mid;
    }
  }
  return right * right > x ? left : right;
};
console.log(mySqrt(4))
console.log(mySqrt(7))
console.log(mySqrt(9))
console.log(mySqrt(12))
console.log(mySqrt(16))
console.log(mySqrt(25))

/**
 * 爬楼梯(1,2两个阶梯)(动态规划)
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 1) return n;
  // f(n) = f(n-1) + f(n-2)
  // 上个 上上个
  let prev1 = prev2 = 0,
    result = 1;
  for (let index = 0; index < n; index++) {
    prev2 = prev1;
    prev1 = result;
    result = prev2 + prev1;
  }
  return result;
};
// 楼 方案
// 0 0
// 1 1
// 2 2
// 3 3
// 4 5
// 5 8
// 6 13
// 7 21
console.log(climbStairs(4))
console.log(climbStairs(5))
console.log(climbStairs(6))
console.log(climbStairs(7))

/**
 * 爬楼梯(1,2两个阶梯,不能连续跳两层 == 1,3两个阶梯)(动态规划)
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 3) return n;
  // f(n) = f(n-1) + f(n-3)
  // 上个 上上个 上上上个
  let prev1 = prev2 = prev3 = 0,
    result = 1;
  for (let index = 0; index < n; index++) {
    prev3 = prev2;
    prev2 = prev1;
    prev1 = result;
    if (index >= 3) {
      result = prev3 + prev1;
    } else {
      result = prev2 + prev1;
    }
  }
  return result;
};
// 楼 方案 
// 0  0
// 1  1
// 2  2
// 3  3
// 4  4
// 5  6
// 6  9
// 7  13
console.log(climbStairs(4))
console.log(climbStairs(5))
console.log(climbStairs(6))
console.log(climbStairs(7))