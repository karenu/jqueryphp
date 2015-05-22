<?php
function eliminarusuarios()
{
	$respuesta = false;
	$usuario = "'".$_POST["usuario"]."'";
	$conexion  = mysql_connect("localhost","root","");
	mysql_select_db("pw10am");
	$consulta = sprintf("delete from usuarios where usuario=%s",$usuario);
	$resultado = mysql_query($consulta);
	if (mysql_affected_rows()>0) //Si se borro el usuario.
	{
		$respuesta = true;
	}
	$salidaJSON = array('respuesta' => $respuesta );
	print json_encode($salidaJSON);
}
$opcion = $_POST["opcion"];
switch ($opcion) {
	case 'eliminarusuarios':
		eliminarusuarios();
		break;
	
	default:
		# code...
		break;
}
?>