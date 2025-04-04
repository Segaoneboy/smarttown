import React from 'react';

const EventItem = ({
  title,
  description,
  dateAdded,
  creator,
  onToggleFavorite,
  onDelete,
  isFavorite,
  isInFavorites,
}) => {
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-100 to-blue-200 border-l-4 border-blue-600 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-700">{description}</p>
      {!isInFavorites && (
        <>
          <p className="mt-2 text-sm text-gray-500">Добавлено: {dateAdded}</p>
          <p className="mt-1 text-sm text-gray-500">Создатель: {creator}</p>
        </>
      )}
      <div className="flex justify-between mt-4">
        {isInFavorites ? (
          <button
            onClick={onDelete}
            className="bg-red-600 text-white p-2 rounded-md transition hover:bg-red-700"
          >
            Удалить из избранных
          </button>
        ) : (
          <>
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-md transition ${
                isFavorite ? 'bg-yellow-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {isFavorite ? 'В избранном' : 'Добавить в избранное'}
            </button>
            <button
              onClick={onDelete}
              className="bg-red-600 text-white p-2 rounded-md transition hover:bg-red-700"
            >
              Удалить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventItem;
