import update from 'immutability-helper';
import constants from '../constants';
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

        case constants.todos.add_temporal:
            return update(state, {
                todos: {
                    $push: [ action.newTodo ]
                }
            });

        case constants.todos.add_success: {
            // temporalId의 index를 찾아서, 걔를 action.newTodo로 바꿔치기
            const temporalIndex = state.todos.findIndex(v => v.id === action.temporalId);

            return update(state, {
                todos: {
                    $splice: [[temporalIndex, 1, action.newTodo]]
                }
            });
        }

        case constants.todos.add_failed: {
            // temporalId의 index를 찾아서, 걔를 삭제 
            const temporalIndex = state.todos.findIndex(v => v.id === action.temporalId);

            return update(state, {
                todos: {
                     $splice: [[temporalIndex, 1]]
                   
                }
            });
        }

        case constants.todos.delete_temporal:
            return update(state, {
                todos: {
                    $splice: [
                        [ state.todos.findIndex(v => v.id === action.id), 1 ]
                    ]
                }
            });

        case constants.todos.delete_failed:
            return update(state, {
                todos: {
                    $set: action.todos
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
