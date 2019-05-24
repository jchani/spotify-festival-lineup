import React from 'react';
import { getTopArtists, getName} from '../services/SpotifyService.js';
import {Button, Modal } from 'react-bootstrap';

export default class Results extends React.Component {
  constructor(props){
    super(props);
    this.populateModal = this.populateModal.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.handleClose = this.handleClose.bind(this);
    debugger;
    this.state = {
      artists: undefined,
      modalOpen: false,
      name: '',
      festivalNamePrefixes: props.festivalNamePrefixes,
      festivalNameSuffixes: props.festivalNameSuffixes
    };
  }

  populateModal(term) {
    getTopArtists(this.props.token, term).then(response => {
      this.setState({
        artists: response.data.items.map(x => x.name),
        modalOpen: true
      });
    });
    getName(this.props.token).then(response => {
      this.setState({
        name: response.data.display_name
      })
    });
  }

  getRandom(list) {
    let index = Math.floor(Math.random() * Math.floor(list.length));
    return list[index];
  }

handleClose() {
  this.setState({modalOpen: false})
}
  render() {    return (
      <div>
        <button className="left-button" onClick={(e) => {
          this.populateModal("short_term");
        }}>
          Last Month
        </button>
        <button className="middle-button" onClick={(e) => {
          this.populateModal("medium_term");
        }}>
          Last 6 Months
        </button>
        <button className="right-button" onClick={(e) => {
          this.populateModal("long_term");
        }}>
          All Time
        </button>

        <Modal show={this.state.modalOpen} onHide={this.handleClose} closeButton>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            {this.state.name != '' &&
             <div>
              {`${this.state.name}
              's ${this.getRandom(this.state.festivalNamePrefixes)}${this.getRandom(this.state.festivalNameSuffixes)}`}
             </div>}
            {this.state.artists && <div>{this.state.artists}</div>}
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}