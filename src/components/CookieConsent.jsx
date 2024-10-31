import React, { useEffect, useState } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Проверяем, было ли ранее принято соглашение о куках
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true); // Если нет, показываем уведомление
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        // Сохраняем информацию о том, что пользователь принял куки
        localStorage.setItem('cookieConsent', 'accepted');
    };

    if (!isVisible) {
        return null; // Если уведомление не видно, ничего не отображаем
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-stblue text-white p-4 flex justify-between items-center shadow-lg z-50">
            <p className="flex-1">
                Мы используем куки для улучшения вашего опыта на нашем сайте.
                Пожалуйста, примите их использование.
            </p>
            <button
                onClick={handleAccept}
                className="bg-white text-stblue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Принимаю
            </button>
        </div>
    );
};

export default CookieConsent;
