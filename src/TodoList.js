import React from 'react';
import Todo from './Todo';




class TodoList extends React.Component {
	render(){
		const { todos, deleteTodo,startEdit,editingId,saveTodo,cancelEdit, toggleTodo } = this.props;

		return(
			<div className="todo-app__main">
				<ul className="todo-list">
				{todos.map(({id,text,isDone}) => (
					<Todo key={id} text={text} toggleTodo={() => toggleTodo(id)} cancelEdit={cancelEdit} saveTodo={ text =>saveTodo(id, text)} isEditing={ id === editingId } isDone={isDone} startEdit={() => startEdit(id)} deleteTodo={() => deleteTodo(id)} />
				))}
				</ul>
			</div>
		)
		
	}
}

export default TodoList;