import React from 'react';
import {getAuthUrl} from '../services/SpotifyService.js';

export default class LoginButton extends React.Component{
  constructor(props){
    super(props);
  }

  render() { return (
      <div className="login-container">
          <a className="login-button" href={'/auth_url'}>
            <img className="login-icon"></img>
            Show me the line-up
          </a>
      </div>
    );
  }
}