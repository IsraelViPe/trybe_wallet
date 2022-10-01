import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExchenge } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',

  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { addExpense } = this.props;
    addExpense({ ...this.state });
    this.setState((prevState) => ({
      value: '',
      description: '',
      currency: prevState.currency,
      method: prevState.method,
      tag: prevState.tag,
    }));
  };

  render() {
    const { currenciesList } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              onChange={ this.handleChange }
              id="value"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              onChange={ this.handleChange }
              id="currency"
              data-testid="currency-input"
              name="currency"
            >
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
            Forma de Pagamento
            <select
              onChange={ this.handleChange }
              id="method"
              data-testid="method-input"
              name="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              onChange={ this.handleChange }
              id="tag"
              data-testid="tag-input"
              name="tag"
            >
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
              onChange={ this.handleChange }
              id="description"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
            />
          </label>
          <button
            onClick={ this.handleClick }
            type="button"
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (state) => dispatch(fetchExchenge(state)),
});

WalletForm.propTypes = {
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
