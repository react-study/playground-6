import React from 'react';

const AccountList = (props) => {
    const accountList = props.accountData.map(({type, money, result}, i) => (
        <tr key={i}>
            <td>{type === 'deposit' ? money : ''}</td>
            <td>{type === 'withdraw' ? money : ''}</td>
            <td>{result}</td>
        </tr>
    ));
    return(
        <table>
            <thead>
            <tr>
                <td>입금</td>
                <td>출금</td>
                <td>계</td>
            </tr>
            </thead>
            <tbody>
                {accountList}
            </tbody>
        </table>
    );
};

export default AccountList;