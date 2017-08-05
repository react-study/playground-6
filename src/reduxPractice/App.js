import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';

class App extends React.Component{
    state = {
        accountData :[]
    };
    // deposit(money){
    //     //암묵적 형변환
    //     money = money * 1;
    //     const prevAccount =this.state.accountList;
    //     const prevLength = prevAccount.length;
    //     const lastResult = prevLength ? (prevAccount[prevLength-1].result) : 0;
    //     this.setState({
    //         accountData : [
    //             ...this.state.accountData, {
    //                 type: 'deposit',
    //                 money,
    //                 result:lastResult + money
    //             }
    //         ]
    //     });
    // }
    // withdraw(money){
    //     money = money * 1;
    //     const prevAccount =this.state.accountList;
    //     const prevLength = prevAccount.length;
    //     const lastResult = prevLength ? (prevAccount[prevLength-1].result) : 0;
    //     this.setState({
    //         accountData : [
    //             ...this.state.accountData, {
    //                 type: 'deposit',
    //                 money,
    //                 result:lastResult - money
    //             }
    //         ]
    //     });
    // }
    calculate = (type, money) => {
        money = money * 1;
        const prevAccount =this.state.accountData;
        const prevLength = prevAccount.length;
        const lastResult = prevLength ? (prevAccount[prevLength-1].result) : 0;
        this.setState({
            accountData : [
                ...this.state.accountData, {
                    type,
                    money,
                    result:lastResult + (type === 'deposit' ? 1 : -1) * money
                }
            ]
        });
    }
    render(){
        return(
            <div>
                <InputBox
                    calculate={this.calculate}
                />
                <AccountList
                    accountData = {this.state.accountData}
                />
            </div>
        )
    }
}

export default App;
