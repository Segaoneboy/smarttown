import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import { FaHeart } from 'react-icons/fa';
import { Buffer } from 'buffer';

const PosterPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://89.46.33.136:7100/poster/get/posters');
                setEvents(response.data || []);
            } catch (error) {
                console.error("Ошибка загрузки событий:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Функция для конвертации буфера в base64 строку
    const convertBufferToBase64 = (buffer) => {
        return Buffer.from(buffer, 'binary').toString('base64'); // Преобразуем бинарные данные в строку base64
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold text-stblue mt-4 mb-6">События</h1>

                {loading ? (
                    <p>Загрузка событий...</p>
                ) : events.length === 0 ? (
                    <p className="text-center text-gray-500">События еще не были добавлены</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                            >
                                {event.image && (
                                    <img
                                        src={`data:image/jpeg;base64,${convertBufferToBase64(event.image)}`}
                                        alt={event.title}
                                        className="w-full h-64 object-cover rounded-md mb-4"
                                    />
                                )}
                                <h3 className="text-2xl font-semibold text-teal-600">{event.title}</h3>
                                <p className="text-gray-700">{event.description}</p>
                                {event.hashtags && (
                                    <p className="text-teal-600">
                                        {event.hashtags.split(',').map((hashtag, idx) => (
                                            <span key={idx} className="mr-2">
                                                #{hashtag.trim()}
                                            </span>
                                        ))}
                                    </p>
                                )}
                                <button
                                    className="mt-4 p-2 text-gray-500 hover:text-red-500"
                                >
                                    <FaHeart size={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default PosterPage;
