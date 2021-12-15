import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AVANCES } from 'graphql/auth/avances/queries';
import PrivateComponent from 'components/PrivateComponent';
import ButtonLoading from 'components/ButtonLoading';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';

import { AGREGAR_OBSERVACION } from 'graphql/auth/avances/mutations';
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
        const FormObservacion = ({ id }) => {
            const { form, formData, updateFormData } = useFormData();
            const [agregarObservacion, { data: mutationData, loading: mutationLoading, error: mutationError }] =
            useMutation(AGREGAR_OBSERVACION,{
                refetchQueries: [{ query: AVANCES }],
            });
    
            const submitForm = (e) => {
                e.preventDefault();
                formData._id = id;
                console.log("formData")
                console.log(formData);
                agregarObservacion({ variables: formData });
                toast.success('Observación añadida con exito');
                setAddObservacion(false);
                
            }
            
            return (<form ref={form} onChange={updateFormData} onSubmit={submitForm}>
                <Input type='text' label='Observación' name='observacion' />
                <ButtonLoading text='Añadir Observación' loading={false} disabled={false} /></form>)
        }
    
        const [addObservacion, setAddObservacion] = useState(false);
        return (
            <AccordionStyled>
                <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
                <div className='uppercase font-bold text-gray-100 '>
                    {avance.descripcion} - {avance.proyecto.nombre}
                </div>    
                </AccordionSummaryStyled>
                <AccordionDetailsStyled>
                <ul className='lista'>
                    {avance.observaciones.map((obs) => <div className='mx-5 my-4 bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-xl'><li>{obs}</li></div>)}
                   <PrivateComponent roleList={['LIDER']}> <div className='mx-5 my-4 bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-xl'><li>Agregar observacion <i
                        onClick={() => { setAddObservacion(!addObservacion) }} /*setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}*/
                        className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
                    /></li></div></PrivateComponent>
                    {addObservacion ? <FormObservacion id={avance._id} /> : <></>}
                </ul>
                   
                
                </AccordionDetailsStyled>
            </AccordionStyled>
        );
    };




export default IndexAvances;
