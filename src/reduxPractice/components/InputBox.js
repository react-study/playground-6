import React from 'react';

class InputBox extends React.Component {
    // 1번째 방법 ----------------------------------
    deposit = () => {
        this.props.calculate('deposit', this._input.value);
        this._input.value = '';
        this._input.focus();
    }
    withdraw = () => {
        this.props.calculate('withdraw', this._input.value);
        this._input.value = '';
        this._input.focus();
    }
    calc = type => {
        this.props.calculate(type, this._input.value);
        this._input.value = '';
        this._input.focus();
    }

    render() {
        return (
            <div>
                <input type="text"
                    ref={ref => this._input = ref} />
                <button onClick={() => this.calc('desposit')}>입금</button>
                <button onClick={() => this.calc('withdraw')}>출금</button>
            </div>
        )
    }
}

export default InputBox;