import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text, onClick}) => {
    return (
        <button
            disabled={disabled}
            type='submit'
            onClick={onClick}
            className='bg-green-900 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-purple-900 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'
        >
            {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
        </button>
    );
};

export default ButtonLoading;