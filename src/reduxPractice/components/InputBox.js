import React from 'react';
class InputBox extends React.Component {
    calc = type => {
        this.props.calculate(type, this._input.value);
        this._input.value = '';
        this._input.focus();
    }
    render() {
        return (
            <div style={{margin: 20}}>
                <input type="text"
                    ref={ref => {
                        this._input = ref;
                    }}
                />
                <button
                    style={{
                        display: 'inline-block',
                        marginLeft: 5,
                        border: '1px solid #000'
                    }}
                    onClick={() => this.calc('deposit')}>입금</button>
                <button
                    style={{
                        display: 'inline-block',
                        marginLeft: 5,
                        border: '1px solid #000'
                    }}
                    onClick={() => this.calc('withdraw')}>출금</button>
            </div>
        );
    }
}

export default InputBox;
