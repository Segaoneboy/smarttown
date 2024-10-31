import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events, favorites, setFavorites }) => {
  const handleToggleFavorite = (title) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(title)
        ? prevFavorites.filter((fav) => fav !== title)
        : [...prevFavorites, title]
    );
  };

  const handleDeleteFromFavorites = (title) => {
    setFavorites(favorites.filter((fav) => fav !== title)); // Удаляем только из избранного
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">События</h2>
      {events.map((event, index) => (
        <EventItem
          key={index}
          title={event.title}
          description={event.description}
          dateAdded={event.dateAdded}
          creator={event.creator}
          isFavorite={favorites.includes(event.title)}
          onToggleFavorite={() => handleToggleFavorite(event.title)}
          onDelete={() => handleDeleteFromFavorites(event.title)}
          isInFavorites={false}
        />
      ))}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Избранные события</h2>
      {events
        .filter((event) => favorites.includes(event.title))
        .map((event, index) => (
          <EventItem
            key={index}
            title={event.title}
            description={event.description}
            dateAdded={event.dateAdded}
            creator={event.creator}
            onDelete={() => handleDeleteFromFavorites(event.title)}
            isInFavorites={true}
          />
        ))}
    </div>
  );
};

export default EventList;
