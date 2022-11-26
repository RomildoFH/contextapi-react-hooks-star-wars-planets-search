// import React, { useState, useContext } from 'react';
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Controls() {
  const [column, setColumn] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [quantidade, setQuantidade] = useState('0');
  const [columnOrder, setColumnOrder] = useState('population');
  const [directOrder, setDirectOrder] = useState('');
  const
    {
      setNameFilter,
      filterByNumericValues,
      setfilterByNumericValues,
      columnOptions,
      setColumnOptions,
      setOrder,
      setSorting,
      setLoading,
    } = useContext(AppContext);

  const handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;

    switch (name) {
    case 'name':
      setNameFilter(value);
      break;
    case 'column':
      setColumn(value);
      break;
    case 'operador':
      setOperador(value);
      break;
    case 'quantidade':
      setQuantidade(value);
      break;
    case 'directOrder':
      setDirectOrder(value);
      break;
    // case 'columnOrder':
    //   setColumnOrder(value);
    //   break;
    default: // esse default substitui o order-column
      setColumnOrder(value);
      break;
    }
  };

  const handleClick = ({ target }) => {
    const { name } = target;
    switch (name) {
    case 'btn-filter':
      setColumnOptions(columnOptions.filter((columnName) => (
        columnName !== column
      )));
      setColumn(columnOptions[0]);
      setfilterByNumericValues([...filterByNumericValues, {
        column,
        operador,
        quantidade,
      }]);
      break;
    default: // esse default substitui o btn-order
      setOrder({
        column: columnOrder,
        sort: directOrder,
      });
      setLoading(true);
      setSorting(true);
      break;
    // default:
    //   console.log('não achei o botão');
    //   break;
    }
  };

  return (
    <form data-testid="form-control">
      <div>
        <h2>Nome do Planeta</h2>
        <input
          type="text"
          name="name"
          data-testid="name-filter"
          onChange={ handleChange }
          placeholder="Nome de um planeta"
        />
      </div>
      <div>
        <label htmlFor="column-filter">
          Coluna
          <select
            id="column-filter"
            data-testid="column-filter"
            name="column"
            onChange={ handleChange }
            value={ column }
          >
            {
              columnOptions.map((columnName) => (
                <option
                  key={ columnName }
                  value={ columnName }
                  data-testid="column-filter-options"
                >
                  { columnName }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="select-operador">
          Operador
          <select
            id="select-operador"
            data-testid="comparison-filter"
            onChange={ handleChange }
            name="operador"
            value={ operador }
          >
            <option value="maior que" data-testid="comparison-options">maior que</option>
            <option value="menor que" data-testid="comparison-options">menor que</option>
            <option value="igual a" data-testid="comparison-options">igual a</option>
          </select>
        </label>
        <label htmlFor="input-quantidade">
          Quantidade
          <input
            name="quantidade"
            id="input-quantidade"
            type="number"
            value={ quantidade }
            onChange={ handleChange }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          id="btn-filtrar"
          data-testid="button-filter"
          name="btn-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
      <div>
        <label htmlFor="order-column">
          Ordenar
          <select
            id="order-column"
            data-testid="column-sort"
            value={ columnOrder }
            onChange={ handleChange }
            name="columnOrder"
          >
            <option
              value="population"
              data-testid="column-order-options"
            >
              population
            </option>
            <option
              value="orbital_period"
              data-testid="column-order-options"
            >
              orbital_period
            </option>
            <option value="diameter" data-testid="column-order-options">diameter</option>
            <option
              value="ratation_period"
              data-testid="column-order-options"
            >
              rotation_period
            </option>
            <option
              value="surface_water"
              data-testid="column-order-options"
            >
              surface_water
            </option>
          </select>
        </label>
        <label htmlFor="orderdenar-ascendente">
          <input
            type="radio"
            id="orderdenar-ascendente"
            data-testid="column-sort-input-asc"
            value="ASC"
            name="directOrder"
            onChange={ handleChange }
          />
          Ascendente
        </label>
        <label htmlFor="orderdenar-descendente">
          <input
            type="radio"
            id="orderdenar-descendente"
            data-testid="column-sort-input-desc"
            value="DESC"
            name="directOrder"
            onChange={ handleChange }
          />
          Descendente
        </label>
        <button
          type="button"
          id="btn-ordenar"
          data-testid="column-sort-button"
          name="btn-ordenar"
          onClick={ handleClick }
        >
          Ordenar
        </button>
      </div>
    </form>
  );
}

export default Controls;
