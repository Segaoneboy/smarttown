import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Cookies from 'js-cookie';

const Forum = () => {
  const [comments, setComments] = useState([]); // Состояние для хранения комментариев
  const [commentText, setCommentText] = useState(''); // Состояние для текста комментария
  const [searchText, setSearchText] = useState(''); // Состояние для поискового запроса
  const [hashtags, setHashtags] = useState(''); // Состояние для хештегов
  const [error, setError] = useState(''); // Сообщение об ошибке

  useEffect(() => {
    fetchComments();
  }, []);

  // Функция для получения комментариев
  const fetchComments = async () => {
    try {
      const response = await axios.get('http://89.46.33.136:7100/forum/get/comment'); // Изменен URL
      console.log('Статус ответа:', response.status); // Проверка статуса
      console.log('Комментарии:', response.data); // Проверка структуры данных
      if (response.status === 200 && Array.isArray(response.data)) {
        setComments(response.data); // Если есть данные, сохраняем комментарии
      } else {
        console.warn('Неверный формат ответа или данные отсутствуют.');
      }
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error);
      setComments([]); // При ошибке, например 404, устанавливаем пустой массив
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText) {
      setError('Пожалуйста, введите ваш комментарий.');
      return;
    }

    const id = Cookies.get('id');
    const password = Cookies.get('password');

    const newComment = {
      id: id,
      password: password,
      comment: commentText,
      hashtag: hashtags
          .split(',')
          .map(tag => {
            tag = tag.trim();
            return tag.startsWith('#') ? tag : `#${tag}`;
          })
          .filter(tag => tag), // Удаление пустых значений
    };

    try {
      const response = await axios.post('http://89.46.33.136:7100/forum/add/comment', newComment);
      if (response.status === 201) { // Если статус 201, комментарий успешно добавлен
        setCommentText('');
        setHashtags('');
        setError('');
        fetchComments(); // Обновляем комментарии после добавления
      } else if (response.status === 401) {
        setError("Такого аккаунта не существует.");
      } else if (response.status === 403) {
        setError("Недостаток данных.");
      }
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
      setError("Произошла ошибка при отправке комментария.");
    }
  };

  const filteredComments = comments.filter(comment =>
      comment.hashtag && comment.hashtag.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
          <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-stblue mb-4">Форум</h2>

            <input
                type="text"
                placeholder="Поиск по хештегам..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-2 border-b-2 border-gray-300 focus:border-[#2babb6] outline-none mb-4 transition-all duration-300"
            />

            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                  rows="4"
                  placeholder="Поделитесь вашим мнением или идеей..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  maxLength={700}
                  className="w-full p-2 border-b-2 border-gray-300 focus:border-[#2babb6] outline-none mb-2 transition-all duration-300"
              ></textarea>
              <p className="text-gray-500 text-sm">
                Осталось символов: {700 - commentText.length}
              </p>
              <input
                  type="text"
                  placeholder="Введите хештеги (через запятую)..."
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full p-2 border-b-2 border-gray-300 focus:border-[#2babb6] outline-none mb-2 transition-all duration-300"
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <button
                  type="submit"
                  className="w-full bg-stblue text-white font-semibold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700"
              >
                Отправить комментарий
              </button>
            </form>

            <h3 className="text-lg font-semibold text-stblue mb-2">Комментарии:</h3>
            <div className="space-y-2">
              {comments.length === 0 ? (
                  <p className="text-gray-500">Комментариев еще нет</p>
              ) : (
                  filteredComments.map((comment) => (
                      <div key={`${comment.id}-${comment.timestamp}`} className="border border-gray-300 p-2 rounded-lg"> {/* Уникальный ключ */}
                        <p className="whitespace-pre-wrap break-words">{comment.comment}</p>
                        <div className="mt-2">
                          <span className="text-blue-500 font-semibold mr-2">{comment.hashtag}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{new Date(Number(comment.timestamp)).toLocaleString()}</p>
                      </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </>
  );
};

export default Forum;
