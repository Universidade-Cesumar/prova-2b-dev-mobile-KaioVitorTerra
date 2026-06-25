import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';

describe('🚀 Testes Automatizados - Sprint 4 (Cadastro e Exclusão)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('👉 Deve cadastrar material localmente quando o servidor falhar e excluir em seguida', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })
      .mockRejectedValueOnce(new Error('Falha na rede'));

    const alertMock = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      if (Array.isArray(buttons)) {
        const excluirButton = buttons.find(button => button.text === 'Excluir');
        if (excluirButton && typeof excluirButton.onPress === 'function') {
          excluirButton.onPress();
        }
      }
    });

    const { getByTestId, findByText, queryByText } = render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    fireEvent.changeText(getByTestId('input-nome'), 'Seringa 10ml');
    fireEvent.changeText(getByTestId('input-quantidade'), '20');
    fireEvent.press(getByTestId('btn-cadastrar'));

    await findByText('Seringa 10ml');
    expect(getByTestId('lista-materiais')).toBeTruthy();

    fireEvent.press(getByTestId('btn-excluir'));

    await waitFor(() => {
      expect(queryByText('Seringa 10ml')).toBeNull();
    });

    expect(alertMock).toHaveBeenCalled();
  });
});
