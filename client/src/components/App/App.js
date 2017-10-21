import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import SurveyNew from '../SurveyNew/SurveyNew';
import NoCredits from '../NoCredits/NoCredits';
import NotFound from '../NotFound/NotFound';

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
          <Route exact path="/" component={ Landing } />
          {/* <Route exact path="/surveys" component={ Dashboard } /> */}
          <Route exact path="/surveys" render={()=> <Dashboard auth={this.state.auth} /> } />
          { this.state.auth.credits > 1 ? <Route path="/surveys/new" component={ SurveyNew } /> : <Route path="/surveys/nocredits" component={ NoCredits } />}
          {/* <Route exact path="*" component={NotFound} /> */}
        </div>
      </BrowserRouter>
    );
  }
}
// auth를 스토어에서 못가져오는게.. 초기 설정을 못해줘서 렌더 되자마자 undefined로 나오는거같음.. 잘 모르겟음 해결방법을.그래서 state로함.
export default connect(null, actions)(App);
