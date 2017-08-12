import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import axios from 'axios';
import { connect } from 'react-redux';
import todoAction from '../action/todoAction';

const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

// 뷰 : component(보여주는 뷰 영역) / container(기능위주의 레이아웃 개념) : 뷰만 담당하겠노라!
// 명령 : actionCreator : 스토어에 전달할 데이터를 만들어서 객체(action)로 전환해주는 역학
// 수행결과 : reducer : 상태와 액션을 받아서 새로운 상태로 만들어 주는 역할

const mapStateToProps = state => ({
    todos: state.todos,
    editingId: state.editingId
});

const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(todoAction.getTodos()), //액션을 요청하는!
    addTodo: text => dispatch(todoAction.addTodo(text)),
    deleteTodo: id => dispatch(todoAction.addTodo(id)),
    startEdit: id => dispatch(todoAction.addTodo(id)),
    saveTodo: (id, newText) => dispatch(todoAction.addTodo(id, newText)),
    cancelEdit: () => dispatch(todoAction.addTodo()),
    toggleTodo: id => dispatch(todoAction.addTodo(id)),
    toggleAll: () => dispatch(todoAction.addTodo()),
    clearCompleted: () => dispatch(todoAction.addTodo())
})

class App extends React.Component {

    componentWillMount() {
        this.props.getTodos(); // 위에 만들어놓은것으로 사용.
        /*
        ax.get('/')
        .then(res => {
            this.setState({
                todos: res.data
            });
        });
        */
    }

/* 나중에 일부는 액션으로, 대부분은 리듀서가 될 애들
    constructor() {
        super();
        this.state = { 
            todos: [],
            editingId: null
        };
    }
    addTodo = text => {
        ax.post('/', { text })
        .then(res => {
            this.setState({
                todos: [...this.state.todos, res.data]
            });
        });
    }

    deleteTodo = id => {
        ax.delete(`/${id}`)
        .then(() => {
            const newTodos = [...this.state.todos];
            const targetIndex = newTodos.findIndex(v => v.id === id);
            if(targetIndex > -1) {
                newTodos.splice(targetIndex, 1);
            }
            this.setState({
                todos: newTodos
            });
        });
    }

    startEdit = id => {
        this.setState({
            editingId: id
        });
    }

    saveTodo = (id, newText) => {
        ax.put(`/${id}`, {
            text: newText
        })
        .then(res => {
            const newTodos = [...this.state.todos];
            const targetIndex = newTodos.findIndex(v => v.id === id);
            newTodos[targetIndex] = res.data;
            this.setState({
                todos: newTodos,
                editingId: null
            });
        });
    }

    cancelEdit = () => {
        this.setState({
            editingId: null
        });
    }

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        const newDone = !newTodos[targetIndex].isDone;
        ax.put(`/${id}`, { isDone: newDone })
        .then(res => {
            newTodos[targetIndex] = res.data;
            this.setState({
                todos: newTodos
            });
        });
    }

    toggleAll = () => {
        const newIsDone = !this.state.todos.every(v => v.isDone);
        const axArray = this.state.todos.map(v =>
            ax.put(`/${v.id}`, {
                isDone: newIsDone
            })
        );
        axios.all(axArray)
        .then(res => {
            this.setState({
                todos: res.map(r => r.data)
            });
        });
    }

    clearCompleted = () => {
        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${v.id}`));

        axios.all(axArray)
        .then(() => {
            this.setState({
                todos: this.state.todos.filter(v => !v.isDone)
            });
        });
    }
*/
    render() {
        const {
            todos, //state
            editingId, //state

            addTodo,
            deleteTodo,
            startEdit,
            saveTodo,
            cancelEdit,
            toggleTodo,
            toggleAll,
            clearCompleted
        } = this.props; //state에서 props로 변경

        const {
            match: {
                params
            }
        } = this.props;

        const filter = params.filter || 'all';
        // this.props.match.params === { filter: 'active' }

        const activeLength = todos.filter(v => !v.isDone).length;
        const completedLength = todos.length - activeLength;

        let filteredTodos = null;
        switch(filter) {
        case 'active': filteredTodos = todos.filter(v => !v.isDone); break;
        case 'completed': filteredTodos = todos.filter(v => v.isDone); break;
        case 'all':
        default: filteredTodos = todos;
        }

        return (
            <div className="todo-app">
                <Header
                    addTodo={addTodo}
                    toggleAll={toggleAll}
                    isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList
                    todos={filteredTodos}
                    editingId={editingId}
                    deleteTodo={deleteTodo}
                    startEdit={startEdit}
                    saveTodo={saveTodo}
                    cancelEdit={cancelEdit}
                    toggleTodo={toggleTodo}
                />
                <Footer
                    filter={filter}
                    activeLength={activeLength}
                    completedLength={completedLength}
                    clearCompleted={clearCompleted}
                    selectFilter={selectFilter}
                />
            </div>
        );
    }

}

export default App;
