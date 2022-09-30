import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { globalEmail } = this.props;
    const totalExpenses = 0;
    const exchange = 'BRL';
    return (
      <div>
        <div>
          <span data-testid="email-field">
            {`Email: ${globalEmail}`}
          </span>

        </div>
        <div>
          <span data-testid="total-field">
            {`Despesa Total: ${totalExpenses}`}
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
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  globalEmail: PropTypes.string.isRequired,
};
