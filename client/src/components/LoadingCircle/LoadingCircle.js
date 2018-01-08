import React, { Component } from 'react';

class LoadingCircle extends Component {
  render() {
    return (
      <div className="preloader-wrapper active">
        <div className="spinner-layer" style={ { borderColor: props.color } }>
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
  }
}
export default LoadingCircle;
