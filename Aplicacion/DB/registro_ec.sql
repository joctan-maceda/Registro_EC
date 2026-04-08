-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2026 at 06:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registro_ec`
--

-- --------------------------------------------------------

--
-- Table structure for table `asistencia`
--

CREATE TABLE `asistencia` (
  `id_delegado` int(11) NOT NULL,
  `sesion` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delegados`
--

CREATE TABLE `delegados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(70) NOT NULL,
  `sociedad` varchar(150) NOT NULL,
  `iglesia` varchar(150) NOT NULL,
  `domicilio` varchar(200) NOT NULL,
  `tipodelegado` varchar(50) NOT NULL,
  `cuota` varchar(20) NOT NULL,
  `eliminado` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delegados`
--

INSERT INTO `delegados` (`id`, `nombre`, `categoria`, `sociedad`, `iglesia`, `domicilio`, `tipodelegado`, `cuota`, `eliminado`) VALUES
(1, 'Joctan Maceda Hernandez', 'SMEC', '\"Ammhi-shaddai\"', 'CNPC \"Bethesda\"', 'Bosques de San sebastian Puebla, Puebla', 'Oficial', '350', 0),
(2, 'Gerson Maceda Hernandez', 'GMEC', '\"Los Valientes de David\"', 'INPC \"Emmanuel\"', 'Zacualtipan Hidalgo', 'Fraternal', '500', 0);

-- --------------------------------------------------------

--
-- Table structure for table `miembros_ec`
--

CREATE TABLE `miembros_ec` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` varchar(70) NOT NULL,
  `sociedad` varchar(150) NOT NULL,
  `iglesia` varchar(150) NOT NULL,
  `domicilio` varchar(200) NOT NULL,
  `eliminado` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `miembros_ec`
--

INSERT INTO `miembros_ec` (`id`, `nombre`, `categoria`, `sociedad`, `iglesia`, `domicilio`, `eliminado`) VALUES
(1, 'Gerson Maceda Hernandez', 'GMEC', '\"Los Valientes de David\"', 'INPC \"Emmanuel\"', 'Zacualtipan Hidalgo', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sociedades`
--

CREATE TABLE `sociedades` (
  `id` int(11) NOT NULL,
  `sociedad` varchar(100) NOT NULL,
  `Categoria` varchar(100) NOT NULL,
  `iglesia` varchar(70) NOT NULL,
  `domicilio` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sociedades`
--

INSERT INTO `sociedades` (`id`, `sociedad`, `Categoria`, `iglesia`, `domicilio`) VALUES
(1, 'Adalides del Maestro', 'SAEC', 'CNCP \"Dios es amor\"', 'Calle Rafael Moreno Valle');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`id_delegado`);

--
-- Indexes for table `delegados`
--
ALTER TABLE `delegados`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `miembros_ec`
--
ALTER TABLE `miembros_ec`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sociedades`
--
ALTER TABLE `sociedades`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `delegados`
--
ALTER TABLE `delegados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `miembros_ec`
--
ALTER TABLE `miembros_ec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sociedades`
--
ALTER TABLE `sociedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
