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

    render(){
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList todos={this.state.todos}/>
                <Footer/>
            </div>
        )
    }
}

export default App;