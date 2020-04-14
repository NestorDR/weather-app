import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import LocationListContainer from './containers/LocationListContainer';
import ForecastExtendedContainer from './containers/ForecastExtendedContainer';
import './App.css';

function App(props) {
  // useState reemplaza this.state y this.setState de los Class Components
  // Visitar: https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
  // Después de agregar Redux ya no es necesario
  // const [ city, setCityState ] = useState(undefined); 

  const cities = [
    'Resistencia,ar',
    'Buenos Aires,ar',
    'Brasilia,br',
    'Fairbanks,us',
    'Lima,pe',
    'Zaragoza,es',
  ];
  
  return (
    <Grid>
      <Row>
        <AppBar position='sticky'>
          <Toolbar>
            <Typography variant='h4' color='inherit'>
              Pronóstico del Clima
            </Typography>
          </Toolbar>
        </AppBar>
      </Row>
      <Row>
        {/* A JSX comment */}
        {/* React-FlexBox-Grid */}
        {/* Viewport widths: xs, sm, md & lg */}
        {/*  */}
        {/* <Col> cuando View Port esté en tamaño chico xs={12} le dice que use la totalidad del ancho */}
        {/* <Col> cuando View Port esté en tamaño mediano xs={6} le dice que use la mitad del ancho */}
        {/* <Col> cuando View Port esté en tamaño mediano oficiará como COLUMNA, pero en chico oficiará como FILA */}
        <Col xs={12} md={6}>
          {/* Componente Lista de Ciudades */}
          <LocationListContainer cities={cities} />
        </Col>

        {/* <Col> cuando View Port esté en tamaño mediano oficiará como COLUMNA, pero en chico oficiará como FILA */}
        <Col xs={12} md={6}>
          <Paper elevation={4}>
            <div className="detail">
              {/* Componente pronóstico extendido */}
              <ForecastExtendedContainer />
            </div>
          </Paper>  
        </Col>
      </Row>
    </Grid>
  );
}

export default App;

