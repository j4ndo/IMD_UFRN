-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 03-Set-2019 às 20:21
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `preserv`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `IdCategoria` int(11) NOT NULL,
  `Descricao` varchar(255) NOT NULL,
  `DataCriacao` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`IdCategoria`, `Descricao`, `DataCriacao`) VALUES
(1, 'Desenvolvimento', '2019-09-03 03:05:45.700000'),
(2, 'INFRA', '2019-10-03 03:07:35.574000'),
(3, 'Manutenção', '2019-09-03 03:05:45.700000');

-- --------------------------------------------------------

--
-- Estrutura da tabela `contrato`
--

CREATE TABLE `contrato` (
  `IdContrato` int(11) NOT NULL,
  `Descricao` varchar(255) NOT NULL,
  `ValorContratado` decimal(65,30) NOT NULL,
  `DataCriacao` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `DataEncerramento` datetime(6) NOT NULL,
  `IdProjeto` int(11) NOT NULL,
  `IdContratante` int(11) NOT NULL,
  `IdContratado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `log`
--

CREATE TABLE `log` (
  `IdLog` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `NomeUsuario` longtext,
  `Acao` varchar(255) NOT NULL,
  `Pagina` varchar(255) NOT NULL,
  `DataCriacao` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `perfil`
--

CREATE TABLE `perfil` (
  `IdPerfil` int(11) NOT NULL,
  `Descricao` varchar(255) NOT NULL,
  `DataCriacao` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto`
--

CREATE TABLE `projeto` (
  `IdProjeto` int(11) NOT NULL,
  `Descricao` varchar(255) NOT NULL,
  `PrazoPrevistoMinimo` int(11) NOT NULL,
  `PrazoPrevistoMaximo` int(11) NOT NULL,
  `ValorPrevisto` decimal(65,30) NOT NULL,
  `DataCriacao` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `IdUnidadeTempo` int(11) NOT NULL,
  `IdCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefa`
--

CREATE TABLE `tarefa` (
  `IdTarefa` int(11) NOT NULL,
  `Descricao` varchar(255) NOT NULL,
  `DataInicio` datetime(6) NOT NULL,
  `DataEncerramento` datetime(6) NOT NULL,
  `DataCriacao` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `PrazoPrevisto` int(11) NOT NULL,
  `IdUnidadeTempo` int(11) NOT NULL,
  `IdProjeto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `unidadetempo`
--

CREATE TABLE `unidadetempo` (
  `IdUnidadeTempo` int(11) NOT NULL,
  `Descricao` varchar(255) NOT NULL,
  `DataCriacao` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `unidadetempo`
--

INSERT INTO `unidadetempo` (`IdUnidadeTempo`, `Descricao`, `DataCriacao`) VALUES
(1, 'Horas', '0001-01-01 00:00:00.000000'),
(2, 'Dias', '0001-01-01 00:00:00.000000'),
(3, 'Meses', '0001-01-01 00:00:00.000000'),
(4, 'Anos', '0001-01-01 00:00:00.000000');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `IdUsuario` int(11) NOT NULL,
  `Login` varchar(16) NOT NULL,
  `Senha` varchar(32) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `DataCriacao` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `IdPerfil` int(11) NOT NULL,
  `Discriminator` longtext NOT NULL,
  `IdContratado` int(11) DEFAULT NULL,
  `IdContratante` int(11) DEFAULT NULL,
  `DataVigencia` datetime(6) DEFAULT NULL,
  `ChaveAcesso` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(95) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20190902132320_MySQLMigration', '2.2.6-servicing-10079');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`IdCategoria`);

--
-- Indexes for table `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`IdContrato`),
  ADD KEY `IX_Contrato_IdContratado` (`IdContratado`),
  ADD KEY `IX_Contrato_IdContratante` (`IdContratante`),
  ADD KEY `IX_Contrato_IdProjeto` (`IdProjeto`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`IdLog`),
  ADD KEY `IX_Log_IdUsuario` (`IdUsuario`);

--
-- Indexes for table `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`IdPerfil`);

--
-- Indexes for table `projeto`
--
ALTER TABLE `projeto`
  ADD PRIMARY KEY (`IdProjeto`),
  ADD KEY `IX_Projeto_IdCategoria` (`IdCategoria`),
  ADD KEY `IX_Projeto_IdUnidadeTempo` (`IdUnidadeTempo`);

--
-- Indexes for table `tarefa`
--
ALTER TABLE `tarefa`
  ADD PRIMARY KEY (`IdTarefa`),
  ADD KEY `IX_Tarefa_IdProjeto` (`IdProjeto`),
  ADD KEY `IX_Tarefa_IdUnidadeTempo` (`IdUnidadeTempo`);

--
-- Indexes for table `unidadetempo`
--
ALTER TABLE `unidadetempo`
  ADD PRIMARY KEY (`IdUnidadeTempo`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD KEY `IX_Usuario_IdPerfil` (`IdPerfil`);

--
-- Indexes for table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `IdCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contrato`
--
ALTER TABLE `contrato`
  MODIFY `IdContrato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `IdLog` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perfil`
--
ALTER TABLE `perfil`
  MODIFY `IdPerfil` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projeto`
--
ALTER TABLE `projeto`
  MODIFY `IdProjeto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tarefa`
--
ALTER TABLE `tarefa`
  MODIFY `IdTarefa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `unidadetempo`
--
ALTER TABLE `unidadetempo`
  MODIFY `IdUnidadeTempo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `FK_Contrato_Projeto_IdProjeto` FOREIGN KEY (`IdProjeto`) REFERENCES `projeto` (`IdProjeto`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Contrato_Usuario_IdContratado` FOREIGN KEY (`IdContratado`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Contrato_Usuario_IdContratante` FOREIGN KEY (`IdContratante`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `FK_Log_Usuario_IdUsuario` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `projeto`
--
ALTER TABLE `projeto`
  ADD CONSTRAINT `FK_Projeto_Categoria_IdCategoria` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Projeto_UnidadeTempo_IdUnidadeTempo` FOREIGN KEY (`IdUnidadeTempo`) REFERENCES `unidadetempo` (`IdUnidadeTempo`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `tarefa`
--
ALTER TABLE `tarefa`
  ADD CONSTRAINT `FK_Tarefa_Projeto_IdProjeto` FOREIGN KEY (`IdProjeto`) REFERENCES `projeto` (`IdProjeto`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Tarefa_UnidadeTempo_IdUnidadeTempo` FOREIGN KEY (`IdUnidadeTempo`) REFERENCES `unidadetempo` (`IdUnidadeTempo`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_Usuario_Perfil_IdPerfil` FOREIGN KEY (`IdPerfil`) REFERENCES `perfil` (`IdPerfil`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
