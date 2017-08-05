const initialState = {
    accountData: []
}
const bankReducer = (prevState = initialState, action) => { //새로운 상태 반환하는 역할
    switch(action.type) {
        case 'DEPOSIT_MONEY':
            const money = action.money * 1; // action.money로 바뀐것, prevState로 바뀐거 말고는 기존 calculate 함수랑 비슷함
            const prevAccount = prevState.accountData;
            const prevLength = prevAccount.length;
            const lastResult = prevLength ?
            (prevAccount[prevLength -1].result) : 0;

            return {
                accountData: [
                    ...prevAccount, {
                        type: action.type === 'DEPOSIT_MONEY' ? 'deposit' : 'withdraw',
                        money,
                        result: lastResult + money
                    }
                ]
            };

        case 'WITHDRAW_MONEY':

        default:
            return prevState;
    }
}

export default bankReducer;


/*
action = {
    type: 'DEPOSIT_MONEY',
    money: money
}
*/