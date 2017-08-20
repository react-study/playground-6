import constants from '../constants';
import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

const todoAction = {
    getTodos: () => dispatch => {
        dispatch({
            type: 'GET_TODOS_REQUEST'
        });
        
        ax.get('/')
        .then(res => {
            dispatch({
                type: constants.todos.get,
                todos: res.data
            });
        })
    },
    addTodo: text => dispatch => {
        const temporalId = Date.now();
        dispatch({
            type: constants.todos.add_temporal,
            newTodo: {
                id: temporalId,
                text
            }
        });

        ax.post('/',{ text })
        .then(res => {
            dispatch({
                type: constants.todos.add_success,
                newTodo: res.data,
                temporalId
            });
        })
        .catch(err => {
            dispatch({
                type: constants.todos.add_failed,
                temporalId
            });
        });
    },
    deleteTodo: id => (dispatch, getState) => {
        const prevTodos = getState().todos;
        dispatch({
            type: constants.todos.delete_temporal,
            id
        });
        ax.delete(`/${id}`)
        .then(() => {
            dispatch({
                type: constants.todos.delete_success
            });

        })
        .catch(err => {
            dispatch({
                type: constants.todos.delete_failed,
                todos: prevTodos
            });
        });
    },
    startEdit: id => ({
        type: constants.todos.startEdit,
        id
    }),
    saveTodo: (id, newText) => dispatch => {
        ax.put(`/${id}`, {text: newText})
        .then(res => {
            dispatch({
                type: constants.todos.save,
                id,
                editedTodo: res.data
            });
        });
    },
    cancelEdit: () => ({
        type: constants.todos.cancelEdit
    }),
    toggleTodo: id => (dispatch, getState) => {
        const newDone = !getState().todos.find(v => v.id === id).isDone;
        ax.put(`/${id}`, {isDone: newDone})
        .then(res => {
            dispatch({
                type: constants.todos.toggle,
                id,
                editedTodo: res.data
            });
        });

    },
    toggleAll: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const newDone = !prevTodos.every(v => v.isDone);
        const axArray = prevTodos.map(v => 
            ax.put(`/${v.id}`, { isDone: newDone })
        );
        axios.all(axArray)
        .then(res => {
            dispatch({
                type: constants.todos.toggleAll,
                editedTodos: res.map(v => v.data)
            });
        });
    },
    clearCompleted: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const axArray = prevTodos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${v.id}`));
        axios.all(axArray)
        .then(() => {
            dispatch({
                type: constants.todos.clear
            });
        });
    },
};

export default todoAction;
