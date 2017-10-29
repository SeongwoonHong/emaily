import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SurveyForm from '../SurveyForm/SurveyForm';
import SurveyFormReview from '../SurveyFormReview/SurveyFormReview';
import NoCredits from '../NoCredits/NoCredits';

class SurveyNew extends Component {
  constructor(props) {
    super(props);
    this.state = { showFormReview: false };
  }

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview
                onCancel={() => this.setState({ showFormReview: false })}
              />;
    }
    if (this.props.auth.credits < 1) {
      return <NoCredits />
    }
    return <SurveyForm
              onSurveySubmit={() => this.setState({ showFormReview: true })}
            />
  }

  render() {
    return (
      <div>
        { this.renderContent() }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
SurveyNew = connect(
  mapStateToProps,
  null
)(SurveyNew);
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
