import React, { useState } from 'react';
import EventForm from '../components/EventForm';

const PosterPage = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddEvent = (event) => {
    // Здесь вы можете обработать новое событие, например, сохранить его
    console.log(event); // Выводим событие в консоль для проверки
    setSuccessMessage('Событие добавлено успешно!'); // Устанавливаем сообщение об успехе
    setTimeout(() => setSuccessMessage(''), 3000); // Убираем сообщение через 3 секунды
  };

  return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Городская афиша</h1>
        <EventForm onAddEvent={handleAddEvent} />
        {successMessage && <div className="text-green-600 mt-4">{successMessage}</div>}
      </div>
  );
};

export default PosterPage;
