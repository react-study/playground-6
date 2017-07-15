import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component{
    render(){
        const {
            todo,
            deleteTodo
        } = this.props;
        
        return (
            <div className="todo-app__main">
                <ul className="todo-list">
                    {/*
                    <Todo text='서울뚝배기'/>
                    <Todo text='집밥먹자'/>
                    */}
                    {this.props.todos.map((v, i) => (
                        <Todo
                            key={i} 
                            text={v}
                            deleteTodo={() => deleteTodo(i)}/>
                    ))}
                </ul>
            </div>
        )
    }
}

export default TodoList;