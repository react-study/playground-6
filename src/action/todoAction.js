import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});
const todoAction = {
    getTodos: () => dispatch => {
        dispatch({
            type: 'GET_TODOS_REQUEST'
        })
        ax.get('/')
        .then(res=> {
            dispatch({
                type :'GET_TODOS',
                todos: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: 'GET_TODOS_FAILED',
                err
            })
        });
    },
    /*
    getTodos: () =>{
        return dispatch => {
            dispatch({
                type: 'GET_TODOS_REQUEST'
            })
            ax.get('/')
            .then(res=> {
                dispatch({
                    type :'GET_TODOS',
                    todos: res.data
                })
            })
            .catch(err=>{
                dispatch({
                    type: 'GET_TODOS_FAILED',
                    err
                })
            })
        }
    },
    */
    todos: () =>{},
    addTodo: text =>{},
    deleteTodo: id =>{},
    startEdit: id =>{},
    saveTodo: (id,newText) =>{},
    cancelEdit: () =>{},
    toggleTodo: id =>{},
    toggleAll: () =>{},
    clearCompleted: () =>{}
}
export default todoAction;
