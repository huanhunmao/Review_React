

// 那么 dispatch 函数 做了 什么 
// action 初始结构 {type: 'ADD'}
function dispatch(action){
    reducer(currentState, action)
}


// 接下来一个问题 reducer 怎么实现的 ？??