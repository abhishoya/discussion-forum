import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";

class adminLogin extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount()
  {
    if(localStorage.getItem("usr")==="admin" && localStorage.getItem("pwd")==="password")
    {
      this.props.history.push("/admin");
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      user: this.state.user,
      password: this.state.password
    };

    if(this.state.user==="admin" && this.state.password==="password")
    {
        localStorage.setItem("usr",this.state.user);
        localStorage.setItem("pwd",this.state.password);
    }

    this.props.history.push("/admin");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Admin account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="User"
                  name="user"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (adminLogin);
