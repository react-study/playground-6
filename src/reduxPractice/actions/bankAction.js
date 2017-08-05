const bankAction = {
    deposit: money => ({
        type: 'DEPOSIT_MONEY',
        money
    }),
    withdraw: money => ({
        type: 'WITHDRAW_MONEY',
        money
    })
};

export default bankAction;
