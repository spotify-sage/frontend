import React, { Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import Slider from '@material-ui/core/Slider';
import api from '../../services/api';

import './styles.css'

const SweetAlert = withSwalInstance(swal);

export default class Dashboard extends Component {
  state = {
    value: 25,
    authenticated: false,
    message: 0,
    html: '',
    playlistUrl: ''
  }

  async componentDidMount() {
    const response = await api.get(`/session?access_token=${localStorage.getItem('access_token')}&refresh_token=${localStorage.getItem('refresh_token')}`)
      .catch(() => window.location.replace('/'));

    const { authenticated } = response.data

    if (!authenticated) return window.location.replace('/');
    else {
      this.setState({ authenticated })
    }
  };

  generatePlaylist = () => {
    this.setState({ message: 1 })

    api.get(`/user/create-recommended-playlist?access_token=${localStorage.getItem('access_token')}&limit=${this.state.value}`)
      .then(res => res.data)
      .then(data => {
        if (data.ok) {
          this.setState({ message: 2, html: `A playlist was created successfully, and can be found by clicking <a href=${data.message}>here</a>, or by clicking "OK"!`, playlistUrl: data.message })
        } else {
          this.setState({ message: 3, html: data.message })
        }
      }).catch(error => this.setState({ message: 3, html: error }))
  }

  render() {
    return (
      <div className="dashboard" hidden={!this.state.authenticated}>
        <SweetAlert
          show={this.state.message === 1}
          title="Creating playlist on Spotify..."
        />
        <SweetAlert
          show={this.state.message === 2}
          type="success"
          title="Playlist created!"
          html={this.state.html}
          onConfirm={() => window.location.replace(this.state.playlistUrl)}
        />
        <SweetAlert
          show={this.state.message === 3}
          type="error"
          title="Something went wrong!"
          html={this.state.html}
          onConfirm={() => window.location.replace('/')}
        />
        <h3>Create Playlist</h3>
        <form>
          <p>Number of Tracks:</p>
          <Slider value={this.state.value} onChange={this.handleChange} aria-label="Tracks" min="1" max="50" defaultValue="25" valueLabelDisplay="auto" />
          <br />
          <a href="#" id="button" onClick={this.generatePlaylist}>Generate Playlist</a>
        </form>
      </div>
    );
  };

  handleChange = (event, value) => this.setState({ value });
}