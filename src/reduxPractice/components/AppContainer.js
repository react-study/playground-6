import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';
import { connect } from 'react-redux';
import bankAction from '../actions/bankAction';

const mapStateToProps = state => ({
  // store의 state가 props로 변환하고자 하는 데이터들
  accountData: state.accountData
});

const mapDispatchToprops = dispatch => ({
  // 메소드 (action을 dispatch하는 메소드)들
  calculate: (type, money) => dispatch (bankAction[type](money))
});

class App extends React.Component{
  render() {
    const {
      calculate,
      accountData
    } = this.props;
    return (
      <div>
        <InputBox calculate = {calculate} />
        <AccountList accountData={accountData} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(App);
