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
            }],
            editingId: null
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
        const targetIndex = newTodos.findIndex(v => v.id === id );
        if(targetIndex > -1) { // 찾고자 하는애가 없으면 -1을 뱉어내는 성질을 이용한 안전장치
            newTodos.splice(targetIndex, 1);
        }

        this.setState({
            todos: newTodos
        });
    }

    startEdit = id => { //수정모드로 전환(input)을 알려야함
        this.setState({
            editingId: id
        })
    }

    render(){
        const {
            todos,
            editingId,
        } = this.state;
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList 
                    todos={todos}
                    deleteTodo={this.deleteTodo}
                    startEdit={this.startEdit}
                    editingId={editingId}/>
                <Footer/>
            </div>
        )
    }
}

export default App;