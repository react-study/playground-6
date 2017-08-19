import update from 'immutability-helper';
import constants from '../constants';
const initialState = {
    todos: [],
    editingId: null
};

const TodoReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.todo.get:
            return update(state, {
                todos: {
                    $set: action.todos
                }
            });
        case constants.todo.add:
            return update(state, {
                todos: {
                    $push: [ action.newTodo ]
                }
            });
        case constants.todo.delete:
            return update(state, {
                todos: {
                    $splice: [
                        [ state.todos.findIndex(v => v.id === action.id), 1 ]
                    ]
                }
            });
        case constants.todo.startEdit:
            return update(state, {
                editingId: { $set: action.id }
            });
        case constants.todo.save:
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)]: {
                        $set: action.editedTodo
                    }
                },
                editingId: {
                    $set: null
                }
            });
        case constants.todo.cancelEdit:
            return update(state, {
                editingId: {
                    $set: null
                }
            });
        case constants.todo.toggle:
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)]: {
                        $set: action.editedTodo
                    }
                }
            });
        case constants.todo.toggleAll:
            return update(state, {
                todos: {
                    $set: action.editedTodos
                }
            });
        case constants.todo.clear:
            return update(state, {
                todos: {
                    $apply: todos => todos.filter(v => !v.isDone)
                }
            });
        default: return state;
    }
}

export default TodoReducer;
