import {SET_CITY} from '../actions'

/* 
  La fracción de estado de este reducer será un string conteniendo el 
  nombre de la ciudad seleccionada por el usuario, de la lista de ciudades.
*/
const INITIAL_STATE = '';

export const city = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CITY:
      return action.payload;    // action.payload es la Ciudad seleccionada por el usr
    default:
      return state;
  }
}