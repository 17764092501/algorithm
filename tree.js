// N叉树 下方是个三叉树 
/* 
         R
      /  |  \
     A   B   C
   /   \     |
  D     E    F
           / | \
          G  H  I
*/
// 一种表示方法(数据源,子结点数组) 双亲表示法
class NTreeNode1 {
  constructor(value, ...args) {
    // 子结点数组
    this.childrens = args
    // 数据
    this.value = value
  }

  // 赋值
  setValue(value) {
    this.value = value
  }

  // 从左到右插入结点
  pushTreeNode(treeNode, number) {
    if (number == null) {
      this.childrens.push(treeNode)
    } else {
      this.childrens[number] = treeNode
    }
  }

  // 从右到左插入结点
  unshiftTreeNode(treeNode, number) {
    if (number == null) {
      this.childrens.unshift(treeNode)
    } else {
      this.childrens[number] = treeNode
    }
  }

  // 清除结点
  clear() {
    this.childrens = []
    this.value = null
  }
}

treeR = new NTreeNode1("R")
treeA = new NTreeNode1("A")
treeB = new NTreeNode1("B")
treeC = new NTreeNode1("C")
treeD = new NTreeNode1("D")
treeE = new NTreeNode1("E")
treeF = new NTreeNode1("F")
treeG = new NTreeNode1("G")
treeH = new NTreeNode1("H")
treeI = new NTreeNode1("I")

treeR.pushTreeNode(treeA)
treeR.pushTreeNode(treeB)
treeR.pushTreeNode(treeC)
treeA.pushTreeNode(treeD)
treeA.pushTreeNode(treeE)
treeC.pushTreeNode(treeF)
treeF.pushTreeNode(treeG)
treeF.pushTreeNode(treeH)
treeF.pushTreeNode(treeI)

/* 
{
  "childrens": [{
    "childrens": [{
      "childrens": [],
      "value": "D"
    }, {
      "childrens": [],
      "value": "E"
    }],
    "value": "A"
  }, {
    "childrens": [],
    "value": "B"
  }, {
    "childrens": [{
      "childrens": [{
        "childrens": [],
        "value": "G"
      }, {
        "childrens": [],
        "value": "H"
      }, {
        "childrens": [],
        "value": "I"
      }],
      "value": "F"
    }],
    "value": "C"
  }],
  "value": "R"
}
*/
console.log(JSON.stringify(treeR))
/* 
         R
      /  |  \
     A   B   C
   /   \     |
  D     E    F
           / | \
          G  H  I
*/
// N叉树(第一种表示)树转换为双亲数组
function parentsArrayStorage1(tree, array = [], index = -1) {
  let arrayIndex = []
  if (array.length == 0) {
    array.push([tree.value, index])
    index++
  }
  tree.childrens.forEach(ele => {
    array.push([ele.value, index])
    arrayIndex.push(array.length - 1)
  })
  tree.childrens.forEach((ele, index) => {
    parentsArrayStorage1(ele, array, arrayIndex[index])
  })
  return array
}
/* 
[
  [ 'R', -1 ], [ 'A', 0 ],
  [ 'B', 0 ],  [ 'C', 0 ],
  [ 'D', 1 ],  [ 'E', 1 ],
  [ 'F', 3 ],  [ 'G', 6 ],
  [ 'H', 6 ],  [ 'I', 6 ]
]
*/
console.log(parentsArrayStorage1(treeR))
// 双亲数组转换为N叉树(第一种表示)
function createN1Tree(array) {
  let treeArray = array.map(ele => new NTreeNode1(ele[0]))
  for (let index = array.length - 1; index >= 0; index--) {
    const element = array[index]
    if (element[1] != -1) {
      treeArray[element[1]].unshiftTreeNode(treeArray[index])
      treeArray.pop()
    }
  }
  return treeArray[0]
}
/* 
{
  "childrens": [{
    "childrens": [{
      "childrens": [],
      "value": "D"
    }, {
      "childrens": [],
      "value": "E"
    }],
    "value": "A"
  }, {
    "childrens": [],
    "value": "B"
  }, {
    "childrens": [{
      "childrens": [{
        "childrens": [],
        "value": "G"
      }, {
        "childrens": [],
        "value": "H"
      }, {
        "childrens": [],
        "value": "I"
      }],
      "value": "F"
    }],
    "value": "C"
  }],
  "value": "R"
}
*/
console.log(JSON.stringify(createN1Tree(parentsArrayStorage1(treeR))))

/* 
         R
      /  |  \
     A   B   C
   /   \     |
  D     E    F
           / | \
          G  H  I
*/
// 另一种表示方法(孩子结点,数据源,兄弟结点) 孩子兄弟表示法
class NTreeNode2 {
  constructor(value, childNode, brotherNode) {
    // 子结点
    this.childNode = childNode || null
    // 兄弟结点
    this.brotherNode = brotherNode || null
    // 数据
    this.value = value
  }

  // 赋值
  setValue(value) {
    this.value = value
  }

  // 设置兄弟结点
  setBrotherNode(treeNode) {
    this.brotherNode = treeNode
  }

  // 设置孩子结点
  setChildNode(treeNode) {
    this.childNode = treeNode
  }

  // 清除结点
  clear() {
    this.childNode = null
    this.brotherNode = null
    this.value = null
  }
}

treeR = new NTreeNode2("R")
treeA = new NTreeNode2("A")
treeB = new NTreeNode2("B")
treeC = new NTreeNode2("C")
treeD = new NTreeNode2("D")
treeE = new NTreeNode2("E")
treeF = new NTreeNode2("F")
treeG = new NTreeNode2("G")
treeH = new NTreeNode2("H")
treeI = new NTreeNode2("I")

treeR.setChildNode(treeA)
treeA.setBrotherNode(treeB)
treeB.setBrotherNode(treeC)
treeA.setChildNode(treeD)
treeD.setBrotherNode(treeE)
treeC.setChildNode(treeF)
treeF.setChildNode(treeG)
treeG.setBrotherNode(treeH)
treeH.setBrotherNode(treeI)
/* 
         R
      /  |  \
     A   B   C
   /   \     |
  D     E    F
           / | \
          G  H  I
*/
console.log(JSON.stringify(treeR))

// N叉树(第二种表示)树转换为双亲数组
function parentsArrayStorage2(tree, array = [], index = -1) {
  let tempTree = tree
  if (index == -1) {
    array.push([tree.value, index])
  }
  let len = array.length
  let lensubtract1 = array.length - 1
  let lenAdd1 = array.length + 1
  if (tempTree.brotherNode) {
    while (tempTree.brotherNode) {
      array.push([tempTree.brotherNode.value, index])
      tempTree = tempTree.brotherNode
      if (!tempTree.brotherNode) {
        break
      }
    }
    while (tempTree.brotherNode) {
      if (tempTree.childNode) {
        array.push([tempTree.childNode.value, lenAdd1])
        parentsArrayStorage2(tempTree.childNode, array, lenAdd1)
      }
      tempTree = tempTree.brotherNode
      if (!tempTree.brotherNode) {
        break;
      }
    }
    if (tree.childNode) {
      array.push([tree.childNode.value, lensubtract1])
      parentsArrayStorage2(tree.childNode, array, lensubtract1)
    }
    if (tempTree.childNode) {
      array.push([tempTree.childNode.value, len])
      parentsArrayStorage2(tempTree.childNode, array, len)
    }
  } else {
    if (tree.childNode) {
      array.push([tree.childNode.value, lensubtract1])
      parentsArrayStorage2(tree.childNode, array, lensubtract1)
    }
  }
  return array;
}
/* 
[
  [ 'R', -1 ], [ 'A', 0 ],
  [ 'B', 0 ],  [ 'C', 0 ],
  [ 'D', 1 ],  [ 'E', 1 ],
  [ 'F', 3 ],  [ 'G', 6 ],
  [ 'H', 6 ],  [ 'I', 6 ]
]
*/
console.log(parentsArrayStorage2(treeR))
// 双亲数组转换为N叉树(第二种表示)
function createN2Tree(array) {
  let treeArray = array.map(ele => new NTreeNode2(ele[0]))
  for (let index = array.length - 1; index >= 0; index--) {
    const element = array[index]
    if (element[1] != -1) {
      if (array[index - 1][1] == element[1]) {
        treeArray[index - 1].setBrotherNode(treeArray[index])
      } else {
        treeArray[element[1]].setChildNode(treeArray[index])
      }
      treeArray.pop()
    }
  }
  return treeArray[0]
}
console.log(JSON.stringify(createN2Tree([
  ['R', -1], ['A', 0],
  ['B', 0], ['C', 0],
  ['D', 1], ['E', 1],
  ['F', 3], ['G', 6],
  ['H', 6], ['I', 6]
])))

// 顺序二叉树
// 适合存储完全二叉树 非完全二叉树会浪费存储空间

// 链式二叉树
class TreeNode {
  constructor(value, left, right) {
    // 左子结点
    this.leftTreeNode = left || null
    // 右子结点
    this.rightTreeNode = right || null
    // 数据
    this.value = value
  }

  // 赋值
  setValue(value) {
    this.value = value
  }

  // 左子结点
  setLeftTreeNode(left) {
    this.leftTreeNode = left || null
  }

  // 右子结点
  setRightTreeNode(right) {
    this.rightTreeNode = right || null
  }

  // 清除结点
  clear() {
    this.leftTreeNode = null
    this.rightTreeNode = null
    this.value = null
  }
}

treeA = new TreeNode("A")
treeB = new TreeNode("B")
treeC = new TreeNode("C")
treeD = new TreeNode("D")
treeE = new TreeNode("E")
treeF = new TreeNode("F")
treeG = new TreeNode("G")

treeA.setLeftTreeNode(treeB)
treeA.setRightTreeNode(treeC)
treeB.setLeftTreeNode(treeD)
treeB.setRightTreeNode(treeE)
treeC.setLeftTreeNode(treeF)
treeC.setRightTreeNode(treeG)

// 前序
function preorderTraversal(root) {
  if (root != null) {
    // 这里操作结点
    arr.push(root.value)
    preorderTraversal(root.leftTreeNode)
    preorderTraversal(root.rightTreeNode)
  }
}
/* 
        A
    /      \
    B       C
  /   \   /   \
 D     E F     G
*/
arr = []
preorderTraversal(treeA)
console.log("前序深度优先遍历,根左右")
console.log(arr.join(" -> "))

// 中序
function inOrderTraversal(root) {
  if (root != null) {
    inOrderTraversal(root.leftTreeNode)
    // 这里操作结点
    arr.push(root.value)
    inOrderTraversal(root.rightTreeNode)
  }
}
/* 
        A
    /      \
    B       C
  /   \   /   \
 D     E F     G
*/
arr = []
inOrderTraversal(treeA)
console.log("中序,左根右")
console.log(arr.join(" -> "))

// 后序
function postOrderTraversal(root) {
  if (root != null) {
    postOrderTraversal(root.leftTreeNode)
    postOrderTraversal(root.rightTreeNode)
    // 这里操作结点
    arr.push(root.value)
  }
}
/* 
        A
    /      \
    B       C
  /   \   /   \
 D     E F     G
*/
arr = []
postOrderTraversal(treeA)
console.log("后序,左右根")
console.log(arr.join(" -> "))

// 层次遍历 广度优先遍历(BFS)
function levelTraversal(root) {
  // 结点队列
  let queue = []
  // 遍历完成数组
  let arr = []
  if (root != null) {
    // 从下推入
    queue.push(root)
    arr.push(root.value)
    while (queue.length > 0) {
      // 左结点推入
      if (queue[0].leftTreeNode) {
        arr.push(queue[0].leftTreeNode.value)
        queue.push(queue[0].leftTreeNode)
      }
      // 右结点推入
      if (queue[0].rightTreeNode) {
        arr.push(queue[0].rightTreeNode.value)
        queue.push(queue[0].rightTreeNode)
      }
      // 从上弹出
      queue.shift()
    }
  }
  return arr
}
/* 
        A
    /      \
    B       C
  /   \   /   \
 D     E F     G
*/
console.log("层次广度优先遍历")
console.log(levelTraversal(treeA).join(" -> "))

/* 
类型: 哈夫曼树(最优二叉树)
解释: 当用n个结点(都做叶子结点且都有各自的权值)试图构建一棵树时,如果构建的这棵树的带权路径长度最小,称这棵树为"最优二叉树",有时也叫"赫夫曼树"或者"哈夫曼树"
*/
/**
 * 生成哈夫曼树
 * @param {Array} array 源数组
 */
function createHuffManTree(array,tree = null) {
  if(tree==null){
    array = array.sort((a, b) => a - b).map(ele => new TreeNode(ele))
  }
  if (array.length == 1) {
    return tree
  }
  if (array.length > 1) {
    let sum = array[0].value + array[1].value
    let tempIndex = 0
    while (sum > array[tempIndex].value) {
      tempIndex++
      if(tempIndex > array.length-1){
        break
      }
    }
    if(array.length>1){
      array.splice(tempIndex, 0, new TreeNode(sum,array[0],array[1]))
      array.shift()
      array.shift()
      tree = array[0]
    }
  }
  return createHuffManTree(array,tree)
}
// 测试生成哈夫曼树
/* 
[5, 13, 40, 30, 10]
    98
   /  \
  40  58
     /  \
    28   30
   /  \
  13   15
      /  \
     5   10
*/
console.log(createHuffManTree([5, 13, 40, 30, 10]))
console.log(levelTraversal(createHuffManTree([5, 13, 40, 30, 10])))
// 测试生成哈夫曼树
/* 
[1, 2, 3, 3, 4, 5]
        18
      /    \
    7       11
   /  \    /  \
  3    4  5    6 
              / \
             3   3
            / \
           1   2
*/
console.log(createHuffManTree([1, 2, 3, 3, 4, 5]))
console.log(levelTraversal(createHuffManTree([1, 2, 3, 3, 4, 5])))
/* 
类型: 二叉查找树
解释: 比结点值小的放在左边为左结点,反之放在右边为右结点
*/
/**
 * 生成二叉查找树
 * @param {Array} array 源数组
 * @param {Number} index 数组索引
 * @param {Number} value 比较值
 * @param {Object} rootTree 结点 
 * @param {Boolean|undefined} noRootFlag false是根结点 true不是根结点
 */
function createBST(array, index, value = array[0], rootTree = new TreeNode(array[0]), noRootFlag) {
  // 数组循环退出
  if (index > array.length - 1) {
    return rootTree
  }
  // 生成结点
  let tree = new TreeNode(array[index])
  if (array[index] > value) {
    // 大于value的放在结点右边
    if (rootTree.rightTreeNode) {
      // 当前结点有右结点,插入结点再与右结点比较
      createBST(array, index, rootTree.rightTreeNode.value, rootTree.rightTreeNode, true)
    } else {
      // 当前结点没有右结点,插入结点设置为右结点
      rootTree.setRightTreeNode(tree)
    }
  } else {
    // 小于value的放在结点左边
    if (rootTree.leftTreeNode) {
      // 当前结点有左结点,插入结点再与左结点比较
      createBST(array, index, rootTree.leftTreeNode.value, rootTree.leftTreeNode, true)
    } else {
      // 当前结点没有左结点,插入结点设置为左结点
      rootTree.setLeftTreeNode(tree)
    }
  }
  // 是否循环
  if (!noRootFlag) {
    index++
    return createBST(array, index, value, rootTree, noRootFlag)
  }
}

// 测试生成二叉查找树
/* 
[5,2,1,4,3] 
      5
     /
    2
   / \
  1   4
     /
    3
*/
array = [5, 2, 1, 4, 3]
rootTree = createBST(array, 0, array[0])
console.log(rootTree)
console.log(levelTraversal(rootTree))

/* 
[5,6,1,4,3] 
    5
   / \
  1   6
   \
    4
   /
  3
*/
array = [5, 6, 1, 4, 3]
rootTree = createBST(array, 0, array[0])
console.log(levelTraversal(rootTree))

/* 
[5,6,7,4,3] 
      5
     / \
    4   6
   /     \
  3       7
*/
array = [5, 6, 7, 4, 3]
rootTree = createBST(array, 0, array[0])
console.log(levelTraversal(rootTree))

/* 
[50, 76, 21, 4, 32, 100, 64, 52]
       50
      /  \
    21    76
   /  \   / \
  4   32 64 100
        /
      52
*/
array = [50, 76, 21, 4, 32, 100, 64, 52]
rootTree = createBST(array, 0, array[0])
console.log(levelTraversal(rootTree))

/**
 * 检索二叉查找树
 * @param {Object} tree 树
 * @param {Number} value 查找值
 */
function searchBST(tree, value) {
  if (tree.value == value) {
    // 存在返回该结点
    return tree
  } else if (tree.value > value) {
    // 二分查找
    if (tree.leftTreeNode) {
      // 左结点递归查询
      return searchBST(tree.leftTreeNode, value)
    } else {
      // 没有左结点 返回false
      return false
    }
  } else {
    // 二分查找
    if (tree.rightTreeNode) {
      // 右结点递归查询
      return searchBST(tree.rightTreeNode, value)
    } else {
      // 没有右结点 返回false
      return false
    }
  }
}
/* 
[50, 76, 21, 4, 32, 100, 64, 52]
       50
      /  \
    21    76
   /  \   / \
  4   32 64 100
        /
      52
*/
console.log(searchBST(createBST([50, 76, 21, 4, 32, 100, 64, 52], 0, 50), 52))
console.log(searchBST(createBST([50, 76, 21, 4, 32, 100, 64, 52], 0, 50), 66))

/**
 * 二叉查找树最小值
 * @param {Object} tree 树
 */
function searchMinValueBST(tree) {
  // 一直往左走到头
  if (tree.leftTreeNode) {
    return searchMinValueBST(tree.leftTreeNode)
  } else {
    return tree.value
  }
}
/* 
[50, 76, 21, 4, 32, 100, 64, 52]
       50
      /  \
    21    76
   /  \   / \
  4   32 64 100
        /
      52
*/
console.log(searchMinValueBST(createBST([50, 76, 21, 4, 32, 100, 64, 52], 0, 50)))

/**
 * 二叉查找树最大值
 * @param {Object} tree 树
 */
function searchMaxValueBST(tree) {
  // 一直往右走到头
  if (tree.rightTreeNode) {
    return searchMaxValueBST(tree.rightTreeNode)
  } else {
    return tree.value
  }
}
/* 
[50, 76, 21, 4, 32, 100, 64, 52]
       50
      /  \
    21    76
   /  \   / \
  4   32 64 100
        /
      52
*/
console.log(searchMaxValueBST(createBST([50, 76, 21, 4, 32, 100, 64, 52], 0, 50)))

/**
 * 二叉查找树高度
 * @param {Object} tree 树
 */
function searchHeightBST(tree) {
  if (tree.leftTreeNode && !tree.rightTreeNode) {
    // 只有左子树 左子树的深度+1
    return searchHeightBST(tree.leftTreeNode) + 1
  } else if (!tree.leftTreeNode && tree.rightTreeNode) {
    // 只有右子树 右子树的深度+1
    return searchHeightBST(tree.rightTreeNode) + 1
  } else if (!tree.leftTreeNode && !tree.rightTreeNode) {
    // 没有左右子树 返回当前子树的深度就是1
    return 1
  } else {
    // 有左右子树 比较当前子树的左右深度
    if (searchHeightBST(tree.leftTreeNode) > searchHeightBST(tree.rightTreeNode)) {
      // 左子树深度大于右子树深度 左子树的深度+1
      return searchHeightBST(tree.leftTreeNode) + 1
    }
    // 右子树深度大于左子树深度 右子树的深度+1
    return searchHeightBST(tree.rightTreeNode) + 1
  }
}
/* 
[50, 76, 21, 4, 32, 100, 64, 52]
       50
      /  \
    21    76
   /  \   / \
  4   32 64 100
        /
      52
*/
console.log(searchHeightBST(createBST([50, 76, 21, 4, 32, 100, 64, 52], 0, 50)))
/* 
[5,6,1,4,3] 
    5
   / \
  1   6
   \
    4
   /
  3
*/
console.log(searchHeightBST(createBST([5, 6, 1, 4, 3], 0, 5)))

/**
 * 删除二叉查找树
 * @param {Object} tree 树
 * @param {Number} value 删除值
 */
function deleteBST(root, value, tree = root, parent = null) {
  // 该结点大于当前结点
  if (value > tree.value) {
    if (tree.rightTreeNode) {
      // 有右结点 递归删除
      return deleteBST(root, value, tree.rightTreeNode, tree)
    } else {
      // 没有右结点 返回root结点
      return root
    }
    // 该结点小于当前结点
  } else if (value < tree.value) {
    if (tree.leftTreeNode) {
      // 有左结点 递归删除
      return deleteBST(root, value, tree.leftTreeNode, tree)
    } else {
      // 没有左结点 返回root结点
      return root
    }
    // 找到这个结点
  } else {
    // 判断是连接左子树还是右字树 true 右子树 false 左子树
    let positionFlag = parent ? parent.value : 0 < value
    // 只有左结点
    if (tree.leftTreeNode && !tree.rightTreeNode) {
      if (positionFlag) {
        parent.rightTreeNode = tree.leftTreeNode
      } else {
        parent.leftTreeNode = tree.leftTreeNode
      }
      // 只有右结点
    } else if (!tree.leftTreeNode && tree.rightTreeNode) {
      if (positionFlag) {
        parent.rightTreeNode = tree.rightTreeNode
      } else {
        parent.leftTreeNode = tree.rightTreeNode
      }
      // 左右都没有
    } else if (!tree.leftTreeNode && !tree.rightTreeNode) {
      if (positionFlag) {
        parent.rightTreeNode = null
      } else {
        parent.leftTreeNode = null
      }
      // 左右都有
    } else {
      let tempTree, parent, value
      if (searchHeightBST(tree.leftTreeNode) > searchHeightBST(tree.rightTreeNode)) {
        // 该结点的左子树深度大于右子树深度 将左子树的最右的结点删除 将被删除的结点值赋值该结点
        tempTree = tree.leftTreeNode
        parent = tree
        value = tempTree.value
        while (tempTree.rightTreeNode) {
          parent = tempTree
          tempTree = tempTree.rightTreeNode
          value = tempTree.value
        }
      } else {
        // 该结点的左子树深度小于右子树深度 将右子树的最左的结点删除 将被删除的结点值赋值该结点
        tempTree = tree.rightTreeNode
        parent = tree
        value = tempTree.value
        while (tempTree.leftTreeNode) {
          parent = tempTree
          tempTree = tempTree.leftTreeNode
          value = tempTree.value
        }
      }
      // 删除
      deleteBST(root, value, tempTree, parent)
      // 赋值
      tree.value = value
    }
    return root
  }
}
/* 
[50, 76, 21, 32, 31, 100, 102, 64, 52, 51]
     50
    /  \
  21    76
    \   / \
    32 64 100
   /  /     \
  31 52     102  
    /
   51
*/
// 左边删除只有左子树的结点
// console.log(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 32))
console.log(levelTraversal(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 32)))
// 右边删除只有左子树的结点
// console.log(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 64))
console.log(levelTraversal(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 64)))
/* 
[50, 76, 21, 32, 31, 100, 102, 64, 52, 51]
     50
    /  \
  21    76
    \   / \
    32 64 100
   /  /     \
  31 52     102  
    /
   51
*/
// 左边删除只有右子树的结点
// console.log(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 21))
console.log(levelTraversal(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 21)))
// 右边删除只有右子树的结点
// console.log(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 100))
console.log(levelTraversal(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 100)))
/* 
[50, 76, 21, 32, 31, 100, 102, 64, 52, 51]
     50
    /  \
  21    76
    \   / \
    32 64 100
   /  /     \
  31 52     102  
    /
   51
*/
// 删除根结点
// console.log(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 50))
console.log(levelTraversal(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 50)))
// 删除有左右子树的结点
// console.log(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 76))
console.log(levelTraversal(deleteBST(createBST([50, 76, 21, 32, 31, 100, 102, 64, 52, 51], 0, 50), 76)))