<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->delete($_POST['id']);  
echo $delegado->getData();
?>
