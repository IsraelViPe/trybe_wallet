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
      <div className="level pt-6 ">
        <div className="level-item has-text-centered">
          <div>
            <span
              data-testid="email-field"
              className="heading
            is-size-4 is-family-sans-serif"
            >
              {`Email: ${globalEmail}`}
            </span>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <span
              className="heading is-size-6 is-family-sans-serif
              has-text-warning-dark"
            >
              Despesa Total
              {' '}

            </span>
            <span
              data-testid="total-field"
              className="title is-2
              has-text-grey-dark"
            >
              {totalExpenses.toFixed(2)}
            </span>
            <span
              className="subtitle is-4 p-1
              has-text-grey"
              data-testid="header-currency-field"
            >
              {`${exchange}`}
            </span>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalEmail: state.user.email,
  ...state.wallet,
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
