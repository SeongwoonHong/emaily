import React, { Component } from 'react';
import { connect } from 'react-redux';
import animate from 'gsap-promise';
import classnames from 'classnames';
import * as actions from '../../actions';
import './style.css';

class HowTo extends Component {
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
  onClickHandler = () => {
    if (!this.timeout) {
      this.props.toggleModal();
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.timeout = null;
      }, 2000);
    }
  }
  render() {
    return (
      <div className={classnames('row', this.props.className)} id="howto" ref={ el => this.component = el}>
        <div className="background-overlay" onClick={ this.onClickHandler } />
        <div className="col s12 m6 howto-card">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title"><i className="material-icons">announcement</i> &nbsp;How To <i className="material-icons close right" onClick={ this.onClickHandler}>cancel</i></span>
              <p>You are a product owner.</p>
              <p>This is an application where you can send surveys (questions) to your customers and they participate your surveys by answering either YES or NO.</p>
              <p>Their responses will be represented on your survey cards once they answer it.</p>
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
