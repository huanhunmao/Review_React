import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from '../../store/action';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if(!text) return 
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => dispatch(toggleTodo(todo.id))}>Toggle</button>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
