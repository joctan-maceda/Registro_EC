<body data-pagina="index">
<?php include 'header.php'; ?>
    <div class="container">
      <div class="row p-4">
        <div class="col-md-5">
          <div class="card" style="top: 1rem; z-index: 1020">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Agregar Delegado</h5>
              </div>
            <div class="card-body">
              <!-- FORMULARIO PARA AGREGAR PRODUCTO -->
              <form id="delegado-form">
                <div class="form-group mb-3">
                  <select id="tipodelegado" name="tipodelegado">
                    <option value="">Selecciona una categoria</option>
                    <option value="Oficial">Oficial</option>
                    <option value="Fraternal">Fraternal</option>
                    <option value="Visita">Visita</option>
                    <option value="Consejeros y Superintendentes">Consejeros y Superintendentes</option>
                    <option value="Representantes de Uniones">Representantes de Uniones</option>
                    <option value="Personal del Presbiterio">Personal del Presbiterio</option>                 
                  </select>
                </div>
                <div class="form-group">
                  <input class="form-control" type="text" id="name" placeholder="Nombre completo" required>
                  <div id="lista-nombres"></div><br>
                  <div id="estado-nombre" style="display: none;"></div>
                </div>
                <div class="form-group mb-3">
                  <select class="delegado-categoria" id="categoria" name="categoria" required>
                    <option class='delegado-categoria' value="">Selecciona una categoria</option>
                    <option class='delegado-categoria' value="SAEC">SAEC</option>
                    <option class='delegado-categoria' value="SJEC">SJEC</option>
                    <option class='delegado-categoria' value="SIEC">SIEC</option>
                    <option class='delegado-categoria' value="SInfEC">SInfEC</option>
                    <option class='delegado-categoria' value="SMEC">SMEC</option> 
                    <option class='delegado-categoria' value="GAEC">GAEC</option>
                    <option class='delegado-categoria' value="GJEC">GJEC</option>
                    <option class='delegado-categoria' value="GIEC">GIEC</option>
                    <option class='delegado-categoria' value="GInfEC">GInfEC</option>
                    <option class='delegado-categoria' value="GMEC">GMEC</option>                  
                  </select>
                </div>
                <div class="form-group">
                  <input class="form-control" type="text" id="sociedad" placeholder="Nombre de la sociedad" >
                  <div id="lista-sociedades"></div><br>
                  <div id="estado-sociedad" style="display: none;"></div>
                </div>
                <div class="form-group mb-2">
                  <input class="form-control" type="text" id="iglesia" placeholder="Tipo y nombre de la Iglesia" >
                  <div id="estado-iglesia" style="display: none;"></div>
                </div>
                <div class="form-group mb-2">
                  <textarea class="form-control" id="domicilio" cols="20" rows="3" placeholder="Domicilio de la Iglesia" ></textarea>
                  <div id="estado-domicilio" style="display: none;"></div>
                </div>
                
                <div class="form-group mb-2">
                  <input class="form-control" type="text" id="cuota" placeholder="Monto" required>
                  <div id="estado-cuota" style="display: none;"></div>
                </div>
                <div class="form-group d-flex">

                  <input type="hidden" id="delegadoID">
                <div class="d-grid">
                  <button class="btn btn-primary" type="submit">
                    Agregar Delegado
                  </button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- TABLA  -->
        <div class="col-md-7">
          <div class="card my-4" id="delegado-result">
            <div class="card-body">
              <!-- RESULTADO -->
              <ul id="container"></ul>
            </div>
          </div>

          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <td>Id</td>
                <td>Nombre</td>
                <td>Descripción</td>
              </tr>
            </thead>
            <tbody id="delegados"></tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
