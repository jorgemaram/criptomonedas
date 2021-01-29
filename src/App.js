import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import cryptomonedas from './cryptomonedas.png'

import Formulario from './components/Formulario'
import Cotizacion from './components/Cotización'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem; 
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &:: after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  };
`

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);


  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      //evitar ejecución primera vez
      if (moneda === '') return;
  
      //consultar api para obtener cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
  
      const resultado = await axios.get(url);

      //mostrarSpinner
      guardarCargando(true);

      //ocultar spinner y mostrar resultado
      setTimeout(() => {

        //cambiar el estado de cargando
        guardarCargando(false);

        //guardar cotización
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }, 3000)
    }
    cotizarCriptomoneda()
  }, [moneda, criptomoneda])


  //Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src={cryptomonedas} alt='imagen criptomonedas' />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
