import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailLocal: '',
    passwordLocal: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { emailLocal } = this.state;
    dispatch(addEmail(emailLocal));
    history.push('/carteira');
  };

  render() {
    const { emailLocal, passwordLocal } = this.state;
    const emailValidateRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const minEnterPassword = 6;
    const isDisabled = !(emailValidateRegex.test(emailLocal)
    && passwordLocal.length >= minEnterPassword);
    return (
      <div className="container-login">
        <div className="field">
          <span className="subtitle is-5 is-family-monospace">Wallet</span>
          <form
            className="box"
            onSubmit={ this.handleSubmit }
          >
            <div className="field">
              <input
                className="input is-large"
                onChange={ this.handleChange }
                data-testid="email-input"
                type="email"
                name="emailLocal"
                value={ emailLocal }
                placeholder="E-mail"
              />
            </div>
            <div className="field">
              <input
                className="input is-large"
                onChange={ this.handleChange }
                data-testid="password-input"
                type="password"
                name="passwordLocal"
                value={ passwordLocal }
                placeholder="Senha"
              />
            </div>
            <div className="field">
              <button
                className="button button is-warning is-large is-fullwidth"
                type="submit"
                disabled={ isDisabled }
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
