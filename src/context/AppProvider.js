import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../services/planetsAPI';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [data, setData] = useState({ results: [] });
  const [isLoading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);

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
  }), [data, isLoading, nameFilter, filterByNumericValues]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
