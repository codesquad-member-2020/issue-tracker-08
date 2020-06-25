import { startLoading, finishLoading } from "@Modules/loading";

const createRequestThunk = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      console.log(response);
      dispatch({
        type: SUCCESS,
        payload: response,
      });
      dispatch(finishLoading(type));
    } catch (e) {
      console.log(e);
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      dispatch(startLoading(type));
    }
  };
};

export default createRequestThunk;
