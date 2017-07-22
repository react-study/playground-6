import React from 'react';
import ClassNames from 'classnames';

class Todo extends React.Component {

	componentDidUpdate(prevProps){
		if(this.props.isEditing && !prevProps.isEditing){
			this._inputDom.value = this.props.text;
			this._inputDom.focus();
		}
	}

	handleKeyDown = e => {
		const text = e.target.value;
		console.log(e.keyCode);
		if(!text || e.keyCode !== 13){
			return;
		}
		this.props.saveTodo(text);
		e.target.value = '';
	}

	render(){

	const {text, isDone, deleteTodo,isEditing, startEdit, cancelEdit, toggleTodo} = this.props;

		return (
			<li className={
				ClassNames('todo-item',{
					editing : isEditing,
					completed : isDone
				})}>
				<button className="toggle" onClick={toggleTodo}></button>
				<div className="todo-item__view" onDoubleClick={startEdit} >
					<div className="todo-item__view__text">{text}</div>
					<button className="todo-item__destroy" onClick={deleteTodo } ></button>
				</div>
				<input type="text" className="todo-item__edit" onBlur={cancelEdit}  ref={ref => {this._inputDom = ref}} onKeyDown={this.handleKeyDown} />
			</li>
		)
	}
}

export default Todo;