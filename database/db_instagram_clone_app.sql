-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2020 at 04:13 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_instagram_clone_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `config_notif`
--

CREATE TABLE `config_notif` (
  `config_notifikasi` int(11) NOT NULL,
  `jenis_notifikasi` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `config_notif`
--

INSERT INTO `config_notif` (`config_notifikasi`, `jenis_notifikasi`) VALUES
(1, 'like'),
(2, 'comment'),
(3, 'follow');

-- --------------------------------------------------------

--
-- Table structure for table `data_comment`
--

CREATE TABLE `data_comment` (
  `id_comment` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_postingan` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_followers`
--

CREATE TABLE `data_followers` (
  `id_followers` int(11) NOT NULL,
  `id_target_user` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_following`
--

CREATE TABLE `data_following` (
  `id_following` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_target_user` int(11) NOT NULL,
  `created_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_like`
--

CREATE TABLE `data_like` (
  `id_like` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_postingan` int(11) NOT NULL,
  `created_at` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_notifikasi`
--

CREATE TABLE `data_notifikasi` (
  `id` int(11) NOT NULL,
  `config_notifikasi` int(11) NOT NULL,
  `id_notifikasi` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `read_notif` varchar(16) NOT NULL,
  `created_at` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_postingan`
--

CREATE TABLE `data_postingan` (
  `id_postingan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `url_gambar` varchar(255) NOT NULL,
  `status_postingan` text NOT NULL,
  `location` varchar(50) NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `like_count` int(11) NOT NULL,
  `comment_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_user`
--

CREATE TABLE `data_user` (
  `id_user` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(100) NOT NULL,
  `following` int(11) NOT NULL,
  `followers` int(11) NOT NULL,
  `bio` text NOT NULL,
  `website` varchar(100) NOT NULL,
  `location` varchar(50) NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `updated_at` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `config_notif`
--
ALTER TABLE `config_notif`
  ADD PRIMARY KEY (`config_notifikasi`);

--
-- Indexes for table `data_comment`
--
ALTER TABLE `data_comment`
  ADD PRIMARY KEY (`id_comment`);

--
-- Indexes for table `data_followers`
--
ALTER TABLE `data_followers`
  ADD PRIMARY KEY (`id_followers`);

--
-- Indexes for table `data_following`
--
ALTER TABLE `data_following`
  ADD PRIMARY KEY (`id_following`);

--
-- Indexes for table `data_like`
--
ALTER TABLE `data_like`
  ADD PRIMARY KEY (`id_like`);

--
-- Indexes for table `data_notifikasi`
--
ALTER TABLE `data_notifikasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_postingan`
--
ALTER TABLE `data_postingan`
  ADD PRIMARY KEY (`id_postingan`);

--
-- Indexes for table `data_user`
--
ALTER TABLE `data_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `config_notif`
--
ALTER TABLE `config_notif`
  MODIFY `config_notifikasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `data_comment`
--
ALTER TABLE `data_comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `data_followers`
--
ALTER TABLE `data_followers`
  MODIFY `id_followers` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_following`
--
ALTER TABLE `data_following`
  MODIFY `id_following` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `data_like`
--
ALTER TABLE `data_like`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `data_notifikasi`
--
ALTER TABLE `data_notifikasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `data_postingan`
--
ALTER TABLE `data_postingan`
  MODIFY `id_postingan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `data_user`
--
ALTER TABLE `data_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
