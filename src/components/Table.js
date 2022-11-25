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
    order,
    sorting,
  } = useContext(AppContext);

  const [planetas, setPlanetas] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, '500');
  }, [data]);

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

  // As funções de ordenação foram adaptadas da fonte:
  // https://stackoverflow.com/a/42677265/20007602
  const sortAscendingElements = (array) => (array.reduce((arr, record) => {
    const index = (record[order.column].match(/[a-z]/i)) ? 1 : 0;
    arr[index].push(record);
    return arr;
  }, [[], []])
    .map((arr) => arr.sort((a, b) => a[order.column] - b[order.column]))
    .reduce((curr, next) => curr.concat(next)));

  const sortDescendingElements = (array) => (array.reduce((arr, recorde) => {
    const index = (recorde[order.column].match(/[a-z]/i)) ? 1 : 0;
    arr[index].push(recorde);
    return arr;
  }, [[], []])
    .map((arr) => arr.sort((a, b) => b[order.column] - a[order.column]))
    .reduce((curr, next) => curr.concat(next)));

  const orderPlanetas = () => {
    const newArray = planetas;
    if (sorting) {
      switch (order.sort) {
      case 'ASC':
        setPlanetas(sortAscendingElements(newArray));
        break;
      case 'DESC':
        newArray.sort();
        setPlanetas(sortDescendingElements(newArray));
        break;
      default:
        alert('Selecione a ordenação');
        break;
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, '500');
    // setPlanetas(newArray);
  };

  useEffect(() => {
    orderPlanetas();
  }, [order, sorting]);

  const removeFilter = (columnName) => {
    const newFilterArray = filterByNumericValues.filter((filter) => (
      filter.column !== columnName
    ));
    setfilterByNumericValues(newFilterArray);
    const newOptions = columnOptions;
    newOptions.push(columnName);
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
      {
        isLoading ? <p>Carregando...</p> : (
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
                planetas
                  .filter((planeta) => (
                    planeta.name.toLowerCase().includes(nameFilter.toLowerCase())
                  ))
                  .map((planeta) => (
                    <tr key={ planeta.name }>
                      <td data-testid="planet-name">{ planeta.name }</td>
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
              }
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default Table;
