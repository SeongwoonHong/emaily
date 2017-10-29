import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import appReducer from './appReducer';
export default combineReducers({
  app: appReducer,
  auth: authReducer, // all the values are stored in auth in 'state' object
  form: reduxForm,
  surveys: surveysReducer
});
