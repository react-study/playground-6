import React from 'react';
import ClassNames from 'classnames';
class Header extends React.Component {
    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13){//firaCode
            return;
        }
        this.props.addTodo(text);
        e.target.value = '';
    }
    render(){
        const {
            isAllDone,
            toggleAll
        } = this.props;
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
                    className={ClassNames('toggle-all', {
                        checked: isAllDone
                    })}
                    onClick={toggleAll}
                />
            </header>
        )
    }
}
export default Header;

/*
* callback function this binding
*
* 1. constructor 내부에서 메소드 바인딩
* 2. JSX 내부에서 직접 바인딩
* 그냥 this가 바인딩 안되면 되는거 아냐?
* 3. arrow function 활용
* 4. 메소드 자체를 arrow function으로 선언 //ES6문법만으로 불가능, class properties
*
* */