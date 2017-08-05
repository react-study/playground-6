const initialState = {
    accountData: []
};

const bankReducer = (prevState = initialState, action) => {
    switch(action.type) {
    case 'DEPOSIT_MONEY':
    case 'WITHDRAW_MONEY':
        const money = action.money * 1;
        const prevAccount = prevState.accountData;
        const prevLength = prevAccount.length;
        const lastResult = prevLength ? (prevAccount[prevLength - 1].result) : 0;

        return {
            accountData: [ ...prevAccount, {
                type: action.type === 'DEPOSIT_MONEY' ? 'deposit' : 'withdraw',
                money,
                result: lastResult + (action.type === 'DEPOSIT_MONEY' ? 1 : -1) * money
            }]
        };
    default:
        return prevState;
    }
};

export default bankReducer;
