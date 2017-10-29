import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from '../SurveyList/SurveyList';
import './style.css';

class Dashboard extends React.Component {
  render() {
    return (
      <div id="dashboard">
        <SurveyList />
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
