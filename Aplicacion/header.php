<!DOCTYPE html>
<html lang="es">
  <head>
    <meta lang="es">
    <meta charset="UTF-8">
    <title>ProductApp</title>
    <!-- BOOTSTRAP 4  -->
    <!-- <link rel="stylesheet" href="https://bootswatch.com/4/superhero/bootstrap.min.css"> -->
    <script src="bootstrap-5.3.7-dist/js/bootstrap.bundle.min.js" defer></script>
    <link rel="stylesheet" href="bootstrap-5.3.7-dist/css/bootstrap.min.css">
    <style>
      #lista-nombres {
        border: 1px solid #ccc;
        max-height: 300px;
        overflow-y: auto;
        position: absolute;
        background-color: rgb(14, 13, 13);
        width: 500px;
        z-index: 100;
      }
      #lista-nombres div {
        padding: 5px;
        cursor: pointer;
      }
      #lista-nombres div:hover {
        background-color: #303288;
      }
    </style>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>
    <!-- Lógica del Frontend -->
    <script src="app.js"></script>

     <!-- BARRA DE NAVEGACIÓN  -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href=".">Registro Convención</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="listaOriginal.php">Lista de Registro <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="listaActa.php">Lista sin cuota</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="pasedelista.php">Pase de Lista</a>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
        </li>
        </ul>
    </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto"></ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" name="search" id="search" type="search" placeholder="ID, marca o descripción" aria-label="Search">
            <button class="btn btn-success my-2 my-sm-0" id="boton-buscar" type="submit">Buscar</button>
          </form>
      </div>
    </nav>
  </head>

   