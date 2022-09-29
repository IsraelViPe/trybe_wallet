import React from 'react';

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

  render() {
    const { emailLocal, passwordLocal } = this.state;
    const emailValidateRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const minEnterPassword = 6;
    return (
      <div>
        <form>
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

export default Login;
