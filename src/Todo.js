import React from 'react';
import ClassNames from 'classnames';
class Todo extends React.Component{

    //TODO : componentDidUpdate 와 componentWillUpdate의 개념, 인자로 받을수 있는것은?
    componentDidUpdate(prevProps){
        if(this.props.isEditing && !prevProps.isEditing){
            this._inputDom.focus();
            this._inputDom.value = this.props.text;
        }
    }

    handleKeyDown = (e) => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13){
            return;
        }
        //내용이 있고, 엔터키인 경우에만 saveTodo 실행.
        this.props.saveTodo(text);
        e.target.value='';
    }

    render(){
        const {
            text,
            isDone,
            isEditing,
            deleteTodo,
            startEdit,
            cancelEdit,
            toggleTodo
        } = this.props;
        return (
            <li className={ClassNames('todo-item',{
                editing: isEditing,
                completed: isDone
            })}>
                <button
                    className="toggle"
                    onClick={toggleTodo}
                />
                <div className="todo-item__view">
                    <div
                        className="todo-item__view__text"
                        onDoubleClick={startEdit}
                    >
                        {text}
                    </div>
                    <button
                        className="todo-item__destroy"
                        onClick={deleteTodo}
                    />
                </div>
                <input
                    type="text"
                    className="todo-item__edit"
                    ref={ref=> this._inputDom= ref}
                    onKeyDown={this.handleKeyDown}
                    onBlur ={cancelEdit}
                />
            </li>
        );
    }
}


// TODO: ref 란?
/*
class Todo extends React.Component{
    render(){
        const {
            text,
            isDone,
            deleteTodo
        } = this.props;
        return(
            <li className="todo-item">
                <button className="toggle"/>
                <div className="todo-item__view">
                    <div className="todo-item__view__text">
                        {text}
                    </div>
                    <button
                        className="todo-item__destroy"
                        onClick={deleteTodo}
                    />
                </div>
                <input type="text" className="todo-item__edit"/>
            </li>
        );
    }
}*/

export default Todo;
