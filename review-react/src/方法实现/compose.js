
  // compose 函数负责将多个函数组合起来，从右到左执行
  // 这里也需要一个 compose 函数，它是 Redux 中的关键辅助函数
  // 下面是一个简单的 compose 函数实现：
  function compose(...funcs) {
    // 接受一个参数 arg 并原样返回
    if (funcs.length === 0) {
      return arg => arg;
    }
   // 直接返回数组中的第一个函数，无需进一步组合
    if (funcs.length === 1) {
      return funcs[0];
    }
  
    // 受任意数量的参数 ...args
    // 当调用这个最终返回的函数时，它首先调用 b 函数并将所有参数 ...args 传递给它，然后将 b(...args) 的结果作为参数传递给 a 函数
    // 每次迭代都会将两个函数从右向左地“串联”起来，直到所有的函数都被组合成一个新的单一函数
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
  }