import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fb from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
import google from '../../assets/images/google.png';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import { loginUser, inputHandler, validateCredentials } from '../../redux/actions';


class LoginComponent extends Component {
  signin = (e) => {
    const {
      credentials: { username, password },
      validateCredentials,
      loginUser,
    } = this.props;
    validateCredentials({ username, password })
      .then((res) => {
        if (res.message === 'Ok') {
          loginUser({ username, password });
        }
      });
    e.preventDefault();
  };

  handleInput = (e) => {
    const { inputHandler } = this.props;
    inputHandler({ field: e.target.name, value: e.target.value });
  }

  handleError = () => {
    const { error } = this.props;
    if (error) {
      return error.message;
    }
    return '';
  }

  render() {
    const { credentials: { username, password } } = this.props;
    const { submitting } = this.props;
    return (
      <div>
        <form className="bg-primary-light login-form" id="signup">
          <div className="color-primary to-center">
            <h2>LOG IN</h2>
          </div>
          <div className="form-errors">{this.handleError()}</div>
          <div className="input primary">
            <i className="fa fa-user" />
            <Input name="username" type="text" value={username} classes="bg-primary-light" placeholder="Username / Email" onChange={this.handleInput} />
          </div>
          <div className="input primary">
            <i className="fa fa-lock" />
            <Input name="password" type="password" value={password} classes="bg-primary-light" placeholder="Password" onChange={this.handleInput} />
          </div>
          <div className="align-right" id="forget-psswd">
            <a href="forgot-password-reset.html">Forget Password?</a>
          </div>
          <Button
            type="button"
            classes={`primary color-white ${
              submitting ? 'loading' : ''
            }`}
            color-white
            onClick={this.signin}
          >
          Log In
          </Button>
          <div className="icon-group">
            <div id="fb">
              <Link to="/#">
                <img src={fb} alt="fb-logo" />
              </Link>
            </div>
            <div id="twbs">
              <Link to="/#">
                <img src={twitter} alt="twbs-logo" />
              </Link>
            </div>
            <div id="gl">
              <a href="http://www.google.com">
                <img src={google} alt="gl-logo" />
              </a>
            </div>
          </div>
          <div className="to-center" id="form-link">
            <span>Not a member?</span>
            <Link to="/#">Sign Up</Link>
          </div>
        </form>
      </div>
    );
  }
}
LoginComponent.propTypes = {
  credentials: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  validateCredentials: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.array,
};
LoginComponent.defaultProps = {
  error: [],
  submitting: false,
};
const mapStateToProps = ({ login: { error, credentials, submitting } }) => ({
  credentials,
  error,
  submitting,
});
export default connect(mapStateToProps,
  { validateCredentials, loginUser, inputHandler })(LoginComponent);
