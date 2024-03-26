

//  Redux 提供的一个辅助函数，用于简化在 React 组件中将 action 创建函数绑定到 dispatch 上的过程
// 将 action 创建函数和 dispatch 方法绑定在一起，使得在组件中调用 action 创建函数时，可以直接派发 action，
// 而无需手动调用 dispatch

export function bindActionCreators(actionCreators, dispatch) {
    // 如果 actionCreators 是一个函数，则将其作为单个 action 创建函数处理
    if (typeof actionCreators === 'function') {
      return function () {
        // 它调用了一个函数 actionCreator ，并将 this 指向当前环境，以及调用 actionCreator 时传递给它的参数 arguments
        // redux 中不太关注 this
        return dispatch(actionCreators.apply(this, arguments));
      };
    }
  
    // 如果 actionCreators 是一个对象，则处理每个 action 创建函数并绑定到 dispatch 上
    if (typeof actionCreators === 'object' && actionCreators !== null) {
      const boundActionCreators = {};
      for (const key in actionCreators) {
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
          boundActionCreators[key] = function () {
            return dispatch(actionCreator.apply(this, arguments));
          };
        }
      }
      return boundActionCreators;
    }
  
    // 如果 actionCreators 不是函数也不是对象，则抛出错误
    throw new Error('bindActionCreators expected an object or a function, instead received: ' + (actionCreators === null ? 'null' : typeof actionCreators));
  }
  