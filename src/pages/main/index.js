import React, { Component } from 'react';

import './styles.css';

export default class Main extends Component {
  state = {
    cards: []
  }

  componentDidMount() {
    const cards = [{
      title: 'Spotify Sage',
      message: 'Platform made to generate Spotify playlists based on what you listen, to better tailor your music tastes.'
    }, {
      title: 'How does it work?',
      message: 'Spotify Sage has an algorithm that gets tracks you\'re likely to listen based on what you\'ve heard in the past on Spotify, then putting it all on a playlist.'
    }, {
      title: 'How do I login?',
      message: 'Click on the "Login" button on the top of the page, and you\'ll authenticate with Spotify. What we receive from login is an access key to your account, so that we can do everything without needing your password.'
    }]

    this.setState({ cards })
  }

	render() {
		return (
      <div className="main">
        {this.state.cards.map(card => (
          <div className="card">
            <h1>{card.title}</h1>
            <h4>{card.message}</h4>
          </div>
        ))}
      </div>
    );
	}
}
