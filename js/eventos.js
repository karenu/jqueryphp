var inicioApp = function()
{
	var validausuario = function()
	{
		var usuario = $("#txtUsuario").val();
		var clave   = $("#txtClave").val();
		if(usuario!="" && clave!="")
		{
			var parametros = "opcion=validausuario"+
			                 "&usuario="+usuario+
			                 "&clave="+clave+
			                 "&id="+Math.random();
			//Llamada asíncrona a un archivo.
			$.ajax({
				cache:false,
				url: "datos/validausuario.php",
				type: "POST",
				dataType: "json",
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
				error:function(xhr,ajaxOptionx,throws){
					console.log("Hubo un error");
				}
			});
		}
		else
			alert("Usuario o clave están vacíos");
	}

	var teclaClave = function(tecla)
	{
		if(tecla.which===13) //Que pena
			validausuario();
	}

	var Altas = function()
	{
		$("#artUsuarios").show("slow");
		$("#txtNomUsuario").focus();
		$("#btnGuardarUsuarios").show();
		$("#btnEliminarUsuarios").hide();
		$("#btnCambiarUsuarios").hide();
		$("#artConsultas").hide();
		
	}
	var Bajas = function()
	{
		$("#artUsuarios").show("slow");
		$("#txtNomUsuario").focus();
		$("#btnGuardarUsuarios").hide();
		$("#btnEliminarUsuarios").show();
		$("#btnCambiarUsuarios").hide();
		$("#artConsultas").hide();
		
	}
	var Cambiar = function()
	{
		$("#artUsuarios").show("slow");
		$("#btnEliminarUsuarios").hide();
		$("#btnGuardarUsuarios").hide();	
		$("#btnCambiarUsuarios").show();				
		$("#txtNomUsuario").focus();
		$("#artConsultas").hide();
		

	}

	var teclaNomUsuario = function(tecla)
	{
		var usuario = $("#txtNomUsuario").val();
		if(tecla.which === 13) //Enter
		{
			var parametros = "opcion=buscaUsuario"+
							 "&usuario="+usuario+
							 "&id="+Math.random();
			$.ajax({
				cache:false,
				type: "POST",
				dataType: "json",
				url: "datos/buscaUsuario.php",
				data: parametros,
				success: function(response){
					if(response.respuesta == true)
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
	var GuardarUsuarios =function()
	{
		var usuario= $("#txtNomUsuario").val();
		var nombre =$("#txtNombreUsuario").val();
		var tipo = $("#txtTipoUsuario").val();
		if(usuario==""|| nombre==""||tipo=="")
			alert("Debe llenar todos los campos");
		else
		{
			var parametros= "opcion=guardarusuarios"+
							"&usuario="+usuario+
							"&nombre="+nombre+
							"&tipo="+tipo+
							"&lupita="+Math.random();

							$.ajax({

								cache:false,
								type: "POST",
								dataType:"json",
								url:"datos/guardarusuarios.php",
								data: parametros,
								success:function(response){
									if(response.respuesta==true)
									{
										alert("Datos guardados");
										//$("body>input").val("");


										$("#txtNomUsuario").val("");
										$("#txtNombreUsuario").val("");
										$("#txtTipoUsuario").val("");

									}
								},
								error: function(xhr,ajaxOptionx, throws){
									console.log("Ha ocurrido un error");
								}

							})
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
	var Consultas =function()
	{
		$("section > article").hide("slow");
		$("#artConsultas").show("slow");
		var parametros="opcion=consultas"+
						"&id="+Math.random();
						$.ajax({
							cache: false,
							type: "POST",
							dataType:"json",
							data: parametros,
							url: "datos/consultas.php",
							success: function(response){

								if(response.respuesta==true)
								{

									$("#tablaConsultas").html(response.renglones);
								}
							},
							error: function(xhr,ajaxOptionx,throws){

								console.log("Ha ocurrido un error");
							}



						});
	}
	var CambiarContra=function()
	{
		$("#cajaContra").show();
	}

//Eventos del usuario.

var TablaEliminar=function()
{
	var usuario = $(this).val(); /* obtengo el valor del usuario que contiene el botón que le piqué*/
		$("#txtNomUsuario").val(usuario); /* le mandamos el val de nom usuario que obtuvo al picarle el boton*/
		EliminarUsuarios();
}
	$("#btnValidaUsuario").on("click",validausuario);
	$("#txtClave").on("keypress",teclaClave);
	$("#btnAltas").on("click",Altas);
	$("#txtNomUsuario").on("keypress",teclaNomUsuario);	
	$("#btnGuardarUsuarios").on("click",GuardarUsuarios);
	$("#btnBajas").on("click",Bajas);
	$("#btnEliminarUsuarios").on("click",EliminarUsuarios);
	$("#btnCambiar").on("click",Cambiar);
	$("#btnCambiarUsuarios").on("click",CambiarUsuarios);
	$("#btnConsultas").on("click",Consultas);
	$("#tablaConsultas").on("click", ".btnTablaEliminar",TablaEliminar); /* la funcion TablaEliminar todavia no existe, pero la vamos a crear*/
	/*$(elemento).on(evento,funciòn); Para código fijo
	$(ElementoContenedor).on(evento,elementoVariable, Funciòn); creado en tiempo de ejecuciòn
								el boton que segun no existe 
	*/
	$("#btnCambiarContra").on("click",CambiarContra);

}
$(document).on("ready",inicioApp);


