import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

class NoCredits extends Component {
  render() {
    return (
      <div id="no-credits"className="row">
        <div className="col s12 m12">
          <div className="card-panel indigo">
            <span className="white-text">
              You need to have at least 1 credit to make a survey.
              Try to add credits !
            </span>
          </div>
          <Link className="waves-effect waves-light btn red" to="/surveys">Go Back</Link>
        </div>
      </div>
    );
  }
}
NoCredits.defaultProps = {

};

NoCredits.propTypes = {

};
export default NoCredits;
