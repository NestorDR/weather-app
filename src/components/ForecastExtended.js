import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import ForecastItem from './ForecastItem';

import './styles.css';

const renderForecastItemDays = (forecastData) => {
    return forecastData.map( item =>
        <ForecastItem 
            key={`${item.weekDay}${item.hour}`} 
            weekDay={item.weekDay}
            hour={item.hour} 
            data={item.data}>
        </ForecastItem> );
};

/*
El componente funcional usando function sería
    function ForecastExtended(props) {
        const {city, forecastData} = props;
        ....
    }
O alternativamente mediante destructuring la firma de la función puede ser
    function ForecastExtended({city, forecastData}) {
        ....
    }
O con arrow function como sigue
*/
const ForecastExtended = ({city, forecastData}) => (
    <div>
        <h2 className="forecast-title">Pronóstico Extendido para {city}</h2>
        { forecastData ?
            renderForecastItemDays(forecastData) :
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={60}></CircularProgress>
            </div>
        }
    </div>
);

ForecastExtended.propTypes = {
    city: PropTypes.string,
    forecastData: PropTypes.array,
};

export default ForecastExtended;