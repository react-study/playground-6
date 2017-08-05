// 만들때마다 그냥 복붙하면 됨

import { createStore } from 'redux';
import bankReducer from './reducers/bankReducer';

const store = createStore(bankReducer);

export default store;