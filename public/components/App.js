import React from 'react';
import ReactDom from 'react-dom';

import AccountBook from "components/AccountBook";
import InputBox from "components/InputBox";

class App extends React.Component{
	constructor(){
		super();
		this.state ={
			account: {
				deposit:0,
				withdraw:0,
				total:0
			},
			money:""
		}
	}
	getUserMoney = (param) =>{
		this.setState({
			money : param
		})
	}

	depositUserAsset = ()=>{
		let confirmMessage = confirm("입금하시겠습니다?");
		if(!confirmMessage){
			return false;
		}
		const money = parseInt(this.state.money);
		const totalDeposit = parseInt(this.state.account.deposit);
		const userAsset = parseInt(this.state.account.total);
		const userWithdraw = this.state.account.withdraw;
		this.setState({
			account:{
				deposit : totalDeposit + money,
				withdraw :userWithdraw,
				total : userAsset + money
			},
			money :""
		});
	}

	withDrawUserAsset= ()=>{
		let confirmMessage = confirm("출금하시겠습니다?");
		if(!confirmMessage){
			return false;
		}
		const money = parseInt(this.state.money);
		const userDeposit = this.state.account.deposit;
		const userAsset = parseInt(this.state.account.total);
		const userWithdraw = parseInt(this.state.account.withdraw);
		if(money > userAsset){
			alert("출금할 잔액이 부족합니다.");
			this.setState({
				money :""
			})
			return false;
		}
		this.setState({
			account:{
				deposit : userDeposit,
				withdraw :userWithdraw + money,
				total : userAsset - money
			},
			money :""
		})
	}

	render(){
		return(
			<div>
				<AccountBook
					account = {this.state.account}
				/>
				<InputBox
					depositUserAsset = {this.depositUserAsset}
					withDrawUserAsset = {this.withDrawUserAsset}
					getUserMoney = {this.getUserMoney}
					money ={this.state.money}
				/>
			</div>
		)
	}
}
export default App;
