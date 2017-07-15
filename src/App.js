import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            todos: [{   
                id: 1000,
                text: '서울뚝배기',
                isDone: false
            },
            {
                id: 1010,
                text: '집밥먹자',
                isDone: true
            },
            {
                id: 4555,
                text: '집에가자',
                isDone: false
            }]
        };
    }
    addTodo = text => {
        this.setState({
            todos: [ ... this.state.todos, {
                id: Date.now(),
                text,
                isDone: false
            } ]
        });
    }

    deleteTodo = id => {
        const newTodos = [ ... this.state.todos ];

        //index 찾는작업
        const targetIndex = newTodo.findIndex(v => v.id === id );
        if(targetIndex > -1) { // 찾고자 하는애가 없으면 -1을 뱉어내는 성질을 이용한 안전장치
            newTodos.splice(targetIndex, 1);
        }
        
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