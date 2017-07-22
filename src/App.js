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
            editingId:null,
            filter:'All'
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
    //TODO: every, some, filter 메소드란?

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

    startEdit = id =>{
        this.setState({
            editingId: id
        })
    }

    saveTodo = (id, newText) =>{
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v=>v.id===id);
        // TODO: Object.assign이란?
        newTodos[targetIndex]= Object.assign({}, newTodos[targetIndex], {
            text : newText
        })

        this.setState({
            todos: newTodos,
            editingId :null
        })
    }

    cancelEdit = () =>{
        this.setState({
            editingId: null
        });
    }

    toggleTodo = id =>{
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v=>v.id===id);
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
            isDone : !newTodos[targetIndex].isDone
        });
        this.setState({
            todos:newTodos
        })
    }

    toggleAll =()=>{
        const newIsDone = !this.state.todos.every(v=>v.isDone);
        const newTodos = this.state.todos.map(v=>
            Object.assign({},v,{
                isDone:newIsDone
            })
        );
        this.setState({
            todos: newTodos
        });
    }

    clearCompleted = () =>{
        const newTodos = this.state.todos.filter(v => !v.isDone);
        this.setState({
            todos: newTodos
        })
    }

    selectFilter = filter =>{
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
        const activeLength = this.state.todos.filter(v => !v.isDone).length;
        const completedLength = this.state.todos.length - activeLength;
        let filteredTodos =null;
        switch(filter){
            case "Active" :  filteredTodos = todos.filter(v=> !v.isDone); break;
            case "Completed" : filteredTodos = todos.filter(v=> v.isDone); break;
            case "All" :
            default : filteredTodos = todos;
        }
        return(
            <div className="todo-app">
                <Header
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                    isAllDone={this.state.todos.every(v=>v.isDone)}
                />
                <TodoList
                    todos={filteredTodos}
                    deleteTodo={this.deleteTodo}
                    startEdit={this.startEdit}
                    editingId={editingId}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    toggleTodo={this.toggleTodo}
                />
                <Footer
                    filter = {filter}
                    clearCompleted={this.clearCompleted}
                    completedLength = {completedLength}
                    activeLength ={ activeLength}
                    selectFilter = {this.selectFilter}
                />
            </div>
        );
    }
}

export default App;
