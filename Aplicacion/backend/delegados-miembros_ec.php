<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->miembros_ec($_POST['nombreSeleccionado']);
echo $delegado->getData();
?>
