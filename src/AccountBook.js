import React from 'react';

class AccountBook extends React.Component {

    render(){
        const {
            accounts
        } = this.props;
        return(
            <div className="dataTable">
                <table>
                    <thead>
                        <tr>
                            <td>입금</td>
                            <td>출금</td>
                            <td>잔액</td>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(({status, money, total}, i) => (
                            <tr key={i}>
                                <td>{status === 'deposit' ? money : ''}</td>
                                <td>{status === 'withdrawal' ? money : ''}</td>
                                <td>{total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default AccountBook;