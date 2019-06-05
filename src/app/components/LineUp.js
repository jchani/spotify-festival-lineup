import React from 'react';

export default class LineUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      artists: props.artists
    };
    this.renderBottomRow = this.renderBottomRow.bind(this);
  }

  renderBottomRow(fromIndex, toIndex) {
    return (
      <div className='row row4'>
        {this.state.artists.slice(fromIndex, toIndex).map((artist, i) => {
          return (
            <div key={i}>
              {artist}
            </div>
          )
        }
       )}
      </div>
    );
  }

  render() {
    return (
      <div className='vertical-flow'>
        <div className='row row1'>{this.state.artists[0]}</div>
        <div className='row row2'>
          <div>{this.state.artists[1]}</div>
          <div>{this.state.artists[2]}</div>
        </div>
        <div className='row row3'>
          <div>{this.state.artists[3]}</div>
          <div>{this.state.artists[4]}</div>
          <div>{this.state.artists[5]}</div>
        </div>
        {this.renderBottomRow(6,11)}
        {this.renderBottomRow(11,16)}
        {this.renderBottomRow(16,21)}
      </div>
    );
  }
}