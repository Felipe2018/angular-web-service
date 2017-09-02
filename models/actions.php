<?php
/**
 * El siguiente codigo administra las entradas y salidas de la base de datos.
 * @author Juan Lozoya <jlozoya1995@gmail.com>
 */
if (isset($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');    // cache por un dia
}
// Los encabezados Access-Control se reciben durante las peticiones OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  exit(0);
}

include_once("conexion.php");

$postdata = file_get_contents("php://input");
if (isset($postdata)) {
  $request = json_decode($postdata);
  if (!empty($request->acction)) {
    switch ($request->acction) {
      case 'select':
      // se espera: {"acction": "select", "userId": userId, "data": sql_query}
      echo select($conn, $request->data);
      break;
    default:
      echo json_encode("No se realizo ninguna accion");
      break;
    }
  } else {
    header("HTTP/1.0 404 Not Found");
  }
} else {
  header("HTTP/1.0 404 Not Found");
}
/**
 * Selecciona los datos de la base de datos según 
 * la consulta que entre regresa un arreglo con 
 * la información o un mensaje según corresponda.
 * @param type $conn Es un objeto con la información para la conexión a la base de datos.
 * @param type $query Es la consulta a realizar.
 * @return ArrayObject | String
 */
function select($conn, $data) {
  $sqlite = new Conexion("../var/db/weewx_20172408.sdb");
  $query = $conn->query($data);
  if ($query->num_rows > 0) {
    while($fila = $query->fetch_array(MYSQLI_ASSOC)) {
      $temp = array();
      foreach ($fila as $i => $valor) {
        $temp[$i] = utf8_encode($valor);
      }
      $resultd_arr[] = $temp;
    }
    $query->free();
    $conn->close();
    return json_encode($resultd_arr);
  } else {
    return json_encode("No se encotraron resultados");
  }
}
class Conexion extends SQLite3 {
  function __construct($db_name) {
      $this->open($db_name);
  }
}
?>