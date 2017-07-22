import React from 'react';
import Todo from './Todo';

const TodoList = ({ 
    todos,
    editingId,
    deleteTodo,
    startEdit,
    saveTodo
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
                    startEdit={() => startEdit(id)}
                    saveTodo={text => saveTodo(id, text)} //새로운 text를 받아서 상위에있는 saveTodo에게 id와 text넘겨줌
                />
            ))}
        </ul>
    </div>
);

export default TodoList;