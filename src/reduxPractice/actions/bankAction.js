const bankAction = {
    changeEffect: () => {
        return dispatch => {
            dispatch({
                type: 'SHOW_EFFECT'
            });
            setTimeout(()=> {
                dispatch({
                    type: 'HIDE_EFFECT'
                });
            }, 2000);
        }
    },
    deposit: money => {
        return dispatch => {
            dispatch(bankAction.changeEffect());
            dispatch({
                type: 'DEPOSIT_MONEY',
                money
            })
        }
    },
    withdraw: money => {
        return dispatch => {
            dispatch(bankAction.changeEffect());
            dispatch({
                type: 'WITHDRAW_MONEY',
                money
            })
        }
    },
};

export default bankAction;
