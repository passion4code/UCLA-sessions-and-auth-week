import React from 'react';
import LoginForm from './components/LoginForm';
import axios from 'axios';

class App extends React.Component {
  state = {
    loading: false,
    loggedIn: false,
    errorMessage: "",
    errorLoading: false
  }

  componentDidMount() {
    // start the session
    this.startSession();
  }

  

  render() {    
    return (
      <div>
        <div className="jumbotron">
          <h1>The React Session Exercise</h1>
        </div>
        {this.renderLoading()}
        {this.renderError()}
        {this.renderLoggedInOrNot()}

        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }

  renderLoading() {
    if (this.state.loading) {
      return <div className="alert alert-primary">Loading...</div>
    }
    return null;
  }

  renderError() {
    if (this.state.errorMessage) {
      return <div className="alert alert-danger">{this.state.errorMessage}</div>
    }
    return null;
  }

  renderLoggedInOrNot() {
    // If there's something loading or there was a problem, don't show anything
    if (this.state.loading || this.state.errorLoading) {
      return null;
    }

    if (this.state.loggedIn) {
      return (
      <div className="alert alert-success">
        You are logged in 
        <button className="btn btn-secondary" onClick={this.handleLogoutClick}>
          Logout
        </button>
      </div>
      )
    }  
    // If we haven't returned the "Logged In" message, then we're not logged in
    return <div className="alert alert-warning">Sorry, you are not logged in</div>
  }


  /**
   * Class method for starting the session. This gets called by `componentDidMount()`
   */
  startSession() {
    // Set loading to true, and reset any errors if there were any
    this.setState( {
      loading: true, 
      errorMessage: "", 
      errorLoading: false
    }, () => {
      // In the callback after the state for loading is set, we'l load the sessions from our backend
      axios.get('/api/sessions/start', {
        withCredentials: true // Important! This flag tells axios to include your browser (session) cookies 
      })
      .then(resp => {
        // We'll have an object for our updated state
        const updatedState = {
          loading: false
        };

        if (resp.data.isLoggedIn) {
          updatedState.loggedIn = true;
        } else {
          updatedState.loggedIn = false;
        }
        this.setState(updatedState);
      }).catch(err => {
        // If there was a problem of any kind, show as such
        this.setState({
          loading: false,
          errorLoading: true,
          errorMessage: err.toString() // cast the error to a string so it can be shown
        })
      })
    })
  }

  /**
   * Handler for when the Login form is submitted
   */
  handleSubmit = (email, password) => {

    const axiosConfig = {
      withCredentials: true
    };

    /* 
    Below uses object shorthand 
    where the property name matches the variable name in scope.

    Otherwise you could write it out like this

    const postData = {
      email: email,
      password: password,
    }

    */
    const postData = {
      email,
      password
    }

    // Sert loading to true and errorMessage back to an empty string in case there was an error before
    this.setState({loading: true, errorMessage: ""}, () => {
      const updatedState = {
        loading: false
      }

      axios.post('/api/sessions/login',postData, axiosConfig).then(resp => {
        if (resp.data.success) {
          updatedState.loggedIn = true;
        } else {
          updatedState.loggedIn = false;
          updatedState.errorMessage = "Invalid username or password";
        }
        // and update the state
        this.setState(updatedState);
      }).catch(err => {
        // Here's a cool way to "inherit" the properties from the updatedState object
        // while adding some new ones
        this.setState({
          ...updatedState,
          errorLoading: true,
          errorMessage: err.toString()
        });
      })
    })

  }

  

  /**
   * Handler for when the logout button is clicked
   */
  handleLogoutClick = evt => {
    evt.preventDefault();
    axios.get("/api/sessions/logout", {
      withCredentials: true
    }).then(resp => {
      this.setState({loggedIn: false});
    }).catch( err => {

      this.setState({
        errorMessage: `Problem logging out: ${err.toString()}`
      });

    })
  }


}

export default App;
