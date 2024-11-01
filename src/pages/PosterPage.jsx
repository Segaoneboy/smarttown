import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from "../components/Header";

const PostPage = () => {
    const [events, setEvents] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', fileName: '' });
    const [uploadedFile, setUploadedFile] = useState(null);

    // Обработчик загрузки изображения
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop(); // Получаем расширение
            setUploadedFile(file); // Сохраняем файл локально
            setNewEvent({ ...newEvent, fileName: `${fileName}.${fileExtension}` }); // Только имя и расширение
        } else {
            setUploadedFile(null);
            setNewEvent({ ...newEvent, fileName: '' });
        }
    };

    // Функция для добавления нового события
    const handleAddEvent = async (e) => {
        e.preventDefault();

        const id = Cookies.get('id'); // Получаем id из куки
        const password = Cookies.get('password'); // Получаем password из куки

        if (id && password && newEvent.title && newEvent.description && newEvent.fileName) {
            const eventInfo = {
                id: id,
                password: password,
                title: newEvent.title,
                description: newEvent.description,
                fileName: newEvent.fileName, // Отправляем только имя и расширение файла
            };

            try {
                const response = await axios.post('http://89.46.33.136:7100/poster/add/posters', eventInfo);

                if (response.status === 201) {
                    setEvents([newEvent, ...events]);
                    setNewEvent({ title: '', description: '', fileName: '' });
                    setUploadedFile(null);
                    setIsFormOpen(false);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert('Такого аккаунта не существует');
                    } else if (error.response.status === 403) {
                        alert('Недостаток данных');
                    }
                } else {
                    console.error('Ошибка при добавлении поста:', error);
                }
            }
        }
    };

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        if (value.length <= 700) {
            setNewEvent({ ...newEvent, description: value });
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 overflow-hidden">
                <h1 className="text-3xl font-bold text-stblue mt-4 mb-6">События</h1>

                <div className="relative w-full max-w-md h-screen overflow-y-scroll snap-y snap-mandatory bg-gray-50 rounded-lg shadow-lg p-4">
                    {events.length === 0 ? (
                        <p className="text-center text-gray-500 mt-20">Нет событий. Добавьте новое событие!</p>
                    ) : (
                        events.map((event, index) => (
                            <div
                                key={index}
                                className="snap-center flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden p-4 mb-6 transition-all duration-500 transform hover:scale-105"
                            >
                                {uploadedFile && (
                                    <img
                                        src={URL.createObjectURL(uploadedFile)}
                                        alt={event.title}
                                        className="w-full h-64 object-cover rounded-md mb-2"
                                    />
                                )}
                                <h2 className="text-lg font-semibold text-teal-600 mb-1">{event.title}</h2>
                                <div className="text-gray-700 text-sm w-full p-2 bg-gray-100 rounded-md break-words">
                                    {event.description}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    className="fixed bottom-10 right-10 bg-stblue text-white p-4 rounded-full shadow-lg transition transform hover:bg-teal-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                >
                    +
                </button>

                {isFormOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
                        <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg relative transition-transform transform animate-slideIn">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-semibold text-teal-600 mb-4">Добавить событие</h2>
                            <form onSubmit={handleAddEvent}>
                                <input
                                    type="text"
                                    placeholder="Название"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-teal-400"
                                    required
                                />
                                <textarea
                                    placeholder="Описание"
                                    value={newEvent.description}
                                    onChange={handleDescriptionChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-teal-400 resize-none overflow-hidden"
                                    style={{ height: Math.min(100, 24 + newEvent.description.split('\n').length * 24) + 'px' }}
                                    required
                                ></textarea>
                                <div className="text-gray-500 text-sm mb-2">
                                    Осталось символов: {700 - newEvent.description.length}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full mb-4"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:bg-teal-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                                >
                                    Добавить событие
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PostPage;
