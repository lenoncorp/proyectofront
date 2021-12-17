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

const EDITAR_AVANCE = gql`
mutation Mutation($id: String!, $descripcion: String) {
  editarAvance(_id: $id, descripcion: $descripcion) {
    descripcion
    
  }
}
`;


export {AGREGAR_OBSERVACION, CREAR_AVANCE, EDITAR_AVANCE};