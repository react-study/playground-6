import React from 'react';

import Header from './Header';
import TodoList from './TodoList';

import Footer from './Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [{
        id:1000,
        text: "서울뚝배기",
        isDone: false
      }, {
        id:1010,
        text: "집밥먹자",
        isDone: false
      }, {
        id:1020,
        text: "집에가자",
        isDone: false
      }, {
        id:1030,
        text: "밥먹자",
        isDone: true
      }]
    };
  }
  addTodo = text => {
     // this.state를 변경하지 않고 새로운 배열을 만듬.
    this.setState({
      todos: [... this.state.todos, {
        id: Date.now(),
        text,
        isDone: false
      }]
    });
    // this.state.todos.push(text); 안돼!
  }

  deleteTodo = id => {
    const newTodos = [... this.state.todos];
    const targetIndex = newTodos.findIndex(v => v.id === id)

    if(targetIndex > -1) {
      newTodos.splice(targetIndex)
    }

    newTodos.splice(id, 1);
    this.setState({
      todos: newTodos
    });
  }

  render() {
    return(
      <div className = "todo-app">
        <Header addTodo={this.addTodo} />
        <TodoList
          todos = {this.state.todos}
          deleteTodo = {this.deleteTodo} />
        <Footer />
      </div>
    );
  }
}

export default App;
