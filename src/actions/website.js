const setINSData = (insData) => {
  return {
    type: 'SET_INS_DATA',
    payload: {
      insData
    }
  };
};

export default setINSData;
