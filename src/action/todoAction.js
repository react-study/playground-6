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
                type: 'GET_TODOS_SUCCESS',
                todos: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: 'GET_TODOS_FAILED',
                err
            });
        });
    },
    addTodo: text => dispatch => {
        dispatch({
            type: 'ADD_TODO_REQUEST'
        });
        ax.post('/', { text })
            .then(res => {
                dispatch({
                    type: 'ADD_TODO',
                    newTodo: res.data
                })
            })
        .catch(err => {
            dispatch({
                type: 'ADD_TODO_FAILED',
                err
            })
        })
    },
    deleteTodo: id => dispatch => {
        dispatch({
            type: 'DELETE_TODO_REQUEST'
        });
        ax.delete(`/${id}`)
            .then(()=> {
                dispatch({
                    type: 'DELETE_TODO',
                    id
                })
            })
    },
    startEdit: id => {
        type: 'START_EDIT',
        id
    },
    saveTodo: (id, newText) => dispatch => {
        ax.put(`/%{id}`, { text: newText })
            .then(res => {
                dispatch({
                    type: 'SAVE_TODO',
                    id,
                    editedTodo: res.data
                })
            })
    },
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    toggleTodo: id => (dispatch, getSTate) => {
        const newDone = !getState().todos.find(v => v.id === id).isDone;
        ax.put(`/${id}`, { isDone: newDone })
            .then(res => {
                dispatch({
                    type: 'TOGGLE_TODO',
                    id,
                    editedTodo: res.data
                })
            })
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
                    type: 'TOGGLE_ALL',
                    editedTodos: res.map(v => v.data)
                })
            })
    },
    clearCompleted: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const axArray = prevTodos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${id}`));
        axios.all(axArray)
        .then(()=> {
            dispatch({
                type: 'CLEAR_COMPLETED'
            })
        })
    },
}

export default todoAction;
