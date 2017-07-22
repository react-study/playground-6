import React from 'react';
import ClassNames from 'classnames';

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
        const {
            isAllDone,
            toggleAll
        } = this.props; // 2개 이상이면 Destructuring하자
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
                    className={ClassNames('toggle-all',{
                        checked: isAllDone
                    })}
                    onClick={toggleAll}
                    />
            </header>
        );
    }
}

export default Header;