import {combineReducers} from 'redux';
import {createSelector} from 'reselect';
import {cities, getForecastDataFromCities as _getForecastDataFromCities,
        getCurrentCitiesWeather as _getCurrentCitiesWeather} from './cities';
import {city} from './city';

export default combineReducers({
  city,
  cities,
});
/* Por Property Value Shorthand
 {
   cities,   // equivale a cities: cities
   city,     // equivale a city: city
 }
*/

// Las funciones get* siguientes son Selectores que permiten proveer a los componentes
// llamadores (los que importan a reducers), un método para obtener datos del state (estado global)
// de una manera abstracta, sin que conozcan la estructura interna del state
export const getCity = createSelector(
  state => state.city,
  city => city
);

export const getForecastDataFromCities = createSelector(
  state => state.cities,    // 1º parámetro de _getForecastDataFromCities
  getCity,                  // 2º parámetro de _getForecastDataFromCities
  _getForecastDataFromCities
);

export const getCurrentCitiesWeather = createSelector(
  state => state.cities,
  _getCurrentCitiesWeather
);