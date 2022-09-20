import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanetsAPI();
      const resultsPlanets = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(resultsPlanets);
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
