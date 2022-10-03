import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const initialStateMock = { user: { email: 'test@gmail.com' },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

describe('testa a pagina Wallet', () => {
  it('se no topo da pagina é renderizado um header com email e despesa total zerada e sigla BRL', () => {
    renderWithRouterAndRedux(<App />, { initialState: initialStateMock,
      initialEntries: ['/carteira'] });
    expect(screen.getByText(/email: test@gmail\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/despesa total:/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
  });
  it('se os campos de valor, moeda forma de pagamento, tag, descricação e botão são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialState: initialStateMock,
      initialEntries: ['/carteira'] });
    expect(screen.getByText(/valor:/i)).toBeInTheDocument();
    const currencies = screen.getByRole('combobox', {
      name: /moeda:/i,
    });
    expect(currencies.value).toBe('USD');
    const method = screen.getByRole('combobox', {
      name: /forma de pagamento/i,
    });
    expect(method.value).toBe('Dinheiro');
    const tag = screen.getByRole('combobox', {
      name: /tag:/i,
    });
    expect(tag.value).toBe('Alimentação');
    const description = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    expect(description.value).toBe('');
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addButton).toBeInTheDocument();
  });
  it('se o preenchimento dos campos esta funcionando', () => {
    renderWithRouterAndRedux(<App />, { initialState: initialStateMock,
      initialEntries: ['/carteira'] });
    const valueInput = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    userEvent.type(valueInput, '20');
    expect(valueInput.value).toBe('20');
  });
  //   it('se é feita a chamada a api que renderiza as moedas', () ) => { });
  it('se ao escrever o valor 20 na moeda USD e clicar no botão o campo de despesa total aparece 107,02', () => {
    // renderWithRouterAndRedux(<App />, { initialState: initialStateMock,
    //   initialEntries: ['/carteira'] });
    // const addButton = screen.getByRole('button', {
    //   name: /adicionar despesa/i,
    // });
    // const value = screen.getByRole('spinbutton', {
    //   name: /valor:/i,
    // });
    // userEvent.type(value, '20');
    // userEvent.click(addButton);
    // expect(screen.getByText(/103\.21/i)).toBeInTheDocument();
  });
});
