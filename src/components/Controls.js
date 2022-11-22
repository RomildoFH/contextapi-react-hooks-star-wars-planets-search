// import React, { useState, useContext } from 'react';
import React from 'react';

function Controls() {
  return (
    <form>
      <div>
        <h2>Nome do Planeta</h2>
        <input type="text" name="name" data-testid="name-filter" />
      </div>
      <div>
        <label htmlFor="column-filter">
          Coluna
          <select id="column-filter">
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="select-operador">
          Operador
          <select id="select-operador">
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="input-quantidade">
          Quantidade
          <input name="quantidade" id="input-quantidade" type="number" />
        </label>
        <button type="button" id="btn-filtrar">Filtrar</button>
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
