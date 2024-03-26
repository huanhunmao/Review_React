
// 假设我们已经有了 middlewareA, middlewareB 等中间件
const middlewareA = store => next => action => {
    // ... middlewareA 的逻辑
    return next(action);
  };
  
  const middlewareB = store => next => action => {
    // ... middlewareB 的逻辑
    return next(action);
  };
  
  // Redux 官方仓库中的实际 applyMiddleware 实现更为复杂，包括处理额外参数等
  // 以下是一个简化版实现的核心逻辑
  
  function applyMiddleware(...middlewares) {
    // 返回一个新的 createStore 函数，当创建 store 时，会遍历传入的中间件列表，
    // 并依次调用每个中间件，给它们传递一个包含 getState 和 dispatch 方法的对象（即 middlewareAPI)
    return (createStore) => (reducer, preloadedState, enhancer) => {
      let store = createStore(reducer, preloadedState, enhancer);
      let dispatch = store.dispatch;
      
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      };
  
      const chain = middlewares.map(middleware => middleware(middlewareAPI));
      // 中间件通常会返回一个新的 dispatch 函数，该函数包裹原始的 dispatch，并在其前后插入额外的操作逻辑
      // compose 函数将所有中间件的 dispatch 处理流程串联起来，形成一个最终的 dispatch 函数，
    //   这个函数被用来替换原 store 的 dispatch 方法
      dispatch = compose(...chain)(store.dispatch);
  
      return {
        ...store,
        dispatch
      };
    };
  }
  
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
  
  // 使用方式
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(middlewareA, middlewareB)
  );
  
  export default applyMiddleware;