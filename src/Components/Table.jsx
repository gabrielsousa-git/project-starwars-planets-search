import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';

const COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Table() {
  const { planets } = useContext(AppContext);
  const [filterByName, setFilterByName] = useState({
    name: '',
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [deleteFilter, setDeleteFilter] = useState([]);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const filterPlanets = ({ target: { value } }) => {
    setFilterByName({ name: value });
    const filter = value.toLowerCase().trim();
    const filtered = planets.filter((planet) => planet.name.toLowerCase()
      .includes(filter));
    setFilteredPlanets(filtered);
  };

  const handleNumericFilters = (linha) => {
    const bools = [];
    selectedFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(Number(linha[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        bools.push(Number(linha[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        bools.push(Number(linha[filter.column]) === Number(filter.value.toUpperCase()));
        break;
      default:
        return true;
      }
    });
    return bools.every((el) => el);
  };

  const handleDeleteFilter = (column) => {
    setSelectedFilters(selectedFilters.filter((toDelete) => toDelete.column !== column));
    setDeleteFilter(deleteFilter.filter((toDelete) => toDelete.column !== column));
  };

  const deleteAllFilters = () => {
    setFilterByName({ name: '' });
    setSelectedFilters([]);
  };

  const planetsHtmlItems = filteredPlanets.filter(handleNumericFilters)
    .map((planet, index) => (
      <tr key={ index }>
        { Object.values(planet).map((plnt, ind) => (<td key={ ind }>{ plnt }</td>)) }
      </tr>
    ));

  return (
    <main>

      <label htmlFor="name-filter">
        Filtrar por nome:
        <input
          type="text"
          name="name-filter"
          id="name-filter"
          data-testid="name-filter"
          value={ filterByName.name }
          onChange={ filterPlanets }
        />
      </label>

      <label htmlFor="column-filter">
        <select
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
          value={ filterByNumericValues.column }
          onChange={ ({ target: { value } }) => setFilterByNumericValues(
            (prevSelect) => ({ ...prevSelect, column: value }),
          ) }
        >
          { COLUMNS.filter((column) => !selectedFilters.includes(column))
            .map((column) => (
              <option key={ column } value={ column }>
                { column }
              </option>
            )) }
        </select>
      </label>

      <label htmlFor="comparison-filter">
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ filterByNumericValues.comparison }
          onChange={ ({ target: { value } }) => setFilterByNumericValues(
            (prevSelect) => ({ ...prevSelect, comparison: value }),
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        Valor:
        <input
          type="number"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          value={ filterByNumericValues.value }
          onChange={ ({ target: { value } }) => setFilterByNumericValues(
            (prevSelect) => ({ ...prevSelect, value }),
          ) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setSelectedFilters((prevSelect) => ([
            ...prevSelect,
            filterByNumericValues,
          ]));
          setFilterByNumericValues({
            column: 'population',
            comparison: 'maior que',
            value: '0',
          });
        } }
      >
        Filtrar
      </button>

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAllFilters }
      >
        Remover todos os filtros
      </button>

      {
        selectedFilters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <span>
              { filter.column }
              { ' ' }
              { filter.comparison }
              { ' ' }
              { filter.value }
            </span>
            <button
              type="button"
              onClick={ () => handleDeleteFilter(filter.column) }
            >
              X
            </button>
          </div>
        ))
      }

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          { planetsHtmlItems }
        </tbody>

      </table>

    </main>
  );
}

export default Table;
