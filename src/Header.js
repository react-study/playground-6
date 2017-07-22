import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {

  handleKeyDown = e => {
    const text = e.target.value;
    if(!text || e.keyCode !== 13){
      return;
    }

    // 내용이 있고, 엔터키인 경우에만 addTodo 실행
    this.props.addTodo(text);
    e.target.value = '';

  };

  render() {
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

    );
  }
}

export default Header;

/*
this바인딩하는 4가지 방법
1. constructor 내부에서 메소드에 this 바인딩
2. jsx(render 메소드) 내부에서 직접 bind

그냥 this가 바인딩 되지 않게 한다
3. arrow function 사용
4. 메소드 자체를 arrow function으로 선언 // ES6 자체만으로 작동안함, class properties
  // 현재 stage 2단계에서

*/
