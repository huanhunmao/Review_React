


export function bindActionCreators(actionCreators, dispatch) {
    if(typeof actionCreators === 'function') {
        return function (){
            return dispatch(actionCreators.apply(this, arguments));
        }
    }

    if(typeof actionCreators === 'object' && actionCreators !== null) {
        const boundActionCreators = {}
        for(let key in actionCreators) {
            const actionCreator = actionCreators[key]
            if(typeof actionCreator=== 'function'){
                boundActionCreators[key] = dispatch(actionCreator.apply(this, arguments));
            }
        }

        return boundActionCreators
    }

    throw new Error('Type error')
  }
  