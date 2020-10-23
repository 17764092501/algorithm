// 链式二叉树
class TreeNode {
  constructor(value, left, right) {
    // 左结点(儿子)
    this.leftTreeNode = left || null
    // 右结点(儿子)
    this.rightTreeNode = right || null
    // 数据
    this.value = value
  }

  // 复制
  setValue(value) {
    this.value = value
  }

  // 左结点
  setLefTreeNode(left) {
    this.leftTreeNode = left || null
  }

  // 右结点
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

let treeA = new TreeNode("A")
let treeB = new TreeNode("B")
let treeC = new TreeNode("C")
let treeD = new TreeNode("D")
let treeE = new TreeNode("E")
let treeF = new TreeNode("F")
let treeG = new TreeNode("G")

treeA.setLefTreeNode(treeB)
treeA.setRightTreeNode(treeC)
treeB.setLefTreeNode(treeD)
treeB.setRightTreeNode(treeE)
treeC.setLefTreeNode(treeF)
treeC.setRightTreeNode(treeG)

// 前序遍历
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

//二分查找树
/**
 * 生成二叉查找树
 * @param {Array} array 源数组
 * @param {Number} index 数组索引
 * @param {Number} value 比较值
 * @param {Object} rootTree 节点 
 * @param {Boolean|undefined} noRootFlag false是根节点 true不是根节点
 */
function createBST(array, index, value = array[0], rootTree = new TreeNode(array[0]), noRootFlag) {
  // 数组循环退出
  if (index > array.length - 1) {
    return rootTree
  }
  if (index > 0) {
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
        rootTree.setLefTreeNode(tree)
      }
    }
  }
  // 是否循环
  if (!noRootFlag) {
    index++
    return createBST(array, index, value, rootTree, noRootFlag)
  }
}

// 测试生成树
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
    let positionFlag = parent ? parent.value : 0 < value;
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
      let tempTree,parent,value;
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