import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
//import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { connect } from 'react-redux';
import { addToken} from'./actions'
import firebase from './firebase'
import 'firebase/auth'
const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseUser: null,
      pathname: '/'
    }
  }
  componentDidMount() {
    if (this.state.firebaseUser === null) {
      const {dispatch}=this.props
     // const that = this;
      firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("annnounylm", errorCode, errorMessage)
        // ...
      });
      //var pathName = browserHistory.location.pathname;
      //console.log("path name",pathName)
      firebase.auth().onAuthStateChanged(function (user) {
        console.log("firebase auth", user)
        user.getIdToken(true)
        .then((tokenResult)=>{
          console.log("Token",tokenResult)
          dispatch(addToken(tokenResult,user))
        })
        // if (user) {
        //   that.setState({ firebaseUser: user })
        // } else {
        //   that.setState({ firebaseUser: user });
        //   // browserHistory.push('/');
        // }
      })
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes path={this.state.pathname} firebaseUser={this.state.firebaseUser} />
        </Router>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const config = state.config;
  return { config };
}

export default connect(mapStateToProps)(App);
