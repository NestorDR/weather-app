import React from 'react';
import {IconContext} from 'react-icons';
import PropTypes from 'prop-types';
import * as WeatherIcons from 'react-icons/wi';

import {CLOUD, 
        CLOUDY,
        RAIN,
        SNOW, 
        SUN,
        THUNDER,
        DRIZZLE, } from '../../../constants/weathers';

import './styles.css';

const icons = {
    [CLOUD]: WeatherIcons.WiCloud,
    [CLOUDY]: WeatherIcons.WiCloudy,
    [DRIZZLE]: WeatherIcons.WiShowers,
    [RAIN]: WeatherIcons.WiRain,
    [SNOW]: WeatherIcons.WiSnow,
    [SUN]: WeatherIcons.WiDaySunny,
    [THUNDER]: WeatherIcons.WiThunderstorm,
    // No usadas
    // [FOG]: WeatherIcons.WiDayFog,
    // [WINDY]: WeatherIcons.WiDayWindy,
};

const getWeatherIcon = weatherState => {
    // Traer ícono a partir de clave de texto
    let IconWI = icons[weatherState];
    if (!IconWI) IconWI = icons[SUN];
    let iconSize = '4em';
    return (
        <IconContext.Provider value={{ size: iconSize, className: "global-class-name wIcon" }}>
            <IconWI />
        </IconContext.Provider>
    );
};

const WeatherTemperature = ({temperature, weatherState}) => (
    <div className="weatherTemperatureCont">
        { getWeatherIcon(weatherState) }
        <span className="temperature">{`${temperature}`}</span>
        <span className="temperatureType">{' C°'}</span>
    </div>
);
    
WeatherTemperature.propTypes = {
    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.string.isRequired,
};

export default WeatherTemperature;