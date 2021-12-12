import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Button, Dialog } from '@mui/material';
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import useFormData from 'hooks/useFormData';
import PrivateComponent from 'components/PrivateComponent';
import { Link } from 'react-router-dom';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import {
    AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled,
} from 'components/Accordion';



const IndexProyectos = () => {
    const { data: queryData, loading, error } = useQuery(PROYECTOS);

    useEffect(() => {
        console.log('datos proyecto', queryData);
    }, [queryData]);

    if (loading) return <div>Cargando...</div>;

    if (queryData.Proyectos) {
        return (
            <div className='p-10 flex flex-col'>
                <div className='flex w-full items-center justify-center'>
                    <h1 className='text-2xl font-bold text-gray-900'>Lista de Proyectos</h1>
                </div>
                <PrivateComponent roleList={['LIDER']}>
                    <div className='my-2 self-end'>
                        <button className='bg-green-900 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400'>
                            <Link to='/proyectos/nuevo'>Crear nuevo proyecto</Link>
                        </button>
                    </div>
                </PrivateComponent>
                {queryData.Proyectos.map((proyecto) => {
                    return <AccordionProyecto proyecto={proyecto} />;
                })}
            </div>
        );
    }

    return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogFase,setShowDialogFase] = useState(false);
    const [showDialogPpto,setShowDialogPpto] = useState(false);
    return (
        <>
            <AccordionStyled>
                <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
                    <div className='flex w-full justify-between'>
                        <div className='uppercase font-bold text-gray-100 '>
                            {proyecto.nombre} - {proyecto.estado} - {proyecto.fase}
                        </div>
                    </div>
                </AccordionSummaryStyled>
                <AccordionDetailsStyled>
                    <PrivateComponent roleList={['ADMINISTRADOR']}>
                        {/* Cambia estado proyecto */}
                        <div className='mx-5 my-4 bg-yellow-50 p-5 rounded-lg flex justify-center w-80'>
                            <div className='text-lg font-bold'>
                                <div> Editar estado del proyecto
                                    <i
                                        className='mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400'
                                        onClick={() => {
                                            setShowDialog(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Cambia fase proyecto */}
                        <div className='mx-5 my-4 bg-pink-50 p-5 rounded-lg flex justify-center w-80'>
                            <div className='text-lg font-bold'>
                                <div> Editar fase del proyecto
                                    <i 
                                        className='mx-4 fas fa-pen text-pink-600 hover:text-pink-400'
                                        onClick={() => {
                                            setShowDialogFase(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Cambia presupuesto */}
                        <div className='mx-5 my-4 bg-violet-50 p-5 rounded-lg flex justify-center w-80'>
                            <div className='text-lg font-bold'>
                                <div> Presupuesto
                                    <i 
                                        className='mx-4 fas fa-pen text-violet-600 hover:text-violet-400'
                                        onClick={() => {
                                            setShowDialogPpto(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        

                    </PrivateComponent>
                    <PrivateComponent roleList={['LIDER']}>
                        {/* Cambia nombre proyecto */}
                        {/* <div className='mx-5 my-4 bg-yellow-50 p-5 rounded-lg flex justify-center w-80'>
                            <div className='text-lg font-bold'>
                                <div> Editar estado del proyecto
                                    <i
                                        className='mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400'
                                        onClick={() => {
                                            setShowDialog(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div> */}

                        {/* Cambia presupuesto */}
                        <div className='mx-5 my-4 bg-gray-50 p-5 rounded-lg flex justify-center w-80'>
                            <div className='text-lg font-bold'>
                                <div> Presupuesto
                                    <i 
                                        className='mx-4 fas fa-pen text-gray-600 hover:text-gray-400'
                                        onClick={() => {
                                            setShowDialogPpto(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </PrivateComponent>
                    <PrivateComponent roleList={['ESTUDIANTE']}>
                        <InscripcionProyecto
                            idProyecto={proyecto._id}
                            estado={proyecto.estado}
                            inscripciones={proyecto.inscripciones}
                        />
                    </PrivateComponent>
                    <div>Liderado Por: {proyecto.lider.correo}</div>
                    <div className='flex'>
                        {proyecto.objetivos.map((objetivo) => {
                            return <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
                        })}
                    </div>
                </AccordionDetailsStyled>
            </AccordionStyled>
            <Dialog
                open={showDialog}
                onClose={() => {
                    setShowDialog(false);
                }}
            >
                <FormEditProyecto _id={proyecto._id} />
            </Dialog>
            {/* cambiar fase proyecto */}
            <Dialog
                open={showDialogFase}
                onClose={() => {
                    setShowDialogFase(false);
                }}
            >
                <FormEditFaseProyecto _id={proyecto._id} />
            </Dialog>
            {/* cambiar presupuesto*/}
            <Dialog
                open={showDialogPpto}
                onClose={() => {
                    setShowDialogPpto(false);
                }}
            >
                <FormEditPptoProyecto _id={proyecto._id} />
            </Dialog>
        </>
    );
};

const FormEditProyecto = ({ _id }) => {
    const { form, formData, updateFormData } = useFormData();
    const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);

    const submitForm = (e) => {
        e.preventDefault();
        editarProyecto({
            variables: {
                _id,
                campos: formData,
            },
        });
    };

    //cambio estado proyecto
    useEffect(() => {
        console.log('data mutation', dataMutation);
    }, [dataMutation]);

    return (
        <div className='p-4'>
            <h1 className='font-bold'>Modificar Estado del Proyecto</h1>
            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                className='flex flex-col items-center'
            >
                <DropDown label='Estado del Proyecto' name='estado' options={Enum_EstadoProyecto} />
                <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
            </form>
        </div>
    );
    
};

const FormEditFaseProyecto = ({ _id }) => {
    const { form, formData, updateFormData } = useFormData();
    const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);

    const submitFormFase = (e) => {
        e.preventDefault();
        editarProyecto({
            variables: {
                _id,
                campos: formData,
            },
        });
    };

    //cambio fase proyecto

    useEffect(() => {
        console.log('data mutation', dataMutation);
    }, [dataMutation]);

    return (
        <div className='p-4'>
            <h1 className='font-bold'>Modificar Fase del Proyecto</h1>
            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitFormFase}
                className='flex flex-col items-center'
            >
                <DropDown label='Fase del Proyecto' name='fase' options={Enum_FaseProyecto} />
                <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
            </form>
        </div>
    );

};

const FormEditPptoProyecto = ({ _id }) => {
    const { form, formData, updateFormData } = useFormData();
    const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);

    const submitFormPpto = (e) => {
        e.preventDefault();
        editarProyecto({
            variables: {
                _id,
                campos: formData,
            },
        });
    };

    //cambio ppto proyecto

    useEffect(() => {
        console.log('data mutation', dataMutation);
    }, [dataMutation]);

    return (
        <div className='p-4'>
            <h1 className='font-bold'>Modificar Presupuesto del Proyecto</h1>
            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitFormPpto}
                className='flex flex-col items-center'
            >
                <DropDown label='Presupuesto Proyecto' name='presupuesto' float='' />
                <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
            </form>
        </div>
    );

};


const Objetivo = ({ tipo, descripcion }) => {
    return (
        <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
            <div className='text-lg font-bold'>{tipo}</div>
            <div>{descripcion}</div>
            <PrivateComponent roleList={['ADMINISTRADOR']}>
                <div>Editar</div>
            </PrivateComponent>
        </div>
    );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
    const [estadoInscripcion, setEstadoInscripcion] = useState('');
    const [crearInscripcion, { data, loading, error }] = useMutation(CREAR_INSCRIPCION);
    const { userData } = useUser();

    useEffect(() => {
        if (userData && inscripciones) {
            const flt = inscripciones.filter((el) => el.estudiante._id === userData._id);
            if (flt.length > 0) {
                setEstadoInscripcion(flt[0].estado);
            }
        }
    }, [userData, inscripciones]);

    useEffect(() => {
        if (data) {
            console.log(data);
            toast.success('Inscripción creada con éxito');
        }
    }, [data]);

    const confirmarInscripcion = () => {
        console.log("Función ejecutada");
        crearInscripcion({ variables: { proyecto: idProyecto, estudiante: userData._id } });
    };

    return (
        <>
            {estadoInscripcion !== '' ? (
                <span>Ya estas inscrito en este proyecto y el estado es {estadoInscripcion}</span>
            ) : (
                <ButtonLoading
                    onClick={() => confirmarInscripcion()} 
                    disabled={estado === 'INACTIVO'}
                    loading={loading}
                    text='Inscribirme en este proyecto'
                />
            )}
        </>
    );
};

export default IndexProyectos;