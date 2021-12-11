import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';
import PrivateComponent from 'components/PrivateComponent';
import { GET_USUARIO_PERFIL } from 'graphql/usuarios/queries';

const EditarPerfil = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_USUARIO_PERFIL, {
        variables: { _id },
    });


    const [editarPerfil, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_USUARIO);

    const submitForm = (e) => {
        e.preventDefault();
        delete formData.rol;
        editarPerfil({
            variables: { _id, ...formData },
        });
    };

    useEffect(() => {
        if (mutationData) {
            toast.success('Perfil modificado correctamente');
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('Error modificando el perfil');
        }

        if (queryError) {
            toast.error('Error consultando el perfil');
        }
    }, [queryError, mutationError]);

    if (queryLoading) return <div>Cargando....</div>;

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Perfil</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='flex flex-col items-center justify-center'
            >
                <Input
                    label='Nombre de la persona:'
                    type='text'
                    name='nombre'
                    defaultValue={queryData.UsuarioPerfil.nombre}
                    required={true}
                />
                <Input
                    label='Apellido de la persona:'
                    type='text'
                    name='apellido'
                    defaultValue={queryData.UsuarioPerfil.apellido}
                    required={true}
                />
                <Input
                    label='Correo de la persona:'
                    type='email'
                    name='correo'
                    defaultValue={queryData.UsuarioPerfil.correo}
                    required={true}
                />
                <Input
                    label='Identificación de la persona:'
                    type='text'
                    name='identificacion'
                    defaultValue={queryData.UsuarioPerfil.identificacion}
                    required={true}
                />
               {/* <PrivateComponent roleList={['LIDER','ADMINISTRADOR']}>
                <DropDown
                    label='Estado de la persona:'
                    name='estado'
                    defaultValue={queryData.UsuarioPerfil.estado}
                    required={true}
                    options={Enum_EstadoUsuario}
                />
                <span>Rol del usuario: {queryData.UsuarioPerfil.rol}</span>
    </PrivateComponent>*/}
                <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                />
            </form>
        </div>
    );
};

export default EditarPerfil;