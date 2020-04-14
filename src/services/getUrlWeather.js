import {url_base, api_key}  from '../constants/apiUrl';
import PropTypes from 'prop-types'

export const getUrlWeaherByCity = city => (
    `${url_base}/weather?q=${city}&appid=${api_key}`
);
getUrlWeaherByCity.propTypes = {
    city: PropTypes.string.isRequired,
}

export const getUrlWeatherForecast = (city) => (
    `${url_base}/forecast?q=${city}&appid=${api_key}`
);
getUrlWeatherForecast.propTypes = {
    city: PropTypes.string.isRequired,
};
