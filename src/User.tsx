// App.tsx или ваш основной компонент
import React, { useState, useEffect } from "react";

interface UserData {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  fullName: string;
}

const TelegramApp: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ fullName: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTelegramApp = () => {
      try {
        // Проверяем, доступен ли Telegram WebApp
        if (!window.Telegram?.WebApp) {
          setError("Telegram WebApp не доступен");
          setIsLoading(false);
          return;
        }

        const tg = window.Telegram.WebApp;

        // Инициализируем приложение
        tg.ready();

        // Получаем данные пользователя
        const user = tg.initDataUnsafe?.user;

        if (user) {
          const fullName = `${user.first_name}${user.last_name ? " " + user.last_name : ""}`;

          setUserData({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            fullName,
          });

          console.log("Данные пользователя:", user);
        } else {
          setError("Пользователь не авторизован");
        }

        // Разворачиваем приложение на весь экран (опционально)
        tg.expand();
      } catch (err) {
        setError("Ошибка при инициализации Telegram WebApp");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initTelegramApp();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h3>Ошибка</h3>
        <p>{error}</p>
        <p>Откройте приложение через Telegram</p>
      </div>
    );
  }

  return (
    <div className="telegram-app">
      <div className="user-info">
        <h1>Добро пожаловать!</h1>

        {userData.fullName && (
          <div className="user-card">
            <h2>👋 Привет, {userData.firstName}!</h2>

            <div className="user-details">
              <p>
                <strong>Имя:</strong> {userData.firstName}
              </p>
              {userData.lastName && (
                <p>
                  <strong>Фамилия:</strong> {userData.lastName}
                </p>
              )}
              {userData.username && (
                <p>
                  <strong>Username:</strong>
                  <a
                    href={`https://t.me/${userData.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{userData.username}
                  </a>
                </p>
              )}
              {userData.id && (
                <p>
                  <strong>ID:</strong> {userData.id}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ваш контент приложения */}
      <div className="app-content">
        <p>Это ваше мини-приложение в Telegram!</p>
      </div>
    </div>
  );
};

export default TelegramApp;
