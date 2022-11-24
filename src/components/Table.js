import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const {
    data,
    isLoading,
    setLoading,
    nameFilter,
    filterByNumericValues,
    setfilterByNumericValues,
    columnOptions,
    setColumnOptions,
  } = useContext(AppContext);

  const [planetas, setPlanetas] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const filterCombine = () => {
    const newArray = data.results
      .filter((planeta) => {
        const test = filterByNumericValues.every((filter) => {
          switch (filter.operador) {
          case 'maior que':
            return Number(planeta[filter.column]) > Number(filter.quantidade);
          case 'menor que':
            return Number(planeta[filter.column]) < Number(filter.quantidade);
          case 'igual a':
            return Number(planeta[filter.column]) === Number(filter.quantidade);
          default:
            return false;
          }
        });
        return test;
      });
    setPlanetas(newArray);
  };

  useEffect(() => {
    setPlanetas(data.results);
  }, [data.results]);

  useEffect(() => {
    filterCombine();
  }, [filterByNumericValues]);

  const removeFilter = (columnName) => {
    const newFilterArray = filterByNumericValues.filter((filter) => (
      filter.column !== columnName
    ));
    setfilterByNumericValues(newFilterArray);
    const newOptions = columnOptions;
    // console.log(newOptions);
    newOptions.push(columnName);
    // console.log(newOptions);
    setColumnOptions(newOptions);
  };

  const removeAllFilters = () => {
    const newFilterArray = [];
    setfilterByNumericValues(newFilterArray);
    setColumnOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <div>
      <ul>
        {
          filterByNumericValues.map((filter) => (
            <li
              key={ filter.column }
              data-testid="filter"
            >
              { `${filter.column} ${filter.operador} ${filter.quantidade}` }
              {' '}
              <button
                type="button"
                onClick={ () => removeFilter(filter.column) }
              >
                X
              </button>
            </li>
          ))
        }
        {
          filterByNumericValues.length >= 1
          && (
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ () => removeAllFilters() }
            >
              Remover todas filtragens
            </button>
          )
        }
      </ul>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>Surface Water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {
            isLoading === false
              ? planetas
                .filter((planeta) => (
                  planeta.name.toLowerCase().includes(nameFilter.toLowerCase())
                ))
                .map((planeta) => (
                  <tr key={ planeta.name }>
                    <td>{ planeta.name }</td>
                    <td>{ planeta.rotation_period }</td>
                    <td>{ planeta.orbital_period }</td>
                    <td>{ planeta.diameter }</td>
                    <td>{ planeta.climate }</td>
                    <td>{ planeta.gravity }</td>
                    <td>{ planeta.terrain }</td>
                    <td>{ planeta.surface_water }</td>
                    <td>{ planeta.population }</td>
                    <td>{ planeta.films }</td>
                    <td>{ planeta.created }</td>
                    <td>{ planeta.edited }</td>
                    <td>{ planeta.url }</td>
                  </tr>
                ))
              : null
          }
        </tbody>
      </table>

    </div>
  );
}

export default Table;
