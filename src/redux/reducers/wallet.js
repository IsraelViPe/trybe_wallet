import {
  RECEIVED_CURRENCIES,
  LOAD_CURRENCIES_ERROR,
  ADD_EXPENSE,
  LOAD_EXCHANGE_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVED_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currencie) => currencie !== 'USDT'),
    };
  case LOAD_CURRENCIES_ERROR:
    return {
      ...state, currenciesError: action.error,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length,
          ...action.payload,
          exchangeRates: action.exchangeRates }],
    };
  case LOAD_EXCHANGE_ERROR:
    return {
      ...state, exchangeRatesError: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
