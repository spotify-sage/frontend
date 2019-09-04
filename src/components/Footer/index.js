import React, { Component } from 'react';

import './styles.css';

export default class Footer extends Component {
  render() {
    return (
      <footer id="main-footer">
        <p>App made by <a href="https://instagram.com/dpaiv0">David Paiva</a>.</p>
        <p>Spotify is a registered trademark of Spotify Inc.</p>
      </footer>
    );
  };
};