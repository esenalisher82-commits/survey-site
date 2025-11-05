// 1. КОНФИГУРАЦИЯ FORM
const form = document.getElementById('survey-form');
const successMsg = document.getElementById('success-msg');

// *** АДРЕС GETFORM ***
const GETFORM_URL = 'https://getform.io/f/bejekmla'; 

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Сбор данных и конвертация в JSON
    const formData = new FormData(form);
    const jsonData = {};
    
    // Перебираем FormData и создаем простой JSON-объект
    for (let [key, value] of formData.entries()) {
        // Обработка множественного выбора (чекбоксов с name="[]")
        if (key.endsWith('[]')) {
            const baseKey = key.slice(0, -2);
            if (!jsonData[baseKey]) {
                jsonData[baseKey] = [];
            }
            jsonData[baseKey].push(value);
        } else {
            jsonData[key] = value;
        }
    }

    try {
        // 2. ОТПРАВКА ДАННЫХ В ФОРМАТЕ JSON
        const response = await fetch(GETFORM_URL, {
            method: 'POST',
            // *** КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: Указываем, что отправляем JSON ***
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            // Отправляем данные в виде JSON-строки
            body: JSON.stringify(jsonData) 
        });

        // 3. ОБРАБОТКА ОТВЕТА
        if (response.ok) {
            form.reset(); 
            successMsg.innerText = "Спасибо! Ваши ответы получены (JSON-метод).";
            successMsg.style.display = 'block';
            successMsg.style.backgroundColor = '#d4edda';
            setTimeout(() => successMsg.style.display = 'none', 3000);

        } else {
            // Обработка ошибки
            let errorMessage = 'Произошла ошибка при отправке данных.';
            try {
                const result = await response.json();
                errorMessage = `Ошибка ${response.status}: ${result.message || result.error || 'Проверьте настройки Getform.'}`;
            } catch (e) {
                 errorMessage = `Ошибка ${response.status}: Произошел сбой связи.`;
            }
            
            successMsg.innerText = errorMessage;
            successMsg.style.backgroundColor = '#f44336';
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
                successMsg.style.backgroundColor = 'initial';
            }, 5000);
        }
        
    } catch (error) {
        // Ошибка сети или CORS
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
