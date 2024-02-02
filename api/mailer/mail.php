<?php
if ( isset($_POST["email"])) {

    /*ПОМЕЩАЕМ ДАННЫЕ ИЗ ПОЛЕЙ В ПЕРЕМЕННЫЕ*/
    
    $email = $_POST["email"];
    
    $dateTime = date("m.d.Y [H:i]");

    include("mailer.php");


    /*ЕСЛИ ВСЕ ПОЛЯ ЗАПОЛНЕНЫ НАЧИНАЕМ СОБИРАТЬ ДАННЫЕ ДЛЯ ОТПРАВКИ*/
    $to = $email; /* Адрес, куда отправляем письма*/
    $subject = "Заявка на сайте от " . $dateTime; /*Тема письма*/
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: <rassylkarassylkovitch@yandex.ru>\r\n"; /*ОТ КОГО*/

    /*ВО ВНУТРЬ ПЕРЕМЕННОЙ $message ЗАПИСЫВАЕМ ДАННЫЕ ИЗ ПОЛЕЙ */


    $message = 'Привет!!!';
    
    $send = smtpmail($to, $subject, $message, $headers);
    var_dump($headers);
}
