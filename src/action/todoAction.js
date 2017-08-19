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
                type: 'GET_TODOS',
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
    startEdit: id => ({ // 리듀서가 알아서 startEdit을 가지고 뭘 하겠지. 넘겨주기만 하면 끝.
        type: 'START_EDIT',
        id
    }),
    saveTodo: (id, newText) => dispatch => { // axios에서 ajax요청을 하는것은 기존과 같음/
        ax.put(`/${id}`, { text: newText })
            .then(res => {
                dispatch({
                    type: 'SAVE_TODO', // dispatch로 태움
                    id,
                    editedTodo: res.data // 서버에서 내려온 데이터를 editedTodo에 넣어줌
                })
            })
    },
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    toggleTodo: id => (dispatch, getState) => { 
        // 원래 함수를 실행한 결과를 가지고 dispatch 스토어로 보낼건데, 
        // 함수실행은 middleWare중 thunk가 함 (thunk가 원래 dispatch, getState 두가지 받음)
        // getState()하면 바로 현재 상태를 반환해주므로 간편해짐

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
            .map(v => ax.delete(`/${v.id}`));
        axios.all(axArray)
        .then(()=> {
            dispatch({
                type: 'CLEAR_COMPLETED'
            })
        })
    },
}

export default todoAction;
