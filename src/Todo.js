import React from 'react';

class Todo extends React.Component {
    // componentWillUpdate는 nextProps, nextState 를 인자로 받음
    componentDidUpdate(prevProps) { // DidUpdate는 렌더링이 이미 한 시점이라서, 바뀌기전 props, 현재의 props 다 받을 수 있음.
        if(this.props.isEditing && !prevProps.isEditing) {
            this._inputDom.focus();
            this._inputDom.value = this.props.text;
        }
    }
    handleKeyDown = e => {
        const text = e.target.value;

        // 방어코드
        if(!text || e.keyCode !== 13) {
            return;
        }

        // 내용이 있고, 엔터키인 경우에만 addTodo 실행.
        this.props.saveTodo(text);
        e.target.value ='';
    }

    render() {
        const {
            text,
            isDone,
            isEditing,
            deleteTodo,
            startEdit
        } = this.props;
        return (
            <li className={`todo-item${isEditing ? ' editing' : ''}`}>
                <button className="toggle" />
                <div className="todo-item__view">
                    <div 
                        className="todo-item__view__text"
                        onDoubleClick={startEdit}>
                        {text}
                    </div>
                    <button 
                        className="todo-item__destroy"
                        onClick={deleteTodo}/>
                </div>
                <input type="text" 
                       className="todo-item__edit"
                       ref={ref =>{
                            this._inputDom = ref}}
                       onKeyDown={this.handleKeyDown}
                />
            </li>
        )
    }
}
export default Todo;