<?php
	function buscaUsuario()
	{
		$respuesta = false;
		$usuario   = "'".$_POST["usuario"]."'";
		$conexion  = mysql_connect("localhost","root","");
		mysql_select_db("pw10am");
		$consulta  = "select * from usuarios where usuario=".$usuario;
		$resultado = mysql_query($consulta); //Ejecuta consulta
		// if(mysql_num_rows($resultado) > 0)
		$nombreCompleto = "";
		$tipoUsuario    = -1;
		if($registro = mysql_fetch_array($resultado))
		{
			$respuesta      = true;
			$nombreCompleto = $registro["nombre"];
			$tipoUsuario    = $registro["tipo"];
		}
		$salidaJSON = array('respuesta'      => $respuesta,
							'nombreCompleto' => $nombreCompleto,
							'tipoUsuario'    => $tipoUsuario);
		print json_encode($salidaJSON);
	}
	//Menú principal.
	$opcion = $_POST["opcion"];
	switch ($opcion) {
		case 'buscaUsuario':
			buscaUsuario();
			break;
		
		default:
			# code...
			break;
	}
?>