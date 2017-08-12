import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';
import Tabs from './Tabs';

import { connect } from 'react-redux';
import bankAction from '../actions/bankAction';
import tabAction from '../actions/tabAction';

const mapStateToProps = state => ({
    // store의 state를 props로 변환하고자 하는 데이터들.
    accountData: state.bank.accountData,
    focused: state.tab.focused
});

const mapDispatchToProps = dispatch => ({
    // 메소드(action을 dispatch하는 메소드)들.
    calculate: (type, money) => dispatch(bankAction[type](money)),
    changeTab: index => dispatch(tabAction.changeTab(index))
});

class App extends React.Component {
    render() {
        const {
            calculate,
            accountData,
            focused,
            changeTab
        } = this.props;
        return (
            <div>
                <Tabs changeTab={changeTab} focused={focused}/>
                <InputBox calculate={calculate}/>
                <AccountList accountData={accountData}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);