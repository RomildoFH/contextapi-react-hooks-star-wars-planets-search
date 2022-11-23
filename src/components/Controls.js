// import React, { useState, useContext } from 'react';
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Controls() {
  const [column, setColumn] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [quantidade, setQuantidade] = useState('0');
  const
    {
      setNameFilter,
      filterByNumericValues,
      setfilterByNumericValues,
    } = useContext(AppContext);

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

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
    default:
      console.log('algo errado não está certo');
      break;
    }
  };

  const handleClick = ({ target }) => {
    const { name } = target;
    switch (name) {
    case 'btn-filter':
      setfilterByNumericValues([...filterByNumericValues, {
        column,
        operador,
        quantidade,
      }]);
      break;
    default:
      console.log('não achei o botão');
      break;
    }
  };

  return (
    <form>
      <div>
        <h2>Nome do Planeta</h2>
        <input
          type="text"
          name="name"
          data-testid="name-filter"
          onChange={ handleChange }
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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
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
          <select id="order-column">
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="orderdenar-ascendente">
          <input type="radio" id="orderdenar-ascendente" />
          Ascendente
        </label>
        <label htmlFor="orderdenar-descendente">
          <input type="radio" id="orderdenar-descendente" />
          Descendente
        </label>
        <button type="button" id="btn-ordenar">Ordenar</button>
      </div>
    </form>
  );
}

export default Controls;
