import {getUrlWeaherByCity, getUrlWeatherForecast} from '../services/getUrlWeather';
import {transformWeather, transformForecast} from '../services/transformWeather';

export const SET_CITY = 'SET_CITY';                     // Almacena ciudad seleccionada en store
export const GET_CITY_WEATHER = 'GET_CITY_WEATHER';     // Solicita clima de una ciudad al API Server
export const SET_CITY_WEATHER = 'SET_CITY_WEATHER';     // Almacena  clima de una ciudad en store
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';

// ==================================================================================
// Acciones internas

// Creador del tipo de acción 'setCity'
const setCityActionCreator = payload =>  ({type: SET_CITY, payload});

// Creador del tipo de acción 'setForecastData'
const setForecastDataActionCreator = payload => ({type: SET_FORECAST_DATA, payload});

// Creadores de acciones para traer y almacenar el clima actual de cada ciudad
const getCityWeatherActionCreator = payload =>  ({type: GET_CITY_WEATHER, payload});
const setCityWeatherActionCreator = payload =>  ({type: SET_CITY_WEATHER, payload});

// ==================================================================================
// Acciones exportadas vía Thunk Action Creators

// Creador del tipo de acción 'setSelectedCityAction'
export const setSelectedCityActionCreator = city => {
  // Uso de redux-thunk importado en '../store' permite llamadas asincronas y recuperacion
  //   del estado global
  return (dispatch, getState) => {
    const urlForecast = getUrlWeatherForecast(city);

    // Establecer seguidamente en forma sincrónica la City actual en el State
    dispatch(setCityActionCreator(city));

    // Uso de thunk vía función getState permite acceder al estado global
    const state = getState();
    const date = state.cities[city] && state.cities[city].forecastDataDate;

    const unMinuto = 1 * 60 * 1000;
    if (date && new Date() - date < unMinuto) return;

    // Limpiar pronóstico en State, para activar el indicador de búsqueda de datos (fetching para datos de Forecast)
    dispatch(setForecastDataActionCreator({city, forecastData: null}))

    // Obtener clima actual en city
    return fetch(urlForecast)
            .then(response => response.json())
            .then(json => {
                    // Transformar json en objecto
                    const forecastData = transformForecast(json);

                    // Modificar State con resultado de la promesa fetch
                    dispatch(setForecastDataActionCreator({city, forecastData}))
                  });
  }
};

// Creador del tipo de acción 'setWeatherActionCreator'
export const setWeatherActionCreator = cities => {
  return dispatch => {
    cities.forEach(city => {
      // Inicializar obtención clima actual en city (limpia el último estado del clima consultado)
      dispatch(getCityWeatherActionCreator(city));

      // Armar URL API
      const urlWeather = getUrlWeaherByCity(city);

      // Obtener clima actual en city
      fetch(urlWeather)
        .then(response => response.json())
        .then(json => {
          // Transformar json en objecto
          const weather = transformWeather(json);

          // Almacenar en store clima actual en city
          dispatch(setCityWeatherActionCreator({city, weather}));
        });
    });
  }
};
