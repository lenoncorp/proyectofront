import { gql } from '@apollo/client';

const REGISTRO = gql`
    mutation registro(
        $nombre: String!
        $apellido: String!
        $identificacion: String!
        $correo: String!
        $rol: Enum_Rol!
        $password: String!
    ) {
    registro(
        nombre: $nombre
        apellido: $apellido
        identificacion: $identificacion
        correo: $correo
        rol: $rol
        password: $password
    ) {
        token
        error
        }
    }
`;

const LOGIN = gql`
    mutation Mutation($correo: String!, $password: String!) {
        login(correo: $correo, password: $password) {
        token
        error
        }
    }
`;

const REFRESH_TOKEN = gql`
    mutation Mutation {
        refreshToken {
            token
            error
        }
    }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN };