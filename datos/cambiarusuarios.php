<?php
function cambiarusuarios()
{
	$respuesta = false;
	$usuario = "'".$_POST["usuario"]."'";
	$nombre  = "'".$_POST["nombre"]."'";
	$tipo    = "'".$_POST["tipo"]."'";
	$conexion  = mysql_connect("localhost","root","");
	mysql_select_db("pw10am");
	$consulta  = sprintf("update usuarios set nombre=%s,tipousuario=%s where usuario=%s",$nombre,$tipo,$usuario);
	$resultado = mysql_query($consulta);
	if(mysql_affected_rows()>0)
		$respuesta = true;
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}
$opcion = $_POST["opcion"];
switch ($opcion) {
	case 'cambiarusuarios':
		cambiarusuarios();
		break;
	
	default:
		# code...
		break;
}
?>