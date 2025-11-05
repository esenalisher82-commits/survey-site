<?php
// submit.php

// 1. Проверяем, что запрос пришел методом POST (отправка формы)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 2. Определяем путь к файлу для сохранения ответов (в той же папке)
    $file = 'responses.csv';

    // 3. Собираем данные формы
    // Игнорируем стандартные поля (как gender, heard_ei и т.д.) и преобразуем их
    
    // Получаем текущую дату и время
    $timestamp = date("Y-m-d H:i:s");
    
    // Создаем массив данных. Мы берем только те поля, которые остались в упрощенной форме.
    $data_array = [
        $timestamp,
        $_POST['gender'] ?? '',
        $_POST['heard_ei'] ?? '',
        // Чекбоксы: объединяем выбранные значения в одну строку через запятую
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

    // 4. Определение заголовков CSV (если файл пуст)
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
    fputcsv($fp, $data_array);
    fclose($fp);
    
    // 6. Перенаправление обратно на опросник с сообщением об успехе
    header("Location: index.html?status=success");
    exit();
}

// Если запрос не POST, просто перенаправляем на главную
header("Location: index.html");
exit();
?>
