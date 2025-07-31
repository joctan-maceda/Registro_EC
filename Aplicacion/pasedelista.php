<body data-pagina="pasedelista">
<?php include 'header.php'; ?>

<!-- 1. Elimina el .container si quieres ancho completo -->
<div class="p-4"> <!-- padding de 4 -->
  <h3 class="fw-bold text-primary mb-4">Lista de Delegados</h3>
  <div class="card">
    <div class="card-body">
      <h4 class="fw-bold text-primary mb-4">Oficiales</h4>
      <!-- 2. Muestra resultados -->
      <!-- 3. Tabla responsive -->
        <div class="table-responsive">
        <table class="table table-bordered table-sm w-100">
          <thead class="table-dark">
            <tr>
              <th>Num. Lista</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>_</th>
            </tr>
          </thead>
          <tbody id="Oficiales"></tbody>
        </table>
      </div>   
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <h4 class="fw-bold text-primary mb-4">Fraternales</h4>
      <!-- 2. Muestra resultados -->
      <!-- 3. Tabla responsive -->
        <div class="table-responsive">
        <table class="table table-bordered table-sm w-100">
          <thead class="table-dark">
            <tr>
              <th>Num. Lista</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>_</th>
            </tr>
          </thead>
          <tbody id="Fraternales"></tbody>
        </table>
      </div>   
    </div>
</div>

<div class="card">
    <div class="card-body">
      <h4 class="fw-bold text-primary mb-4">Visitas</h4>
      <!-- 2. Muestra resultados -->
      <!-- 3. Tabla responsive -->
        <div class="table-responsive">
        <table class="table table-bordered table-sm w-100">
          <thead class="table-dark">
            <tr>
              <th>Num. Lista</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>_</th>
            </tr>
          </thead>
          <tbody id="Visitas"></tbody>
        </table>
      </div>   
    </div>
</div>

<div class="card">
    <div class="card-body">
      <h4 class="fw-bold text-primary mb-4">Consejeros y Superintendentes</h4>
      <!-- 2. Muestra resultados -->
      <!-- 3. Tabla responsive -->
        <div class="table-responsive">
        <table class="table table-bordered table-sm w-100">
          <thead class="table-dark">
            <tr>
              <th>Num. Lista</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>_</th>
            </tr>
          </thead>
          <tbody id="Consejeros"></tbody>
        </table>
      </div>   
    </div>
</div>

<div class="card">
    <div class="card-body">
      <h4 class="fw-bold text-primary mb-4">Representantes de Uniones</h4>
      <!-- 2. Muestra resultados -->
      <!-- 3. Tabla responsive -->
        <div class="table-responsive">
        <table class="table table-bordered table-sm w-100">
          <thead class="table-dark">
            <tr>
              <th>Num. Lista</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>_</th>
            </tr>
          </thead>
          <tbody id="RepresentantesU"></tbody>
        </table>
      </div>   
    </div>
</div>

<div class="card">
    <div class="card-body">
      <h4 class="fw-bold text-primary mb-4">Personal del R. Presbiterio</h4>
      <!-- 2. Muestra resultados -->      <!-- 3. Tabla responsive -->
        <div class="table-responsive">
        <table class="table table-bordered table-sm w-100">
          <thead class="table-dark">
            <tr>
              <th>Num. Lista</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>_</th>
            </tr>
          </thead>
          <tbody id="PersonalRP"></tbody>
        </table>
      </div>   
    </div>
    <div>
        <table class="table table-bordered table-sm w-100 text-center">
            <thead>
                <tr>
                <th>Oficiales</th>
                <th>Fraternales</th>
                <th>Visitas</th>
                <th>Consejeros y Superintendentes</th>
                <th>Representantes de Uniones</th>
                <th>Personal del R. Presbiterio</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><div id="resumen-Oficiales" class="text-secondary small"></div></td>
                <td><div id="resumen-Fraternales" class="text-secondary small"></div></td>
                <td><div id="resumen-Visitas" class="text-secondary small"></div></td>
                <td><div id="resumen-Consejeros" class="text-secondary small"></div></td>
                <td><div id="resumen-RepresentantesU" class="text-secondary small"></div></td>
                <td><div id="resumen-PersonalRP" class="text-secondary small"></div></td>
                </tr>
            </tbody>
        </table>
    </div>

  </div>
</div>