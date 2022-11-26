import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import mockData from './mockData';
import AppContext from '../context/AppContext';
import AppProvider from '../context/AppProvider';
import userEvent from '@testing-library/user-event';

describe('Testa a página de Home', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Testa se o header contém um título h1', async () => {
    render(
      <AppProvider>
       <App />
      </AppProvider>
    );
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });

  it('Testa se os elementos do formulário existem', async () => {
    render(
      <AppProvider>
       <App />
      </AppProvider>
    );
    const form = screen.getByTestId('form-control');
    const title = screen.getByRole('heading', { level: 2 });
    const inputName = screen.getByPlaceholderText('Nome de um planeta');
    const inputColumn = screen.getByLabelText('Coluna');
    const columnFilterOptions = screen.getAllByTestId('column-filter-options');
    const inputOperator = screen.getByLabelText('Operador');
    const comparisonFilterOptions = screen.getAllByTestId('comparison-options');
    const inputQuantity = screen.getByLabelText('Quantidade');
    const btnFilter = screen.getByRole('button', { name: 'Filtrar' });
    const inputOrder = screen.getByLabelText('Ordenar');
    const columnOrderOptions = screen.getAllByTestId('column-order-options');
    const inputAscending = screen.getByLabelText('Ascendente');
    const inputDescending = screen.getByLabelText('Descendente');
    const btnOrder = screen.getByRole('button', { name: 'Ordenar' });
    expect(form).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputName.value).toBe('');
    expect(inputColumn).toBeInTheDocument();   
    expect(columnFilterOptions.length).toBe(5);
    expect(inputOperator).toBeInTheDocument();
    expect(comparisonFilterOptions.length).toBe(3);
    expect(inputQuantity).toBeInTheDocument();
    expect(inputQuantity.value).toBe('0');
    expect(btnFilter).toBeInTheDocument();
    expect(inputOrder).toBeInTheDocument();
    expect(columnOrderOptions.length).toBe(5);
    expect(inputAscending).toBeInTheDocument();
    expect(inputDescending).toBeInTheDocument();
    expect(btnOrder).toBeInTheDocument();
  });

  it('Testa ao carregar a página o texto Carregando... é renderizado e desaparece após consultar a API', async () => {
    render(
      <AppProvider>
       <App />
      </AppProvider>
    );

    const loading = screen.getByText('Carregando...')
    expect(loading).toBeInTheDocument()
    expect(global.fetch).toBeCalledTimes(1);
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
    
  });

  it('Ao carregar a lista de planetas, ela deverá conter 11 linhas, incluindo o cabeçalho', async () => {
    render(
      <AppProvider>
       <App />
      </AppProvider>
    );

    const table = await screen.findByRole('table');
    const rows = screen.getAllByRole('row');
    expect(table).toBeInTheDocument();
    expect(rows.length).toBe(11)
    expect(rows[0]).toHaveTextContent('name');
    expect(rows[0]).toHaveTextContent('Rotation Period');
    expect(rows[0]).toHaveTextContent('Orbital Period');
    expect(rows[0]).toHaveTextContent('diameter');
    expect(rows[0]).toHaveTextContent('climate');
    expect(rows[0]).toHaveTextContent('gravity');
    expect(rows[0]).toHaveTextContent('terrain');
    expect(rows[0]).toHaveTextContent('population');
    expect(rows[0]).toHaveTextContent('films');
    expect(rows[0]).toHaveTextContent('created');
    expect(rows[0]).toHaveTextContent('edited');
    expect(rows[0]).toHaveTextContent('url');
    expect(rows[1]).toHaveTextContent('Tatooine');
    expect(rows[2]).toHaveTextContent('Alderaan');    
  });

  it('Testa se o filtro de nome funciona corretamente ao digitar no input', async () => {
    render(
      <AppProvider>
       <App />
      </AppProvider>
    );
    const inputName = screen.getByPlaceholderText('Nome de um planeta');    
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(11)    
    expect(rows[1]).toHaveTextContent('Tatooine');
    expect(rows[2]).toHaveTextContent('Alderaan');

    userEvent.clear(inputName);
    userEvent.type(inputName, 'dagobah');
    expect(inputName.value).toBe('dagobah');

    const rows2 = screen.getAllByRole('row');
    expect(rows2.length).toBe(2);
    expect(rows2[1]).toHaveTextContent('Dagobah');

    userEvent.clear(inputName);

    const rows3 = screen.getAllByRole('row');
    expect(rows3.length).toBe(11);
    expect(rows3[1]).toHaveTextContent('Tatooine');
  });

  it('Testa se ao clicar no botão Filtrar sem ter feito nenhuma mudança em filtros, é aplicado o filtro "population maior que 0" e ao excluir filtro, a tabela é restaurada ao estado inicial', async () => {
    render(
      <AppProvider>
       <App />
      </AppProvider>
    );    
    const columnFilterOptions = screen.getAllByTestId('column-filter-options');  
    expect(columnFilterOptions.length).toBe(5)
    const btnFilter = screen.getByRole('button', { name: 'Filtrar' });
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(11)    
    
    userEvent.click(btnFilter);

    const rows2 = screen.getAllByRole('row');
    expect(rows2.length).toBe(9)

    const filterList = screen.getAllByTestId('filter')
    expect(filterList[0]).toHaveTextContent('population maior que 0')

    const columnFilterOptions2 = screen.getAllByTestId('column-filter-options');  
    expect(columnFilterOptions2.length).toBe(4)

    const deletFilter = screen.getByRole('button', { name: 'X' })

    userEvent.click(deletFilter)

    const filterList2 = screen.queryByTestId('filter')
    expect(filterList2).toBe(null)

    // waitFor(() => {
    //   expect(filterList).not.toBeInTheDocument();
    // })
    // await waitForElementToBeRemoved(filterList);
    
    const columnFilterOptions3 = screen.getAllByTestId('column-filter-options');  
    expect(columnFilterOptions3.length).toBe(5)
    
    const rows3 = screen.getAllByRole('row');
    expect(rows3.length).toBe(11)
  });

  it('Testa diferentes combinações de filtros', async () => {
    render(
      <AppProvider>
       <App />
      </AppProvider>
    );
    const inputName = screen.getByPlaceholderText('Nome de um planeta');
    const inputColumn = screen.getByLabelText('Coluna');
    const inputOperator = screen.getByLabelText('Operador');
    const inputQuantity = screen.getByLabelText('Quantidade');
    const btnFilter = screen.getByRole('button', { name: 'Filtrar' });
    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(11)
    
    userEvent.selectOptions(inputColumn, ['orbital_period']);
    expect(inputColumn.value).toBe('orbital_period');

    userEvent.selectOptions(inputOperator, ['igual a']);
    expect(inputOperator.value).toBe('igual a');

    userEvent.clear(inputQuantity);
    userEvent.type(inputQuantity, '4818');
    expect(inputQuantity.value).toBe('4818');

    userEvent.click(btnFilter);
    
    const rows2 = screen.getAllByRole('row');
    expect(rows2.length).toBe(2)

    const removeAllFilters = screen.getByTestId('button-remove-filters');
    expect(removeAllFilters).toBeInTheDocument();
    userEvent.click(removeAllFilters);

    waitFor(() => {
      expect(removeAllFilters).not.toBeInTheDocument();
    })

    const rows3 = screen.getAllByRole('row');
    expect(rows3.length).toBe(11)

    userEvent.selectOptions(inputColumn, ['diameter']);
    expect(inputColumn.value).toBe('diameter');

    userEvent.selectOptions(inputOperator, ['menor que']);
    expect(inputOperator.value).toBe('menor que');

    userEvent.clear(inputQuantity);
    userEvent.type(inputQuantity, '8000');
    expect(inputQuantity.value).toBe('8000');

    userEvent.click(btnFilter);

    const rows4 = screen.getAllByRole('row');
    expect(rows4.length).toBe(3)
  });

  it('Avalia se ao selecionar as opções de ordenação a tabela renderiza conforme coluna e direção escolhida', async () => {

    render(
      <AppProvider>
       <App />
      </AppProvider>
    );

    const column = screen.getByLabelText('Ordenar');
    const asc = screen.getByLabelText('Ascendente');
    const desc = screen.getByLabelText('Descendente');
    const btnOrder = screen.getByRole('button', { name: 'Ordenar' })
    const cells = await screen.findAllByRole('cell');

    jest.resetAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    userEvent.click(btnOrder);
    expect(window.alert).toBeCalledWith('Selecione a ordenação');

    expect(column).toBeInTheDocument();
    expect(column.value).toBe('population');
    expect(asc).toBeInTheDocument();
    expect(asc).not.toBeChecked();
    expect(desc).toBeInTheDocument();
    expect(desc).not.toBeChecked();
    expect(btnOrder).toBeInTheDocument();
    expect(cells[0]).toHaveTextContent('Tatooine')
    expect(cells[13]).toHaveTextContent('Alderaan')
    userEvent.click(asc);
    userEvent.click(btnOrder);

    const loading = screen.getByText('Carregando...');
    expect(loading).toBeInTheDocument();

    waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    })
    
    const cells2 = await screen.findAllByRole('cell');
    expect(cells2[0]).toHaveTextContent('Yavin IV');
    expect(cells2[13]).toHaveTextContent('Tatooine');
    expect(cells2[117]).toHaveTextContent('Dagobah');
    expect(cells2[125]).toHaveTextContent('unknown');

    userEvent.selectOptions(column, ['diameter']);
    userEvent.click(desc);
    userEvent.click(btnOrder);

    const cells3 = await screen.findAllByRole('cell');
    expect(cells3[0]).toHaveTextContent('Bespin');
    expect(cells3[13]).toHaveTextContent('Kamino');
    expect(cells3[117]).toHaveTextContent('Endor');

  });
})
