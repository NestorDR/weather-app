import React from 'react';
import PropTypes from 'prop-types';
import WeatherLocation from './WeatherLocation'
import './styles.css';

const LocationList = ({currentCitiesWeather, onSelectedLocation}) => {
    const handleWeatherLocationClick = city => onSelectedLocation(city);

    const arrayToComponentList = currentCitiesWeather => (
      currentCitiesWeather.map(city =>
          <WeatherLocation
            key={city.key}
            city={city.name}
            data={city.data}
            onClickWeatherLocation={() => handleWeatherLocationClick(city.name)}
          />
      )
    );

    return (
      <div className="locationlist">
          {arrayToComponentList(currentCitiesWeather)}
      </div>
    );
};

LocationList.propTypes = {
    currentCitiesWeather: PropTypes.array.isRequired,
    onSelectedLocation: PropTypes.func,
};

export default LocationList;