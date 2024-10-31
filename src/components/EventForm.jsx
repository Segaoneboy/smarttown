import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = ({ onAddEvent }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            title,
            description,
            dateAdded: new Date().toLocaleString(),
            creator: 'Пользователь',
        };

        onAddEvent(newEvent);
        setTitle('');
        setDescription('');
    };

    const handleGoToEvents = () => {
        navigate('/events');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg max-w-md mx-auto">
            <input
                type="text"
                placeholder="Название события"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border-b-2 border-gray-300 focus:border-[#2babb6] outline-none p-2 mb-4 w-full transition-all duration-300"
            />
            <textarea
                placeholder="Описание события"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border-b-2 border-gray-300 focus:border-[#2babb6] outline-none p-2 mb-4 w-full transition-all duration-300"
            />
            <button
                type="submit"
                className="bg-[#2babb6] text-white p-2 rounded-md w-full"
            >
                Добавить событие
            </button>
            <button
                type="button"
                onClick={handleGoToEvents}
                className="bg-gray-600 text-white p-2 rounded-md w-full mt-2"
            >
                Перейти на страницу событий
            </button>
        </form>
    );
};

export default EventForm;
