import React from 'react';

class Header extends React.Component {
    handleKeyDown = e => {
        const text = e.target.value;

        // 방어코드
        if(!text || e.keyCode !== 13) {
            return;
        }

        // 내용이 있고, 엔터키인 경우에만 addTodo 실행.
        this.props.addTodo(text);
        e.target.value ='';
    }
    render() {
        return ( 
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={this.handleKeyDown}
                />
                <button 
                    className="toggle-all"
                    onClick={this.props.toggleAll}/>
            </header>
        );
    }
}

export default Header;