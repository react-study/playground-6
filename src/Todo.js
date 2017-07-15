import React from 'react';

const Todo = ({
    text,
    isDone,
    deleteTodo,
    startEdit
}) => (
    <li className="todo-item">
        <button className="toggle" />
        <div className="todo-item__view">
            <div 
                className="todo-item__view__text"
                onDoubleClick={startEdit}>
                {text}
            </div>
            <button 
                className="todo-item__destroy"
                onClick={deleteTodo}/>
        </div>
        <input type="text" className="todo-item__edit"/>
    </li>
);

export default Todo;