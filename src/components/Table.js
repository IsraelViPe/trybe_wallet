import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpense, editExpenseMode } from '../redux/actions';

class Table extends Component {
  handleClick = ({ target: { id } }) => {
    const { dispatch, expenses } = this.props;
    const newArrayExpenses = expenses.filter((element) => element.id !== Number(id));
    newArrayExpenses.forEach((element, index) => {
      element.id = index;
    });
    dispatch(delExpense(newArrayExpenses));
  };

  handleClickEditMode = ({ target: { id } }) => {
    const { dispatch, expenses } = this.props;
    const recoverInfo = expenses[id];
    dispatch(editExpenseMode(id, recoverInfo));
  };

  render() {
    const { expenses, editor, idToEdit } = this.props;
    return (
      <div className="card">
        <table className="table">
          <thead className="content is-medium is-size-4 ">
            <tr>
              <th className=" has-text-link-dark">Descrição</th>
              <th className=" has-text-link-dark">Tag</th>
              <th className=" has-text-link-dark">Método de pagamento</th>
              <th className=" has-text-link-dark">Valor</th>
              <th className=" has-text-link-dark">Moeda</th>
              <th className=" has-text-link-dark">Câmbio utilizado</th>
              <th className=" has-text-link-dark">Valor convertido</th>
              <th className=" has-text-link-dark">Moeda de conversão</th>
              <th className=" has-text-link-dark">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="content is-medium">
            { expenses
              .map(({ currency, description, exchangeRates, id, method, tag, value }) => (
                <tr
                  className={ editor && Number(idToEdit) === id
                && ' card has-background-warning' }
                  key={ id }
                >
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{ Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>
                    {(Number(value) * Number(exchangeRates[currency].ask))
                      .toFixed(2)}

                  </td>
                  <td>Real</td>
                  <td>
                    <div className="field has-addons">
                      <p className="control">
                        <button
                          className="button is-danger is-outlined"
                          onClick={ this.handleClick }
                          data-testid="delete-btn"
                          id={ id }
                          type="button"
                        >
                          Excluir
                        </button>
                      </p>
                      <p className="control">
                        <button
                          className="button is-info is-outlined"
                          onClick={ this.handleClickEditMode }
                          data-testid="edit-btn"
                          id={ id }
                          type="button"
                        >
                          Editar despesa
                        </button>
                      </p>
                    </div>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
