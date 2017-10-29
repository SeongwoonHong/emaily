import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import animate from 'gsap-promise';
import * as actions from '../../actions';
import Payments from '../Payments/Payments';
import './style.css';

class Header extends Component {
  componentDidMount = () => {
    animate.from(this.component, 0.5, { autoAlpha: 0});
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login With Google</a></li>
        );
      default:
        return (
          [
            <li key="1"><Payments /></li>,
            <li key="3" style={{ margin: '0 10px'}}>
              Credits: { this.props.auth.credits }
            </li>,
            <li key="2"><a href="/api/logout">Logout</a></li>
          ]
        );
    }
  }
  render() {
    return (
      <nav id="header" ref={ el => this.component = el }>
        <div className="nav-wrapper">
          <Link
            to={ this.props.auth ? '/surveys' : '/' }
            className="left brand-logo logo"
          >
            <i className="material-icons">mail_outline</i>
          </Link>
          <ul className="right">
            { this.renderContent() }
            <li><i className="material-icons help" onClick={ this.props.toggleModal }>help</i></li>
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) { // or (state) and auth: state.auth
  return { auth };
}
export default connect(mapStateToProps, actions)(Header);
