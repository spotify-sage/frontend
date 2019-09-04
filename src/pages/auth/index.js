import React, { Component } from 'react';
import qs from 'query-string';

import './styles.css'

export default class Auth extends Component {
  async componentDidMount() {
    const params = await qs.parse(this.props.location.search)
    const { access_token, refresh_token } = params;

    await localStorage.setItem('access_token', access_token);
    await localStorage.setItem('refresh_token', refresh_token);

    window.location.replace("/dashboard")
  };

  render() {
    return (
      <div className="auth">
        <h1>Authenticating...</h1>
      </div>
    );
  };
}