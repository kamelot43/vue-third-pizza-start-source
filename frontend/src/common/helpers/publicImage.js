export const getPublicImage = (path) => {
  const isProduction = import.meta.env.PROD;

  // Базовый URL для статики (картинок)
  const staticBaseURL = isProduction
    ? "https://vue-pizza-backend-production.up.railway.app" // <-- ЗДЕСЬ ВАШ ДОМЕН БЭКЕНДА
    : "http://localhost:3000";

  // Очищаем путь: убираем возможные /api и лишние слеши
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const finalPath = cleanPath.replace(/^\/api(\/|$)/, "/");

  return `${staticBaseURL}${finalPath}`;
};
