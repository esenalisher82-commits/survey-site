<?php
// submit.php
// Обработчик формы, который записывает данные в файл responses.csv

// 1. Проверяем, что запрос пришел методом POST (отправка формы)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 2. Определяем путь к файлу для сохранения ответов (в той же папке)
    $file = 'responses.csv';

    // 3. Собираем данные формы
    
    // Получаем текущую дату и время
    $timestamp = date("Y-m-d H:i:s");
    
    // Создаем массив данных. Используем implode для объединения значений из чекбоксов (ei_definition, ei_situations, ei_qualities, ei_development_forms).
    // Оператор ?? '' гарантирует, что если поле не было отправлено (например, если чекбоксы не выбраны), будет пустая строка, а не ошибка.
    $data_array = [
        $timestamp,
        $_POST['gender'] ?? '',
        $_POST['heard_ei'] ?? '',
        implode(', ', $_POST['ei_definition'] ?? []),
        $_POST['ei_important'] ?? '',
        implode(', ', $_POST['ei_situations'] ?? []),
        $_POST['self_control'] ?? '',
        $_POST['empathy_level'] ?? '',
        $_POST['account_emotions'] ?? '',
        $_POST['self_regulation'] ?? '',
        $_POST['ei_promotes_culture'] ?? '',
        implode(', ', $_POST['ei_qualities'] ?? []),
        $_POST['include_in_program'] ?? '',
        implode(', ', $_POST['ei_development_forms'] ?? [])
    ];

    // 4. Определение заголовков CSV (если файл responses.csv еще не существует или пуст)
    if (!file_exists($file) || filesize($file) == 0) {
        $header = [
            'ВремяОтправки', 'Пол', 'Слышали_ЭИ', 'Понимание_ЭИ', 'Важность_ЭИ',
            'Ситуации_ЭИ', 'Самоконтроль', 'Эмпатия', 'УчетЭмоций',
            'Саморегуляция', 'ЭИ_ПрофКультура', 'Качества_ЭИ', 'ЭИ_в_Программу',
            'Формы_Развития_ЭИ'
        ];
        // Запись заголовков
        $fp = fopen($file, 'a');
        fputcsv($fp, $header);
        fclose($fp);
    }
    
    // 5. Запись данных в файл CSV
    $fp = fopen($file, 'a');
    // fputcsv автоматически обрабатывает кавычки и запятые для CSV
    fputcsv($fp, $data_array);
    fclose($fp);
    
    // 6. Перенаправление обратно на опросник с сообщением об успехе
    // Этот параметр будет пойман script.js
    header("Location: index.html?status=success");
    exit();
}

// Если запрос не POST, просто перенаправляем на главную
header("Location: index.html");
exit();
?>
