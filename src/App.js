import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import Login from './Login';
import fakeAuth from './Auth/FakeAuth.js';

import './App.css';

// React-Router has issues with reactive link, and I have to deploy app to this repo github pages
// Thus, ends up with "/github-oauth-react-app/public"
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AuthButton />
          <ul>
            <li><Link to="/github-oauth-react-app/public">Public Page</Link></li> 
            <li><Link to="/github-oauth-react-app/protected">Protected Page</Link></li>
          </ul>
          <Route path="/github-oauth-react-app/public" component={Public} />
          <Route path="/github-oauth-react-app/login" component={Login} />
          <PrivateRoute path="/github-oauth-react-app/protected" component={Protected} />
        </div>
      </Router>
    );
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/github-oauth-react-app/'))
      }}>Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/github-oauth-react-app/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

export default App;
