import React from 'react';

const Header = (props) => {
  return (
    <div className="header">
      <div className="main">{props.title}</div>
      {props.subtitle && <h6>{props.subtitle}</h6>}
    </div>
  );
}

Header.defaultProps = {
  title : 'The Festival of your Dreams',
  subtitle :'What if all your favorite Spotify artists performed at a music festival?'
}

export default Header;