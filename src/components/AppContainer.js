import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import { connect} from 'react-redux';
import todoAction from '../action/todoAction';


const mapStateToProps = state =>({
    todos:state.todos,
    editingId:state.editingId
});
const mapDispatchToProps = dispatch =>({
    getTodos: ()=>dispatch(todoAction.getTodos()),
    addTodo : text => dispatch(todoAction.addTodo(text)),
    deleteTodo : id=> dispatch(todoAction.deleteTodo(id)),
    startEdit : id=> dispatch(todoAction.startEdit(id)),
    saveTodo : (id, newText)=> dispatch(todoAction.saveTodo(id,newText)),
    cancelEdit : ()=> dispatch(todoAction.cancelEdit()),
    toggleTodo : id=> dispatch(todoAction.toggleTodo(id)),
    toggleAll : ()=> dispatch(todoAction.toggleAll()),
    clearCompleted : ()=> dispatch(todoAction.clearCompleted())
});

class App extends React.Component {
    // 뷰" 기능 위주의 레이아웃 개념"
    // 명령 : 스토어에 전달할 데이터를 만들어서 객체(action)로 전환해주는 역할
    // 수헹결고 :reducer
    componentWillMount() {
        this.props.getTodos();
    }
    render() {
        const {
            todos,
            editingId,
            addTodo,
            deleteTodo,
            startEdit,
            saveTodo,
            cancelEdit,
            toggleTodo,
            toggleAll,
            clearCompleted
        } = this.props;

        const { match: { params } } = this.props;

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

    /*
    const initialState = {
        todos: [],
        editingId: null
    };

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


}

export default App;
