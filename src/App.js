import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            todos: [{   
                id: 1000,
                text: '서울뚝배기',
                isDone: false
            },
            {
                id: 1010,
                text: '집밥먹자',
                isDone: true
            },
            {
                id: 4555,
                text: '집에가자',
                isDone: false
            }],
            editingId: null
        };
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

    render(){
        const {
            todos,
            editingId,
        } = this.state;
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList 
                    todos={todos}
                    deleteTodo={this.deleteTodo}
                    startEdit={this.startEdit}
                    editingId={editingId}
                    saveTodo={this.saveTodo}
                />
                <Footer/>
            </div>
        )
    }
}

export default App;