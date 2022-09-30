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
    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
        >
          <input
            onChange={ this.handleChange }
            data-testid="email-input"
            type="email"
            name="emailLocal"
            value={ emailLocal }
            placeholder="E-mail"
          />
          <input
            onChange={ this.handleChange }
            data-testid="password-input"
            type="password"
            name="passwordLocal"
            value={ passwordLocal }
            placeholder="Senha"
          />
          <button
            type="submit"
            disabled={ !(emailValidateRegex.test(emailLocal)
              && passwordLocal.length >= minEnterPassword) }
          >
            Entrar
          </button>
        </form>
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
