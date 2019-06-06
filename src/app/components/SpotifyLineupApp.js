import React from 'react';
import Header from './Header';
import LoginButton from './LoginButton';
import NavColumn from './NavColumn';
import Results from './Results';
import {Card} from 'react-bootstrap';
import { refreshToken } from '../services/SpotifyService';

class SpotifyLineupApp extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      festivalNamePrefixes: props.festivalPrefixes,
      festivalNameSuffixes : props.festivalSuffixes,
      token: ''
    };

    this.setToken = this.setToken.bind(this);
  }

  componentDidMount(){
    //TODO: store the token somewhere that isn't a cookie? 
    const tokenCookie = document.cookie.match(/token=([^;]*).*$/);
    const refreshCookie = document.cookie.match(/refresh=([^;]*).*$/);
    const name = document.cookie.match(/name=([^;]*).*$/);
    const token = tokenCookie ? tokenCookie[1] : null;
    const refresh =  refreshCookie ? refreshCookie[1] : null;

    if (token && token != 'undefined') {
      this.setToken(token);
    } else if (!token && refresh) {
      refreshToken(refresh).then(response => {
        this.setToken(response.data.access_token)
      });
    } else {
      return null;
    }
  }

  setToken(token) {
    this.setState({ token: token });
  }

  render(){
    const { token } = this.state;

    return (
      <div className='background'>
        <NavColumn isLoggedIn={token && token != 'undefined'}/>
        <div className='card'>
          <Header/>
          {token && token != 'undefined' &&
           <Results
            token={this.state.token}
            festivalNamePrefixes={this.state.festivalNamePrefixes}
            festivalNameSuffixes={this.state.festivalNameSuffixes}/>}
          {!token && <LoginButton />}
        </div>
      </div>
    );
  }
}

SpotifyLineupApp.defaultProps = {
  festivalPrefixes: ['Ultra', 'Lolla', 'Electric', 'Burning', 'Warped', 'Tomorrow', 'Space',
                     'Time Warp', 'Outside', 'Dirty Bird', 'Lightning', 'Fire'],
  festivalSuffixes: ['palooza', ' Daisy Carnival', 'lands', ' Forest', ' Fields', ' Zoo',
                     ' Man', 'fest', ' Campout', ' in a Bottle', ' Cruise'],
  options: []
}

export default SpotifyLineupApp;