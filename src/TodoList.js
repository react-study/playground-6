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
                    {this.props.todos.map(v => (
                        <Todo
                            key={v.id} 
                            text={v.text}
                            isDone={v.isDone}
                            deleteTodo={() => deleteTodo(v.id)}/>
                    ))}
                </ul>
            </div>
        )
    }
}

export default TodoList;