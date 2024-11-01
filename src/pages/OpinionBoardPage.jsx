import React, { useState } from 'react';
import Header from "../components/Header";

const Forum = () => {
  const [comments, setComments] = useState([]); // Состояние для хранения комментариев
  const [commentText, setCommentText] = useState(''); // Состояние для текста комментария
  const [searchText, setSearchText] = useState(''); // Состояние для поискового запроса
  const [hashtags, setHashtags] = useState(''); // Состояние для хештегов
  const [error, setError] = useState(''); // Сообщение об ошибке

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!commentText) {
      setError('Пожалуйста, введите ваш комментарий.');
      return;
    }

    const newComment = {
      id: Date.now(),
      text: commentText,
      hashtags: hashtags
          .split(',')
          .map(tag => {
            tag = tag.trim();
            return tag.startsWith('#') ? tag : `#${tag}`;
          })
          .filter(tag => tag), // Удаление пустых значений
      date: new Date().toLocaleString(),
    };

    setComments([...comments, newComment]);
    setCommentText('');
    setHashtags('');
    setError('');
  };

  const filteredComments = comments.filter(comment =>
      comment.hashtags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
      <>
      <Header/>
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-stblue mb-4">Форум</h2>

          {/* Поле для поиска хештегов */}
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
            {filteredComments.length === 0 ? (
                <p className="text-gray-500">Нет комментариев, соответствующих вашему запросу.</p>
            ) : (
                filteredComments.map((comment) => (
                    <div key={comment.id} className="border border-gray-300 p-2 rounded-lg">
                      <p className="whitespace-pre-wrap break-words">{comment.text}</p>
                      {/* Отображение хештегов */}
                      <div className="mt-2">
                        {comment.hashtags.map((tag, index) => (
                            <span key={index} className="text-blue-500 font-semibold mr-2">{tag}</span>
                        ))}
                      </div>
                      {/* Отображение даты */}
                      <p className="text-gray-500 text-sm mt-1">{comment.date}</p>
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
