export const addTodo = text => ({
    type:'ADD_TYPE',
    text
})

export const toggleTodo = id => ({
    type: 'TOGGLE_TYPE',
    id
})

export const deleteTodo = id => ({
    type: 'DELETE_TYPE',
    id
})