import { gql } from '@apollo/client';

const AGREGAR_OBSERVACION = gql`
    mutation AgregarObservacion(
        $_id: String! 
        $observacion: String!) {
        agregarObservacion(
             _id: $_id
             observacion: $observacion) {
           _id
        }
    }
`;
export {AGREGAR_OBSERVACION};