import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

const Account = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [stCoins, setStCoins] = useState(0);
    const [avatar, setAvatar] = useState(null);
    const [favorites, setFavorites] = useState(["Событие 1", "Событие 2", "Событие 3"]);
    const [recentEvents, setRecentEvents] = useState(["Событие A", "Событие B"]);
    const [currentFavoriteIndex, setCurrentFavoriteIndex] = useState(0);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [emergencyNumbers, setEmergencyNumbers] = useState([]);
    const [showAddNumberForm, setShowAddNumberForm] = useState(false);
    const [newEmergencyNumber, setNewEmergencyNumber] = useState("");
    const navigate = useNavigate();
    let phones = []

    useEffect(() => {
        const userPhone = Cookies.get("id");
        const userPassword = Cookies.get("password");

        if (!userPhone || !userPassword) {
            setStatusMessage('Ошибка: не удалось получить данные пользователя из куки. Вы не авторизованы.');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.post('http://89.46.33.136:7100/account/get/name', {
                    id: userPhone,
                    password: userPassword,
                });
                setUserName(response.data?.name || 'Пользователь');
            } catch {
                setStatusMessage('Ошибка при получении данных пользователя.');
            }

            try {
                const response = await axios.post('http://89.46.33.136:7100/account/get/points', {
                    id: userPhone,
                    password: userPassword,
                });
                setStCoins(response.data?.points || 0);
            } catch (error) {
                console.error(error);
            }

            // Получение экстренных номеров
            try {
                const response = await axios.post('http://89.46.33.136:7100/account/get/ephone', {
                    id: userPhone,
                    password: userPassword,
                });
                if(response.data.emergencyphones){
                     phones = response.data.emergencyphones.split(',');
                } else{
                     phones = []
                }
                setEmergencyNumbers(phones);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, []);

    const logout = () => {
        Cookies.remove("password");
        Cookies.remove("id");
        navigate("/");
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleAddEmergencyNumber = async () => {
        const formattedNumber = newEmergencyNumber.trim().replace(/[^+\d]/g, '');
        if (formattedNumber && formattedNumber.length >= 11) {
            const updatedNumbers = [...emergencyNumbers, formattedNumber];
            await updateEmergencyNumbers(updatedNumbers);
            setEmergencyNumbers(updatedNumbers);
            setNewEmergencyNumber("");
            setShowAddNumberForm(false);
        } else {
            alert("Пожалуйста, введите корректный номер в формате +77052391740");
        }
    };

    const updateEmergencyNumbers = async (numbers) => {
        const userPhone = Cookies.get("id");
        const userPassword = Cookies.get("password");

        try {
            await axios.post('http://89.46.33.136:7100/account/add/ephone', {
                id: userPhone,
                password: userPassword,
                phones: numbers.join(','),
            });
        } catch (error) {
            console.error(error);
            alert('Ошибка при обновлении номеров.');
        }
    };


    const handleDeleteEmergencyNumber = async (index) => {
        const updatedNumbers = emergencyNumbers.filter((_, i) => i !== index);
        await updateEmergencyNumbers(updatedNumbers);
        setEmergencyNumbers(updatedNumbers);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-white to-[#2babb6]">
            <Header />
            <motion.div
                className="p-8 rounded-3xl flex flex-col md:flex-row gap-6 max-w-5xl w-full mx-auto mt-8 z-10 bg-white bg-opacity-90 shadow-lg"
            >
                <motion.div
                    className="flex flex-col items-center p-4 rounded-lg w-full md:w-1/3"
                >
                    <div className="flex justify-center mb-4">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="relative cursor-pointer w-24 h-24 rounded-full overflow-hidden border-4 border-[#2babb6]"
                        >
                            {avatar ? (
                                <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <BsPersonCircle className="text-gray-300 w-full h-full" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleAvatarChange}
                            />
                        </motion.div>
                    </div>

                    <h2 className="text-2xl font-semibold">{userName}</h2>
                    <p className="text-gray-500">{Cookies.get("id")}</p>
                    <p className="text-xl text-gray-700 mb-4">ST Коинов: {stCoins}</p>

                    <button onClick={() => alert('Оформить подписку')}
                            className="text-white bg-[#2babb6] py-2 px-4 rounded-full hover:bg-opacity-90 mb-4">
                        Оформить подписку
                    </button>

                    <button onClick={logout} className="text-red-500 border-2 border-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white">
                        <FaSignOutAlt /> Выйти
                    </button>
                </motion.div>

                <div className="flex flex-col gap-6 w-full md:w-2/3">
                    <motion.div className="p-6 rounded-lg space-y-2 bg-white flex-grow">
                        <h3 className="text-lg font-semibold text-center">Понравившиеся события</h3>
                        <div className="flex justify-between items-center">
                            <button onClick={() => setCurrentFavoriteIndex(Math.max(currentFavoriteIndex - 1, 0))}>
                                <FaChevronLeft />
                            </button>
                            <div>{favorites[currentFavoriteIndex]}</div>
                            <button onClick={() => setCurrentFavoriteIndex(Math.min(currentFavoriteIndex + 1, favorites.length - 1))}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div className="p-6 rounded-lg space-y-2 bg-white flex-grow">
                        <h3 className="text-lg font-semibold text-center">Последние события</h3>
                        <div className="flex justify-between items-center">
                            <button onClick={() => setCurrentEventIndex(Math.max(currentEventIndex - 1, 0))}>
                                <FaChevronLeft />
                            </button>
                            <div>{recentEvents[currentEventIndex]}</div>
                            <button onClick={() => setCurrentEventIndex(Math.min(currentEventIndex + 1, recentEvents.length - 1))}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div className="p-6 rounded-lg space-y-2 bg-white flex-grow">
                        <h3 className="text-lg font-semibold text-center">Экстренные номера</h3>
                        <div className="flex flex-col items-center">
                            {emergencyNumbers.length > 0 ? (
                                emergencyNumbers.map((number, index) => (
                                    <div key={index} className="flex justify-between w-full items-center mb-2">
                                        <span>{number}</span>
                                        <button onClick={()=> handleDeleteEmergencyNumber(index)}>
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>Нет экстренных номеров.</p>
                            )}

                            <button onClick={() => setShowAddNumberForm(!showAddNumberForm)} className="text-[#2babb6] border-2 border-[#2babb6] px-4 py-2 rounded-lg my-4">
                                {showAddNumberForm ? "Скрыть форму" : "Добавить номер"}
                            </button>

                            {showAddNumberForm && (
                                <div className="flex justify-center">
                                    <input
                                        type="text"
                                        value={newEmergencyNumber}
                                        onChange={(e) => setNewEmergencyNumber(e.target.value)}
                                        placeholder="Номер телефона"
                                        className="border border-gray-300 rounded-md px-2 py-1 mr-2"
                                    />
                                    <button onClick={handleAddEmergencyNumber} className="text-white bg-[#2babb6] px-4 py-1 rounded-md">
                                        Добавить
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Account;
