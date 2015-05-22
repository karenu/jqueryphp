var inicioApp = function()//esta va a ser la funcion principal
{
	var validausuario = function()
	{
		var usuario = $("#txtUsuario").val();//obtenmos el valor y se lo damos a la variable
		var clave   = $("#txtClave").val();
		if(usuario!="" && clave!="")
		{
			var parametros = "opcion=validausuario"+
			                 "&usuario="+usuario+
			                 "&clave="+clave+
			                 "&id="+Math.random();
			//Llamada asíncrona a un archivo.
			$.ajax({
				cache:false,/*desactivar cache p/ qe no busqe en cache*/
				url: "datos/validausuario.php",
				type: "POST",/*vamos a mandar POST son arreglos de parametros*/
				dataType: "json",/*y recibir JSON qe se cacha en el RESPONSE*/
				data: parametros,
				success:function(response){
					if(response.respuesta == true)	
					{
						$("#cajaUsuario").hide("slow");
						$("nav").show("slow");
					}
					else
						alert("usuario incorrecto");
				},
				error:function(xhr,ajaxOptionx,throws){/*xhr= num de error*/
					console.log("Hubo un error");
				}
			});
		}
		else
			alert("Usuario o clave están vacíos");
	}

	var teclaClave = function(tecla)
	{
		if(tecla.which===13) //Que pena, //estamos preguntando cual es la tecla **EL TRIPLE IGUAL SIGNIFICA EXACTAMENTE IGUAL
			validausuario();//lo mando a llamar 
	}
	var Altas= function()
	{
		$("#artUsuarios").show("slow");
		$("#txtNomUsuario").focus();
		$("#btnEliminarUsuarios").hide();
		$("#btnCambiarUsuarios").hide();				


	}
	var Bajas = function()
	{
		$("#artUsuarios").show("slow");
		$("#btnEliminarUsuarios").show();
		$("#btnGuardarUsuarios").hide();		
		$("#txtNomUsuario").focus();
	}
		var Cambiar = function()
	{
		$("#artUsuarios").show("slow");
		$("#btnEliminarUsuarios").hide();
		$("#btnGuardarUsuarios").hide();	
		$("#btnCambiarUsuarios").show();				
		$("#txtNomUsuario").focus();
	}

	var teclaNomUsuario=function(tecla)
	{
		var usuario= $("#txtNomUsuario").val();
		if(tecla.which === 13)//enter
		{
			var parametros="opcion=buscaUsuario"+"&usuario="+usuario+"&id="+Math.random();
			$.ajax({
				cache:false,
				type: "POST",
				dataType: "json",
				url: "datos/buscaUsuario.php",
				data: parametros,
				success: function(response){
					if (response.respuesta == true) //como es un obj lo podemos acceder mediante el punto 
					{
						$("#txtNombreUsuario").val(response.nombreCompleto);
						$("#txtTipoUsuario").val(response.tipoUsuario);
					}
					else
						$("#txtNombreUsuario").focus();
				},
				error: function(xhr,ajaxOptionx,throws){
					
				}

			});
		}
	}

	var GuardarUsuarios = function ()
	{
		var usuario = $("#txtNomUsuario").val();
		var nombre  = $("#txtNombreUsuario").val();
		var tipo    = $("#txtTipoUsuario").val();
		if(usuario=="" || nombre=="" || tipo=="")
			alert("Debe llenar todos los campos");
		else
		{
			var parametros = "opcion=guardarusuarios"+
							 "&usuario="+usuario+
							 "&nombre="+nombre+
							 "&tipo="+tipo+
							 "&lupita="+Math.random();
			//mandar por ajax
			$.ajax({
				cache:false,
				type: "POST",
				dataType: "json",
				url: "datos/guardarusuarios.php",
				data: parametros,
				success: function(response){
					if(response.respuesta==true)
					{
						alert("Datos guardados");
						$("#artUsuarios > input").val("");
						//$("body > input").val(""); //para que ponga todos los input del body en cadenavacia LIMPIAR CAMPOS
						// $("#txtNomUsuario").val("");
						// $("#txtNombreUsuario").val("");
						// $("#txtTipoUsuario").val("");

					}
					else
						alert("Datos no guardados");
				},
				error: function(xhr,ajaxOptionx,throws){
					console.log("Ha ocurrido un error");
				}
			});
		}
	}

	var EliminarUsuarios = function()
	{
		var usuario = $("#txtNomUsuario").val();
		if(usuario!="")
		{
			var parametros = "opcion=eliminarusuarios"+
							 "&usuario="+usuario+
							 "&id="+Math.random();
			$.ajax({
				cache: false,
				type: "POST",
				dataType: "json",
				data: parametros,
				url: "datos/eliminarusuarios.php",
				success: function(response){
					if(response.respuesta == true)
					{
						alert("Se ha eliminado el usuario");
						$("#artUsuarios > input").val("");
						$("#txtNomUsuario").focus();
					}
				},
				error: function(xhr,ajaxOption,throws){
					console.log("Ha ocurrido un error");
				}
			});
		}	
	}
	var CambiarUsuarios = function()
	{
		var usuario = $("#txtNomUsuario").val();
		var nombre  = $("#txtNombreUsuario").val();		
		var tipo    = $("#txtTipoUsuario").val();	
		if(usuario!="" && nombre!="" && tipo!="")
		{
			var parametros = "opcion=cambiarusuarios"+
							 "&usuario="+usuario+
							 "&nombre="+nombre+
							 "&tipousuario="+tipo+
							 "&id="+Math.random();
			$.ajax({
				cache: false,
				type: "POST",
				dataType: "json",
				data: parametros,
				url: "datos/cambiarusuarios.php",
				success: function(response){
					if(response.respuesta == true)
					{
						alert("Se ha cambiado la información del usuario");
						$("#artUsuarios > input").val("");
						$("#txtNomUsuario").focus();
					}
				},
				error: function(xhr,ajaxOption,throws){
					console.log("Ha ocurrido un error");
				}
			});
		}	
	}

	var Consultas = function()
	{
		$("section > article").hide("slow"); //le estoy diciendo qe todos los articles de la seccion los esconda... esto porqe solo hay una seccion
		$("#artConsultas").show("slow");
		var parametros = "opcion=consultas"+
						 "&id="+Math.random();
		$.ajax({
			cache: false,
			type: "POST",
			dataType: "json",
			data: parametros,
			url: "datos/consultas.php",
			success: function(response){
				if(response.respuesta == true)
				{
					//a la tabla darle los renglones
					$("#tablaConsultas").html(response.renglones);
				}
			},
			error: function(xhr,ajaxOptionx,throws){
				console.log("ha ocurrido un error");
			}
		});

	}
	$("#btnValidaUsuario").on("click",validausuario);
	$("#txtClave").on("keypress",teclaClave);
	$("#btnAltas").on("click",Altas); /*que cuando le piquemos al boton altas, llame a la func altas*/
	$("#txtNomUsuario").on("keypress",teclaNomUsuario);
	$("#btnGuardarUsuarios").on("click",GuardarUsuarios);
	$("#btnBajas").on("click",Bajas);
	$("#btnEliminarUsuarios").on("click",EliminarUsuarios);
	$("#btnCambiar").on("click",Cambiar);
	$("#btnCambiarUsuarios").on("click",CambiarUsuarios);
	$("#btnConsultas").on("click",Consultas);

	
}

$(document).on("ready",inicioApp);







