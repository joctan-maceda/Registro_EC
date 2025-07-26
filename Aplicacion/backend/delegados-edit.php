<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->edit($_POST);
echo $delegado->getData();
?>
