import React from 'react';
import Todo from './Todo';

const TodoList = ({ 
    todos,
    editingId,
    deleteTodo,
    startEdit
}) => (
    <div className="todo-app__main">
        <ul className="todo-list">
            {todos.map(({ id, text, isDone }) => ( //destructuring
                <Todo
                    key={id} 
                    text={text}
                    isDone={isDone}
                    isEditing={ id === editingId }
                    deleteTodo={() => deleteTodo(id)}
                    startEdit={() => startEdit(id)}/>
            ))}
        </ul>
    </div>
);

export default TodoList;