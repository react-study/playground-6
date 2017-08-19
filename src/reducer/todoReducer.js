import constants from '../constants';
import update from 'immutability-helper';

const initialState = {
    todos: [],
    editingId: null
};

const TodoReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.todos.get:
            return update(state, {
                todos: {
                    $set: action.todos
                }
            });

        case constants.todos.add:
            return update(state, {
                todos: {
                    $push: [ action.newTodo ]
                }
            });

        case constants.todos.delete:
            return update(state, {
                todos: {
                    $splice: [
                        [ state.todos.findIndex(v => v.id === action.id), 1 ]
                    ]
                }
            });

        case constants.todos.startEdit:
            return update(state, {
                editingId: { $set: action.id }
            });

        case constants.todos.save:
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)]: {
                        $set:action.editedTodo
                    }
                }
            });

        case constants.todos.cancelEdit:
            return update(state, {
                editingId: {
                    $set: null
                }
            });

        case constants.todos.toggle:
            return update(state,{
                todos:{
                    [state.todos.findIndex(v => v.id === action.id)]:{
                        $set:action.editedTodo
                    }
                }
            });

        case constants.todos.toggleAll:
            return update(state,{
                todos:{
                    $set: action.editedTodos
                }

            });
        case constants.todos.clear:
            return update(state, {
                todos: {
                    $apply: todos => todos.filter(v => !v.isDone)
                }
            });

        default: return state;
    }
}

export default TodoReducer;
