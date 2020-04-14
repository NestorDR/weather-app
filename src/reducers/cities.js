import {createSelector} from 'reselect';
import toPairs from 'lodash.topairs';
import {SET_FORECAST_DATA, GET_CITY_WEATHER, SET_CITY_WEATHER} from '../actions';

/*
La fracción de estado de este reducer será un objeto, cuyas propiedades:
 - serán creadas dinámicamente durante la ejecución mediante la notación de corchetes []
    visitar: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Miembros
 - tendrán por nombre el valor de la ciudad cuyo pronóstico del clima se almacenará
*/
const INITIAL_STATE = {};

export const cities = (state = INITIAL_STATE, action) => {
  // Crear/Actualizar estado con propiedad [city] & data { forecastData, weather }
  let city, forecastData, weather;
  switch (action.type) {

    case SET_FORECAST_DATA:
      // Destructuring sobre payload
      ({city, forecastData} = action.payload);      // destructurin requiere los paréntesis que encierran la instrucción
      return {...state, [city]: {...state[city], forecastData, forecastDataDate: new Date()}};

    case GET_CITY_WEATHER:
      city = action.payload;
      return {...state, [city]: {...state[city], weather: null}};

    case SET_CITY_WEATHER:
      ({city, weather} = action.payload);
      return {...state, [city]: {...state[city], weather}};

    default:
      return state;
  }
};

/*
Observación: como inicialmente no hay 'city' seleccionada, no se trajo aún un pronóstico (forecastdata) del clima
para ninguna city, por lo tanto globalState.cities[city] = NULL, donde cities es la fracción de estado del
reducer cities.js y que en este contexto de cities es representado por el parámetro state,
y [city] es la propiedad que se crea despues de consultar el pronóstico la primera vez, y se actualiza con las
siguientes consultas a la API.
*/
export const getForecastDataFromCities = createSelector(
  (state, city) => state[city] && state[city].forecastData, forecastData => forecastData);

/*
Convertir el diccionaro del estado del tipo { ... key: value ... }
en un arreglo de objetos simples [ ... {key, name=key, data=value} ... ]
via lodash.topairs
*/
const objectToArray = cities => (
  toPairs(cities).map(
    ([key, value]) => (
      {key,
       name: key,       // el atributo lleva por nombre, el nombre de la ciudad
       data: value.weather}
    )
  )
);


export const getCurrentCitiesWeather = createSelector(
  state => objectToArray(state), currentCitiesWeather => currentCitiesWeather
);