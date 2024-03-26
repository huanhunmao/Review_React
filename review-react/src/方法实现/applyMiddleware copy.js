

const middlewareA = store => next => action => {
    // ... middlewareA 的逻辑
    return next (action);
}

const middlewareB = store => next => action => {
    // ... middlewareB 的逻辑
    return next (action);
}


function applyMiddleware(...middlewares){
    return createStore => (reducer, preloadedState, enhancer) => {
        let store = createStore(reducer, preloadedState, enhancer)
        let dispatch = store.dispatch

        const middlewareAPI = {
            getState: store.getState,
            dispatch: action => dispatch(action)
        }

        const chain = middlewares.map(middleware => middlewareAPI(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch: dispatch
        }
    }
}

function compose(...func){
    // 接受一个参数 arg 并原样返回
    if(func.length === 0){
        return arg => arg
    }

    // 直接返回数组中的第一个函数，无需进一步组合
    if(func.length === 1){
        return func[0]
    }

    // 受任意数量的参数 ...args
    // 当调用这个最终返回的函数时，它首先调用 b 函数并将所有参数 ...args 传递给它，然后将 b(...args) 的结果作为参数传递给 a 函数
    // 每次迭代都会将两个函数从右向左地“串联”起来，直到所有的函数都被组合成一个新的单一函数
    return func.reduce((a,b) => (...args) => a(b(...args)))
}