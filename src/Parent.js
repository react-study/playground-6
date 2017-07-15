import React from 'react';
import Child from './Child';
/*class Parent extends React.Component {
    getTitle(){
        return '세번째 타이틀'
    }
  render() {
    return (
        <div>
            <Child a={1} title="첫번째 타이틀"/>
            <Child a={2} title={'두번째 타이틀'}/>
            <Child b={3} title={this.getTitle()}></Child>
        </div>
    )
  }
}*/

/*
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [{
        name: 'gomugom',
        phone: '010-1111-2222',
        show: false
      }, {
        name: 'iu',
        phone: '010-2222-3333',
        show: false
      }, {
        name: 'akmu',
        phone: '010-1133-3245',
        show: false
      }]
    };
  }
  handleClick(i) {
    console.log(this.state);
    const newPeople = this.state.people;
    newPeople[i].show = !newPeople[i].show;
    this.setState({
      people: newPeople
    });
  }
  render() {
    const people = this.state.people;
    return (
      <ul>
        <Child
          name={ people[0].name }
          phone={ people[0].phone }
          show={ people[0].show }
          handleClick={this.handleClick.bind(this, 0)}
        />
        <Child
          name={ people[1].name }
          phone={ people[1].phone }
          show={ people[1].show }
          handleClick={this.handleClick.bind(this, 1)}
        />
        <Child
          name={ people[2].name }
          phone={ people[2].phone }
          show={ people[2].show }
          handleClick={this.handleClick.bind(this, 2)}
        />
      </ul>
    );
  }
}*/

/*
class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [0]
    }
    this.addChild = this.addChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
  }
  addChild() {
    const nextList = [...this.state.list];
    nextList.push(nextList.length);
    this.setState({ list: nextList });
  }
  removeChild() {
    const nextList = [...this.state.list];
    nextList.pop();
    this.setState({ list: nextList });
  }
  render() {
    if(!this.state.list.length) return (
      <button onClick={this.addChild}>자식 추가</button>
    );
    return (
      <div>
        <Child list={this.state.list} />
        <button onClick={this.addChild}>자식 추가</button>
        <button onClick={this.removeChild}>자식 삭제</button>
      </div>
    );
  }
}
export default Parent;*/
