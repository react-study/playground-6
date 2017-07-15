import React from 'react';

class Header extends React.Component {
    handleKeyDown = e => {
        const text= e.target.value;
        if(!text || e.keyCode!==13){
            return;
        }
        //내용이 있고, 엔터키인 경우에만 addTodo실행
        this.props.addTodo(text);
        e.target.value='';
    }
    render() {
        return (
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input type="text" className="todo-app__new-todo" placeholder="what needs to be done?" onKeyDown={this.handleKeyDown}/>
                <button className="toggle-all"></button>
            </header>
        );
    }
}

export default Header;

/*
* 리액트에서는 this를 바인딩 해주지 않으면 null로 함 메모리 아끼자고;; 그래서 this를 바인딩 하는 방법은
* 1. constructor 내부에서 this를 바인딩. (프로토타입도 있고, 프로토타입 체이닝에도 있게됨, 협업에서 떨어짐)
* 2. jsx 내에서 직접 this바인딩 (프로토타입 상에 있는 있고, 프로토타입 체이닝에는 없는데, 성능이 떨어짐, 협업에는 좋다.)
*
* 3. 그냥 this가 바인딩 안되면 되는거 아님? 그럼 arrow펑션을 사용 (함수 한번더 맵핑)
* arrow function 활용(호이스팅은 하나 tdz존재, this바인딩 안함, 자신을 포함하고 있는 함수를 this로 잡음)
* 4. 메소드 자체를 arrow function으로 선언 //가장 좋은 방법이나, ES6문법 만으로는 동작을 못하는 단점이있따. class property이기때문에
* class에는 세가지만 선언할수있따. constructor(){}, static mehtod(){}, method(){}
*
**/


