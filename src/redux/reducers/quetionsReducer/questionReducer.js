const INIT_STATE = {
  questions: [],
};

const questionsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET__QUESTIONS":
      return {
        ...state,
        questions: [...state.questions, ...action.payload],
      };

    default:
      return state;
  }
};

export default questionsReducer;
