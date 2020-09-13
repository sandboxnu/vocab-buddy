import { types } from './actions';

const initialState = {
  courses: [],
  isFetchingCourses: false,
  isSnackBarOpen: false
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case types.REQUEST_FOR_COURSES_REQUEST:
      return {
        ...state,
        isFetchingCourses: true,
      }
    case types.REQUEST_FOR_COURSES_SUCCESS:
      return { 
       ...state, 
       courses: payload.response, 
       isFetchingCourses: false,
      };
    case types.REQUEST_FOR_COURSES_ERROR:
      return {
        ...state,
        isFetchingCourses: false,
        isSnackBarOpen: true,
      }
    case types.REQUEST_TO_SORT_REQUEST:
      return {
        ...state,
        isFetchingCourses: true,
        isSnackBarOpen: false,
      }
    case types.REQUEST_TO_SORT_SUCCESS:
      return {
        ...state,
        courses: payload.response,
        isFetchingCourses: false,
      }
    case types.REQUEST_TO_SORT_ERROR:
      return {
        ...state,
        isFetchingCourses: false,
        isSnackBarOpen: true,
        }
    default: 
         return state;
  }
 };

export const getCourses = (state) => {
  return state.courses;
}

export const getIsFetchingCourses = (state) => {
  return state.isFetchingCourses;
}

export const getIsSnackBarOpen = (state) => {
  return state.isSnackBarOpen;
}

export default reducer;
