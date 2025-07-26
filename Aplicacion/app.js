// JSON BASE A MOSTRAR EN FORMULARIO
/*
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
  };
*/

$(document).ready(function(){
    let edit = false;

    //let JsonString = JSON.stringify(baseJSON,null,2);
    //$('#description').val(JsonString);
    $('#delegados-result').hide();
    listarDelegados();

    function listarDelegados() {
        $.ajax({
            url: './backend/delegados-list.php',
            type: 'GET',
            success: function(response) {
                // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                const delegados = JSON.parse(response);
            
                // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                if(Object.keys(delegados).length > 0) {
                    // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                    let template = '';

                    productos.forEach(delegado => {
                        // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                        let descripcion = '';
                        descripcion += '<li>categoria: '+delegado.categoria+'</li>';
                        descripcion += '<li>sociedad: '+delegado.sociedad+'</li>';
                        descripcion += '<li>iglesia: '+delegado.iglesia+'</li>';
                        descripcion += '<li>domicilio: '+delegado.domicilio+'</li>';
                        descripcion += '<li>Tipo delegado: '+delegado.tipodelegado+'</li>';
                    
                        template += `
                            <tr delegadoID="${delegado.id}">
                                <td>${delegado.id}</td>
                                <td><a href="#" class="delegado-item">${delegado.nombre}</a></td>
                                <td><ul>${descripcion}</ul></td>
                                <td>
                                    <button class="delegado-delete btn btn-danger" >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                    // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                    $('#delegados').html(template);
                }
            }
        });
    }

    $('#search').keyup(function() {
        if($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: './backend/delegado-search.php?search='+$('#search').val(),
                data: {search},
                type: 'GET',
                success: function (response) {
                    if(!response.error) {
                        // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                        const delegados = JSON.parse(response);
                        
                        // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                        if(Object.keys(delegados).length > 0) {
                            // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                            let template = '';
                            let template_bar = '';

                            productos.forEach(delegado => {
                                // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                                let descripcion = '';
                                descripcion += '<li>categoria: '+delegado.categoria+'</li>';
                                descripcion += '<li>sociedad: '+delegado.sociedad+'</li>';
                                descripcion += '<li>iglesia: '+delegado.iglesia+'</li>';
                                descripcion += '<li>domicilio: '+delegado.domicilio+'</li>';
                                descripcion += '<li>Tipo delegado: '+delegado.tipodelegado+'</li>';
                            
                                template += `
                                    <tr delegadoID="${delegado.id}">
                                        <td>${delegado.id}</td>
                                        <td><a href="#" class="delegado-item">${delegado.nombre}</a></td>
                                        <td><ul>${descripcion}</ul></td>
                                        <td>
                                            <button class="delegado-delete btn btn-danger">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                `;

                                template_bar += `
                                    <li>${delegado.nombre}</il>
                                `;
                            });
                            // SE HACE VISIBLE LA BARRA DE ESTADO
                            $('#delegado-result').show();
                            // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
                            $('#container').html(template_bar);
                            // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                            $('#delegados').html(template);    
                        }
                    }
                }
            });
        }
        else {
            $('#delegado-result').hide();
        }
    });

    $('#delegado-form').submit(e => {
        e.preventDefault();

        let postData = {
            nombre: $('#name').val(),
            id: $('#delegadoID').val(),
            categoria: $('#categoria').val(),
            sociedad: $('#sociedad').val(),
            iglesia: $('#iglesia').val(),
            domicilio: $('#domicilio').val(),
            tipodelegado: $('#tipodelegado').val(),
            couta: $('#couta').val()            
        };

        if (!validarFormulario(postData)) {
            return;
        }


        const url = edit === false ? './backend/delegado-add.php' : './backend/delegado-edit.php';
        console.log(postData)
        $.post(url, postData, (response) => {
            console.log(response);
            // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
            let respuesta = JSON.parse(response);
            // SE CREA UNA PLANTILLA PARA CREAR INFORMACIÓN DE LA BARRA DE ESTADO
            let template_bar = '';
            template_bar += `
                        <li style="list-style: none;">status: ${respuesta.status}</li>
                        <li style="list-style: none;">message: ${respuesta.message}</li>
                    `;
            // SE REINICIA EL FORMULARIO
            $('#name').val('');
            $('#categoria').val('');
            $('#sociedad').val('');
            $('#iglesia').val('');
            $('#domicilio').val('');
            $('#tipodelegado').val('');
            $('#couta').val('');
            // SE HACE VISIBLE LA BARRA DE ESTADO
            $('#delegado-result').show();
            // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
            $('#container').html(template_bar);
            // SE LISTAN TODOS LOS PRODUCTOS
            listarDelegados();
            // SE REGRESA LA BANDERA DE EDICIÓN A false
            edit = false;
        });
    });

    $(document).on('click', '.delegado-delete', (e) => {
        if(confirm('¿Realmente deseas eliminar el Delegado?')) {
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr('delegadoID');
            $.post('./backend/delegado-delete.php', {id}, (response) => {
                let respuesta = JSON.parse(response);
                // SE CREA UNA PLANTILLA PARA CREAR INFORMACIÓN DE LA BARRA DE ESTADO
                let template_bar = '';
                template_bar += `
                        <li style="list-style: none;">status: ${respuesta.status}</li>
                        <li style="list-style: none;">message: ${respuesta.message}</li>
                    `;
                // SE HACE VISIBLE LA BARRA DE ESTADO
                $('#delegado-result').show();
                // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
                $('#container').html(template_bar);
                listarDelegados();
            });
        }
    });

    $(document).on('click', '.delegado-item', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr('delegadoID');
        $.post('./backend/delegado-single.php', {id}, (response) => {
            console.log(response)
            // SE CONVIERTE A OBJETO EL JSON OBTENIDO
            let product = JSON.parse(response);
            // SE INSERTAN LOS DATOS ESPECIALES EN LOS CAMPOS CORRESPONDIENTES
            $('#name').val(delegado.nombre);
            // EL ID SE INSERTA EN UN CAMPO OCULTO PARA USARLO DESPUÉS PARA LA ACTUALIZACIÓN
            $('#productId').val(delegado.id);
            // SE ELIMINA nombre, eliminado E id PARA PODER MOSTRAR EL JSON EN EL <textarea>
            $('#categoria').val(delegado.categoria);
            $('#sociedad').val(delegado.sociedad);
            $('#iglesia').val(delegado.iglesia);
            $('#domicilio').val(delegado.domicilio);
            $('#tipodelegado').val(delegado.tipodelegado);
            $('#couta').val(delegado.couta);
            
            // SE PONE LA BANDERA DE EDICIÓN EN true
            edit = true;
        });
        e.preventDefault();
    });    
/*

    // Función para validar el formulario completo
    function validarFormulario(data) {
        return validarNombre(data.nombre) &&
            validarModelo(data.categoria) &&
            validarPrecio(data.sociedad) &&
            validarDetalles(data.iglesia) &&
            validarUnidades(data.domicilio);
    }

    // Funciones de validación individuales con mensajes en tiempo real

    $('#name').focusout(() => validarNombre($('#name').val()));
    $('#modelo').focusout(() => validarModelo($('#modelo').val()));
    $('#precio').focusout(() => validarPrecio($('#precio').val()));
    $('#detalles').focusout(() => validarDetalles($('#detalles').val()));
    $('#unidades').focusout(() => validarUnidades($('#unidades').val()));

    function mostrarEstado(campo, mensaje, esValido) {
        const estado = $(`#estado-${campo}`);
        estado.text(mensaje);
        estado.css('color', esValido ? 'green' : 'red');
        estado.show();
    }

    function validarNombre(nombre) {
        if (nombre === "" || nombre.length > 100) {
            mostrarEstado('nombre', "El nombre es requerido y debe tener 100 caracteres o menos.", false);
            return false;
        }
        mostrarEstado('nombre', "Nombre válido", true);
        return true;
    }

    function validarModelo(modelo) {
        if (!/^[a-zA-Z0-9]+$/.test(modelo) || modelo.length > 25) {
            mostrarEstado('modelo', "El modelo es requerido, alfanumérico y de máximo 25 caracteres.", false);
            return false;
        }
        mostrarEstado('modelo', "Modelo válido", true);
        return true;
    }

    function validarPrecio(precio) {
        if (isNaN(precio) || precio <= 99.99) {
            mostrarEstado('precio', "El precio debe ser mayor a 99.99.", false);
            return false;
        }
        mostrarEstado('precio', "Precio válido", true);
        return true;
    }

    function validarDetalles(detalles) {
        if (detalles.length > 250) {
            mostrarEstado('detalles', "Los detalles no deben exceder 250 caracteres.", false);
            return false;
        }
        mostrarEstado('detalles', "Detalles válidos", true);
        return true;
    }

    function validarUnidades(unidades) {
        if (isNaN(unidades) || unidades < 0) {
            mostrarEstado('unidades', "Las unidades deben ser mayores o iguales a 0.", false);
            return false;
        }
        mostrarEstado('unidades', "Unidades válidas", true);
        return true;
    }

*/
});