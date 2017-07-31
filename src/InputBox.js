import React from 'react';

class InputBox extends React.Component{
    deposit() {
        const money = this._inputDom.value;
        if(!money || money < 0) return;
        this.props.depositAccount(money);
        this._inputDom.value = '';
    }
    withdrawal() {
        const money = this._inputDom.value;
        if(!money || money < 0) return;
        this.props.withdrawalAccount(money);
        this._inputDom.value = '';
    }
    render(){
        return(
            <div>
                <input
                    placeholder="숫자를 입력하세요."
                    type="number"
                    ref= {ref => {
                        this._inputDom = ref;
                    }}
                />
                <button
                    onClick={() => this.deposit()}
                >입금</button>
                <button
                    onClick={() => this.withdrawal()}
                >출금</button>
            </div>
        )
    }
}

export default InputBox;