import React from 'react';

const LoginButton = (props) => {
  const authEndpoint = 'http://accounts.spotify.com/authorize';
  const responseType = encodeURIComponent('code');
  const clientId = encodeURIComponent('569b69dd5ce3475887487257eeca0cbc');
  const scope = encodeURIComponent('user-read-recently-played user-top-read user-read-email');
  const redirectUri = encodeURIComponent('http://localhost:8080/callback');

  const loginUrl = `${authEndpoint}?response_type=${responseType}` + 
                   `&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  

  return (
    <div className="login-container">
        <a className="login-button" href={loginUrl}>
          <img className="login-icon"></img>
          Show me the line-up
        </a>
    </div>
  );
}

export default LoginButton;