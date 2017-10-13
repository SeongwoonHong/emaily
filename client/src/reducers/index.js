import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer, // all the values are stored in auth in 'state' object
  form: reduxForm,
  surveys: surveysReducer
});
