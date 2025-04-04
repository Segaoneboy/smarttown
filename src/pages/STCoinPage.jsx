import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Убедитесь, что у вас установлен js-cookie
import logotype from "../assets/images/ST.png";
import Header from "../components/Header";

function TappingPage() {
    const [points, setPoints] = useState(0);

    // Получаем текущие поинты при загрузке страницы
    useEffect(() => {
        const id = Cookies.get("id"); // Получаем id из куки
        const password = Cookies.get("password"); // Получаем password из куки

        axios
            .post("http://89.46.33.136:7100/account/get/points", {
                id: id,
                password: password,
            })
            .then((response) => {
                // Устанавливаем points в 0, если они не найдены или ответ пуст
                const receivedPoints = response.data.points ?? 0; // Если points нет, ставим 0
                setPoints(receivedPoints);
            })
            .catch((error) => {
                console.error("Ошибка при получении поинтов:", error);
                setPoints(0); // В случае ошибки ставим 0
            });
    }, []);

    const handleClick = () => {
        const id = Cookies.get("id"); // Получаем id из куки
        const password = Cookies.get("password"); // Получаем password из куки

        // Рассчитываем общее количество поинтов
        const totalPoints = points + 1;

        // Отправляем POST запрос с куками и суммой поинтов
        axios
            .post("http://89.46.33.136:7100/account/add/points", {
                id: id,
                password: password,
                points: totalPoints, // Отправляем новые суммарные поинты
            })
            .then(() => {
                // После успешного добавления поинтов обновляем состояние
                setPoints(totalPoints); // Обновляем на сумму старых и новых поинтов
            })
            .catch((error) => {
                console.error("Ошибка при добавлении поинтов:", error);
            });
    };

    return (
        <>
        <Header/>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-[#2babb6]">
            <h1 className="text-4xl font-bold text-white mb-4">Тапалка</h1>
            <div className="text-xl text-white mb-8">Поинты: {points}</div>
            <img
                src={logotype}
                alt="Tap Button"
                className="cursor-pointer w-32 h-32 mb-6"
                onClick={handleClick}
            />
        </div>
        </>
    );
}

export default TappingPage;
