import React from 'react';
import EmergencyBtn from "../components/EmergencyBtn";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">404</h1>
                <h2 className="mt-4 text-2xl font-semibold">Некорректный путь</h2>
                <p className="mt-2 text-gray-600">К сожалению, страница, которую вы ищете, не найдена.</p>
                <a
                    href="/"
                    className="mt-6 inline-block px-4 py-2 text-white bg-stblue hover:bg-teal-600 rounded"
                >
                    Вернуться на главную
                </a>
                <EmergencyBtn/>
            </div>
        </div>
    );
};

export default NotFound;