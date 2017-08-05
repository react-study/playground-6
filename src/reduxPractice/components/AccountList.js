import React from 'react';

const AccountList = (props) =>{
    const accountList = props.accountData.map(({type,money,result},i)=>(
        <tr key={i}>
            <td>{type ==="deposit"? money : ''}</td>
            <td>{type ==="withdraw"? money : ''}</td>
            <td>{result}</td>
        </tr>
    ));
    return (
        <table>
            <thead>
                <tr>
                    <th>입금</th>
                    <th>출금</th>
                    <th>계</th>
                </tr>
            </thead>
            <tbody>
                {accountList}
            </tbody>
        </table>

    )
}

export default AccountList
