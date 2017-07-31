import React from 'react';

class InputBox extends React.Component{
    deposit() {
        this.props.depositAccount(this._inputDom.value);
        this._inputDom.value = '';
    }
    withdrawal() {
        this.props.withdrawalAccount(this._inputDom.value);
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