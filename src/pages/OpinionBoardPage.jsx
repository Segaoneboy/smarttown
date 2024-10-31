import React, { useState } from 'react';

const Forum = () => {
  const [comments, setComments] = useState([]); // Состояние для хранения комментариев
  const [commentText, setCommentText] = useState(''); // Состояние для текста комментария
  const [error, setError] = useState(''); // Сообщение об ошибке

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!commentText) {
      setError('Пожалуйста, введите ваш комментарий.');
      return;
    }

    const newComment = {
      id: Date.now(), // Уникальный ID для комментария
      text: commentText,
    };

    setComments([...comments, newComment]); // Добавляем новый комментарий в массив
    setCommentText(''); // Очищаем текст комментария
    setError(''); // Сбрасываем сообщение об ошибке
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Форум</h2>

        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            rows="4"
            placeholder="Поделитесь вашим мнением или идеей..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          ></textarea>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700"
          >
            Отправить комментарий
          </button>
        </form>

        <h3 className="text-lg font-semibold text-blue-600 mb-2">Комментарии:</h3>
        <div className="space-y-2">
          {comments.length === 0 ? (
            <p className="text-gray-500">Пока нет комментариев.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border border-gray-300 p-2 rounded-lg">
                <p>{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
