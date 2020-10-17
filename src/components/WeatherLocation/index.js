import React from 'react';
import * as PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Location from './Location';
import WeatherData from './WeatherData'
import './styles.css'

const WeatherLocation = ({onClickWeatherLocation, city, data}) => (
  <div className="weatherLocationCont" onClick={onClickWeatherLocation}>
      <Location city={city} />
      { data ?
        <WeatherData data={data} /> :
        <CircularProgress size={60} /> }
  </div>
);

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onClickWeatherLocation: PropTypes.func,
    data: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
        weatherState: PropTypes.string.isRequired,
        humidity: PropTypes.number.isRequired,
        wind: PropTypes.string.isRequired,
    })
};

export default WeatherLocation;

/*
class WeatherLocation extends component {
    constructor(props) {
        super(props);
        const {city} = props;
        // Inicializar estado
        this.state = {
            city,
            data: null,
        };
    }

    componentDidMount() {
        // console.log('componentDidMount');
        this.getWeatherByCity();
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate');
    }

    Métodos de ciclo de vida YA desaconjesados por React, se discontinuarán en versión 17
    componentWillMount() { }
    componentWillUpdate(nextProps, nextState) { }

*/
