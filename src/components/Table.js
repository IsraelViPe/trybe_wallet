import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpense, editExpenseMode } from '../redux/actions';

class Table extends Component {
  handleClick = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(delExpense(id));
  };

  handleClickEditMode = ({ target: { id } }) => {
    const { dispatch, expenses } = this.props;
    const recoverInfo = expenses[id];
    dispatch(editExpenseMode(id, recoverInfo));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses
              .map(({ currency, description, exchangeRates, id, method, tag, value }) => (
                <tr key={ id }>
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
                    <button
                      onClick={ this.handleClick }
                      data-testid="delete-btn"
                      id={ id }
                      type="button"
                    >
                      Excluir
                    </button>
                    <button
                      onClick={ this.handleClickEditMode }
                      data-testid="edit-btn"
                      id={ id }
                      type="button"
                    >
                      Editar despesa
                    </button>

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
