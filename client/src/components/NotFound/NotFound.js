import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

class NotFound extends Component {
  render() {
    return (
      <div className="row" id="not-found">
       <div className="col s12 m12">
         <div className="card blue-grey darken-1">
           <div className="card-content white-text">
             <span className="card-title">Page Not Found <i className="material-icons">pan_tool</i></span>
             <p>Sorry, We don't have any page for this URL. Try to go main page</p>
           </div>
           <div className="card-action">
             <Link to="/"><i className="material-icons">home</i> Main page</Link>
           </div>
         </div>
       </div>
     </div>

    );
  }
}

export default NotFound;
