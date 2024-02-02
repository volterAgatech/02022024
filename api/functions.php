<?php
if (isset($_POST)) {
  // Инициализация SOAP-клиента
  $art = $_POST["art"];;

  $client = new SoapClient('https://api.forum-auto.ru/wsdl', ["exceptions" => false]);

  // Выполнение запроса к серверу API Форум-Авто
  $login = "493358_stroyzar";
  $pass = "sAVDkrEbqd";
  //$art = "OC47";
  $result = $client->listGoods($login, $pass, $art);

  if (is_soap_fault($result)) {

    // Обработка ошибки

    //echo "<br><br>SOAP Fault: (faultcode: {$result->faultcode}, faultstring: {$result->faultstring}, detail: {$result->detail})";
    echo "nodata";
  } else {

    // Результат запроса
    echo json_encode($result);
    //var_dump($result);
    ///echo '<pre>' . var_export($result, true) . '</pre>';
  }
}
