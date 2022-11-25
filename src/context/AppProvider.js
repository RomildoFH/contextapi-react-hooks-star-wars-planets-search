import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/planetsAPI';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [data, setData] = useState({ results: [] });
  const [isLoading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [order, setOrder] = useState({});
  const [sorting, setSorting] = useState(false);

  useEffect(() => {
    planetsAPI().then((result) => setData(result));
  }, []);

  const values = useMemo(() => ({
    data,
    isLoading,
    setLoading,
    nameFilter,
    setNameFilter,
    filterByNumericValues,
    setfilterByNumericValues,
    columnOptions,
    setColumnOptions,
    order,
    setOrder,
    sorting,
    setSorting,
  }), [
    data,
    isLoading,
    nameFilter,
    filterByNumericValues,
    columnOptions,
    order,
    sorting,
  ]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
