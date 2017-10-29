import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router';
import SpanAnimatedText from '../SpanAnimatedText/SpanAnimatedText';
import formFields from '../SurveyField/formFields';
import * as actions from '../../actions';
import './style.css';

class SurveyFormReview extends Component {
  render() {
    const { onCancel, formValues, submitSurvey, history } = this.props;

    const reviewFields = _.map(formFields, ({ name, label}, index) => {
      return (
        <div key={name} style={{'fontWeight': 'bold'}}>
          <SpanAnimatedText
            key={ name }
            text={ label }
            didMount
            delay={ index / 10 }
          />
          <div style={{'color': '#009688'}}>
            <SpanAnimatedText
              key={ name }
              text={ formValues[name] }
              didMount
              delay={ index / 10 }
              fontSize= '1rem'
            />
          </div>
        </div>
      );
    })
    return (
      <div id="survey-form-review">
        <h5>Please confirm your entries</h5>
        { reviewFields }
        <button className="red btn-flat left white-text" onClick={ onCancel }>
          Back
        </button>
        <button
          onClick={ () => submitSurvey(formValues, history) }
          className="teal btn-flat right white-text">
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
