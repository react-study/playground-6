import update from 'immutability-helper';

const initialState = {
    todos: [],
    editingId: null
};

const TodoReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_TODOS_SUCCESS':
            return update(state, {
                todos: {
                    $set: action.todos
                }
            });
        case 'ADD_TODO_SUCCESS':
            return update(state, {
                todos: {
                    $push: [ action.newTodo ]
                }
            });
        case 'DELETE_TODO_SUCCESS':
            return update(state, {
                todos: {
                    $splice: [
                        [ state.todos.findIndex(v => v.id === action.id), 1 ]
                    ]
                }
            });
        case 'EDIT_TODO':
            return update(state, {
                editingId: { $set: action.id }
            });
        default: return state;
    }
}

export default TodoReducer;
