import React from 'react';

import Header from './Header';
import Footer from './Footer';
import TodoList from './TodoList';

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			todos : [
				{id : 1000, text : "ads1", isDone: false},
				{id : 1001, text : "ads2", isDone: true},
				{id : 1002, text : "ads3", isDone: false},
				{id : 1003, text : "ads4", isDone: false},
				{id : 1004, text : "ads5", isDone: false},
				
			],
			editingId: null,
			filter : 'All'
		}
	}

	toggleAll = () => {

		const newIsDone = !this.state.todos.every(v => v.isDone);
		const newTodos = this.state.todos.map( v => Object.assign({},v,{
			isDone : newIsDone
		}));

		this.setState({
			todos : newTodos
		})

	}

	addTodo = (text) => {
		this.setState({
			todos : [...this.state.todos, {id:Date.now(),text,isDone:false}]
		})
	}

	toggleTodo = (id) => {
		const newTodos  = [...this.state.todos];
		const targetIndex = newTodos.findIndex(v=> v.id === id);

		newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
			isDone : !newTodos[targetIndex].isDone
		});

		this.setState({
			todos : newTodos
		})

	}

	cancelEdit = () =>{
		this.setState({
			editingId : null
		})
	}

	deleteTodo = (id) => {
		const newTodos  = [...this.state.todos];
		const targetIndex = newTodos.findIndex(v=> v.id === id);
		if(targetIndex > -1){
			newTodos.splice(targetIndex,1);
		}

		this.setState({
			todos : newTodos
		})
	}

	startEdit = (id) => {
		this.setState({
			editingId : id
		});
	}
	saveTodo = (id, newText) => {
		const newTodos = [...this.state.todos];
		const targetIndex = newTodos.findIndex(v => v.id === id);
		newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {text: newText});

		this.setState({
			todos:newTodos,
			editingId : null
		})
	}

	clearCompleted = () => {
		const newTodos = this.state.todos.filter(v => !v.isDone);

		this.setState({
			todos:newTodos
		})

	}

	selectFilter = filter => {
		this.setState({
			filter
		})
	}

	render(){

		const {
			todos,
			editingId,
			filter
		} = this.state;

		const activeLength = todos.filter(v => !v.isDone).length;
		const completedLength = todos.length - activeLength;

		let filteredTodos = null;
		switch(filter){
			case 'Active' : filteredTodos = todos.filter(v => !v.isDone); break;
			case 'Completed' : filteredTodos = todos.filter(v => v.isDone); break;
			case 'All':
			default : filteredTodos = todos;
		}

		return (
			<div className="todo-app">
				<Header addTodo={this.addTodo} toggleAll={this.toggleAll} isAllDone={todos.every(v => v.isDone)} />
				<TodoList todos={filteredTodos} toggleTodo={this.toggleTodo} cancelEdit={this.cancelEdit} saveTodo={this.saveTodo} deleteTodo={this.deleteTodo} startEdit={this.startEdit} editingId={editingId} />
				<Footer selectFilter={this.selectFilter} filter={filter} activeLength={activeLength} completedLength={completedLength} clearCompleted={this.clearCompleted} />
			</div>
		)
	}
}

export default App;
