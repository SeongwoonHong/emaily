import React from 'react';
import animate from 'gsap-promise';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class SpanAnimatedText extends React.Component {
  componentDidMount = () => {
    if(this.props.didMount) {
      const animateText = [...this.component.querySelectorAll('.animate-text')];
      animate.set(animateText, { autoAlpha: 0 }).then(() => {
        animate.staggerTo(animateText, 0.7, { autoAlpha: 1, delay: this.props.delay}, 0.05);
      });
    }
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }

  animateIn = () => {
    const animateText = [...this.component.querySelectorAll('.animate-text')];
    return animate.staggerFrom(animateText, 0.05 , { autoAlpha: 0}, 0.01);
  }
  getSpanText = (text) => {
    return text.split('').map((txt, i) => {
      return (
        <span
          style={
            this.props.didMount
            ? this.props.isTitle
              ? { fontWeight: 'bold', fontSize: '30px' }
              : { fontSize: this.props.fontSize || '0.8rem', 'color': this.props.color }
            : null }
          key={`${txt}+${i}`}
          className={`animate-text txt-${i}`}
        >
          { txt }
        </span>
      );
    })
  }
  render() {
    return (
      <div style={ this.props.style } className={classnames('SpanAnimatedText', this.props.className)} ref={el => this.component = el}>
          { this.getSpanText(this.props.text) }
      </div>
    );
  }
}
SpanAnimatedText.defaultProps = {

};

SpanAnimatedText.propTypes = {
  didMount: PropTypes.bool,
  isTitle: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.string,
  delay: PropTypes.number
};
