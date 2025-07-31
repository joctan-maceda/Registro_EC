<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';

$delegado = new Delegados();
$delegado->listaconAsistencia();

header('Content-Type: application/json; charset=utf-8');
echo json_encode($delegado->getdata(), JSON_UNESCAPED_UNICODE);
?>