import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

function RegistrationPage() {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        password: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.id.startsWith("+7")) {
            setError("Номер телефона должен начинаться с +7");
            return;
        }

        setError("");

        try {
            const response = await axios.post("http://89.46.33.136:7100/auth/registration", formData);
            console.log(response.data)
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Ошибка при регистрации. Пожалуйста, попробуйте еще раз.");
            } else {
                setError("Неизвестная ошибка. Пожалуйста, проверьте ваше соединение.");
            }
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-white to-[#2babb6] px-4">
            <div className="flex flex-col w-full max-w-lg sm:max-w-4xl overflow-hidden rounded-3xl shadow-lg bg-white">
                <div className="flex flex-col sm:flex-row w-full h-auto">
                    <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-white px-8 py-8">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Регистрация</h2>
                        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
                            <InputField
                                label="Имя пользователя"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Телефон"
                                type="tel"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                            />
                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                            <InputField
                                label="Пароль"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button className="w-full bg-[#2babb6] text-white py-2 rounded-lg hover:bg-teal-600 transition">
                                Зарегистрироваться
                            </button>
                        </form>
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-[#2babb6] text-white px-8 py-8 sm:rounded-l-[120px]">
                        <h2 className="text-3xl font-bold mb-4 text-center">Привет, друг!</h2>
                        <p className="mb-6 text-lg text-center">Чтобы продолжить, войдите в свой аккаунт.</p>
                        <Link
                            to="/authorisation"
                            className="bg-white text-[#2babb6] font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition"
                        >
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
