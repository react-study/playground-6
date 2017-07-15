import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            todos: [
                '서울뚝배기', 
                '집밥먹자', 
                '밥먹자'
            ],
        };
    }
    addTodo = text => {
        this.setState({
            todos: [ ... this.state.todos, text ]
        });
    }

    deleteTodo = index => {
        const newTodos = [ ... this.state.todos ];
        newTodos.splice(index, 1);
        this.setState({
            todos: newTodos
        });
    }

    render(){
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList 
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo}/>
                <Footer/>
            </div>
        )
    }
}

export default App;