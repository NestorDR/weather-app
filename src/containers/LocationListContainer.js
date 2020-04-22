// reactjs code snippet: rsfp→   stateless named function with prop types skeleton
// useEffect reemplaza a DidMount. Visitar: https://wattenberger.com/blog/react-hooks
import React, {useEffect} from 'react';
// react-redux provee connect para conectar las 2 bibliotecas: react y redux
import {connect} from 'react-redux';
// PropTypes ofrece una manera de verificar dinámicamente las props de los componentes
import * as PropTypes from 'prop-types';
// bindActionCreators abreviaría escritura del bind de acciones en mapDispacthToProps. Complica desacople y refactoring
import {bindActionCreators} from 'redux';
// Al agregar bindActionCreators se importa *, y no requiere importar explícitamente las funciones necesarias
//   en este caso era import {setSelectedCityActionCreator, setWeatherActionCreator} from '../actions'
import * as actions from '../actions';
// reducers
import {getCurrentCitiesWeather} from '../reducers';
// Importar componente representacional
import LocationList from '../components/LocationList';

function LocationListContainer(props) {
  const {setWeatherActionCreator, setSelectedCityActionCreator, cities, currentCitiesWeather} = props;

  // useEffect reemplaza <Class Component> DidMount
  useEffect(() => {
    // Para cargar en el estado la lista de ciudades seleccionables con su clima actual
    // setWeatherInStore(cities);             // Sin bindActionCreators
    setWeatherActionCreator(cities);

    if (Array.isArray(cities) && cities.length)
      // Para forzar traiga el pronóstico extendido de la 1º ciudad
      // setSelectedCityInStore(cities[0]);   // Sin bindActionCreators
      setSelectedCityActionCreator(cities[0]);

  }, [setWeatherActionCreator, setSelectedCityActionCreator, cities]);


  // Se seleccionó una ciudad de la lista
  const handleSelectedLocation = city =>
    // Disparar actualización redux.store
    // setSelectedCityInStore(city);   // ~ store.dispatch(setSelectedCityActionCreator(city))
    setSelectedCityActionCreator(city);

  return (
    <LocationList
      currentCitiesWeather={currentCitiesWeather}
      onSelectedLocation={handleSelectedLocation}>
    </LocationList>
  );
}

LocationListContainer.propTypes = {
  /* sin bindActionCreators
  setWeatherInStore: PropTypes.func.isRequired,
  setSelectedCityInStore: PropTypes.func.isRequired,
  */
  setWeatherActionCreator: PropTypes.func.isRequired,
  setSelectedCityActionCreator: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  currentCitiesWeather: PropTypes.array,
};

/*
  mapStateToProps retorna un objeto con las propiedades (values) que utilizará
   el componente, propiedades que obtiene del state que llega como input param
  mapStateToProps tiene 2 input params: state, props
*/
const mapStateToProps = state => ({
  currentCitiesWeather: getCurrentCitiesWeather(state)
});

/*
  mapDispatchToProps retorna un objeto con funciones agregadas al parámetro props de la función conectada,
    en este caso LocationListContainer
  Esas funciones van a llamar al dispatch que debe llegar como input param de mapDispatchToProps (es decir,
    dispatch debiera venir como parámetro para que se usen dentro de las funciones).
*/
/*
  Propiedad setSelectedCityInStore es una función que ejecuta store.dispatch para actualizar store de redux
  setSelectedCityInStore se inyectará como propiedad de la componente LocationListContainer conectada
*/
/* Version de mapDispatchToProps sin bindActionCreators
const mapDispatchToProps ({
  setWeatherInStore: cities => dispatch(setWeatherActionCreator(cities))
  setSelectedCityInStore: value => dispatch(setSelectedCityActionCreator(value)),
});

 bindActionCreators generará dinámicamente un objeto como el previo, pero con todas las acciones exportadas
 en '../actions', pero no se pueden personalizar/modificar los nombres de las acciones exportados
 */
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

/*
connect inyecta:
  - las propiedades del estado global devueltas por mapStateToProps, y
  - las funciones del objeto devuelto por mapDispatchToProps,
    como "props" dentro del componente LocationListContainer
*/
export default connect(mapStateToProps, mapDispatchToProps)(LocationListContainer);