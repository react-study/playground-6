import React from 'react';

class Todo extends React.Component{
    render(){
        const {
            text
        } = this.props;

        return (
            <li className="todo-item">
                <button className="toggle" />
                <div className="todo-item__view">
                    <div className="todo-item__view__text">
                        {/*this.props.text*/}
                        {text}
                    </div>
                    <button className="todo-item__destroy"></button>
                </div>
                <input type="text" className="todo-item__edit"/>
            </li>
        )
    }
}

export default Todo;