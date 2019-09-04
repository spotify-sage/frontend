import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Header extends Component {
  state = {
    authenticated: false,
    displayName: '',
    imageUrl: ''
  };

  async componentDidMount() {
    const response = await api.get(`/session?access_token=${localStorage.getItem('access_token')}&refresh_token=${localStorage.getItem('refresh_token')}`);

    const { authenticated, ...payload } = response.data

    if (!authenticated) return;
    else {
      const { accessToken, refreshToken, displayName, imageUrl } = payload

      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)

      this.setState({ authenticated, displayName, imageUrl })
    }
  };

  unauth() {
    localStorage.clear()
    window.location.replace("/")
  }

  auth() {
    window.location.replace("https://spotify-sage.herokuapp.com/auth")
  }

  mainPage() {
    window.location.replace("/")
  }

  render() {
    return (
      <header id="main-header">
        <h3 onClick={this.mainPage}>Spotify Sage</h3>
        {this.state.authenticated
          ? (<div className="auth-modal">
            <p>Logged in as {this.state.imageUrl ? <img src={this.state.imageUrl} alt="User's avatar" /> : null} <b>{this.state.displayName}</b></p>
            <a id="logout" href="#" onClick={this.unauth}>Log Out</a>
            </div>)
          : <a id="login" href="#" onClick={this.auth}>Login</a>}
      </header>
    );
  };
};