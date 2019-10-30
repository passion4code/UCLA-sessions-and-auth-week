import React from 'react';
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Homepage} />
        <Route path="/dashboard" exact={true} component={Dashboard} />
        <Route path="/login" exact={true} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
