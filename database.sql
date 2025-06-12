-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 12, 2025 at 02:49 PM
-- Server version: 10.11.11-MariaDB-cll-lve-log
-- PHP Version: 8.3.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acegoal1_Pomo`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `allTimeLeaderboard`
-- (See below for the actual view)
--
CREATE TABLE `allTimeLeaderboard` (
`username` varchar(30)
,`fullPomoScore` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `taskID` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `taskContent` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullPomoScore` int(11) DEFAULT 0,
  `partialPomoScore` int(11) DEFAULT 0,
  `oldScore` int(11) DEFAULT 0,
  `secureID` varchar(250) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `weeklyLeaderboard`
-- (See below for the actual view)
--
CREATE TABLE `weeklyLeaderboard` (
`username` varchar(30)
,`scoreDifference` bigint(12)
);

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
  MODIFY `taskID` int(11) NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Structure for view `allTimeLeaderboard`
--
DROP TABLE IF EXISTS `allTimeLeaderboard`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cpses_ac47h480ie`@`localhost` SQL SECURITY DEFINER VIEW `allTimeLeaderboard`  AS SELECT `users`.`username` AS `username`, `users`.`fullPomoScore` AS `fullPomoScore` FROM `users` ORDER BY `users`.`fullPomoScore` DESC LIMIT 0, 5 ;

-- --------------------------------------------------------

--
-- Structure for view `weeklyLeaderboard`
--
DROP TABLE IF EXISTS `weeklyLeaderboard`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cpses_ac47h480ie`@`localhost` SQL SECURITY DEFINER VIEW `weeklyLeaderboard`  AS SELECT `users`.`username` AS `username`, abs(`users`.`fullPomoScore` - `users`.`oldScore`) AS `scoreDifference` FROM `users` ORDER BY abs(`users`.`fullPomoScore` - `users`.`oldScore`) DESC LIMIT 0, 5 ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
