

function VerificarUsuario() {
	var usu = $('#txt_usu').val();
	var con = $('#txt_con').val();

	//console.log(usu + " " + con);

	//validar vacios
	if(usu.length==0 || con.length== 0) {
		return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
		);
	}
	$.ajax({
		url:'../controlador/usuario/controlador_verificar_usuario.php',
		type:'POST',
		data:{
			user:usu,
			pass:con,
		}
		
	}).done(function(resp){
		
		if(resp == 0) {
		// Swal.fire( 'Error', 'Usuario o clave incorrectos',  'warning');
			$.ajax({
				url:'../controlador/usuario/cntrolintento_modificar.php',
				type:'POST',
				data:{
					usuario:usu
				}
			}).done(function(resp){
				if(resp==2) {
					 Swal.fire('Advertencia', 'Usuario o clave incorrectos: intentos fallidos '
				 	+(parseInt(resp)+1)+
				 	" Para iniciar sesión debe restablecer su contraseña",  'warning');
					} else {
						 Swal.fire('Advertencia', 'Usuario o clave incorrectos:  '
				 	,  'warning');
					}
			})
			
		} else {
			var data = JSON.parse(resp);
			if(data[0][6]==="INACTIVO"){
				return Swal.fire(
			  'Error', 'Usuario está inactivo, comuniquese con el administrador del sistema(soporte_tecnico@gmail.com)',
			  'warning'
			);
			}
			if(data[0][7]==2){
				return Swal.fire(
			  'Error', 'Usuario sera desactivado, comuniquese con el administrador del sistema(soporte_tecnico@gmail.com)',
			  'warning'
			);
				
			}
			$.ajax({
				url:'../controlador/usuario/ctrlcrear_session.php',
				type:'POST',
				data:{
					idusuario:data[0][0],
					user:data[0][1],
					rol:data[0][3],
					imagen_user:data[0][8]
				}
			}).done(function(resp){
				let timerInterval
						Swal.fire({
						  title: 'Bienvenido al sistema GYM WEB',
						  html: 'Será redireccionado al menu principal <b></b> milliseconds.',
						  timer: 2000,
						  timerProgressBar: true,
						  didOpen: () => {
						    Swal.showLoading()
						    timerInterval = setInterval(() => {
						      const content = Swal.getContent()
						      if (content) {
						        const b = content.querySelector('b')
						        if (b) {
						          b.textContent = Swal.getTimerLeft()
						        }
						      }
						    }, 100)
						  },
						  willClose: () => {
						    clearInterval(timerInterval)
						  }
						}).then((result) => {
						  /* Read more about handling dismissals below */
						  if (result.dismiss === Swal.DismissReason.timer) {
						   window.location='../vista/index.php';
						  }
					})
			})
		}
	})
}

var t_usuario 
function ListarUsuario(){
     t_usuario = $("#tabla_usuario").DataTable({
        "ordering":false,
        "paging": false,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 100,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controlador/usuario/controlador_usuario_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"usuario_nombre"},
			{"data":"descripcion"},
			{"data":"usuario_email"},
			{"data":"usuario_imagen",
            render: function (data, type, row ) {
            	 return '<img src="../'+data+'" class="img-circle" style="width:28px">';
            	}
        	},
			
            {"data":"usuario_estatus",
            render: function (data, type, row ) {
                if(data=='ACTIVO'){
                    return "<span class='label label-success'>"+data+"</span>";                   
                }else{
                  return "<span class='label label-danger'>"+data+"</span>";                 
                }
              }
            },  
               {"data":"usuario_estatus",
            render: function (data, type, row ) {
                if(data=='ACTIVO'){
                    return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' ><i class='fa fa-trash' disabled ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' disabled><i class='fa fa-check'></i></button>";                   
                }else{
                    return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' disabled ><i class='fa fa-trash'  ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' ><i class='fa fa-check'></i></button>";                   
                }
              }
            }, 
        ],



        "language":idioma_espanol,
        select: true
    });

     t_usuario.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_usuario').DataTable().page.info();
        t_usuario.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );
  

    document.getElementById("tabla_usuario_filter").style.display="none";

	      $('input.global_filter').on( 'keyup click', function () {
	        filterGlobal();
	    } );
	    $('input.column_filter').on( 'keyup click', function () {
	        filterColumn( $(this).parents('tr').attr('data-column') );
	    });

// modificar datos usuario
    $('#tabla_usuario').on('click','.editar',function(){
    	var data = t_usuario.row($(this).parents('tr')).data();
    	 if(t_usuario.row(this).child.isShown()){
		        var data = t_usuario.row(this).data();
		    }
    	$("#modal_editar").modal({backdrop:'static',keyboard:false})
		$('#modal_editar').modal('show');
		$('#txtidusuario').val(data.usuario_id);
		$('#txtusu_actual_editar').val(data.usuario_nombre);
		$('#txtusu_nuevo_editar').val(data.usuario_nombre);

		$('#txt_email_actual_editar').val(data.usuario_email);
		$('#txt_email_nuevo_editar').val(data.usuario_email);
		
		$('#cmb_rol_editar').val(data.rol_id).trigger("change");

    })



// desactivar usuario
    $('#tabla_usuario').on('click','.activar',function(){
    	var data = t_usuario.row($(this).parents('tr')).data();
    	 if(t_usuario.row(this).child.isShown()){
		        var data = t_usuario.row(this).data();
		    }
    	Swal.fire({
		  title: 'Está seguro de activar el usuario?',
		  text: "Una vez desactivado el usuario  podrá ingresar al sistema",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si'
		}).then((result) => {
		  if (result.isConfirmed) {
		   	 Modificar_Estatus(data.usuario_id,'ACTIVO');
		  }
		})
    })


// function activar usuario
    $('#tabla_usuario').on('click','.desactivar',function(){
    	var data = t_usuario.row($(this).parents('tr')).data();
    	 if(t_usuario.row(this).child.isShown()){
		        var data = table.row(this).data();
		    }
    	Swal.fire({
		  title: 'Está seguro de activar el usuario?',
		  text: "Una vez desactivado el usuario no podrá ingresar al sistema",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si'
		}).then((result) => {
		  if (result.isConfirmed) {
		   	 Modificar_Estatus(data.usuario_id,'INACTIVO');
		  }
		})
    })





    function Modificar_Estatus(usuario_id,estatus) {
    	var mensaje ="";
    	if(estatus=='INACTIVO') {
    		mensaje="desactivado";
    	}else {
    		mensaje="activo";
    	}
	  $.ajax({
			url:"../controlador/usuario/controlador_usuario_modificar_estatus.php",
	         type:'POST',
	         data:{
	         	usuario_id:usuario_id,
	         	estatus: estatus,       	
	         }
		}).done(function(resp){
			//alert(resp);
			if(resp > 0) {
					Swal.fire("Mensaje  de confirmaciòn","Usuario "+mensaje+" exitosamente",
					"success")
				.then((value)=>{
					//LimpiarRegistro();
					t_usuario.ajax.reload();
				
				});
			}
			
		})
	}



	function filterGlobal() {
	    $('#tabla_usuario').DataTable().search(
	        $('#global_filter').val(),
	    ).draw();
	}

}

function AbrirModalRegistro() {
	$("#modal_registro").modal({backdrop:'static',keyboard:false})
	$('#modal_registro').modal('show');
}


function listar_combo_rol() {
	$.ajax({
		url:"../controlador/usuario/controlador_combo_rol_listar.php",
         type:'POST'
	}).done(function(resp){
		//alert(resp);
		var data = JSON.parse(resp);
		//console.log(resp);
		var cadena ="";
		if(data.length>0) {
			for (var i = 0; i < data.length; i++) {
				cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
			}
			$('#cmb_rol').html(cadena);
			$('#cmb_rol_editar').html(cadena);
		} else {
			cadena+="<option value=''> No Hay datos</option>";
			$('#cmb_rol').html(cadena);
			$('#cmb_rol_editar').html(cadena);
		}
	})
}



// registro de usuarios

function Registrar_Usuario() {

	var usuario = $('#txt_usu').val();
	
	var contra = $('#txt_con1').val();
	var contra2 = $('#txt_con2').val();
	var idrol =$('#cmb_rol').val();
	var email = $('#txt_email').val();
	var validaremail =$("#validar_email").val();
	
	var archivo = $('#imagen').val();
	
	
	if(usuario.length==0 || contra.length==0 ||idrol.length ==0 ||  email.length==0) { 
		return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
		);
	}


	

	if(contra != contra2) {
		return Swal.fire( 'Mensaje de error',  'Las contraseñas no coinciden, por favor verifque', 'warning'
		);
	}

	if(validaremail=="incorrecto") {
		return Swal.fire( 'Mensaje de error',  'Error debe digitar un correo válido', 'warning'
		);
	}


	var f = new Date();
	var extension = archivo.split('.').pop();
	var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+
	f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;
 
	var formData = new FormData();
	var foto = $("#imagen")[0].files[0];
	formData.append('usuario',usuario);
	formData.append('contra',contra);
	formData.append('idrol',idrol);
	formData.append('email',email);
	
	
	formData.append('foto',foto);
	formData.append('nombrearchivo',nombrearchivo);

	$.ajax({
		url:'../controlador/usuario/controlador_usuario_registro.php',
		type:'POST',
		data:formData,
		contentType:false,
		processData:false,
		success:function(resp) {
			if(resp != 0) {
				if(resp > 0) {
                 if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Usuario registrado exitosamente",
                    "success")
                .then((value)=>{
                    ListarUsuario();
               LimpiarCampos();
                    t_usuario.ajax.reload();
                
                });
            } else {
             LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Usuario ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Usuario no insertado','warning');
        }
			}
		
		}

	});
	return false;
}

function Editar_Foto() {

	var idusuario =$('#txtidusuario').val();
	var archivo = $('#imagen_editar').val();
	var f = new Date();
	var extension = archivo.split('.').pop();
	var nombrearchivo = "IMG"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+
	f.getHours()+""+f.getMinutes()+""+f.getSeconds()+"."+extension;
 
	var formData = new FormData();
	var foto = $("#imagen_editar")[0].files[0];
	if(archivo.length==0) { 
		return Swal.fire('Mensaje de error','Debe seleccionar un archivo', 'warning'
		);
	}
	
	formData.append('idusuario',idusuario);
	formData.append('foto',foto);
	formData.append('nombrearchivo',nombrearchivo);

	$.ajax({
		url:'../controlador/usuario/controlador_usuario_editar_foto.php',
		type:'POST',
		data:formData,
		contentType:false,
		processData:false,
		success:function(resp){
			alert(resp);
			if(resp!=0){
               if(resp==1){
               	t_usuario.ajax.reload();
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Foto Actualizada exitosamente","success");  
           		 } 
			}
		
		}

	});
	return false;
}










// modificar de usuarios

function Modificar_Usuario() {
	var idusuario = $('#txtidusuario').val();
	var usuario_actual = $('#txtusu_actual_editar').val();
	var usuario_nuevo = $('#txtusu_nuevo_editar').val();
	var email_actual = $('#txt_email_actual_editar').val();
	var email_nuevo = $('#txt_email_nuevo_editar').val();
	var validaremail =$("#validar_email_editar").val();
	
	var rol = $('#cmb_rol_editar').val();

	if(validar_email_editar=="incorrecto") {
		return Swal.fire( 'Mensaje de error',  'Error debe digitar un correo válido', 'warning'
		);
	}

	if(usuario_nuevo.length == 0 ||    email_nuevo.length ==0 || rol.length==0) { 
		return Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
		);
	}
	
	

	$.ajax({
		url:"../controlador/usuario/controlador_usuario_editar_registro.php",
         type:'POST',
         data:{
         	idusuario:idusuario,
         	usuario_actual:usuario_actual,
			usuario_nuevo:usuario_nuevo,
         	email_actual:email_actual,
         	email_nuevo:email_nuevo,
         	rol:rol
         }
	}).done(function(resp){
	alert(resp);
		if(resp > 0) {
				$('#modal_editar').modal('hide');
				Swal.fire("Mensaje  de confirmaciòn","Usuario modificado exitosamente",
					"success")
				.then((value)=>{
				//	LimpiarRegistro();
					t_usuario.ajax.reload();
				TraerDatosUsuario();
				});
			
		}else {
			return Swal.fire( 'Mensaje de error',  'Usuario no modificado', 'warning'
		);
		}
	})

}


function LimpiarRegistro() {
	$("#txt_usu").val("");
	$("#txt_con1").val("");
	$("#txt_con2").val("");
	//$("#cmb_sexo").val("");
	//$("#cmb_rol").val("");
}


function TraerDatosUsuario() {
	var usuario =$("#usuarioprincipal").val();
	$.ajax({
		url:"../controlador/usuario/cntrltraerdatos_usuario.php",
		type:'POST',
		data:{
			usuario:usuario
		}
	}).done(function(resp){
		//alert(resp);
		var data = JSON.parse(resp);
		if(data.length > 0) {
			$("#txtcontra_bd").val(data[0][2]);
			if(data[0][3]==="M"){
				$("#img_nav").attr("src","../plantilla/dist/img/avatar5.png");
				$("#img_subnav").attr("src","../plantilla/dist/img/avatar5.png");
				$("#img_lateral").attr("src","../plantilla/dist/img/avatar5.png");
			} else {
				$("#img_nav").attr("src","../plantilla/dist/img/avatar3.png");
				$("#img_subnav").attr("src","../plantilla/dist/img/avatar3.png");
				$("#img_lateral").attr("src","../plantilla/dist/img/avatar3.png");
			}
		}
	})
}


function AbrirModalEditarContra(){
	$("#modal_editar_contra").modal({backdrop:'static',keyboard:false})
	$('#modal_editar_contra').modal('show');
	$("#modal_editar_contra").on('shown.bs.modal',function(){
     $("#txtcontraactual_editar").focus();
          })
}



function Editar_Contrasena() {
	var idusuario =$('#txtidprincipal').val();
	var contrabd =$('#txtcontra_bd').val();
	var contraescrita =$('#txtcontraactual_editar').val();
	var contranu =$('#txtcontranu_editar').val();
	var contrare =$('#txtcontrare_editar').val();

	if(contraescrita.length==0 ||contranu.length==0 || contrare.length ==0) {
		return Swal.fire( 'Mensaje de error','Debe digitar los campos vacios','warning');
	}

	if(contranu != contrare) {
		return Swal.fire( 'Mensaje de error','Las contraseñas no coinciden','warning');
	}
	$.ajax({
		url:'../controlador/usuario/cntrlcambiar_contraseña.php',
		type:'POST',
		data:{
			idusuario:idusuario,
			contrabd:contrabd,
			contraescrita:contraescrita,
			contranu:contranu,
		}
	}).done(function(resp){
		//alert(resp);
		if(resp >0) {
			if(resp == 1) {
				$('#modal_editar_contra').modal('hide');
				LimpiarEditarCampos();
				Swal.fire("Mensaje  de confirmaciòn","Contraseña modificada exitosamente",
					"success")
				.then((value)=>{
				//	LimpiarRegistro();
					
				TraerDatosUsuario();
				});
			} else {
				return Swal.fire( 'Mensaje de error','La clave actual no coincide con la de nuestra base de datos, verifique por favor☺','warning');
			}
		}else {
			return Swal.fire( 'Mensaje de error','No se pudo actualizar la contraseña','warning');
		}
	})
}


function LimpiarEditarCampos() {
	$('#txtcontraactual_editar').val("");
	$('#txtcontranu_editar').val("");
	$('#txtcontrare_editar').val("");
}


function AbrirModalRestablecer() {
	$("#modal_reestablecer_contra").modal({backdrop:'static',keyboard:false})
	$('#modal_reestablecer_contra').modal('show');
	$("#modal_reestablecer_contra").on('shown.bs.modal',function(){
    $("#txtemail").focus();
       })
}

function Restablecer_Contra() {
	var email = $("#txtemail").val();
	if(email.length==0) {
		return Swal.fire( 'Mensaje de error','Debe digitar un correo','warning');
	}
	var caracteres ="abcdfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
	var contrasena ="";
	for (var i = 0; i < 6; i++) {
		contrasena+=caracteres.charAt(Math.floor(Math.random()*caracteres.length));
	}
	
	$.ajax({
		url:'../controlador/usuario/cntrlrestablecer_contra.php',
		type:'POST',
		data:{
			email:email,
			contrasena:contrasena
		},

	}).done(function(resp){
		//alert(email + ''+ contrasena);
		//alert(resp);
		if(resp > 0 ) {
			if(resp == 1) {
				return Swal.fire( 'Mensaje de Confirmación','Contraseña restablecida '+email+'success');
			} else {
				return Swal.fire( 'Mensaje de error','El correo no existe en nuestra base d datos','warning');
			}
		} else {
			return Swal.fire( 'Mensaje de error','No se pudo restablecer su contraseña','warning');
		}
	})

}