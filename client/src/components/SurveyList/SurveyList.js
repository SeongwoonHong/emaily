import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import './SurveyList.css';

class SurveyList extends Component {
  componentDidMount = () => {
    this.props.fetchSurveys();
  }
  showModal = () => {

  };
  renderSurveys = () => {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">
              { survey.title }
            </span>
            <p>
              { survey.body }
            </p>
            <p className="right">
              Sent On: { new Date(survey.dateSent).toLocaleDateString() }
            </p>
          </div>
          <div className="card-action">
            <a>Yes: { survey.yes }</a>
            <a>No: { survey.no }</a>
            <i onClick={ this.showModal } className="material-icons right icons">delete</i>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div id="SurveyList">
        { this.renderSurveys() }
      </div>
    );
  }
}
function mapStateToProps({ surveys }) {
  return { surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
