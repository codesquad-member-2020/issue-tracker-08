import { handleActions } from "redux-actions";

import axios from "axios";

function getIssueAPI() {
  console.log("getPostApi");
  return axios.get(`http://13.209.122.123/api/issues`);
}

const GET_ISSUE_PENDING = "GET_ISSUE_PENDING";
const GET_ISSUE_SUCCESS = "GET_ISSUE_SUCCESS";
const GET_ISSUE_FAILURE = "GET_ISSUE_FAILURE";

export const getIssue = () => () => {
  console.log("/.kldjkfjlsf");
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: GET_ISSUE_PENDING });

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getIssueAPI()
    .then((response) => {
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_ISSUE_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: GET_ISSUE_SUCCESS,
        payload: response,
      });
      console.log(response);
    })
    .catch((error) => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_ISSUE_FAILURE 액션을 디스패치합니다.
      dispatch({
        type: GET_ISSUE_FAILURE,
        payload: error,
      });
      console.error(error);
    });
};

const initialState = {
  pending: false,
  error: false,
  data: {
    title: "",
    body: "",
  },
};

export default handleActions(
  {
    [GET_ISSUE_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_ISSUE_SUCCESS]: (state, action) => {
      const { title, body } = action.payload.data;

      return {
        ...state,
        pending: false,
        data: {
          title,
          body,
        },
      };
    },
    [GET_ISSUE_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState
);
