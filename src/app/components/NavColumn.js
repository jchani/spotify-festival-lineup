import React from 'react';
import {logOut} from '../services/SpotifyService.js';

export default class NavColumn extends React.Component{
  constructor(props){
    super(props);
  }

  render() { return (
      <div className='nav-bar'>
        <div className='vertical-flow'>
          <a className="remove-underline" target="_blank" href={'https://github.com/jchani/spotify-festival-lineup'}>
            Source Code
          </a>
          {this.props.isLoggedIn && 
            <a className="remove-underline" href='/log_out'>
              Log Out
            </a>
          }
        </div>
      </div>
    );
  }
}