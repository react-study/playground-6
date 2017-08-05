import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';
import bankAction from '../actions/bankAction';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    // state가 props로 변환된 데이터들
    accountData: state.accountData
});

const mapDispatchToProps = dispatch => ({
    // 메소드(action을 dispatch하는 메소드)들
    calculate: (type, money) => dispatch(bankAction[type](money))
})

class AppContainer extends React.Component {
    render() {
        const {
            calculate,
            accountData
        } = this.props;
        return (
            <div>
                <InputBox calculate={calculate}/>
                <AccountList accountData={accountData}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);