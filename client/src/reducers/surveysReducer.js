import * as types from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case types.FETCH_SURVEYS:
      return action.payload;
    case types.DELETE_SURVEY:
      return action.payload;
    default:
      return state;
  }
}
