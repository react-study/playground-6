import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';

const mapStateToProps = state => ({
    // state가 props로 변환된 데이터들
    accountData:  ???
})
const mapDispatchToProps = dispatch => ({
    // 메소드(action을 dispatch하는 메소드)들
    calculate: (type, money) => dispatch({ //dispatch는 액션객체을 날린다.

    })
})

class AppContainer extends React.Component {

    // 2번째 방법 ---------------------------------------------------
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

    render() {
        return (
            <div>
                <InputBox calculate={this.props.calculate}/>
                <AccountList accountData={this.props.accountData}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);