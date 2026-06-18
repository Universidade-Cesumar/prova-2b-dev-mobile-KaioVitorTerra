import { validarRetirada } from './utils';

describe('validarRetirada', () => {
  test('permite retirada quando há estoque suficiente', () => {
    expect(validarRetirada(10, 5)).toBe(true);
  });

  test('bloqueia retirada maior que o estoque atual', () => {
    expect(validarRetirada(5, 10)).toBe(false);
  });

  test('bloqueia retirada de quantidade negativa', () => {
    expect(validarRetirada(10, -3)).toBe(false);
  });

  test('bloqueia retirada de quantidade zero', () => {
    expect(validarRetirada(10, 0)).toBe(false);
  });
});