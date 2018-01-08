import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group-plus';
import { fetchSurveys, deleteSurvey } from '../../actions';
import SurveyItem from '../SurveyItem/SurveyItem';
import './style.css';

class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchDone: false
    };
  }
  componentDidMount = () => {
    this.props.fetchSurveys()
      .then(() => this.setState({ isFetchDone: true }));
  }

  renderSurveys = () => {
    return this.props.surveys.map((survey, index) => {
      return (
        <SurveyItem
          index={ survey._id }
          title={ survey.title }
          body={ survey.body }
          yes={ survey.yes }
          no={ survey.no }
          dateSent={ survey.dateSent }
          key={ survey._id }
          onDeleteHandler={ this.props.deleteSurvey }
          totalNumber={ survey.totalNumber }
        />
      );
    });
  }
  noSurveys = () => {
    return (
      <div id="SurveyItem" className="card darken-1">
        <div className="card-content">
          <span className="card-title">
            There is no survey that you have created
          </span>
          <p>
            Try to create a new survey!
          </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="surveyList">
        <TransitionGroup component="div">
          {
            this.state.isFetchDone && this.props.surveys.length === 0
            ? this.noSurveys()
            : this.renderSurveys()
          }
        </TransitionGroup>
      </div>
    );
  }
}
function mapStateToProps({ surveys }) {
  return { surveys }
}
SurveyList.defaultProps = {
  fetchSurveys: () => console.warn('fetchSurveys is not defined'),
  surveys: []
};

SurveyList.propTypes = {
  fetchSurveys: PropTypes.func,
  surveys: PropTypes.array
};
export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);
