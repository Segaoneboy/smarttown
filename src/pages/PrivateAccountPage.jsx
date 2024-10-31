import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../components/Header'; // Импортируем шапку

const Account = () => {
    const [ephoneInput, setEphoneInput] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [emergencyPhones, setEmergencyPhones] = useState([]); // Состояние для хранения номеров

    const handleInputChange = (e) => {
        setEphoneInput(e.target.value);
    };

    const fetchEmergencyNumbers = async () => {
        const userPhone = Cookies.get("userPhone");
        const userPassword = Cookies.get("userPassword");

        if (!userPhone || !userPassword) {
            setStatusMessage('Ошибка: не удалось получить данные пользователя из куки');
            return;
        }

        try {
            const response = await axios.post('http://89.46.33.136:7100/account/get/ephone', {
                id: userPhone,
                password: userPassword
            });

            if (response.status === 200 || response.status === 201) {
                const phones = response.data.emergencyphones.split(',');
                setEmergencyPhones(phones.map(num => num.trim())); // Обновляем состояние с номерами
            } else {
                console.error('Ошибка от сервера:', response.data.message || response.status);
                setStatusMessage('Ошибка при получении номеров');
            }
        } catch (error) {
            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`Ошибка при получении номеров (код ${statusCode}): ${errorMessage}`);
            setStatusMessage(`Произошла ошибка (код ${statusCode}): ${errorMessage}`);
        }
    };

    const handleAddEmergencyNumbers = async () => {
        const userPhone = Cookies.get("userPhone");
        const userPassword = Cookies.get("userPassword");

        if (!userPhone || !userPassword) {
            setStatusMessage('Ошибка: не удалось получить данные пользователя из куки');
            return;
        }

        const ephoneArray = ephoneInput.split(',').map(num => num.trim()).filter(Boolean);
        const invalidNumbers = ephoneArray.filter(num => !/^\+7\d{10}$/.test(num));
        if (invalidNumbers.length > 0) {
            setStatusMessage('Ошибка: каждый номер должен начинаться с +7 и содержать ровно 11 цифр.');
            return;
        }

        try {
            const response = await axios.post('http://89.46.33.136:7100/account/add/ephone', {
                id: userPhone,
                password: userPassword,
                phones: ephoneArray
            });

            // Статусы 200 и 201 считаются успешными
            if (response.status === 200 || response.status === 201) {
                setStatusMessage('Номера успешно добавлены');
                setEphoneInput(''); // Очищаем инпут после успешного добавления
                // Получаем обновленный список номеров
                await fetchEmergencyNumbers();
            } else {
                console.error('Ошибка от сервера:', response.data.message || response.status);
                setStatusMessage('Ошибка при добавлении номеров');
            }
        } catch (error) {
            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`Ошибка при добавлении номеров (код ${statusCode}): ${errorMessage}`);
            setStatusMessage(`Произошла ошибка (код ${statusCode}): ${errorMessage}`);
        }
    };

    // Используем useEffect для загрузки номеров при монтировании компонента
    useEffect(() => {
        fetchEmergencyNumbers(); // Получаем номера при загрузке компонента
    }, []);

    return (
        <div>
            <Header /> {/* Включаем шапку */}

            <div className="p-4 bg-white min-h-screen flex flex-col items-center">
                <h1 className="text-2xl text-stblue font-bold mb-4 text-center">Личный кабинет</h1>

                <div className="mb-4 w-full">
                    <label className="block text-stblue text-sm font-bold mb-2" htmlFor="ephoneInput">
                        Добавить экстренные номера (через запятую):
                    </label>
                    <input
                        type="text"
                        id="ephoneInput"
                        placeholder="Введите номера через запятую, например: +71234567890,+79876543210"
                        value={ephoneInput}
                        onChange={handleInputChange}
                        className="border rounded w-full py-2 px-3 text-stblue focus:outline-none focus:border-stblue"
                    />
                </div>

                <button
                    onClick={handleAddEmergencyNumbers}
                    className="bg-stblue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full max-w-xs"
                >
                    Добавить номера
                </button>

                {statusMessage && (
                    <p className="mt-4 text-gray-600 text-center">
                        {statusMessage}
                    </p>
                )}

                {/* Отображение списка экстренных номеров */}
                <div className="mt-4 w-full">
                    <h2 className="text-stblue text-lg font-bold mb-2">Добавленные экстренные номера:</h2>
                    {emergencyPhones.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {emergencyPhones.map((phone, index) => (
                                <li key={index} className="text-stblue">
                                    {phone}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Номера не добавлены</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
