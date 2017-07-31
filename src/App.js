import React from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            accounts: [],
            finalTotal: 0
        }
    }

    depositAccount = money => {
        const newFinalTotal = parseInt(this.state.finalTotal) + parseInt(money);
        const newAccounts = [...this.state.accounts,{
            status: "deposit",
            money,
            total: newFinalTotal
        }]
        this.setState({
            accounts: newAccounts,
            finalTotal: newFinalTotal
        })
    }
    withdrawalAccount = money => {
        const newFinalTotal = parseInt(this.state.finalTotal) - parseInt(money);
        if(newFinalTotal < 0) throw '잔액이 부족합니다.'
        const newAccounts = [...this.state.accounts,{
            status: "withdrawal",
            money,
            total: newFinalTotal
        }]
        this.setState({
            accounts: newAccounts,
            finalTotal: newFinalTotal
        })
    }

    render(){

        return(
            <div className="Bank-app">
                <InputBox
                    depositAccount={this.depositAccount}
                    withdrawalAccount={this.withdrawalAccount}
                />
                <AccountBook
                    accounts={this.state.accounts}
                />
            </div>
        )
    }
}
export default App;
