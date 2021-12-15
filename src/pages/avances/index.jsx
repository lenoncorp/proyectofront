import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AVANCES } from 'graphql/auth/avances/queries';
import PrivateComponent from 'components/PrivateComponent';
import {
    AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled,
} from 'components/Accordion';


const IndexAvances = () => {
    const { data: queryData, loading } = useQuery(AVANCES);


    useEffect(() => {
        console.log('datos avance', queryData);
    }, [queryData]);

    if (loading) return <div>Cargando...</div>;

    if (queryData.Avances) {

        return (
            <div className='p-10'>
                {queryData.Avances.map((avance) => {
                    return <AcordionAvance avance={avance} />;
                })}
            </div>
        );
    }
    return <></>;
};
    const AcordionAvance = ({ avance }) => {
        return (
            <AccordionStyled>
                <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
                <div className='uppercase font-bold text-gray-100 '>
                    {avance.descripcion} - {avance.proyecto.nombre}
                </div>    
                </AccordionSummaryStyled>
                <AccordionDetailsStyled>
                
                    {avance.observaciones.map((observacion)=> <div className='mx-5 my-4 bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-xl'><li>{observacion}</li></div>)}
                
                </AccordionDetailsStyled>
            </AccordionStyled>
        );
    };




export default IndexAvances;
