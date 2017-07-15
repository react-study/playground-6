import React from 'react';

class Todo extends React.Component {

	render(){

	const {text, isDone, deleteTodo} = this.props;

		return (
			<li className="todo-item">
				<button className="toggle"></button>
				<div className="todo-item_view">
					<div className="todo-item__view__text">{text}</div>
					<button className="todo-item__destroy" onClick={deleteTodo } ></button>
				</div>
				<input type="text" className="todo-item__edit" />
			</li>
		)
	}
}

export default Todo;