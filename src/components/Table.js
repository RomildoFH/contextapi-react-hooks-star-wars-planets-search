import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { data, isLoading, setLoading, nameFilter } = useContext(AppContext);
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
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
            ? data.results.filter((planeta) => (
              planeta.name.toLowerCase().includes(nameFilter.toLowerCase())
            )).map((planeta) => (
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
