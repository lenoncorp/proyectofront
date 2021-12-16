import { useUser } from 'context/userContext';
import React from 'react';

const PrivateRoute = ({ roleList, children }) => {
    const { userData } = useUser();

    if (roleList.includes(userData.rol)) {
        return children;
    }

    return <div className='text-4xl text-green-900 '>Aún no tienes Autorización para ver este sitio.</div>;
};

export default PrivateRoute;