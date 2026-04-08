<?php
namespace Backend;
require_once 'DataBase.php';


class Delegados extends DataBase {
    protected $response;

    public function __construct($dbName = 'registro_ec', $user = 'root', $password = '') {
        $this->response = null;
        parent::__construct($user, $password, $dbName);
    }

    protected function query($sql) {
        $result = mysqli_query($this->conexion, $sql);
        if ($result) {
            $this->response = $result;
        } else {
            $this->response = 'Error en la consulta: ' . mysqli_error($this->conexion);
        }
        return $this->response;
    }

    public function single($id) {
        $data = array();
        $sql = "SELECT * FROM delegados WHERE id = {$id}";
        $result = $this->query($sql);

        if (is_object($result) && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (!is_null($row)) {
                foreach ($row as $key => $value) {
                    $data[$key] = $value;
                }
            }
            $result->free();
        } else {
            die('Error en la consulta: ' . mysqli_error($this->conexion));
        }

        // Almacena los datos obtenidos en la propiedad response
        $this->response = $data;
    }

    public function singleByName($name) {
        $data = array();
        $sql = "SELECT * FROM delegados WHERE name = {$nombre}";
        $result = $this->query($sql);

        if (is_object($result) && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (!is_null($row)) {
                foreach ($row as $key => $value) {
                    $data[$key] = $value;
                }
            }
            $result->free();
        } else {
            die('Error en la consulta: ' . mysqli_error($this->conexion));
        }

        // Almacena los datos obtenidos en la propiedad response
        $this->response = $data;
    }

    public function add($delegado) {
        $data = array(
            'status'  => 'error',
            'message' => 'Ya existe un delegado con ese nombre'
        );

        $delegadoData = json_decode(json_encode($delegado), false);

        if (isset($delegadoData->nombre)) {
            $sql = "SELECT * FROM delegados WHERE nombre = '{$delegadoData->nombre}' AND eliminado = 0 ";
            $result = $this->query($sql);

            if (is_object($result) && $result->num_rows == 0) {
                $this->conexion->set_charset("utf8");

                $sql = "INSERT INTO delegados VALUES (null, '{$delegadoData->nombre}', '{$delegadoData->categoria}', '{$delegadoData->sociedad}', '{$delegadoData->iglesia}', '{$delegadoData->domicilio}', '{$delegadoData->tipodelegado}',{$delegadoData->cuota}, 0)";
                
                if ($this->query($sql)) {
                    $data['status'] = "success";
                    $data['message'] = "Delegado agregado";
                } else {
                    $data['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
                }
            }

            if (is_object($result)) {
                $result->free();
            }
        }

        // Almacena el resultado de la operación en response
        $this->response = $data;
    }

    public function delete($id) {
        // Inicializa el arreglo de respuesta
        $data = array(
            'status'  => 'error',
            'message' => 'La consulta falló'
        );
    
        // Realiza la consulta de eliminación lógica
        $sql = "UPDATE delegados SET eliminado=1 WHERE id = {$id}";
    
        if ($this->query($sql)) {
            $data['status'] = "success";
            $data['message'] = "Delegado eliminado";
        } else {
            $data['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
        }
    
        // Almacena el resultado en response para luego poder usar getData()
        $this->response = $data;
    }
    
    public function edit($delegado) {
        // Inicializa el arreglo de respuesta
        $data = array(
            'status'  => 'error',
            'message' => 'La consulta falló'
        );
    
        // Convierte el objeto a JSON y luego a un arreglo asociativo
        $delegadoData = json_decode(json_encode($delegado), false);
    
        // Verifica que se haya proporcionado el ID
        if (isset($delegadoData->id)) {
            // Construye la consulta de actualización
            $sql = "UPDATE delegados SET 
                        nombre = '{$delegadoData->nombre}', 
                        categoria = '{$delegadoData->categoria}', 
                        sociedad = '{$delegadoData->sociedad}', 
                        iglesia = '{$delegadoData->iglesia}', 
                        domicilio = '{$delegadoData->domicilio}', 
                        tipodelegado = '{$delegadoData->tipodelegado}', 
                        cuota = {intval($delegadoData->cuota)}
                    WHERE id = {$delegadoData->id} AND eliminado = 0";
    
            // Ejecuta la consulta y actualiza el estado según el resultado
            if ($this->query($sql)) {
                $data['status'] = "success";
                $data['message'] = "Delegado actualizado";
            } else {
                $data['message'] = "ERROR: No se ejecutó $sql. " . mysqli_error($this->conexion);
            }
        } else {
            $data['message'] = "ID del delegado no proporcionado";
        }
    
        // Almacena el resultado en response para luego poder usar getData()
        $this->response = $data;
    }

    public function list() {
        // Inicializa el arreglo de respuesta
        $data = array();
    
        // Realiza la consulta para obtener todos los productos no eliminados
        $sql = "SELECT * FROM delegados WHERE eliminado = 0";
        $result = $this->query($sql);
    
        // Verifica si hubo resultados y procesa los datos
        if (is_object($result) && $result->num_rows > 0) {
            // Obtiene todos los resultados como un arreglo asociativo
            $rows = $result->fetch_all(MYSQLI_ASSOC);
    
            if (!is_null($rows)) {
                // Codifica a UTF-8 y mapea los datos al arreglo de respuesta
                foreach ($rows as $num => $row) {
                    foreach ($row as $key => $value) {
                        $data[$num][$key] = $value;
                    }
                }
            }
            $result->free();
        } else {
            die('Error en la consulta: ' . mysqli_error($this->conexion));
        }
    
        // Almacena el resultado en response para luego poder usar getData()
        $this->response = $data;
    }

    public function listaconAsistencia() {
        $data = array();

        $sql = "SELECT * FROM delegados WHERE eliminado = 0";
        $result = $this->query($sql);

        if (is_object($result) && $result->num_rows > 0) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            
            foreach ($rows as $num => $row) {
                $delegado_id = $row['id'];
               
                // Consulta asistencias por delegado
                $asistencias = array();
                $asist_sql = "SELECT sesion, estado FROM asistencia WHERE id_delegado = {$delegado_id}";
                $asist_result = $this->query($asist_sql);

                if (is_object($asist_result) && $asist_result->num_rows > 0) {
                    while ($asist_row = $asist_result->fetch_assoc()) {
                        $asistencias[$asist_row['sesion']] = $asist_row['estado'];
                    }
                    $asist_result->free();
                }

                $row['asistencias'] = $asistencias; // Añadimos al delegado
                $data[$num] = $row;
            }
    

            $result->free();
        } else {
            die('Error en la consulta: ' . mysqli_error($this->conexion));
        }

        $this->response = $data;
    }


    public function search($search) {
        // Inicializa el arreglo de respuesta
        $data = array();
    
        // Construye la consulta para buscar en múltiples campos
        $sql = "SELECT * FROM delegados WHERE (id = '{$search}' OR nombre LIKE '%{$search}%' OR sociedad LIKE '%{$search}%') AND eliminado = 0";
        $result = $this->query($sql);
    
        // Verifica si hubo resultados y procesa los datos
        if (is_object($result) && $result->num_rows > 0) {
            // Obtiene todos los resultados como un arreglo asociativo
            $rows = $result->fetch_all(MYSQLI_ASSOC);
    
            if (!is_null($rows)) {
                // Codifica a UTF-8 y mapea los datos al arreglo de respuesta
                foreach ($rows as $num => $row) {
                    foreach ($row as $key => $value) {
                        $data[$num][$key] = $value;
                    }
                }
            }
            $result->free();
        } else {
            die('Error en la consulta: ' . mysqli_error($this->conexion));
        }
    
        // Almacena el resultado en response para luego poder usar getData()
        $this->response = $data;
    }

    public function search_sociedades($search) {
        // Inicializa el arreglo de respuesta
        $data = array();
    
        // Construye la consulta para buscar en múltiples campos
        $sql = "SELECT * FROM sociedades WHERE (sociedad LIKE '%{$search}%')";
        $result = $this->query($sql);
    
        // Verifica si hubo resultados y procesa los datos
        if (is_object($result) && $result->num_rows > 0) {
            // Obtiene todos los resultados como un arreglo asociativo
            $rows = $result->fetch_all(MYSQLI_ASSOC);
    
            if (!is_null($rows)) {
                // Codifica a UTF-8 y mapea los datos al arreglo de respuesta
                foreach ($rows as $num => $row) {
                    foreach ($row as $key => $value) {
                        $data[$num][$key] = $value;
                    }
                }
            }
            $result->free();
        } else {
            //die('Error en la consulta: ' . mysqli_error($this->conexion));
            $data = [];
        }
    
        // Almacena el resultado en response para luego poder usar getData()
        $this->response = $data;
    }

    public function search_miembros_ec($search) {
        // Inicializa el arreglo de respuesta
        $data = array();
    
        // Construye la consulta para buscar en múltiples campos
        $sql = "SELECT * FROM miembros_ec WHERE (nombre LIKE '%{$search}%') AND eliminado = 0";
        $result = $this->query($sql);
    
        // Verifica si hubo resultados y procesa los datos
        if (is_object($result) && $result->num_rows > 0) {
            // Obtiene todos los resultados como un arreglo asociativo
            $rows = $result->fetch_all(MYSQLI_ASSOC);
    
            if (!is_null($rows)) {
                // Codifica a UTF-8 y mapea los datos al arreglo de respuesta
                foreach ($rows as $num => $row) {
                    foreach ($row as $key => $value) {
                        $data[$num][$key] = $value;
                    }
                }
            }
            $result->free();
        } else {
            die('Error en la consulta: ' . mysqli_error($this->conexion));
        }
    
        // Almacena el resultado en response para luego poder usar getData()
        $this->response = $data;
    }
/*
    public function search_sociedades($search) {
        $data = array();

        // Prepara la consulta con un placeholder (?)
        $stmt = $this->conexion->prepare("SELECT * FROM sociedades WHERE sociedad LIKE CONCAT('%', ?, '%')");

        if ($stmt === false) {
            $this->response = [
                'error' => true,
                'message' => 'Error al preparar la consulta: ' . $this->conexion->error
            ];
            return;
        }
        // Une el parámetro a la consulta
        $stmt->bind_param("s", $search);

        // Ejecuta la consulta
        if (!$stmt->execute()) {
            $this->response = [
                'error' => true,
                'message' => 'Error al ejecutar la consulta: ' . $stmt->error
            ];
            return;
        }


        // Obtiene el resultado
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            if (!is_null($rows)) {
                foreach ($rows as $num => $row) {
                    foreach ($row as $key => $value) {
                        $data[$num][$key] = $value;
                    }
                }
            }
            $result->free();
        } else {
            // Podrías no morir aquí, sino retornar array vacío
            // die('Error en la consulta: ' . $this->conexion->error);
            $data = [];
        }

        // Almacena la respuesta
        $this->response = $data;

        // Cierra el statement
        $stmt->close();
    }
*/
    
    public function miembros_ec($nombreSeleccionado){
        $data = array();
        $sql = "SELECT * FROM miembros_ec WHERE nombre = '{$nombreSeleccionado}' ";
        $result = $this->query($sql);
        if (is_object($result) && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (!is_null($row)) {
                foreach ($row as $key => $value) {
                    $data[$key] = $value;
                }
            }
            $result->free();
        } else {
            die('Error en la consulta: ' . mysqli_error($this->conexion));
        }

        // Almacena los datos obtenidos en la propiedad response
        $this->response = $data;
    }

    public function sociedades($nombreSeleccionado){
        $data = array();
        $sql = "SELECT * FROM sociedades WHERE sociedad = '{$nombreSeleccionado}' ";
        $result = $this->query($sql);
        if (is_object($result) && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (!is_null($row)) {
                foreach ($row as $key => $value) {
                    $data[$key] = $value;
                }
            }
            $result->free();
        } else {
            die('Error en la consulta: ' . mysqli_error($this->conexion));
        }

        // Almacena los datos obtenidos en la propiedad response
        $this->response = $data;
    }

    public function getData() {
        // Convierte el array de response a un string JSON y lo retorna
        return json_encode($this->response, JSON_PRETTY_PRINT);
    }

    public function guardarAsistencia($idDelegado, $sesion, $estado) {
        // Primero valida que los datos sean correctos
        if (!is_numeric($idDelegado) || !is_numeric($sesion)) {
            $this->response = 'Datos inválidos';
            return false;
        }

        // Verifica si ya existe ese registro
        $stmt = $this->conexion->prepare("SELECT id FROM asistencia WHERE id_delegado = ? AND sesion = ?");
        $stmt->bind_param("ii", $idDelegado, $sesion);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado && $resultado->num_rows > 0) {
            // Actualizar
            $stmt = $this->conexion->prepare("UPDATE asistencia SET estado = ? WHERE id_delegado = ? AND sesion = ?");
            $stmt->bind_param("sii", $estado, $idDelegado, $sesion);
        } else {
            // Insertar
            $stmt = $this->conexion->prepare("INSERT INTO asistencia (id_delegado, sesion, estado) VALUES (?, ?, ?)");
            $stmt->bind_param("iis", $idDelegado, $sesion, $estado);
        }

        if ($stmt->execute()) {
            $this->response = "ok";
            return true;
        } else {
            $this->response = "Error al guardar: " . $stmt->error;
            return false;
        }
    }

   


}
?>
