import { RECEIVED_CURRENCIES, LOAD_CURRECIES_ERROR } from '../actions';

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
  case LOAD_CURRECIES_ERROR:
    return {
      ...state, currenciesError: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
