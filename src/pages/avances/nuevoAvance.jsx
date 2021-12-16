import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';

const NuevoAvance = () => {
    const { data: queryData, loading } = useQuery(PROYECTOS,{
        refetchQueries: [{ query: PROYECTOS }],
    });
    console.log(queryData)
    return (
        <form>
            
        </form>
    )
}

export default NuevoAvance;
