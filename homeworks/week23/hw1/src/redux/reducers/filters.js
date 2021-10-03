import { FILTER_ALL, FILTER_DONE, FILTER_UNDONE } from "../actionTypes";

const initialState = {
  filter: "all",
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_ALL: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    case FILTER_DONE: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    case FILTER_UNDONE: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
}
