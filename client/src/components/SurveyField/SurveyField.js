import React, { Component } from 'react';
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';
import SpanAnimatedText from '../SpanAnimatedText/SpanAnimatedText';

class SurveyField extends Component {
  componentDidMount = () => {
    animate.from(this.component, 1, { width: '20%', autoAlpha: 0, delay: this.props.index });
  }

  render() {
    const { input, label, meta: { error, touched }, index, tag} = this.props;
    return (
      <div ref={ el => this.component = el } className="survey-field">
        <SpanAnimatedText
          text={ label }
          didMount
          delay={ index }
        />
        {
          tag === 'textarea'
          ?
            <textarea onFocus={ this.onFocusHandler } onBlur={ this.onBlurHandler } {...input} style={{ marginBottom: '5px', 'color': '#009688'}}/> 
          :
            <input onFocus={ this.onFocusHandler } onBlur={ this.onBlurHandler } {...input} style={{ marginBottom: '5px', 'color': '#009688'}}/>
        }
        <div className="red-text" style={{ height: '35px'}}>
          <TransitionGroup>
            {
              touched &&
              error &&
              <SpanAnimatedText
                text={ error }
                didMount={ false }
              />
            }
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default SurveyField;
