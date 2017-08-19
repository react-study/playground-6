import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import { connect } from 'react-redux';
import todoAction from '../action/todoAction';

const mapStateToProps = state => ({
    todos: state.todos,
    editingId: state.editingId
});

const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(todoAction.getTodos()),
    addTodo: text => dispatch(todoAction.addTodo(text)),
    deleteTodo: id => dispatch(todoAction.deleteTodo(id)),
    startEdit: id => dispatch(todoAction.startEdit(id)),
    saveTodo: (id, newText) => dispatch(todoAction.saveTodo(id, newText)),
    cancelEdit: () => dispatch(todoAction.cancelEdit()),
    toggleTodo: id => dispatch(todoAction.toggleTodo(id)),
    toggleAll: () => dispatch(todoAction.toggleAll()),
    clearCompleted: () => dispatch(todoAction.clearCompleted()),
});

class AppContainer extends React.Component {
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
                />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
