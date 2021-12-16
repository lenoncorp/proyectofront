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
const CREAR_AVANCE = gql`
  mutation Mutation(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
`;
export {AGREGAR_OBSERVACION,CREAR_AVANCE};