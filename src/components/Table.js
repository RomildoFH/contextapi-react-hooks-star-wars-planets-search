import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const {
    data,
    isLoading,
    setLoading,
    nameFilter,
    filterByNumericValues,
    filteringNumeric,
    // setFilteringNumeric
  } = useContext(AppContext);

  const [planetas, setPlanetas] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const filterCombine = () => {
    if (filterByNumericValues[0].operador === 'maior que') {
      const newArray = planetas
        .filter((planeta) => (
          filterByNumericValues.length >= 1
            ? Number(planeta[filterByNumericValues[0].column])
            > Number(filterByNumericValues[0].quantidade)
            : null
        ));
      setPlanetas(newArray);
      console.log(typeof (filterByNumericValues[0].quantidade));
    } else if (filterByNumericValues[0].operador === 'menor que') {
      const newArray = planetas
        .filter((planeta) => (
          filterByNumericValues.length >= 1
            ? Number(planeta[filterByNumericValues[0].column])
            < Number(filterByNumericValues[0].quantidade)
            : planeta
        ));
      setPlanetas(newArray);
    } else if (filterByNumericValues[0].operador === 'igual a') {
      const newArray = planetas
        .filter((planeta) => (
          filterByNumericValues.length >= 1
            ? Number(planeta[filterByNumericValues[0].column])
            === Number(filterByNumericValues[0].quantidade)
            : planeta
        ));
      setPlanetas(newArray);
    } else {
      setPlanetas(data.results);
    }
  };

  useEffect(() => {
    setPlanetas(data.results);
  }, [data.results]);

  useEffect(() => {
    filterCombine();
  }, [filteringNumeric]);

  // console.log(filterByNumericValues[0].column);
  // console.log(filterByNumericValues[0].quantidade);
  return (
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
              // .filter((planeta) => (
              //   filterByNumericValues.length >= 1
              //     ? planeta[filterByNumericValues[0].column]
              //     > filterByNumericValues[0].quantidade
              //     : planeta
              // ))
              .map((planeta) => (
                <tr key={ planeta.name }>
                  {/* {
                    Object.keys(planeta).map((prop) => (
                      <td key={ `${planeta.name}-${prop}` }>{ `${planeta[prop]}` }</td>
                    ))
                  } */}
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
  );
}

export default Table;
