import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExchenge, addExpense, submitEdition } from '../redux/actions';

// questão 9 eu utilizarei o walletForm tudo se baseara em um if/else para determinar se a tela é
// de adição ou de edição////
// baby steps >>> se eu clico no botão de editar a chave editor se torna true e o idToEdit recebe o id da
// expense clicada
// ai eu faço uma lógica que altera toda pagina com renderização condicional
// troco o nome do botão e troco também a lógica do click
// a logica do clique tera um ramo para adição que ja está implementado e um ramo para a edição
// no ramo para edição eu preciso que quando o botão seja clicado o estado local seja armazedo em
// um objeto o payload e ai eu chamo a função fetch normal

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',

  };

  // recoverInfoForEdition = () => {
  //   const { editMode, idToEdit, expenses } = this.props;
  //   if (editMode) {
  //     const { value, description, currency, method, tag } = expenses[idToEdit];
  //     console.log(editMode);
  //     this.setState({
  //       value,
  //       description,
  //       currency,
  //       method,
  //       tag,
  //     });
  //   }
  // };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { addExpenseProp, editMode, idToEdit, expenses, submitEditionAct } = this.props;
    if (editMode) {
      console.log(idToEdit);
      const payload = { id: idToEdit,
        ...this.state,
        exchangeRates: expenses[idToEdit].exchangeRates };
      console.log(payload);
      expenses.splice(idToEdit, 1, payload);
      submitEditionAct(expenses);
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
    const { currenciesList, editMode, expenses, idToEdit } = this.props;
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
            { editMode ? 'Editar despesa' : 'Adicionar despesa'}

          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  editMode: state.wallet.editor,
  idToEdit: Number(state.wallet.idToEdit),
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseProp: (state, actionCreator) => dispatch(fetchExchenge(state, actionCreator)),
  submitEditionAct: (payload) => dispatch(submitEdition(payload)),
});

WalletForm.propTypes = {
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
