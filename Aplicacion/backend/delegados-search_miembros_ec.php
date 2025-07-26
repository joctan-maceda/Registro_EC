<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->search_miembros_ec($_GET['search']);
echo $delegado->getData();
?>
