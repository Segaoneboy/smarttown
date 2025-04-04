import React from 'react';
import { useNavigate } from 'react-router-dom';

const SOSButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/sos'); // Укажите нужный путь
    };

    return (
        <button
            onClick={handleClick}
            className="fixed right-4 bottom-4 bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-center
                       hover:bg-red-700 active:bg-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
            SOS
        </button>
    );
};

export default SOSButton;
