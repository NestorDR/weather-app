import convert from 'convert-units';
import moment from 'moment';
import 'moment/locale/es';      // Para culturización en ESPAÑOL
import {capitalize} from '../helpers/myString.js'

import {CLOUD,
        CLOUDY, 
        DRIZZLE,
        RAIN,
        SNOW, 
        SUN,
        THUNDER,
    } from '../constants/weathers';

const convertTemp = kelvin => {
    // Convertir unidades de temperatura
    return Number(convert(kelvin).from('K').to('C').toFixed(1));
}

const getWeatherState = weather => {
    const {id} = weather;
    if (id < 300) {
        // Clima tormentoso - Truenos
        return THUNDER;
    } else if (id < 400) {
        // Llovizna
        return DRIZZLE;
    } else if (id < 600) {
        // Lluvia
        return RAIN;
    } else if (id < 700) {
        // Nieve
        return SNOW;
    } else if (id === 800) {
        // Soleado
        return SUN;
    } else if (id < 803)  {
        // Nublado
        return CLOUD;
    } else {
        // Nublado
        return CLOUDY;
    }
}

export const transformWeather = json => {
    // Extraer de la respuesta propiedades necesarias
    const { humidity, temp } = json.main;
    const { speed } = json.wind;
    
    // Convertir Farenheit a Celsius
    const temperature = convertTemp(temp) // Convert 

    // Ejemplo de uso de Object Literal Property Value Shorthand
    return  {
        temperature,
        weatherState: getWeatherState(json.weather[0]),
        humidity,
        wind: `${speed} m/s`,
    };
}

export const transformForecast = json => (
    json.list
        .filter( item => 
            (
                moment.unix(item.dt).utc().hour() % 6 === 0 
            ))
        .map ( item => (
            {
                weekDay: capitalize(moment.unix(item.dt).format('ddd')),
                hour: moment.unix(item.dt).utc().hour(),
                // Reutilizar transformación
                data: transformWeather(item),
            }))
);
