import React from 'react';
import Header from "../components/Header";

function EmergencyServices() {
    const services = [
        { name: 'Полиция', phone: '+123', bgColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
        { name: 'Скорая помощь', phone: '+123', bgColor: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
        { name: 'Пожарные', phone: '+123', bgColor: 'bg-red-500', hoverColor: 'hover:bg-red-600' }
    ];

    return (
        <>
        <Header/>
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Экстренные службы</h1>
                <ul className="list-none p-0">
                    {services.map((service, index) => (
                        <li key={index} className="mb-3">
                            <a
                                href={`tel:${service.phone}`}
                                className={`flex items-center justify-between p-4 text-white rounded-lg transition ${service.bgColor} ${service.hoverColor}`}
                            >
                                <span>{service.name}</span>
                                <label className="ml-4">{service.phone}</label>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

export default EmergencyServices;
