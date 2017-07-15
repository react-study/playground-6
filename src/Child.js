import React from 'react';
/*class Child extends React.Component {
  constructor() {
    super();
    this.state = {
      isToggle: false
    }
  }
  handleClick() {
    this.setState({
      isToggle: !this.state.isToggle
    });
  }
  render () {
    const { isToggle } = this.state;
    console.dir(this.props);
    return (
      <h1
        style={{ color: isToggle ? '#f00' : '#00f' }}
        onClick={this.handleClick.bind(this)}
      >
        {this.props.title}
        {this.props.b}
      </h1>
    );
  }
}*/

/*
class Child extends React.Component {
  render() {
    const { name, phone, show, handleClick } = this.props;
    return (
      <li onClick={handleClick}>
        <p>name: {name}</p>
        <p style={{
          display: show ? 'inline' : 'none'
        }}>
          {phone}
        </p>
      </li>
    );
  }
}
export default Child;*/

/*
class Child extends React.Component {
  constructor() {
    super();
    this.state = { toggleColor: false };
  }
  componentWillMount() {
    console.log('1. 컴포넌트가 마운트될 예정입니다.');
  }
  componentDidMount() {
    console.log('2. 컴포넌트가 마운트되었습니다.');
  }
  componentWillReceiveProps(nextProps) {
    console.log('3. 컴포넌트가 새로운 props를 받을 예정입니다 : ', nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) { //UI의 성능을 끌어올릴때 많이 사용한다.
    console.log('4. 컴포넌트를 업데이트 해야할지 말지를 판단합니다 : ', nextProps, nextState);
    const shouldUpdate = confirm('업데이트 할까요?');
    return !!shouldUpdate;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('5. 컴포넌트가 업데이트될 예정입니다 : ', nextProps, nextState);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('6. 컴포넌트가 업데이트되었습니다 : ', prevProps, prevState);
  }
  componentWillUnmount() {
    console.log('7. 컴포넌트가 언마운트될 예정입니다.');
  }
  bgToggle() {
    this.setState({
      toggleColor: !this.state.toggleColor
    });
  }
  render() {
    const toggleColor = this.state.toggleColor;
    const list = this.props.list.map((v, i) => <li key={i}>{v}</li>);
    console.log('[[ 렌더 메소드가 호출되었습니다. ]]');
    return (
      <div>
        <ul style={{
          backgroundColor: toggleColor ? '#acf' : '#fca'
        }}>{list}</ul>
        <button onClick={()=> this.bgToggle()}>색상변경</button>
      </div>
    );
  }
}

export default Child;*/
