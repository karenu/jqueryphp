var inicioApp = function()
{
	var validausuario = function()
	{
		var usuario = $("#txtUsuario").val();
		var clave   = $("#txtClave").val();
		if(usuario!="" && clave!="")
		{
			if(usuario=="hola" && clave=="mundo")
			{
				$("#cajaUsuario").hide("slow");/*slow para que la transcición sea lenta*/
				$("nav").show("slow");
			}
			else
				alert("Usuario o contraseña incorrectos");
		}
		else
			alert("Usuario o clave están vacíos");
	}
	var teclaClave= function(tecla) /*el parametro se puede llamar como sea*/ /*funcion sin nada adentro de los () se le dice funcion anonima*/
	{
		if(tecla.which==13)/*el triple === significa exactamente igual*/
		{
			validausuario();
		}
	}
	$("#btnValidaUsuario").on("click",validausuario);
	$("#txtClave").on("keypress", teclaClave); /*se va a ejecutar el evento teclaClave, keypress: al presionar
	cualquier tecla*/
}

$(document).on("ready",inicioApp);