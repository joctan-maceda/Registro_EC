<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->add($_POST);  
echo $delegado->getData();
?>
