import React from "react";
import ReactDom from "react-dom";

class InputBox extends React.Component{
	getUserInputAsset=(e)=>{
		if(!e.target.value){
			return false;
		} else if(e.target.value <0){
			alert("입/출금할 금엑을 정확히 입력해주세요.");
			return false;
		}
	}

	userControllTextBox = (e) =>{
		this.props.getUserMoney(e.target.value);
	}

	render(){
		return(
			<div className="input-box">
				<input
					type="number"
					onBlur={e=>this.getUserInputAsset(e)}
					value={this.props.money}
					onChange={e=>this.userControllTextBox(e)}
					placeholder="입금할 금액을 입력해주세요."
				/>
				<button
					type="button"
					onClick={this.props.depositUserAsset}
				>입금</button>
				<button
					type="button"
					onClick={this.props.withDrawUserAsset}
				>출금</button>
			</div>
		)
	}
}
export default InputBox;
