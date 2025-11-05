// script.js
// Обработка параметра 'status=success' в URL после перенаправления от PHP.

const successMsg = document.getElementById('success-msg');
const urlParams = new URLSearchParams(window.location.search);

// Проверяем, был ли PHP-скрипт успешно выполнен
if (urlParams.get('status') === 'success') {
    successMsg.innerText = "Спасибо! Ваши ответы успешно сохранены на сервере.";
    successMsg.style.display = 'block';
    
    // Удаляем параметр из URL через 5 секунд, чтобы сообщение не появлялось при повторной перезагрузке страницы
    setTimeout(() => {
        // history.replaceState лучше, чем pushState, чтобы не создавать лишнюю запись в истории
        history.replaceState(null, null, window.location.pathname); 
        successMsg.style.display = 'none';
    }, 5000);
}
