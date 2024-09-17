-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 17, 2024 at 04:16 PM
-- Server version: 8.0.39
-- PHP Version: 8.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aw1443_pomoDB`
--
CREATE DATABASE IF NOT EXISTS `aw1443_pomoDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `aw1443_pomoDB`;

DELIMITER $$
--
-- Procedures
--
$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `allTimeLeaderboard`
-- (See below for the actual view)
--
CREATE TABLE `allTimeLeaderboard` (
`fullPomoScore` int
,`username` varchar(30)
);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `taskID` int NOT NULL,
  `username` varchar(250) NOT NULL,
  `taskContent` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullPomoScore` int DEFAULT '0',
  `partialPomoScore` int DEFAULT '0',
  `oldScore` int DEFAULT '0',
  `secureID` varchar(250) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `weeklyLeaderboard`
-- (See below for the actual view)
--
CREATE TABLE `weeklyLeaderboard` (
`scoreDifference` bigint
,`username` varchar(30)
);

-- --------------------------------------------------------

--
-- Structure for view `allTimeLeaderboard`
--
DROP TABLE IF EXISTS `allTimeLeaderboard`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cpses_awz9broqrr`@`localhost` SQL SECURITY DEFINER VIEW `allTimeLeaderboard`  AS SELECT `users`.`username` AS `username`, `users`.`fullPomoScore` AS `fullPomoScore` FROM `users` ORDER BY `users`.`fullPomoScore` DESC LIMIT 0, 5 ;

-- --------------------------------------------------------

--
-- Structure for view `weeklyLeaderboard`
--
DROP TABLE IF EXISTS `weeklyLeaderboard`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cpses_awz9broqrr`@`localhost` SQL SECURITY DEFINER VIEW `weeklyLeaderboard`  AS SELECT `users`.`username` AS `username`, abs((`users`.`fullPomoScore` - `users`.`oldScore`)) AS `scoreDifference` FROM `users` ORDER BY `scoreDifference` DESC LIMIT 0, 5 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskID` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
