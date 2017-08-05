const bankActions = {
    deposit: money => ({
        type: 'DEPOSIT_MONEY',
        money
    }), // action을 반환하는 함수. actionCreator
    withdraw: money => ({
        type: 'WITHDRAW_MONEY',
        money
    })
}

export default bankActions;