import React from 'react';
import { screen } from '@testing-library/react';
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
    expect(button).toBeDisabled();
  });
});
