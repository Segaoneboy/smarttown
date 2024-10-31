import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = ({ onAddEvent }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // Используем useNavigate вместо useHistory

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
        navigate('/events'); // Используем navigate для перехода на страницу событий
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <input
                type="text"
                placeholder="Название события"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border p-2 rounded-md w-full mb-2"
            />
            <textarea
                placeholder="Описание события"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border p-2 rounded-md w-full mb-2"
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md w-full">
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
