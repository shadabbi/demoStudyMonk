import axios from "axios";

export const setQuestions = (data) => {
  return {
    type: "SET__QUESTIONS",
    payload: data,
  };
};

export const fetchQuestionsAsync = (page) => {
  return (dispatch) => {
    axios
      .get(
        `https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page=${page}`
      )
      .then((res) => {
        const data = res.data.items;
        console.log(data);
        dispatch(setQuestions(data));
      });
  };
};
