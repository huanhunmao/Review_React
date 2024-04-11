const initialState = {
    todos: []
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TYPE':
            return {
                ...state,
                todos:[...state.todos, {
                    id: new Date(),
                    text: action.text,
                    completed: false
                }]
            }
        case 'TOGGLE_TYPE':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.id ? {...todo, completed: !action.completed} : todo),
            }
        case 'DELETE_TYPE':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        default: 
            return state;
    }
}

export default todoReducer