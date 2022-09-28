import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Testando a renderização dos inputs', () => {
  render(<App />);

  const nameFilter = screen.getByLabelText(/Filtrar por nome:/i);
  const columnFilter = screen.getByTestId('column-filter');
  const comparison = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByLabelText(/Valor:/i);
  const buttonFilter = screen.getByTestId('button-filter');
  const buttonRemoveAllFilters = screen.getByTestId('button-remove-filters');

  expect(nameFilter).toBeInTheDocument();
  expect(columnFilter).toBeInTheDocument();
  expect(comparison).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();
  expect(buttonRemoveAllFilters).toBeInTheDocument();
});
