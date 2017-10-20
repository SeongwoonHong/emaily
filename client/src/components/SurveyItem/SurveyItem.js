import React, { Component } from 'react';
import PropTypes from 'prop-types';
import animate from 'gsap-promise';

class SurveyItem extends Component {
  componentDidMount = () => {
    animate.set(this.component, { autoAlpha: 0,width: '50%' }); // console warning!
  }
  animateIn = (delay = 0) => {
    const baseDelay = this.props.index * 0.15 + delay;
    return animate.to(this.component, 0.5, { autoAlpha: 1,width: '100%', delay: baseDelay });
  }
  animateOut = () => {

  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  render() {
    const { title, body, yes, no, dateSent, onDelete } = this.props;
    return (
      <div ref={ el => this.component = el } className={`card darken-1 surveyItem-${this.props.index+1}`}>
        <div className="card-content">
          <span className="card-title">
            { title }
          </span>
          <p>
            { body }
          </p>
          <p className="right">
            Sent On: { new Date(dateSent).toLocaleDateString() }
          </p>
        </div>
        <div className="card-action">
          <a>Yes: { yes }</a>
          <a>No: { no }</a>
          <i onClick={ () => alert('not implemented yet :)') } className="material-icons right icons">delete</i>
        </div>
      </div>
    );
  }
}
SurveyItem.defaultProps = {
  title: 'title',
  body: 'body',
  yes: 0,
  no: 0,
  lastResponded: 'lastResponded',
  onDelete: () => console.warn('onDelete is not defined')
};

SurveyItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  yes: PropTypes.number,
  no: PropTypes.number,
  dateSent: PropTypes.string,
  lastResponded: PropTypes.string,
  onDelete: PropTypes.func
};
export default SurveyItem;
