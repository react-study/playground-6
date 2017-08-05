import React from 'react';
import InputBox from './InputBox';
import AccountList from './AccountList';

class App extends React.Component {
    state = {
        accountData: []
    };
    render() {
        return (
            <div>
                <Input/>
                <AccountList accountData={this.state.accountData}/>
            </div>
        );
    }
}
export default App;