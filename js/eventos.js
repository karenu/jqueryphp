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
	$("#btnValidaUsuario").on("click",validausuario);
	$("#txtClave").on("keypress",teclaClave);
	$("#btnAltas").on("click",Altas); /*que cuando le piquemos al boton altas, llame a la func altas*/
	$("#txtNomUsuario").on("keypress",teclaNomUsuario);
	$("#btnGuardarUsuarios").on("click",GuardarUsuarios);
	
}

$(document).on("ready",inicioApp);







