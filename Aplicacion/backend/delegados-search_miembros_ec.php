<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->search_miembros_ec($_GET['search']);
header('Content-Type: application/json; charset=utf-8');
echo json_encode($delegado->getData(), JSON_UNESCAPED_UNICODE);
//echo $delegado->getData();
?>
