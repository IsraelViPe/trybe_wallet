import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('testa tela de Login', () => {
  it('verifica se tela inicial possui campos de email, senha e botao', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /entrar/i,
    })).toBeInTheDocument();
  });
  it('verifica se o botão só é habilitado depois do preechimento dos campos', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'teste@email.com');
    userEvent.type(inputPassword, '123456');
    expect(button).toBeEnabled();
  });
  it('verifica se ao clicar no botão é redirecionado para a rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    userEvent.type(inputEmail, 'teste@email.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);
    expect(screen.getByText(/despesa total:/i)).toBeInTheDocument();
  });
});
