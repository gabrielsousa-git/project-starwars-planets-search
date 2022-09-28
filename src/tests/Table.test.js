import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockPlanets from './helpers/mockPlanets';
import App from '../App';

describe('Testando o componente Table', () => {
  test('Os elementos são renderizados', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockPlanets,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const linkElement = screen.getByRole('table');
    expect(linkElement).toBeInTheDocument();
  });
});

describe('Testando os filtros', () => {
  test('Filtro de nome', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockPlanets,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const nameFilter = screen.getByLabelText(/Filtrar por nome:/i);
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(11);
    userEvent.type(nameFilter, 'ta');
    expect(nameFilter.value).toBe('ta');
    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(2);
  });

  test('Filtro comparando maior que', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockPlanets,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByLabelText(/Valor:/i);
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(valueFilter, '100000');
    userEvent.click(buttonFilter);

    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(8);
  });

  test('Filtro comparando menor que', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockPlanets,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByLabelText(/Valor:/i);
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(valueFilter, '400');
    userEvent.click(buttonFilter);

    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(6);
  });

  test('Filtro comparando igual a', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockPlanets,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByLabelText(/Valor:/i);
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(valueFilter, '7200');
    userEvent.click(buttonFilter);

    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(2);
  });

  test('Remove o filtro correspondente ao clicar no botão X', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockPlanets,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByLabelText(/Valor:/i);
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(valueFilter, '100000');
    userEvent.click(buttonFilter);

    const removeFilter = screen.getByRole('button', { name: /x/i });
    expect(removeFilter).toBeInTheDocument();
    userEvent.click(removeFilter);

    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(11);
  });

  test('Remove todos os filtros ao clicar no botão "Remover todos os filtros"', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockPlanets,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByLabelText(/Valor:/i);
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(valueFilter, '1000');
    userEvent.click(buttonFilter);

    const removeAllFilters = screen.getByRole('button', {
      name: /remover todos os filtros/i,
    });
    expect(removeAllFilters).toBeInTheDocument();
    userEvent.click(removeAllFilters);

    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(11);
  });
});