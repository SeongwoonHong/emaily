import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SurveyList from '../SurveyList/SurveyList';
import './style.css';

class Dashboard extends React.Component {
  render() {
    const addBtn = (
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
    return (
      <div id="dashboard">
        <SurveyList />
        {
          this.props.auth && addBtn
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Dashboard);
