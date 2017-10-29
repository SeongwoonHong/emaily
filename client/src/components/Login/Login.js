import React, { Component } from 'react';
import './style.css';

const socialMediaLogin = [
  { name: 'google', displayName: 'google+', link: '/auth/google', bgColor: 'red' },
  { name: 'facebook', displayName: 'facebook', link: '/login', bgColor: 'blue' },
  { name: 'twitter', displayName: 'twitter', link: '/login', bgColor: 'teal' },
]

class Login extends Component {
  render() {
    return (
      <div className="col s12 m7">
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <div id="login">
                {
                  socialMediaLogin.map((item) => {
                    return <a
                            href={item.link}
                            key={item.name}
                            className={`waves-effect waves-light btn ${item.bgColor}`} >
                              { item.displayName }
                            </a>;
                  })
                }
              </div>
            </div>
            <div className="card-action">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
