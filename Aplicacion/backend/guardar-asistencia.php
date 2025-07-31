<?php
namespace Backend;

include_once __DIR__ . '/Delegados.php';

header('Content-Type: application/json; charset=utf-8');

if (isset($_POST['id_delegado'], $_POST['sesion'], $_POST['estado'])) {
    $idDelegado = intval($_POST['id_delegado']);
    $sesion = intval($_POST['sesion']);
    $estado = trim($_POST['estado']);

    $delegado = new Delegados();
    $resultado = $delegado->guardarAsistencia($idDelegado, $sesion, $estado);

    echo json_encode([
        'success' => $resultado,
        'error' => $resultado ? null : $delegado->getResponse()
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Faltan parámetros'
    ]);
}
