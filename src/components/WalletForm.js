import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';

class WalletForm extends Component {
  render() {
    const { currenciesList } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              data-testid="value-input"
              type="number"
              name="value"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select id="currency" data-testid="currency-input">
              {currenciesList
                .map((currencie, index) => (
                  <option
                    key={ `${index} ${currencie}` }
                    value={ currencie }
                  >
                    {currencie}

                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="method">
            <select id="method" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select id="tag" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              data-testid="description-input"
              type="text"
              name="description"
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
});

WalletForm.propTypes = {
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
