import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AfishaForm = ({ onAddEvent }) => {
    const [newEvent, setNewEvent] = useState({ title: '', description: '', image: null });
    const [imageError, setImageError] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewEvent({ ...newEvent, image: file });
            setImageError(false);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();

        const id = Cookies.get('id');
        const password = Cookies.get('password');

        if (!id || !password) {
            console.error("Ошибка: отсутствует ID или пароль в cookies");
            return;
        }

        if (!newEvent.image) {
            setImageError(true);
            return;
        }

        if (newEvent.title && newEvent.description) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('password', password);
            formData.append('title', newEvent.title);
            formData.append('description', newEvent.description);
            formData.append('image', newEvent.image);

            try {
                const response = await axios.post('http://89.46.33.136:7100/poster/add/posters', formData);

                if (response.status === 200) {
                    setNewEvent({ title: '', description: '', image: null });
                    onAddEvent(newEvent);
                } else {
                    console.error('Ошибка при добавлении события:', response.statusText);
                }
            } catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tl from-[#2babb6] to-white flex items-center justify-center">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-teal-600 mb-4 text-center">Добавить событие</h2>
                <form onSubmit={handleAddEvent}>
                    <input
                        type="text"
                        placeholder="Название"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                        required
                    />
                    <textarea
                        placeholder="Описание"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
                        required
                    ></textarea>
                    <div className="mb-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full"
                        />
                        {imageError && <p className="text-red-500 text-sm">Пожалуйста, добавьте фото</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg"
                    >
                        Добавить событие
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AfishaForm;
