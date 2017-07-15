import React from 'react';

class Header extends React.Component{
    handleKeyDown(e){
        const text = e.target.value;
        if(!text || e.keyCode !== 13){
            return;
        }
        //내용이 있고, 엔터키인 경우에만 addTodo 실행.
        this.props.addTodo(text);
        e.target.value='';
    }

    render(){
        return(
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={e => this.handleKeyDown(e)}
                />
                <button className="toggle-all"/>
            </header>
        );
    }
}

export default Header;
/*
    이벤트의 콜백함수에서는 javascrip에서는 window지만,
    리액트에서는 null 이다.
    1. constructor 내부 메소드에 this 를 바인딩
    2. jsx 내부에서 직접 bind
    3. arrow fuction 활용하기
    4. 메소드 자체를 arrow function으로 //ec6 문법만으로는 작동 x
    constaructor
*/
