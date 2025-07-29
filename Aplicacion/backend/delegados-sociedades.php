<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->sociedades($_POST['nombresociedad']);
header('Content-Type: application/json; charset=utf-8');
$json = json_encode($delegado->getData(), JSON_UNESCAPED_UNICODE);
if ($json === false) {
    file_put_contents("error_log.txt", json_last_error_msg() . "\n", FILE_APPEND);
    file_put_contents("error_log.txt", print_r($datos, true) . "\n\n", FILE_APPEND);
}

echo $json;
//echo $delegado->getData();
?>
