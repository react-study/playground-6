import React from 'react';
import Todo from './Todo';

const TodoList = ({
  todos,
  editingId,
  deleteTodo,
  startEdit,
  saveTodo,
  cancelEdit,
  toggleTodo
}) => (
  <div className="todo-app__main">
    <ul className="todo-list">
      {todos.map(({ id, text, isDone }) => (
        <Todo
          key={id}
          text={text}
          isDone={isDone}
          isEditing={id === editingId}
          deleteTodo={() => deleteTodo(id)}
          startEdit={() => startEdit(id)}
          saveTodo ={text => saveTodo(id, text)}
          cancelEdit={cancelEdit}
          toggleTodo={() => toggleTodo(id)}

        />
      ))}
    </ul>
  </div>
);

export default TodoList;
