import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';

const mapStateToProps = state => ({
    // state가 props로 변환된 데이터들
    accountData: ???
});

const mapDispatchToProps = dispatch => ({
    // 메소드(action을 dispatch하는 메소드)들
    calculate: (type, money) => dispatch(bankAction[type](money))
    /*
    calculate = (type, money) => { //같은 money를 가지고, store에 전달.
        if (type === 'deposit') {
            dispatch({
                type: 'DEPOSIT_MONEY', // store야 입금을 처리하렴.
                money
            })
        } else {
            dispatch({
                type: 'WITHDRAW_MONEY', // store야 인출을 처리하렴.
                money
            })
        }
    })
    */
})

const bankAction = {
    deposit: money => ({
        type: 'DEPOSIT_MONEY',
        money
    }), // action을 반환하는 함수. actionCreator
    withdraw: money => ({
        type: 'WITHDRAW_MONEY',
    })
}

class AppContainer extends React.Component {

    /*
    calculate = (type, money) => {
        money = money * 1; //숫자형으로 바꿔주기;
        const prevAccount = this.props.accountData;
        const prevLength = prevAccount.length;
        const lastResult = prevLength? (prevAccount[prevLength - 1].result) : 0;   // lastResult state로 따로 빼도 됨.

        this.setState({
            accountData: [
                ...this.props.acccountData, {
                    type,
                    money,
                    result: lastResult + (type === 'deposit' ? 1 : -1 ) * money
                }
            ]
        })
    }
    */

    render() {
        const {
            calculate,
            accountData
        } = this.props;
        return (
            <div>
                <InputBox calculate={this.props.calculate}/>
                <AccountList accountData={this.props.accountData}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);