import React from "react";
import ReactDom from "react-dom";

class AccountBook extends React.Component{
	render(){
		return(
			<table>
				<thead>
					<tr>
						<th>입금</th>
						<th>출금</th>
						<th>잔액</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{this.props.account.deposit}</td>
						<td>{this.props.account.withdraw}</td>
						<td>{this.props.account.total}</td>
					</tr>
				</tbody>
			</table>
		)
	}
}

export default AccountBook;
