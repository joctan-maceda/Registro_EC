
// CUANDO INICIA LA PANTALLA
$(document).ready(function(){
    let edit = false;
    $('#delegado-result').hide();
    $('#lista-nombres').hide();
    $('#lista-sociedades').hide();                    
// VERIFICAMOS EN PÁGINA ESTAMOS ACTUALMENTE
    const paginaActual = $('body').data('pagina'); 

// VERIFICACIÓN DE CADA PÁGINA, PARA OCULTAR ELEMENTOS, DEPENDIENDO LA PÁGINA
    if (paginaActual === 'index') {
        $('#search').show();
        $('#boton-buscar').show();
        listarDelegados();
        // Verifica si el div delegado result esta visible o no
        // En caso de que este visible signfica que alguien esta buscando algo, por lo que no se recarga la pagina
        // En caso contrario, se estara recargando la pagina cada 3 segundos
        setInterval(() => {
            const display = $('#delegado-result').is(':visible');
            if (display === false) {
                console.log("Oculto, recargando...");
                listarDelegados();
            } else {
                console.log("Visible, no se recarga.");
            }
        }, 3000);
        
    }
    if (paginaActual === 'listaOriginal') {
        $('#search').hide();
        $('#boton-buscar').hide();
        listaDelegados();
        setInterval(listaDelegados, 3000);
    }
    if (paginaActual === 'listaActa') {
        $('#search').hide();
        $('#boton-buscar').hide();
        listaDelegadosActa();
        setInterval(listaDelegadosActa, 3000); 
    }
    if (paginaActual === 'pasedelista') {
        $('#search').hide();
        $('#boton-buscar').hide();
        pasedelista();
        //setInterval(pasedelista, 3000);
    }

    ///////////////////////////////////////////////////////////
    ///////////////// PÁGINA listaActa.php ////////////////////
    ///////////////////////////////////////////////////////////

    function listaDelegadosActa() {
        let contador = 0;
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
                        contador += delegado.cuota;
                        // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                        let descripcion = '';
                        descripcion += ''+delegado.categoria+"      ";
                        descripcion += "     "+delegado.sociedad+"     ";
                        descripcion += ",    "+delegado.iglesia+"     ";
                        descripcion += ",   "+delegado.domicilio+'';
                    
                        template += `
                            <tr delegadoID="${delegado.id}">
                                <td>${delegado.id}</td>
                                <td>${delegado.tipodelegado}</td>
                                <td>${delegado.nombre}</td>
                                <td>${descripcion}</td>
                                
                            </tr>
                        `;
                    });
                    // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "delegados"
                    $('#delegados').html(template);
                }
            }
        });
    }

    ///////////////////////////////////////////////////////////
    ///////////////// PÁGINA listaOriginal.php ////////////////
    ///////////////////////////////////////////////////////////

    function listaDelegados() {
        let resumenPorTipo = {}; // Para agrupar por tipo de delegado
        let totalCuotas = 0;
        let totalDelegados = 0;
        let sociedadesUnicas = new Set();
        let gruposUnicos = new Set();

        $.ajax({
            url: './backend/delegados-list.php',
            type: 'GET',
            success: function(response) {
                const delegados = JSON.parse(response);

                if (Object.keys(delegados).length > 0) {
                    let template = '';
                    delegados.forEach(delegado => {
                        totalDelegados++; // Contador de delegados
                        totalCuotas += parseFloat(delegado.cuota);
                        // Agrupación por tipo de delegado
                        if (!resumenPorTipo[delegado.tipodelegado]) {
                            resumenPorTipo[delegado.tipodelegado] = {
                                cantidad: 0,
                                cuotas: 0
                            };
                        }

                        if (delegado.categoria === "SAEC" || delegado.categoria === "SJEC" || delegado.categoria === "SInfEC" || delegado.categoria === "SIEC" || delegado.categoria === "SMEC" ){
                            sociedadesUnicas.add(delegado.categoria + " " +delegado.sociedad);
                        }else{
                            gruposUnicos.add(delegado.categoria + " " +delegado.sociedad);
                        }

                        resumenPorTipo[delegado.tipodelegado].cantidad++;
                        resumenPorTipo[delegado.tipodelegado].cuotas += parseFloat(delegado.cuota);
                        let descripcion = `${delegado.categoria} ${delegado.sociedad}, ${delegado.iglesia}, ${delegado.domicilio}`;

                        template += `
                            <tr delegadoID="${delegado.id}">
                                <td>${delegado.id}</td>
                                <td>${delegado.tipodelegado}</td>
                                <td>${delegado.nombre}</td>
                                <td>${descripcion}</td>
                                <td>${delegado.cuota}</td>
                            </tr>
                        `;
                    });
                    $('#delegados').html(template);

                    // Construir resumen:
                    // Se muestra un resumen para cada tipo de delegado, en donde viene el total de delegdos y el total de cuotas.
                    let resumenHTML = '<div class="mt-4"><h5>Resumen por tipo de delegado</h5><ul class="list-group">';
                    for (const tipo in resumenPorTipo) {
                        const data = resumenPorTipo[tipo];
                        resumenHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                            ${tipo}
                            <span>${data.cantidad} delegados - Cuotas: $${data.cuotas.toFixed(2)}</span>
                        </li>`;
                    }

                    // Agrega resumen final
                    resumenHTML += `
                        <li class="list-group-item active d-flex justify-content-between align-items-center">
                            Total General
                            <span>${totalDelegados} delegados - Cuotas: $${totalCuotas.toFixed(2)}</span>
                        </li>
                        
                        
                    `;

                    resumenHTML += '</ul></div>';

                    // Mostrar resumen debajo de la tabla
                    $('#resumenDelegados').html(resumenHTML);
                }
                console.log(sociedadesUnicas);
                console.log(gruposUnicos);
            }
        });
    }


    ///////////////////////////////////////////////////////////
    ///////////////// PÁGINA pasedelista.php ////////////////
    ///////////////////////////////////////////////////////////

    function pasedelista() {
        $.ajax({
            url: './backend/delegados-lista-con-asistencia.php',
            type: 'GET',
            success: function(response) {
                // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                const delegados = JSON.parse(response);
                console.log(delegados);
                // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                if(Object.keys(delegados).length > 0) {
   
                // Se hacen diferentes tablas, dependiendo el tipo de delegado.
                    delegados.forEach(delegado => {
                        if (delegado.tipodelegado === "Oficial"){
                            agregarDelegadoATabla('Oficiales', delegado);
                        }else if( delegado.tipodelegado === "Fraternal"){
                            agregarDelegadoATabla('Fraternales', delegado);
                        }else if (delegado.tipodelegado === "Visita"){
                            agregarDelegadoATabla('Visitas', delegado);
                        }else if (delegado.tipodelegado === "Consejeros y Superintendentes"){
                            agregarDelegadoATabla('Consejeros', delegado);
                        }else if (delegado.tipodelegado === "Representantes de Uniones"){
                            agregarDelegadoATabla('RepresentantesU', delegado);
                        }else{
                            agregarDelegadoATabla('PersonalRP', delegado);
                        }
                    });
                }
            }
        });
    }

    // Funcion que crear las tablas dependiendo el tipo de delegado.
    function agregarDelegadoATabla(tablaId, delegado) {
        const tbody = document.getElementById(tablaId);
        const fila = document.createElement('tr');

        let descripcion = '';
        descripcion += delegado.categoria + ' ' + delegado.sociedad + ', ' + delegado.iglesia + ', ' + delegado.domicilio;

        let selects = '';
        for (let i = 1; i <= 6; i++) {
            const estado = delegado.asistencias?.[i] || '';
            selects += `
                <td>
                    <select class="form-select form-select-sm asistencia" 
                            data-sesion="${i}" 
                            data-tabla="${tablaId}">
                        <option value="" ${estado === '' ? 'selected' : ''}>-</option>
                        <option value="presente" ${estado === 'presente' ? 'selected' : ''}>✓</option>
                        <option value="ausente" ${estado === 'ausente' ? 'selected' : ''}>×</option>
                    </select>
                </td>`;
        }
        fila.innerHTML = `
            <td>${delegado.id}</td>
            <td>${delegado.nombre}</td>
            <td>${descripcion}</td>
            ${selects}
            <td></td> <!-- columna extra si la necesitas -->
        `;
        tbody.appendChild(fila);
        actualizarResumenPorTabla(tablaId);
    }

    // Actualiza los resumenes de cada tabla de cada tipo de de delegado
    function actualizarResumenPorTabla(tablaId) {
    const resumen = {};
    for (let sesion = 1; sesion <= 6; sesion++) {
        resumen[sesion] = { presentes: 0, total: 0 };
    }
        // Verifica el Select con la clase asistencia, y con un contador, va haciendo un resumen.
        document.querySelectorAll(`#${tablaId} .asistencia`).forEach(select => {
            const sesion = select.dataset.sesion;
            resumen[sesion].total += 1;
            if (select.value === 'presente') {
            resumen[sesion].presentes += 1;
            }
        });
        // Mostrar resumen
        const resumenDiv = document.getElementById(`resumen-${tablaId}`);
        resumenDiv.innerHTML = '<strong>Resumen por sesión:</strong><br>' +
            Object.entries(resumen).map(([num, data]) => {
            return `Sesión ${num}: ${data.presentes} / ${data.total}`;
            }).join('<br>');
    }

    // Cuando el select cambia, entonces, se guarda en la base de datos que se tiene.
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('asistencia')) {
            const select = e.target;
            const tablaId = select.dataset.tabla;
            const fila = select.closest('tr');
            const idDelegado = fila.children[0].textContent.trim(); // Asumiendo que el ID está en la primera columna
            const sesion = select.dataset.sesion;
            const estado = select.value;

            // Actualizar resumen visual
            actualizarResumenPorTabla(tablaId);

            // Guardar asistencia vía AJAX
            fetch('./backend/guardar-asistencia.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    id_delegado: idDelegado,
                    sesion: sesion,
                    estado: estado
                })
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    console.error('Error al guardar asistencia:', data.error);
                    alert('No se pudo guardar la asistencia.');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
        }
    });    

    ///////////////////////////////////////////////////////////
    ///////////////////// PÁGINA index.php ////////////////////
    ///////////////////////////////////////////////////////////

    function listarDelegados() {
        $.ajax({
            url: './backend/delegados-list.php',
            type: 'GET',
            success: function(response) {
                // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
                const delegados = JSON.parse(response);
                console.log(delegados);
                // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
                if(Object.keys(delegados).length > 0) {
                    // SE CREA UNA PLANTILLA PARA CREAR LAS FILAS A INSERTAR EN EL DOCUMENTO HTML
                    let template = '';

                    delegados.forEach(delegado => {
                        // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                        let descripcion = '';
                        descripcion += '<li>CATEGORIA:  '+delegado.categoria+'</li>';
                        descripcion += '<li>SOCIEDAD:  '+delegado.sociedad+'</li>';
                        descripcion += '<li>IGLESIA:  '+delegado.iglesia+'</li>';
                        descripcion += '<li>DOMICILIO:  '+delegado.domicilio+'</li>';
                        descripcion += '<li>TIPO DELEGADO: <strong> '+delegado.tipodelegado+'</strong></li>';
                    
                        template += `
                            <tr delegadoID="${delegado.id}">
                                <td>${delegado.id}</td>
                                <td>${delegado.nombre}</td>
                                <td><ul>${descripcion}</ul></td>
                                <td>
                                    <button class="delegado-item btn btn-warning" >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                    // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "delegados"
                    $('#delegados').html(template);
                }
            }
        });
    }

    ///////////////////////////////////////////////////////////
    //////////////// Eventos en el campo #name ////////////////
    ///////////////////////////////////////////////////////////

    // Escucha los cambios en el input llamado name.
    $('#name').on('keyup', function () {
        if ($('#name').val()) {
            let search = $('#name').val();
            $.ajax({
                url: './backend/delegados-search_miembros_ec.php?name=' + encodeURIComponent(search),
                data: { search },
                type: 'GET',
                success: function (response) {
                    try {
                        const delegados = JSON.parse(response);
                        if (delegados.length > 0) {
                            let nombres = '';
                            delegados.forEach(delegado => {
                                // Para cada delegado obtenido, se hace un template con diferentes datos.
                                // Se pone varios datos para verse en el div, pero solo se envia el dato del nombre.
                                nombres += `
                                    <div class="opcion-nombre" data-nombre="${delegado.nombre}">
                                        <strong>${delegado.nombre}</strong><br>
                                        <small>${delegado.categoria} | "${delegado.sociedad}", ${delegado.iglesia}</small><br>
                                        <small>${delegado.domicilio}</small>
                                    </div>
                                `;
                            });
                            $('#lista-nombres').html(nombres).show();
                        } else {
                            $('#lista-nombres').hide();
                        }
                    } catch (e) {
                        console.error("Respuesta no es JSON válido:", response);
                        $('#lista-nombres').hide();
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error AJAX:", error);
                    $('#lista-nombres').hide();
                }
            });
        } else {
            $('#lista-nombres').hide();
        }
    });

    // Escucha cuando se da click en alguna opcion de los nombres que se generan en el input name.
    $(document).on('click', '.opcion-nombre', function () {
        // Obtiene el texto del input name.
        let nombreSeleccionado = $(this).data('nombre');
        // Se pone el dato en el input name.
        $('#name').val(nombreSeleccionado);
        // Se oculta la lista de nombre encontrados.
        $('#lista-nombres').hide();

        $.post('./backend/delegados-miembros_ec.php', { nombreSeleccionado }, (response) => {
            // En caso de que se obtenga un respuesta, se insertan los datos en los diferentes campos.
            try {
                let delegado = JSON.parse(response);
                $('#name').val(delegado.nombre);
                $('#delegadoID').val(delegado.id);
                $('#categoria').val(delegado.categoria);
                $('#sociedad').val(delegado.sociedad);
                $('#iglesia').val(delegado.iglesia);
                $('#domicilio').val(delegado.domicilio);
                $('#tipodelegado').val(delegado.tipodelegado);
                $('#cuota').val(delegado.cuota);
            } catch (e) {
                console.error("Error al parsear respuesta del delegado:", response);
            }
        });
    });

    ///////////////////////////////////////////////////////////
    ////////////// Eventos en el campo #sociedad //////////////
    ///////////////////////////////////////////////////////////

    // Escucha los cambios hechos en el input sociedad.
    $('#sociedad').on('keyup', function () {
        // Si tiene datos el input, entonces...
        if ($('#sociedad').val()) {
            let search = $('#sociedad').val();
            $.ajax({
                url: './backend/delegados-search_sociedades.php?sociedad=' + encodeURIComponent(search),
                data: { search },
                type: 'GET',
                success: function (response) {
                    try {
                        const sociedades = JSON.parse(response);
                        if (sociedades.length > 0) {
                            let nombres = '';
                            sociedades.forEach(sociedad => {
                                // Para cada sociedad obtenida, se hace un template con diferentes datos.
                                // Se pone varios datos para verse en el div, pero solo se envia el dato de la sociedad.
                                nombres += `
                                    <div class="opcion-sociedad" data-sociedad="${sociedad.sociedad}">
                                        <strong>${sociedad.sociedad}</strong><br>
                                        <small>${sociedad.categoria} | ${sociedad.iglesia}</small><br>
                                        <small>${sociedad.domicilio}</small>
                                    </div>
                                `;
                            });
                            $('#lista-sociedades').html(nombres).show();
                        } else {
                            $('#lista-sociedades').hide();
                        }
                    } catch (e) {
                        console.error("Respuesta no es JSON válido:", response);
                        $('#lista-sociedades').hide();
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error AJAX:", error);
                    $('#lista-sociedades').hide();
                }
            });
        } else {
            $('#lista-sociedades').hide();
        }
    });

    // Escucha cuando se hace click en alguna opcion que se genera en el input sociedad.
    $(document).on('click', '.opcion-sociedad', function () {
        let nombresociedad = $(this).data('sociedad');
        $('#sociedad').val(nombresociedad);
        $('#lista-sociedades').hide();
        console.log(nombresociedad);
        $.post('./backend/delegados-sociedades.php', { nombresociedad }, (response) => {
            try {
                let sociedad = JSON.parse(response);
                $('#categoria').val(sociedad.categoria);
                $('#sociedad').val(sociedad.sociedad);
                $('#iglesia').val(sociedad.iglesia);
                $('#domicilio').val(sociedad.domicilio);
            } catch (e) {
                console.error("Error al parsear respuesta del delegado:", e);
                console.log("Respuesta recibida:", response);
            }
        });
    });

    ///////////////////////////////////////////////////////////
    ////////////// Eventos en el campo #search ////////////////
    ///////////////////////////////////////////////////////////

    // Escucha cuando se hacen cambios en el input search.
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
                                descripcion += '<li>CATEGORIA:  '+delegado.categoria+'</li>';
                                descripcion += '<li>SOCIEDAD:  '+delegado.sociedad+'</li>';
                                descripcion += '<li>IGLESIA:  '+delegado.iglesia+'</li>';
                                descripcion += '<li>DOMICILIO:  '+delegado.domicilio+'</li>';
                                descripcion += '<li>TIPO DELEGADO: <strong> '+delegado.tipodelegado+'</strong></li>';
                            
                                template += `
                                    <tr delegadoID="${delegado.id}">
                                        <td>${delegado.id}</td>
                                        <td>${delegado.nombre}</td>
                                        <td><ul>${descripcion}</ul></td>
                                        <td>
                                            <button class="delegado-item btn btn-warning" >
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

    ///////////////////////////////////////////////////////////
    ///////// Eventos en el formulario #delegado-form /////////
    ///////////////////////////////////////////////////////////

    $('#delegado-form').submit(e => {
        e.preventDefault();
        console.log($('#cuota').val());
        let postData = {
            nombre: $('#name').val(),
            id: $('#delegadoID').val(),
            categoria: $('#categoria').val(),
            sociedad: $('#sociedad').val(),
            iglesia: $('#iglesia').val(),
            domicilio: $('#domicilio').val(),
            tipodelegado: $('#tipodelegado').val(),
            cuota: $('#cuota').val()
        };

        // En caso de que la varible edit es false, se agrega como nuevo dato, en caso contrario se edita el delegado.
        const url = edit === false ? './backend/delegados-add.php' : './backend/delegados-edit.php';
        $.post(url, postData, (response) => {
            console.log(response);
            // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
            let respuesta = JSON.parse(response);
            // SE CREA UNA PLANTILLA PARA CREAR INFORMACIÓN DE LA BARRA DE ESTADO
            let template_bar = '';
            template_bar += `
                        <li style="list-style: none;">Estatus: ${respuesta.status}</li>
                        <li style="list-style: none;">Mensaje: ${respuesta.message}</li>
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

    ///////////////////////////////////////////////////////////
    //////////////// Verificacion de Cuotas ///////////////////
    ///////////////////////////////////////////////////////////
    
    $('#categoria').on('change', function(){
        let categoria = $(this).val();
        console.log(categoria);
        if (categoria === "SInfEC" || categoria === "GInfEC" ){
            $('#cuota').val(250);
        }else if (categoria === ""){
            $('#cuota').val(0);
        }
    });

    $('#tipodelegado').on('change', function(){
        let tipodelegado = $(this).val();
        let categoria = $('#categoria').val();
        if ((tipodelegado === "Fraternal" || tipodelegado === "Visita") && 
            (categoria === "SInfEC" || categoria === "GInfEC")) {
            
            $('#cuota').val(250);

        } else if ((tipodelegado === "Oficial") && 
            (categoria === "SInfEC" || categoria === "GInfEC")) {
            
            $('#cuota').val(225);

        }else if (tipodelegado === "Fraternal" || tipodelegado === "Consejeros y Superintendentes") {
            $('#cuota').val(500);

        } else if (tipodelegado === "Oficial") {
            $('#cuota').val(450);

        } else if (tipodelegado === "Visita") {
            $('#cuota').val(500);

        } else {
            $('#cuota').val(0);
        }
    });

    ///////////////////////////////////////////////////////////
    ///////// Eventos en el formulario #delegado-form /////////
    ///////////////////////////////////////////////////////////

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

    ///////////////////////////////////////////////////////////
    //////////// Eventos para editar a un delegado ////////////
    ///////////////////////////////////////////////////////////

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
            
            let input = document.getElementById('name');
            // Damos el enfoque al campo nombre.
            input.focus();

        });
        e.preventDefault();
    });    
});

