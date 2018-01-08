import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import TransitionGroup from 'react-transition-group-plus';
import classnames from 'classnames';
import * as actions from '../../actions';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import SurveyNew from '../SurveyNew/SurveyNew';
import NoCredits from '../NoCredits/NoCredits';
import NotFound from '../NotFound/NotFound';
import HowTo from '../HowTo/HowTo';
import Login from '../Login/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: {}}
  }
  componentDidMount() {
    this.props.fetchUser()
      .then((data) => {
        this.setState({ auth: data.payload });
      });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={ Dashboard } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/surveys" render={()=> <Dashboard auth={this.state.auth} /> } />
            <Route path="/surveys/new" component={ SurveyNew } />
            <Route path="*" component={NotFound} />
          </Switch>
          <HowTo toggleModal={this.props.toggleModal} className={classnames({'appear': this.props.app.showModal})}/>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    auth: state.auth
  };
}
// auth를 스토어에서 못가져오는게.. 초기 설정을 못해줘서 렌더 되자마자 undefined로 나오는거같음.. 잘 모르겟음 해결방법을.그래서 state로함.
export default connect(mapStateToProps, actions)(App);
