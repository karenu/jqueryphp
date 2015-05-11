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
	var Altas= function()
	{
		$("#artUsuarios").show("slow");
		$("#txtNomUsuario").focus();
	}

	var teclaNomUsuario=function()
	{
		var usuario= $("#txtNomUsuario").val();
		if(tecla.which===13)//enter
		{
			var parametros="opcion=buscaUsuario"+"&usuario="+usuario+"&id="+Math.random();
			$.ajax({
				cache:false,
				type: "POST",
				dataType="json",
				url: "datos/buscaUsuario.php",
				data: parametros,
				success: function(response){

				},
				error: function(xhr,ajaxOptionx,throws){
					
				}

			});
		}
	}

	$("#btnValidaUsuario").on("click",validausuario);
	$("#txtClave").on("keypress",teclaClave);
	$("#btnAltas").on("click",Altas); /*que cuando le piquemos al boton altas, llame a la func altas*/
	$("#txtNomUsuario").on("keypress, teclaNomUsuario");
}

$(document).on("ready",inicioApp);







