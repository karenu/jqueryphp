<?php
function fncValidaUsuario()
{
	$usuario = $_POST["usuario"];
	$clave   = md5($_POST["clave"]);
	$respuesta = false;
	//Conectarse a la BD.
	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("pw10am");
	$consulta  = "select usuario,clave,nombre from usuarios where usuario='".$usuario."' and clave='".$clave."'";
	$resultado = mysql_query($consulta);
	$nombre    = "";
	if($registro = mysql_fetch_array($resultado))
	{
		$nombre    = $registro["nombre"];
		$respuesta = true;
	}
	$salidaJSON = array('respuesta' => $respuesta,
		                'nombre'    => $nombre);
	print json_encode($salidaJSON);
}
//Menú principal
$opcion = $_POST["opcion"];
switch ($opcion) {
	case 'validausuario':
		fncValidaUsuario();
		break;
	
	default:
		# code...
		break;
}
?>