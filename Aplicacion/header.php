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
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>
    <!-- Lógica del Frontend -->
    <script src="app.js"></script>
  </head>
  <body>
     <!-- BARRA DE NAVEGACIÓN  -->
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href=".">Registro Convención</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarContent" aria-controls="navbarContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="listaOriginal.php">Lista de Registro</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="listaActa.php">Lista sin cuota</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="pasedelista.php">Pase de Lista</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Num. Lista, Nombre" aria-label="Search" id="search" name="search">
            <button class="btn btn-success" type="submit" id="boton-buscar">Buscar</button>
          </form>
        </div>
      </div>
    </nav>


   