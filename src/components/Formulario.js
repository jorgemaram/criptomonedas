import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from '@emotion/styled';

import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomonedas'
import Error from './Error'

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }

`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State del listado de Criptomonedas
    const [listaCripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    
    const Monedas = [
        {codigo: 'USD', nombre: 'Dólar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'COD', nombre: 'Peso Colombiano'}
    ]

    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', Monedas);
    //Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);


    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await Axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        
        consultarAPI()
    }, [])

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos están llenos
        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        //pasar datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }



    return (

        <form onSubmit={cotizarMoneda}>

            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />
            <SelectCripto />

            <Button
                type='submit'
                value='Calcular'
            />
        </form>

    );
}

export default Formulario;