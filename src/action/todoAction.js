// AppContainer에서 잘라온 것들
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

const todoAction = {
    getTodos: () => { // 반환은 객체이거나 함수이거나
        return dispatch => { // 일단 함수를 던져주고. thunk를 물리고 나서 dispatch
            dispatch({
                type: 'GET_TODOS_REQUEST'
            })
            ax.get('/')
            .then(res => { //이 안에서 바로 return할수 있지않나? then은 비동기.
                dispatch({
                    type: 'GET_TODOS_SUCCESS',
                    todos:res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'GET_TODOS_FAILED',
                    err
                })
            })
        }

        /* 원래의 리덕스 액션 크리에이터.
        return {
            type: 'GET_TODOS',
            내용
        }
        */
    },
    addTodo: text => {},
    deleteTodo: id => {},
    startEdit: id => {},
    saveTodo: (id, newText) => {},
    cancelEdit: () => {},
    toggleTodo: id => {},
    toggleAll: () => {},
    clearCompleted: () => {},
}