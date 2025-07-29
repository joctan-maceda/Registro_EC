<body data-pagina="listaActa">
<?php include 'header.php'; ?>

<!-- 1. Elimina el .container si quieres ancho completo -->
<div class="p-4"> <!-- padding de 4 -->
  <div class="card">
    <div class="card-body">

      <!-- 2. Muestra resultados -->
      <div class="card my-4" id="delegado-result">
        <div class="card-body">
          <ul id="container"></ul>
        </div>
      </div>

      <!-- 3. Tabla responsive -->
      <div class="table-responsive">
        <table class="table table-bordered table-sm w-100">
          <thead class="table-dark">
            <tr>
              <th>Num. Lista</th>
              <th>Tipo Delegado</th>
              <th>Nombre</th>
              <th>Descripción</th>
              
            </tr>
          </thead>
          <tbody id="delegados"></tbody>
        </table>
      </div>

    </div>
  </div>
</div>