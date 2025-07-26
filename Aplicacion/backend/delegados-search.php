<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->search($_GET['search']);
echo $delegado->getData();
?>
