import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            todos: [{
                id: 1000,
                text: '서울뚝배기',
                isDone: false
            },{
                id: 1010,
                text: '집밥먹자',
                isDone: true
            },{
                id: 1020,
                text: '집에가자',
                isDone: false
            },{
                id: 1030,
                text: '밥먹자',
                isDone: false
            }],
            editingId: null,
            filter: 'All'
        };
    }

    addTodo = text => {
        this.setState({
            todos: [...this.state.todos, {
                id: Date.now(),
                text,
                isDone:false
            }]
        });
    }

    deleteTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        if(targetIndex > -1) {
            newTodos.splice(targetIndex,1);
        }
        this.setState({
            todos: newTodos
        });
    }

    startEdit = id =>{
        this.setState({
            editingId: id
        });
    }

    saveTodo = (id, newText) =>{
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex],{
            text: newText
        });
        this.setState({
            todos: newTodos,
            editingId: null
        })
    }

    cancelEdit = () => {
        this.setState({
            editingId: null
        })
    }

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex],{
            isDone: !newTodos[targetIndex].isDone
        })
        this.setState({
            todos: newTodos
        })
    }

    toggleAll = () => {
        const newIsDone = !this.state.todos.every(v => v.isDone);
        const newTodos = this.state.todos.map(v =>
            Object.assign({}, v, {
                isDone: newIsDone
            })
        )
        this.setState({
            todos: newTodos
        })
    }

    clearCompleted = () => {
        const newTodos = this.state.todos.filter(v => !v.isDone);
        this.setState({
            todos: newTodos
        })
    }

    selectFilter = filter => {
        this.setState({
            filter
        });
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
        switch(filter) {
            case 'Active': filteredTodos = todos.filter(v => !v.isDone); break;
            case 'Completed': filteredTodos = todos.filter(v => v.isDone); break;
            case 'All':
            default: filteredTodos = todos;
        }

        return (
            <div className="todo-app">
                <Header
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                    isAllDone={todos.every(v => v.isDone)}
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
                    filter={filter}
                    activeLength={activeLength}
                    completedLength={completedLength}
                    clearCompleted={this.clearCompleted}
                    selectFilter={this.selectFilter}
                />
            </div>
        )
    }
}
export default App;