
function compose(...func){
    if(func.length === 0){
        return arg => arg
    }

    if(func.length === 1){
        return func[0]
    }

    return func.reduce((a,b) => (...args) => a(b(...args)))
}