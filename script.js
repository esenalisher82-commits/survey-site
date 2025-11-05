// script.js (Вам нужно будет создать этот файл заново или очистить старый)

const successMsg = document.getElementById('success-msg');
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('status') === 'success') {
    successMsg.innerText = "Спасибо! Ваши ответы успешно сохранены на сервере.";
    successMsg.style.display = 'block';
    successMsg.style.backgroundColor = '#d4edda';
    
    // Удаляем параметр из URL, чтобы сообщение не показывалось при перезагрузке
    setTimeout(() => {
        history.pushState(null, null, window.location.pathname);
        successMsg.style.display = 'none';
    }, 5000);
}
