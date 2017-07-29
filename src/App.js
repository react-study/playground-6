import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import axios from 'axios';

const ax = axios.create({ // axios에서 제공해주는 걸 이용
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
})

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            todos: [], //axios으로 가져오기위해 빈배열로 변경
            editingId: null
        };
    }

    componentWillMount(){ /* 성능해결향상1. DidMount에다가 하면 성능이슈 -> render를 한 다음에 호출하고, 서버를 갔다와서 setState를 하니까 render가 두번 일어남*/
        ax.get('/') 
        .then(res => {
            //console.log(res);
            this.setState({
                todos: res.data
            })
        })
    }

    addTodo = text => { 
        ax.post('/', { text })
        .then(res => {
            this.setState({
                todos: [ ... this.state.todos, res.data ]
            })
        })
    }

    deleteTodo = id => {
        ax.delete(`/${id}`) // 원래 처음에 하려한 방법을 썼다면, axios.delete(baseUrl + '/' + id) 였을 것.
        .then(()=>{ /* res가 없으므로 비워놓고 감. */
            const newTodos = [ ... this.state.todos ];

            /* index 찾는작업 */
            const targetIndex = newTodos.findIndex(v => v.id === id );
            if(targetIndex > -1) { // 찾고자 하는애가 없으면 -1을 뱉어내는 성질을 이용한 안전장치
                newTodos.splice(targetIndex, 1);
            }

            this.setState({
                todos: newTodos
            });
        })

    }

    startEdit = id => { //수정모드로 전환(input)을 알려야함
        this.setState({
            editingId: id
        })
    }

    saveTodo = (id, newText) => { // 아이디와 바뀐 텍스트를 받아오면
        ax.put(`/${id}`, { // 객체안에서 text만 건들기
            text: newText
        })
        .then(res => {
            const newTodos = [ ...this.state.todos]; // setState에 접근하기 전까지는, 새로운 객체를 만들어서 그걸 newTodos에 받고

            const targetIndex = newTodos.findIndex(v => v.id === id ); // 인덱스에 접근해서 바꿔치기 함.
            // - this.state[targetIndex].text = newText // 이렇게 this.setState를 직접 바꾸면 안됨.
            // - newTodos[targetIndex].text = newText; // 배열안의 객체 (객체는 참조형 데이터형이라서 안됨)
            // - 다음과 같이 Object.assign을 이용해야 올바름
            newTodos[targetIndex] = res.data; // 길었던거 이렇게 수정!!!!!!!(덮어쓰기)

            this.setState({
                todos: newTodos,
                editingId: null
            })
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
        const newDone = !newTodos[targetIndex].isDone

        ax.put(`/${id}`, { isDone: newDone }) // 미리 처리해주기위해 기존작업을 위로 올리고, 여기에 그 결과값인 newDone을 넣어준 것.
        .then(res => {
            newTodos[targetIndex] = res.data;
            this.setState({
                todos: newTodos
            })
        })
    }

    toggleAll = () => {
        const newIsDone = !this.state.todos.every(v => v.isDone);
        const axArray = this.state.todos.map(v =>
            ax.put(`/${v.id}`, {
                isDone: newIsDone
            })
        )
        axios.all(axArray) // 수집하는 동작
        .then(res => { // 배열안에 들어온 애들이 반응이 돌아오면..
            this.setState({
                todos: res.map(res => res.data) // 각각의 배열에 접근해서 새로운 배열을 만듬
            });
        });

        /*
        const newIsDone = !this.state.todos.every(v => v.isDone);
        const newTodos = this.state.todos.map(v => // map사용하여 새로운 배열 만들기
            Object.assign({}, v, { //객체의 참조를 끊기위해 Object.assign 이용
                isDone: newIsDone // 새로운걸 만든담에 겹치는게 있으면 덮어쓰기
            })
        );
        this.setState({
            todos: newTodos
        })
        */
    }

    clearCompleted = () => {
        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(v => ax.delete(`/${v.id}`));
        
        axios.all(axArray)
        .then(() => {
            this.setState({
                todos: this.state.todos.filter(v => !v.isDone)
            });
        })
            
        /*
        const newTodos = this.state.todos.filter(v => !v.isDone); // isDone이 not인 애들만 찾아서 설정
        this.setState({
            todos: newTodos
        })
        */
    }

    render(){
        const {
            todos,
            editingId
        } = this.state;

        const {
            match: {
                params
            }
        } = this.props;

        const filter = params.filter || 'All';
        // this.props.match.params === { filter: 'active' };

        const activeLength = todos.filter(v => !v.isDone).length;
        const completedLength = todos.length - activeLength;

        // 필터를 거친 todos를 넘기기 위한 메서드 추가
        let filteredTodos = null;
        switch(filter) {
            case 'active' : filteredTodos = todos.filter(v => !v.isDone); break;
            case 'completed' : filteredTodos = todos.filter(v => v.isDone); break;
            case 'all' : filteredTodos = todos; break;
            default: filteredTodos = todos;
        }

        return todos.length ? ( // 성능해결향상1. 서버에 갔다왔는데 입력된 데이터가 없으면 아무것도 안보인채로 있을거라는 문제점이 또 생김.
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
        ) : null;
    }
}

export default App;