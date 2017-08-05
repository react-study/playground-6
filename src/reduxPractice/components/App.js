import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';

class App extends React.Component {
    state = {
        accountData: []
    };

    /*
        deposit, withdraw 각각 메서드를 만들어도되고,
        calculate(type, money) 안에서 type을 분기하여 처리하는 방법이 있다.
    */

    /* 1번째 방법 ---------------------------------------------------
    deposit(money) {
        money = money * 1; //숫자형으로 바꿔주기;
        // money = +money  이렇게 암묵적 형변환도 가능
        // money = parseInt(money) 이렇게도 가능

        const prevAccount = this.state.accountList;
        const prevLength = prevAccount.length;
        const lastResult = prevLength? (prevAccount[prevLength - 1].result) : 0;   // lastResult state로 따로 빼도 됨.

        this.setState({
            accountData: [
                ...this.state.acccountData, {
                    type: 'deposit',
                    money,
                    result: lastResult + money
                }
            ]
        })
    }
    */


    // 2번째 방법 ---------------------------------------------------
    calculate = (type, money) => {
        money = money * 1; //숫자형으로 바꿔주기;
        const prevAccount = this.state.accountData;
        const prevLength = prevAccount.length;
        const lastResult = prevLength? (prevAccount[prevLength - 1].result) : 0;   // lastResult state로 따로 빼도 됨.

        this.setState({
            accountData: [
                ...this.state.acccountData, {
                    type,
                    money,
                    result: lastResult + (type === 'deposit' ? 1 : -1 ) * money
                }
            ]
        })
    }

    render() {
        return (
            <div>
                <InputBox calculate={this.calculate}/>
                <AccountList accountData={this.state.accountData}/>
            </div>
        );
    }
}
export default App;