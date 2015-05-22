<?php
function consultas()
{
	$respuesta = false; 
	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("pw10am");
	$consulta = sprintf("select * from usuarios"); //como es un selec nesecitamos una variable resultado
	$resultado = mysql_query($consulta); //ejecutamos la consulta
	$renglones = "<tr>";
	$renglones.= "<th>No.</th><th>Usuario</th><th>Nombre</th><th>Tipo</th>";
	$renglones.="</tr>";
	$cuenta = 0;
	if(mysql_num_rows($resultado)>0)
	{
		$respuesta = true;
        while ($registro = mysql_fetch_array($resultado))
        {
        	$cuenta+=1; //esto es igual a $cuenta=$cuenta+1;
			$renglones.= "<tr>";
			$renglones.= "<td>".$cuenta."</td>";
			$renglones.= "<td>".$registro["usuario"]."</td>";
			$renglones.= "<td>".$registro["nombre"]."</td>";
			$renglones.= "<td>".$registro["tipousuario"]."</td>";
			$renglones.= "</tr>";
			//aqui ya tengo todos los registros en trs
		}
	}
	else
	{
		$renglones.= "<tr><td colspan=4>Sin usuarios</td></tr>";
	}
	$salidaJSON = array('respuesta' => $respuesta,
						'renglones' => $renglones); //respuesta es la qe te dice si trajo registros
	print json_encode($salidaJSON);
}				

//MENU
$opcion = $_POST["opcion"];
switch ($opcion) {
	case 'consultas':
		consultas();
		break;
	
	default:
		# code...
		break;
}
?>