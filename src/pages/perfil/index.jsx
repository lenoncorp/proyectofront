import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import { GET_USUARIO_PERFIL } from 'graphql/usuarios/queries';
const IndexPerfil = () => {
    const { data, error, loading } = useQuery(GET_USUARIO_PERFIL);

    useEffect(() => {
        if (error) {
            toast.error('Error consultando el perfil');
        }
    }, [error]);

    if (loading) return <div>Cargando....</div>;

    return (
        <PrivateRoute roleList={['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR']}>
        <div>
        <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Datos Perfil</h1>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Identificación</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.Usuarios ? (
                        <>
                        {data.Usuarios.map((u) => {
                            return (
                                <tr key={u._id}>
                                    <td>{u.nombre}</td>
                                    <td>{u.apellido}</td>
                                    <td>{u.correo}</td>
                                    <td>{u.identificacion}</td>
                                    <td>{Enum_Rol[u.rol]}</td>
                                    <td>{Enum_EstadoUsuario[u.estado]}</td>
                                    <td>
                                        <Link to={`/perfil/editar/${u._id}`}>
                                            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                        </>
                    ):(
                        <div>No autorizado</div>
                        )}   
                </tbody>
            </table>
        </div>
    </PrivateRoute>
    );
};

export default IndexPerfil;
