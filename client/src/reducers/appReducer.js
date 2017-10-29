import * as types from '../actions/types';
const initialState = {
    modal: {
        showModal: false
    }
};

export default function(state = initialState.modal, action) {
  switch (action.type) {
    case types.TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      }
    default:
      return state;
  }
}
