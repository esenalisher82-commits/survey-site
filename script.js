const form = document.getElementById('survey-form');
const successMsg = document.getElementById('success-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Получаем ответы
  const formData = new FormData(form);
  const entry = {};
  for (let [key, value] of formData.entries()) {
    entry[key] = value;
  }

  // Сохраняем ответы в localStorage (пока без сервера)
  let allAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
  allAnswers.push(entry);
  localStorage.setItem('surveyAnswers', JSON.stringify(allAnswers));

  // Очистка формы и сообщение
  form.reset();
  successMsg.style.display = 'block';
  setTimeout(() => successMsg.style.display = 'none', 2000);
});
