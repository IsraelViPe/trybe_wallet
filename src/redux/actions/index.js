export const ADD_EMAIL = 'ADD_EMAIL';

export const RECEIVED_CURRENCIES = 'RECEIVED_CURRENCIES';
export const LOAD_CURRENCIES_ERROR = 'LOAD_CURRENCIES_ERROR';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const LOAD_EXCHANGE_ERROR = 'LOAD_EXCHANGE_ERROR';

export const DEL_EXPENSE = 'DEL_EXPENSE';
export const EDIT_EXPENSE_MODE = 'EDIT_EXPENSE_MODE';
export const SUBMIT_EDITION = 'SUBMIT_EDITION';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const receivedCurrencies = (currencies) => ({
  type: RECEIVED_CURRENCIES,
  currencies,
});

export const loadCurrenciesError = (error) => ({
  type: LOAD_CURRECIES_ERROR,
  error,
});

export const addExpense = (payload, exchangeRates) => ({
  type: ADD_EXPENSE,
  payload,
  exchangeRates,
});

export const loadExchageError = (error) => ({
  type: LOAD_EXCHANGE_ERROR,
  error,
});

export const delExpense = (payload) => ({
  type: DEL_EXPENSE,
  payload,
});

export const editExpenseMode = (idToEdit, recoverInfos) => ({
  type: EDIT_EXPENSE_MODE,
  idToEdit,
  recoverInfos,
});

export const submitEdition = (payload) => ({
  type: SUBMIT_EDITION,
  payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await response.json();
      dispatch(receivedCurrencies(currencies));
    } catch (error) {
      dispatch(loadCurrenciesError(error));
    }
  };
}

export function fetchExchenge(payload, actionCreator) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const exchange = await response.json();
      dispatch(actionCreator(payload, exchange));
    } catch (error) {
      dispatch(loadExchageError(error));
    }
  };
}
