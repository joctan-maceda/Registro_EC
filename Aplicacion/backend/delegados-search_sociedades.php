<?php
namespace Backend;
include_once __DIR__.'/Delegados.php';
$delegado = new Delegados();
$delegado->search_sociedades($_GET['search']);
ob_clean();
header('Content-Type: application/json; charset=utf-8');

$json = json_encode($delegado->getData(), JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT | JSON_HEX_APOS);

if ($json === false) {
    http_response_code(500);
    die('Error al codificar JSON: ' . json_last_error_msg());
}

echo $json;
exit; 

//echo json_encode($delegado->getData(), JSON_UNESCAPED_UNICODE);
//echo json_encode($delegado->getData(), JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT | JSON_HEX_APOS);

//echo $delegado->getData();

?>
