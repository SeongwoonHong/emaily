import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../SurveyField/SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from '../SurveyField/formFields';
import './style.css';
const possibleAnswers = [
  { label: 'Answer2', name: 'answer2', tag: 'input', allowEmpty: true },
  { label: 'Answer3', name: 'answer3', tag: 'input', allowEmpty: true },
  { label: 'Answer4', name: 'answer4', tag: 'input', allowEmpty: true }
];
let registeredAnswerCount = 1;

class SurveyForm extends Component {
  componentDidMount = () => {

  }
  renderFields() {
    return _.map(formFields, ({ label, name, tag }, index) => {
      return <Field // if redux form finds an error in error object below (inside validate function), it's error message is passed to custom component as prop named 'meta'. in this case surveyfield
                component={SurveyField}
                type="text"
                label={label}
                name={name}
                key={name}
                tag={tag}
                index={index / (index + 5)}
              />
    });
  }
  addFormField = () => {
    if (registeredAnswerCount < 4) {
      formFields.push(possibleAnswers[registeredAnswerCount-1]);
      ++registeredAnswerCount;
      this.forceUpdate();
    }
  }
  removeFormField = () => {
    console.log(registeredAnswerCount);
    if (registeredAnswerCount >= 2) {
      formFields.pop();
      --registeredAnswerCount;
      this.forceUpdate();
    }
  }
  render() {
    return (
      <div id="survey-form">
        <form onSubmit={ this.props.handleSubmit(this.props.onSurveySubmit) }>
          { this.renderFields() }
          <div style={{}}>
            {
              registeredAnswerCount < 4
              ?
                <i
                  className="material-icons"
                  onClick={this.addFormField}
                >
                  add
                </i>
                : null
            }
            <i
              className="material-icons"
              onClick={this.removeFormField}
            >
              remove_circle_outline
            </i>
          </div>
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
  _.each(formFields, ({ name, allowEmpty = false }) => {
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
