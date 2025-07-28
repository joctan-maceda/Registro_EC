<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->miembros_ec($_POST['nombreSeleccionado']);
header('Content-Type: application/json; charset=utf-8');
echo json_encode($delegado->getData(), JSON_UNESCAPED_UNICODE);
//echo $delegado->getData();
?>
