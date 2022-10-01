import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { globalEmail, expenses } = this.props;
    const totalExpenses = expenses
      .reduce((total, expense) => (Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask) + total), 0);
    const exchange = 'BRL';
    return (
      <div>
        <div>
          <span data-testid="email-field">
            {`Email: ${globalEmail}`}
          </span>

        </div>
        <div>
          <span>Despesa Total: </span>
          <span data-testid="total-field">
            {totalExpenses.toFixed(2)}
          </span>
          <span data-testid="header-currency-field">
            {` ${exchange}`}
          </span>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  globalEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
