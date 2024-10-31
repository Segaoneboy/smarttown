import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import EventForm from './EventForm';
import EventList from './EventList';

const App = () => {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
    setSuccessMessage('Событие добавлено успешно!'); // Устанавливаем сообщение об успехе
    setTimeout(() => setSuccessMessage(''), 3000); // Убираем сообщение через 3 секунды
  };

  return (
    <Router>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Городская афиша</h1>
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-600">Добавить событие</Link>
          <Link to="/events" className="text-blue-600">События и избранные события</Link>
        </nav>
        <Switch>
          <Route path="/" exact>
            <EventForm onAddEvent={handleAddEvent} />
            {successMessage && <div className="text-green-600 mt-4">{successMessage}</div>}
          </Route>
          <Route path="/events">
            <EventList events={events} favorites={favorites} setFavorites={setFavorites} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
