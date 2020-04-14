// reactjs code snippet: rsfp→   stateless named function with prop types skeleton
import React from 'react';
// react-redux provee connect para conectar las 2 bibliotecas: react y redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCity, getForecastDataFromCities} from '../reducers';
import ForecastExtended from '../components/ForecastExtended';

ForecastExtendedContainer.propTypes = {
  city: PropTypes.string.isRequired,
  forecastData: PropTypes.array,
};

function ForecastExtendedContainer ({city, forecastData}) {
  return (
    city &&
      <ForecastExtended city={city} forecastData={forecastData}/>
  );  
}

/*
mapStateToProps retorna un objeto con las propiedades (values) que utilizará
 el componente, propiedades que obtiene del state que llega como input param
En ese ejemplo retorna { city: "Nombre de ciudad" }
Originalmente sería const mapStateToProps = state => ({ city: state.city, });
Pero con destructuring queda
const mapStateToProps = ({city}) => ({city});
Luego evolucionó con el agregado de forecastData, como sigue
*/
const mapStateToProps = state => (
  { city: getCity(state),
    forecastData: getForecastDataFromCities(state)
  });

// connect inyecta las propiedades (values) del objeto devuelto por mapStateToProps,
//  como "props" dentro del componente ForecastExtendedContainer
export default connect(mapStateToProps, null)(ForecastExtendedContainer);