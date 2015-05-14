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

	$("#btnValidaUsuario").on("click",validausuario);
	$("#txtClave").on("keypress",teclaClave);
	$("#btnAltas").on("click",Altas);
	$("#txtNomUsuario").on("keypress",teclaNomUsuario);	
	$("#btnGuardarUsuarios").on("click",GuardarUsuarios);

}
$(document).on("ready",inicioApp);


