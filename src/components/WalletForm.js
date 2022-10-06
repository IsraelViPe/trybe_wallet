/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExchenge, addExpense, submitEdition } from '../redux/actions';

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
    const { addExpenseProp, editMode,
      idToEdit, expenses, submitEditionAct } = this.props;
    if (editMode) {
      const payload = { id: idToEdit,
        ...this.state,
        exchangeRates: expenses[idToEdit].exchangeRates };
      expenses.splice(idToEdit, 1, payload);
      submitEditionAct(expenses);
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    } else {
      addExpenseProp({ ...this.state }, addExpense);
      this.setState((prevState) => ({
        value: '',
        description: '',
        currency: prevState.currency,
        method: prevState.method,
        tag: prevState.tag,
      }));
    }
  };

  render() {
    const { currenciesList, editMode, expenses } = this.props;
    const { value, description } = this.state;
    return (
      <form className="field is-horizontal  is-justify-content-space-around">

        <div className="field">
          <label className="label" htmlFor="value">
            Valor
            <div className="control">
              <input
                className={ editMode ? 'input is-danger' : 'input is-link' }
                onChange={ this.handleChange }
                id="value"
                data-testid="value-input"
                type="number"
                name="value"
                value={ value }
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label" htmlFor="currency">
            Moeda
            <div className="control">
              <div className={ editMode ? 'select is-danger' : 'select is-link' }>
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
              </div>
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="method">
            Forma de Pagamento
            <div className="control">
              <div className={ editMode ? 'select is-danger' : 'select is-link' }>
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
              </div>
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="tag">
            Categoria
            <div className="control">
              <div className={ editMode ? 'select is-danger' : 'select is-link' }>
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
              </div>
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="description">
            Descrição
            <div className="control">
              <input
                className={ editMode ? 'input is-danger' : 'input is-link' }
                onChange={ this.handleChange }
                id="description"
                data-testid="description-input"
                type="text"
                name="description"
                value={ description }
              />
            </div>
          </label>
        </div>
        <div className="field ">
          <div className="control">
            <button
              className={ editMode && expenses.length ? 'button is-medium is-info mt-4'
                : 'button is-medium is-success mt-4' }
              onClick={ this.handleClick }
              type="button"
            >
              { editMode
              && expenses.length !== 0 ? 'Editar despesa' : 'Adicionar despesa'}
            </button>
          </div>
        </div>
      </form>

    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  editMode: state.wallet.editor,
  idToEdit: Number(state.wallet.idToEdit),
  expenses: state.wallet.expenses,
  recoverInfo: state.wallet.recoverInfosForEdition,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseProp: (state, actionCreator) => dispatch(fetchExchenge(state, actionCreator)),
  submitEditionAct: (payload) => dispatch(submitEdition(payload)),
});

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  })).isRequired,
  submitEditionAct: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
