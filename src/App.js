import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout:1000
})

class App extends React.Component{
    constructor(){
        super();
        this.state={
            todos:[],
            editingId:null,
            filter:'All'
        };
    }
    //componentDidMount 보단 Will로 사용하는게 조금이라도 더 좋음
    componentWillMount(){
        //axios.get('http://localhost:2403/todos')
        ax.get('/')
        .then(res => {
            this.setState({
                todos:res.data
            });
        })
    }
    addTodo=text=>{
        //axios.post('http://localhost:2403/todos',{text} )
        ax.post('/',{text})
        .then(res=>{
            this.setState({
                todos:[...this.state.todos, res.data]
            });
        })
        /*this.setState({
            todos:[...this.state.todos,{
                id:Date.now(),
                text,
                isDone:false
            }]
        });*/
    }

    deleteTodo = id=> {
        //axios.delete(`http://localhost:2403/todos/${id}`)
        ax.delete(`/${id}`)
        .then(()=>{
            const newTodos = [...this.state.todos];
            const targetIndex = newTodos.findIndex(v=>v.id===id);
            if(targetIndex>-1) {
                newTodos.splice(targetIndex,1);
            }
            this.setState({
                todos: newTodos
            });
        })

    }

    startEdit = id =>{
        this.setState({
            editingId: id
        })
    }

    saveTodo = (id, newText) =>{
        ax.put(`/${id}`,{
            text:newText
        })
        .then(res =>{
            const newTodos = [...this.state.todos];
            const targetIndex = newTodos.findIndex(v=>v.id===id);
            // TODO: Object.assign이란?
            newTodos[targetIndex]= res.data;
            this.setState({
                todos: newTodos,
                editingId :null
            })
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
        const newDone = !newTodos[targetIndex].isDone
        ax.put(`/${id}`, {isDone:newDone} )
        .then(res=>{
            newTodos[targetIndex] = res.data;
            this.setState({
                todos:newTodos
            })
        })

    }

    toggleAll =()=>{
        const newIsDone = !this.state.todos.every( v => v.isDone);
        const axArray = this.state.todos.map(v=>
            ax.put(`/${v.id}`, {
                isDone : newIsDone
            })
        )
        axios.all(axArray)
        .then(res=>{
            this.setState({
                todos : res.map( r =>r.data )
            })
        });
    }

    clearCompleted = () =>{
        const axArray = this.state.todos
            .filter( v => v.isDone )
            .map(v=> ax.delete(`/${v.id}`));
        axios.all(axArray)
        .then(() =>{
            this.setState({
                todos:this.state.todos.filter(v => !v.isDone)
            })
        })
    }

    selectFilter = filter =>{
        this.setState({
            filter
        })
    }

    render() {
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
