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

export { AVANCES };