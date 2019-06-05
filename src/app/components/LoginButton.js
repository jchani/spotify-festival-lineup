import React from 'react';

export default class LoginButton extends React.Component{
  constructor(props){
    super(props);
  }

  render() { return (
      <div className='login-container'>
          <a className='login-button remove-underline' href={'/auth_url'}>
            <img className='login-icon'></img>
            Show me the line-up
          </a>
      </div>
    );
  }
}