import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

const Location = ({city}) => (
    <div className="locationCont">
        <h2>{city}</h2>
    </div>
);

Location.propTypes = {
    city: PropTypes.string.isRequired,
};

export default Location;

/*
// Con desctructuring
const LocationWithDesctructuring = (props) => {
    // Tradicionalmente
    // const city = props.city;
   
    // uso de Destructuring: c/propiedad se asigna a una variable del mismo nombre
    const { city } = props;
    return <div><h1>{city}</h1></div>
};
*/