

$(document).ready(function(){
    let edit = false;

    //let JsonString = JSON.stringify(baseJSON,null,2);
    //$('#description').val(JsonString);
    $('#delegado-result').hide();
    $('#lista-nombres').hide();
                    
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

                    delegados.forEach(delegado => {
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
                                    <button class="delegados-edit btn btn-warning" >
                                        Editar
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

    $('#name').on('keyup', function() {
        if($('#name').val()) {
            let search = $('#name').val();
            $.ajax({
                url: './backend/delegados-search_miembros_ec.php?name='+$('#name').val(),
                data: {search},
                type: 'GET',
                success: function (response) {
                    console.log(response);
                    if(!response.error) {
                        // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                        const delegados = JSON.parse(response);
                        // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                        if(Object.keys(delegados).length > 0) {
                             let nombres = '';
                            delegados.forEach(delegado => {
                                nombres += "<div class='opcion-nombre'>"+ delegado.nombre + "</div>";
                            });
                            $('#lista-nombres').html(nombres).show();
                        }
                    }
                }
            });
        }
        else{
            $('#lista-nombres').hide();
        }

        $(document).on('click', '.opcion-nombre', function(){

            let nombreSeleccionado = $(this).text().trim();
            console.log(nombreSeleccionado)
            $('#name').val(nombreSeleccionado);
            $('#lista-nombres').hide();
        
            $.post('./backend/delegados-miembros_ec.php', {nombreSeleccionado}, (response) => {
                console.log(response)
                // SE CONVIERTE A OBJETO EL JSON OBTENIDO
                let delegado = JSON.parse(response);
                // SE INSERTAN LOS DATOS ESPECIALES EN LOS CAMPOS CORRESPONDIENTES
                $('#name').val(delegado.nombre);
                // EL ID SE INSERTA EN UN CAMPO OCULTO PARA USARLO DESPUÉS PARA LA ACTUALIZACIÓN
                $('#delegadoID').val(delegado.id);
                // SE ELIMINA nombre, eliminado E id PARA PODER MOSTRAR EL JSON EN EL <textarea>
                $('#categoria').val(delegado.categoria);
                $('#sociedad').val(delegado.sociedad);
                $('#iglesia').val(delegado.iglesia);
                $('#domicilio').val(delegado.domicilio);
                $('#tipodelegado').val(delegado.tipodelegado);
                $('#cuota').val(delegado.cuota);
            });
        });
    });
    

    $('#search').keyup(function() {
        if($('#search').val()) {0
            let search = $('#search').val();
            $.ajax({
                url: './backend/delegados-search.php?search='+$('#search').val(),
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

                            delegados.forEach(delegado => {
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
                                            <button class="delegados-edit btn btn-warning">
                                                Editar
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
            listarDelegados();
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
            tipodelegado: $('#tipodelegado').val()            
        };
        //validar_Cuota();
        /*
        if (!validarFormulario(postData)) {
            return;
        }*/


        const url = edit === false ? './backend/delegados-add.php' : './backend/delegados-edit.php';
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
            $('#cuota').val('');
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

    $(document).on('click', '.delegado-categoria', function(){
        let categoria = $(this).text().trim();
        console.log(categoria);
        if (categoria === "SInfEC" || categoria === "GInfEC" ){
            $('#cuota').val(350);
        }else if (categoria === ""){
            $('#cuota').val(0);
        }else {
            $('#cuota').val(550);
        }
    });

    $(document).on('click', '.delegados-delete', (e) => {
        if(confirm('¿Realmente deseas eliminar el Delegado?')) {
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr('delegadoID');
            $.post('./backend/delegados-delete.php', {id}, (response) => {
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
        console.log(id)
        $.post('./backend/delegados-single.php', {id}, (response) => {
            console.log(response)
            // SE CONVIERTE A OBJETO EL JSON OBTENIDO
            let delegado = JSON.parse(response);
            // SE INSERTAN LOS DATOS ESPECIALES EN LOS CAMPOS CORRESPONDIENTES
            $('#name').val(delegado.nombre);
            // EL ID SE INSERTA EN UN CAMPO OCULTO PARA USARLO DESPUÉS PARA LA ACTUALIZACIÓN
            $('#delegadoID').val(delegado.id);
            // SE ELIMINA nombre, eliminado E id PARA PODER MOSTRAR EL JSON EN EL <textarea>
            $('#categoria').val(delegado.categoria);
            $('#sociedad').val(delegado.sociedad);
            $('#iglesia').val(delegado.iglesia);
            $('#domicilio').val(delegado.domicilio);
            $('#tipodelegado').val(delegado.tipodelegado);
            $('#cuota').val(delegado.cuota);
            
            // SE PONE LA BANDERA DE EDICIÓN EN true
            edit = true;
        });
        e.preventDefault();
    });    

    function validar_Cuota(data){
        if (data.categoria === "SInfEC" || data.categoria === "GInfEC" ){
            data.cuota = 350;
        }else if (data.categoria === ""){
            data.cuota = 0;
        }else if(data.tipodelegado === "Fraternal"){
            data.cuota = 450;
        }else if(data.tipodelegado === "Oficiales"){
            data.cuota = 550;
        }
        $('#cuota').val(data.cuota);
    }
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