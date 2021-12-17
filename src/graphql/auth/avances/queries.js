import { gql } from '@apollo/client';

const AVANCES = gql`
    query Avances {
        Avances {
            _id
            fecha
            descripcion
            observaciones
            proyecto {
                _id
                nombre
            }
            creadoPor {
                _id
                correo
            }
        }
    }

`;

const GET_AVANCES = gql`
    query AvancesEstudiante($project: String) {
        AvancesEstudiante(project: $project) {
            _id
            descripcion
            fecha
            observaciones
            proyecto {
                nombre
            }
        }
    }
`;

export { AVANCES, GET_AVANCES };