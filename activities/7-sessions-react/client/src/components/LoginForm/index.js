import React from "react";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleInputUpdate = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleLoginFormSubmit = evt => {
      evt.preventDefault();
      this.props.onSubmit(this.state.email, this.state.password)
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleLoginFormSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="emailInput">
                  Email
                </label>
                <input
                  type="email"
                  id="emailInput"
                  name="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={this.handleInputUpdate}
                />
                <small id="emailHelp" className="form-text text-muted">secret@email.com</small>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="passwordInput">
                  Password
                </label>
                <input
                  type="password"
                  id="passwordInput"
                  className="form-control"
                  name="password"
                  aria-describedby="passwordHelp"
                  onChange={this.handleInputUpdate}
                />
                <small id="passwordHelp" className="form-text text-muted">test123</small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
