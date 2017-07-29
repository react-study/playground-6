import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import axios from 'axios';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            todos: [], //axios으로 가져오기위해 빈배열로 변경
            editingId: null,
            filter: 'All' // All, Completed, Active
        };
    }

    componentDidMount(){ // mount시점에 요청하는것이 좋을것으로 판단
        axios.get('http://localhost:2403/todos') //객체
        .then(res => {
            //console.log(res);
            this.setState({
                todos: res.data
            })
        })
    }

    addTodo = text => { 
        this.setState({
            todos: [ ... this.state.todos, {
                id: Date.now(),
                text,
                isDone: false
            } ]
        });
    }

    deleteTodo = id => {
        const newTodos = [ ... this.state.todos ];

        //index 찾는작업
        const targetIndex = newTodos.findIndex(v => v.id === id );
        if(targetIndex > -1) { // 찾고자 하는애가 없으면 -1을 뱉어내는 성질을 이용한 안전장치
            newTodos.splice(targetIndex, 1);
        }

        this.setState({
            todos: newTodos
        });
    }

    startEdit = id => { //수정모드로 전환(input)을 알려야함
        this.setState({
            editingId: id
        })
    }

    saveTodo = (id, newText) => { // 아이디와 바뀐 텍스트를 받아오면
        const newTodos = [ ...this.state.todos]; // setState에 접근하기 전까지는, 새로운 객체를 만들어서 그걸 newTodos에 받고

        const targetIndex = newTodos.findIndex(v => v.id === id ); // 인덱스에 접근해서 바꿔치기 함.
        // - this.state[targetIndex].text = newText // 이렇게 this.setState를 직접 바꾸면 안됨.
        // - newTodos[targetIndex].text = newText; // 배열안의 객체 (객체는 참조형 데이터형이라서 안됨)
        // - 다음과 같이 Object.assign을 이용해야 올바름
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
            text: newText
        })

        this.setState({
            todos: newTodos,
            editingId: null
        })
    }

    cancelEdit = () => {
        this.setState({
            editingId: null
        });
    }

    toggleTodo = id => { // id값을 받아서 그거에 해당되는 isDone을 toggle시킴 (기본적인 동작은 saveTodo와 비슷)
        const newTodos = [ ... this.state.todos ];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
            isDone : !newTodos[targetIndex].isDone
        });
        this.setState({
            todos: newTodos
        })
    }

    toggleAll = () => {
        const newIsDone = !this.state.todos.every(v => v.isDone);
        const newTodos = this.state.todos.map(v => // map사용하여 새로운 배열 만들기
            Object.assign({}, v, { //객체의 참조를 끊기위해 Object.assign 이용
                isDone: newIsDone // 새로운걸 만든담에 겹치는게 있으면 덮어쓰기
            })
        );
        this.setState({
            todos: newTodos
        })
    }

    clearCompleted = () => {
        const newTodos = this.state.todos.filter(v => !v.isDone); // isDone이 not인 애들만 찾아서 설정
        this.setState({
            todos: newTodos
        })
    }

    selectFilter = filter => { // footer에게 넘길 selectFilter
        this.setState({
            filter // filter: filter
        })
    }

    render(){
        const {
            todos,
            editingId,
            filter
        } = this.state;

        const activeLength = todos.filter(v => !v.isDone).length;
        const completedLength = todos.length - activeLength;

        // 필터를 거친 todos를 넘기기 위한 메서드 추가
        let filteredTodos = null;
        switch(filter) {
            case 'Active' : filteredTodos = todos.filter(v => !v.isDone); break;
            case 'Completed' : filteredTodos = todos.filter(v => v.isDone); break;
            case 'All' : filteredTodos = todos; break;
            default: filteredTodos = todos;
        }

        return (
            <div className="todo-app">
                <Header 
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                    isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList 
                    todos={filteredTodos} //todos에서 filteredTodos로 수정
                    deleteTodo={this.deleteTodo}
                    startEdit={this.startEdit}
                    editingId={editingId}
                    saveTodo={this.saveTodo}
                    candelEdit={this.cancelEdit}
                    toggleTodo={this.toggleTodo}
                />
                <Footer
                    filter={filter} //현재의 filter정보를 넘겨줌
                    activeLength={activeLength}
                    completedLength={completedLength}
                    clearCompleted={this.clearCompleted}
                    selectFilter = {this.selectFilter}
                />
            </div>
        )
    }
}

export default App;