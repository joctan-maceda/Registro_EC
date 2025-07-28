<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->edit($_POST);
header('Content-Type: application/json; charset=utf-8');
echo json_encode($delegado->getData(), JSON_UNESCAPED_UNICODE);
//echo $delegado->getData();
?>
