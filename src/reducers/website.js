const initialState = {
  mainMenuIsActive: false
};

const websiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INS_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default websiteReducer;
