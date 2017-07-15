import React from 'react';
import Todo from './Todo';

const TodoList =({
    todos,
    deleteTodo
}) =>(
    <div className="todo-app__main">
        <ul className="todo-list">
            {todos.map(({id,text,isDone})=>(
                <Todo
                    key={id}
                    text={text}
                    isDone={isDone}
                    deleteTodo={()=>deleteTodo(id)}
                />
                /* deleteTodo={deleteTodo.bind(this,i)} */
            ))}
        </ul>
    </div>
)




/*
class TodoList extends React.Component{
    render(){
        const {
            todos,
            deleteTodo
        } = this.props;
        return(
            <div className="todo-app__main">
                <ul className="todo-list">
                    {this.props.todos.map(({id,text,isDone})=>(
                        <Todo
                            key={id}
                            text={text}
                            isDone={isDone}
                            deleteTodo={()=>deleteTodo(id)}
                        />
                        // 생략 deleteTodo={deleteTodo.bind(this,i)}
                    ))}
                </ul>
            </div>
        );
    }
}*/

export default TodoList;

/*
    pop, bind, call, apply 차이
    call(thisArg, ...params);
    apply(thisArg,[...params]);
    bind(thisArg, ...params);
*/
