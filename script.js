// 1. КОНФИГУРАЦИЯ FORM
const form = document.getElementById('survey-form');
const successMsg = document.getElementById('success-msg');

// Уникальный URL Formspree для вашего опроса
const FORMSPREE_URL = 'https://formspree.io/f/mblpvvlr'; 

form.addEventListener('submit', async (e) => {
  // Предотвращаем стандартную отправку формы и перезагрузку страницы
  e.preventDefault();

  // Получаем ответы с помощью FormData. 
  // FormData автоматически собирает все поля с атрибутом 'name'.
  const formData = new FormData(form);
  
  // *** СТАРЫЙ КОД (localStorage) УДАЛЕН И ЗАМЕНЕН НА ОТПРАВКУ В СЕТЬ ***

  try {
    // 2. ОТПРАВКА ДАННЫХ НА FORMSPREE
    const response = await fetch(FORMSPREE_URL, {
        method: 'POST', // Formspree ожидает метод POST
        body: formData, // Отправляем собранные данные
        headers: {
            'Accept': 'application/json' // Указываем, что ждем JSON-ответ
        }
    });

    // 3. ОБРАБОТКА ОТВЕТА
    if (response.ok) {
        // Успех: данные отправлены
        form.reset(); // Очистка формы
        
        // Показ сообщения об успехе
        successMsg.innerText = "Спасибо! Ваши ответы получены.";
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 3000);

    } else {
        // Ошибка, полученная от Formspree (например, невалидные данные)
        const result = await response.json();
        const errorMessage = result.error || 'Произошла ошибка при отправке данных. Попробуйте еще раз.';
        
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
    // 4. ОБРАБОТКА СЕТЕВЫХ ОШИБОК
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

