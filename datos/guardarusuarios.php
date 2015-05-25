<?php

function guardarusuarios()
{
	$respuesta=false;
	$usuario= "'".$_POST["usuario"]."'";
	$nombre= "'".$_POST["nombre"]."'";
	$tipo= "'".$_POST["tipo"]."'"; //se cambio a comillas para que lo pudiera mostrar
	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("pw10am");
	//$consulta  = "insert into usuarios(usuario,nombre,tipousuario) values(".$usuario.",".$nombre.",".$tipo.")";
	$consulta= sprintf("insert into usuarios(usuario,nombre,tipo)values(%s,%s,%s)",$usuario,$nombre,$tipo);
	mysql_query($consulta);
	if(mysql_affected_rows()>0)//verifica el num de fila afectada de la inserciòn anterior
	{
		$respuesta=true;
	}
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}
//menu principal
$opcion= $_POST["opcion"];
switch ($opcion) {
	case 'guardarusuarios':
	guardarusuarios();
		# code...
		break;
	
	default:
		# code...
		break;
}