import React, { Component } from 'react';
import { connect } from 'react-redux';
import animate from 'gsap-promise';
import * as actions from '../../actions';
import './style.css';

class HowTo extends Component {
  componentDidMount = () => {
    console.log('did mount')
  }
  animateIn = () => {
    console.log('animatein')
    animate.from(this.component, 0.5, { autoAlpha: 0, top: '0%'});
  }
  animateOut = () => {
    console.log('leave')
  }
  componentWillAppear = (done) => {
    console.log('will appear')
    this.animateIn().then(done);
  }
  componentWillEnter = (done) => {
    console.log('will enter')
    this.animateIn().then(done);
  }
  componentWillLeave = (done) => {
    this.animateOut().then(done);
  }
  render() {
    return (
      <div className="row" id="howto" ref={ el => this.component = el}>
        <div className="background-overlay" onClick={ this.props.toggleModal } />
        <div className="col s12 m6 howto-card">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title"><i className="material-icons">announcement</i> &nbsp;How To <i className="material-icons close right" onClick={ this.props.toggleModal }>cancel</i></span>
              <p>You are a product owner.</p>
              <p> This is an application where you can send surveys to your customers and collect their responses whether they are satisfied with your product.</p>
              <p>In order to create a survey, 1 credit is required.</p>
            </div>
            <div className="card-action">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(HowTo);
