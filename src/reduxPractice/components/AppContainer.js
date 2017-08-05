import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';
import { connect } from 'react-redux';
import backAction from '../actions/bankAction';

const mapStateToProps = state =>({
    //state가 props로 변환된 데이터들.
    accountData : state.accountData
});
/*위의 함수와 같은 형태-함수안에서 객체를 return 밖에 없을경우는 위와 같이 사용함
const mapStateToProps = function(){
    return {

    }
}*/

// const backActions = {
//     deposit : money=>({
//         type : 'DEPOSIT_MONEY',
//         money
//     }),
//     withdraw : money=>({
//         type : 'WITHDRAW_MONEY',
//         money
//     })
// }

const mapDispatchToProps = dispatch =>({
    //메소드( action을 dispatch하는 메소드) 들.
    calculate : (type,money) => dispatch(backAction[type](money))
    /*
    calculate : (type,money) => {
        if(type==='deposit'){
            dispatch({
                type : 'DEPOSIT_MONEY',
                money
            });
        } else {
            dispatch({
                type : 'WITHDRAW_MONEY',
                money
            });
        }
    }*/

});

class App extends React.Component{
    // calculate = (type, money) => {
    //     money = money * 1;
    //     const prevAccount =this.props.accountData;
    //     const prevLength = prevAccount.length;
    //     const lastResult = prevLength ? (prevAccount[prevLength-1].result) : 0;
    //     this.setState({
    //         accountData : [
    //             ...this.props.accountData, {
    //                 type,
    //                 money,
    //                 result:lastResult + (type === 'deposit' ? 1 : -1) * money
    //             }
    //         ]
    //     });
    // }
    render(){
        const {
            calculate,
            accountData
        } = this.props;
        return(
            <div>
                <InputBox
                    calculate={calculate}
                />
                <AccountList
                    accountData = {accountData}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
