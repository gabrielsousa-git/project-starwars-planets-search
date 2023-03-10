import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanetsAPI();
      const finalResults = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(finalResults);
    };
    getPlanets();
  }, []);

  const contextValue = {
    planets,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
