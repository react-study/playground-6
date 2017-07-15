import React from 'react';
import Todo from './Todo';

const TodoList = ({
    todos,
    deleteTodo
}) => (
    <div className="todo-app__main">
        <ul className="todo-list" >
            {todos.map(({id, text, isDone}) => (
                <Todo
                    key={id}
                    text={text}
                    isDone={isDone}
                    deleteTodo={() => deleteTodo(id)}
                />
            ))}
        </ul>
    </div>
);
/*
class TodoList extends React.Component {
    render(){
        const{
            todos,
            deleteTodo
        } = this.props;
        return (
            <div className="todo-app__main">
                <ul className="todo-list" >
                    {todos.map(({id, text, isDone}) => (
                        <Todo
                            key={id}
                            text={text}
                            isDone={isDone}
                            deleteTodo={() => deleteTodo(id)}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}
*/
export default TodoList;