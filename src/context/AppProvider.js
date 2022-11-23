import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/planetsAPI';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [data, setData] = useState({ results: [] });
  const [isLoading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [filteringNumeric, setFilteringNumeric] = useState(false);
  const [filterByNumericValues, setfilterByNumericValues] = useState([{
    column: 'population',
    operador: 'maior que',
    quantidade: 0,
  }]);

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
    filteringNumeric,
    setFilteringNumeric,
  }), [data, isLoading, nameFilter, filterByNumericValues, filteringNumeric]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
