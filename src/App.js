import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            todos:[
                {
                    id:1000,
                    text :'서울뚝배기',
                    isDone:false
                },
                {
                    id:1010,
                    text :'집밥먹자',
                    isDone:true
                },
                {
                    id:101230,
                    text :'집에가자',
                    isDone:false
                },
                {
                    id:324,
                    text :'밥먹자',
                    isDone:false
                }
            ],
        };
    }
    addTodo=text=>{
        //this.state.todos.push(text) 임의로 state 값을 변경하면 안된다.
        /*
        const newTodos = this.state.todos;
        newTodos.push(text);
        */
        this.setState({
            todos:[...this.state.todos,{
                id:Date.now(),
                text,
                isDone:false
            }]
        });
    }

    // deleteTodo = index=> {
    //     const newTodos = [...this.state.todos];
    //     newTodos.splice(index,1);
    //     this.setState({
    //         todos: newTodos
    //     })
    // }

    deleteTodo = id=> {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v=>v.id===id);
        if(targetIndex>-1) {
            newTodos.splice(targetIndex,1);
        }
        this.setState({
            todos: newTodos
        });
    }
    render(){
        return(
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
