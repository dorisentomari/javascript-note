# 1. Diff算法
+ 什么是Diff算法
+ 去繁就简
+ VDOM为何用Diff算法
+ Diff算法的实现流程

# 2. Diff算法
+ Diff算法是Linux的一个基本命令
+ 在GIT中常用

# 3. 去繁就简
+ Diff算法非常复杂，实现难度很大，源码量很大
+ 去繁就简，讲明白核心流程，不关心细节
+ 关心核心流程

# 4. VDOM为何使用Diff算法
+ DOM操作比较**昂贵**，尽量减少DOM操作
+ 找出本次DOM必须更新的节点来更新，其他的不更新
+ **找出**的过程，就需要Diff算法

# 5. Diff实现过程
+ `patch(container, vnode);`
+ `patch(vnode, newVnode);`

# 6. Diff算法基本逻辑实现流程
+ 可以查看代码目录下的`diff详讲`代码
