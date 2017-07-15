import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo } =>(

	<div className="todo-app__main">
		<ul className="todo-list">
		{todos.map((v,i) => (
			<Todo key={v.id} text={v.text} idDone={v.isDone} deleteTodo={() => deleteTodo(v.id)} />
		))}
		</ul>
	</div>
));

export default TodoList;