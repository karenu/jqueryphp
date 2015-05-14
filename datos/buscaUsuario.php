<?php	//es necesario poner php
	function buscaUsuario()
	{
		$respuesta = false; //haer uan repusta qe la vamos a hacer falsa para inializar
		$usuario   = "'".$_POST["usuario"]."'"; //puso apostrofes aqui para no batallar en la consulta
		$conexion  = mysql_connect("localhost","root","");
		mysql_select_db("pw10am");
		$consulta  = "select * from usuarios where usuario=".$usuario;
		$resultado = mysql_query($consulta); //aqui se ejecuta la consulta 
		// if (mysql_num_rows($resultado)>0) //tmb se puede poner asi
		// {

		// }
		$nombreCompleto = "";
		$tipoUsuario    = -1;
		if($registro = mysql_fetch_array($resultado)) //tmb se puede poner asi, y si es vrdd es qe se trajo por lo m enos un registro
		{
			$respuesta = true; 
			$nombreCompleto = $registro["nombre"];
			$tipoUsuario	= $registro["tipousuario"];
			//retornar en formato json haciendo un array asociativo

		}
		$salidaJSON = array('respuesta'      => $respuesta,
							'nombreCompleto' => $nombreCompleto,
							'tipoUsuario'    => $tipoUsuario);
		print json_encode($salidaJSON);
	}



	//Menú principal.
	$opcion = $_POST["opcion"]; /*op amarillo es la que estamso mandando del query noseqe*/
	switch ($opcion) {
		case 'buscaUsuario':
			buscaUsuario();
			break;
		
		default:
			# code...
			break;
	}

?>