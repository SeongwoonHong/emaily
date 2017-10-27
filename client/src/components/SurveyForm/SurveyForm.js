import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../SurveyField/SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from '../SurveyField/formFields';
import './style.css';

class SurveyForm extends Component {
  componentDidMount = () => {

  }
  renderFields() {
    return _.map(formFields, ({ label, name }, index) => {
      return <Field // if redux form finds an error in error object below (inside validate function), it's error message is passed to custom component as prop named 'meta'. in this case surveyfield
                component={SurveyField}
                type="text"
                label={label}
                name={name}
                key={name}
                index={index / (index + 5)}
              />
    });
  }
  render() {
    return (
      <div id="survey-form">
        <form onSubmit={ this.props.handleSubmit(this.props.onSurveySubmit) }>
          { this.renderFields() }
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">forward</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients= validateEmails(values.recipients || '', true);
  errors.sender = validateEmails(values.sender || '');
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors; // if it returns empty object, reduxform will know that there is no error
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
