const initialState = {
  focused: null
}

const tabReducer = (state = initialState, action) => {
  switch(action.type){
    case 'CHANGE_TAB': return {
      focused: action.focused

    }
    default: return state;

  }
}

export default tabReducer;
