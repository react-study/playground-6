import React from 'react';

import Header from './Header';
import Footer from './Footer';
import TodoList from './TodoList';

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			todos : [
				{id : 1000, text : "ads1", isDone: true},
				{id : 1001, text : "ads2", isDone: false},
				{id : 1002, text : "ads3", isDone: false},
				{id : 1003, text : "ads4", isDone: false},
				{id : 1004, text : "ads5", isDone: false}
			]
		}
	}

	addTodo = (text) => {
		this.setState({
			todos : [...this.state.todos, {id:Date.now(),text,isDone:false}]
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

	render(){
		return (
			<div className="todo-app">
				<Header addTodo={this.addTodo} />
				<TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} />
				<Footer />
			</div>
		)
	}
}

export default App;
