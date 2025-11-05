// 1. КОНФИГУРАЦИЯ FORM
const form = document.getElementById('survey-form');
const successMsg = document.getElementById('success-msg');

// *** НОВЫЙ УНИКАЛЬНЫЙ URL Getform ***
// Используем URL из предоставленного вами кода Getform: https://getform.io/f/bejekmla
const GETFORM_URL = 'https://getform.io/f/bejekmla'; 

form.addEventListener('submit', async (e) => {
  // Предотвращаем стандартную отправку формы и перезагрузку страницы
  e.preventDefault();

  // Получаем ответы с помощью FormData. 
  const formData = new FormData(form);
  
  try {
    // 2. ОТПРАВКА ДАННЫХ НА GETFORM
    // Getform, как и Formspree, хорошо работает с объектом FormData
    const response = await fetch(GETFORM_URL, {
        method: 'POST', // Getform ожидает метод POST
        body: formData, // Отправляем собранные данные
        // Заголовок 'Accept': 'application/json' необязателен, 
        // но оставим его для получения чистого JSON-ответа, если Getform его вернет.
        headers: {
            'Accept': 'application/json' 
        }
    });

    // 3. ОБРАБОТКА ОТВЕТА
    // Getform часто возвращает статус 200 OK при успехе, но не всегда возвращает JSON.
    // Мы полагаемся на response.ok (статус 200-299)
    
    if (response.ok) {
        // Успех: данные отправлены
        form.reset(); // Очистка формы
        
        // Показ сообщения об успехе
        successMsg.innerText = "Спасибо! Ваши ответы получены через Getform.";
        successMsg.style.display = 'block';
        successMsg.style.backgroundColor = '#d4edda'; // Цвет успеха
        setTimeout(() => successMsg.style.display = 'none', 3000);

    } else {
        // Ошибка (например, 400 Bad Request или 403 Forbidden)
        
        // Попытка получить сообщение об ошибке, если оно есть
        let errorMessage = 'Произошла ошибка при отправке данных. Попробуйте еще раз.';
        try {
            const result = await response.json();
            errorMessage = result.message || errorMessage;
        } catch (e) {
            // Если ответ не JSON (например, просто HTML-страница ошибки), используем общий текст.
            errorMessage = `Ошибка ${response.status}: Произошла ошибка на стороне Getform.`;
        }
        
        // Показ сообщения об ошибке
        successMsg.innerText = errorMessage;
        successMsg.style.backgroundColor = '#f44336'; // Красный фон для ошибки
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
            successMsg.style.backgroundColor = 'initial'; // Возвращаем исходный цвет
        }, 5000);
    }
    
  } catch (error) {
    // 4. ОБРАБОТКА СЕТЕВЫХ ОШИБОК (проблема с интернетом или CORS)
    console.error('Ошибка сети при отправке формы:', error);
    successMsg.innerText = "Ошибка сети: Не удалось связаться с сервером.";
    successMsg.style.backgroundColor = '#f44336';
    successMsg.style.display = 'block';
    setTimeout(() => {
        successMsg.style.display = 'none';
        successMsg.style.backgroundColor = 'initial';
    }, 5000);
  }
});
