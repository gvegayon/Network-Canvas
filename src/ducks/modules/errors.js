/* eslint-disable max-len */

import { actionTypes as errorActionTypes } from './protocol';

const ACKNOWLEDGE_ERROR = 'ERRORS/ACKNOWLEDGE_ERROR';

const initialState = {
  errors: [],
  acknowledged: true,
};

const getErrorMessage = (error) => {
  if (error && error.message) return error.message;
  return error.toString();
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case errorActionTypes.DOWNLOAD_PROTOCOL_FAILED:
    case errorActionTypes.IMPORT_PROTOCOL_FAILED:
    case errorActionTypes.LOAD_PROTOCOL_FAILED:
      console.error(action.error); // eslint-disable-line
      return {
        ...state,
        acknowledged: false,
        errors: [...state.errors, getErrorMessage(action.error)],
      };
    case ACKNOWLEDGE_ERROR:
      return {
        ...state,
        acknowledged: true,
      };
    default:
      return state;
  }
}

const acknowledge = () => ({
  type: ACKNOWLEDGE_ERROR,
});

const actionCreators = {
  acknowledge,
};

const actionTypes = {
  ACKNOWLEDGE_ERROR,
};

export {
  actionCreators,
  actionTypes,
};