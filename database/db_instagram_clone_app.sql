-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2020 at 05:58 AM
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

--
-- Dumping data for table `data_like`
--

INSERT INTO `data_like` (`id_like`, `id_user`, `id_postingan`, `created_at`) VALUES
(102, 8, 66, '2020-04-02T15:46:30.082Z');

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

--
-- Dumping data for table `data_notifikasi`
--

INSERT INTO `data_notifikasi` (`id`, `config_notifikasi`, `id_notifikasi`, `username`, `read_notif`, `created_at`) VALUES
(130, 1, 66, 'ahmadsufyan_', 'false', '2020-04-02T15:46:30.123Z');

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

--
-- Dumping data for table `data_postingan`
--

INSERT INTO `data_postingan` (`id_postingan`, `id_user`, `url_gambar`, `status_postingan`, `location`, `created_at`, `like_count`, `comment_count`) VALUES
(65, 8, '8-postingan-4-April-2020-road_marking_trees_137674_3840x2400.jpg', 'Your time is limited, so don\'t waste it living someone else\'s life', 'Earth', '2020-04-02T15:33:19.926Z', 0, 0),
(66, 11, '11-postingan-4-April-2020-2.jpg', '아린 - Oh My Girl :) ~', 'anywhere', '2020-04-02T15:43:03.180Z', 1, 0);

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
-- Dumping data for table `data_user`
--

INSERT INTO `data_user` (`id_user`, `full_name`, `email`, `username`, `password`, `image`, `following`, `followers`, `bio`, `website`, `location`, `created_at`, `updated_at`) VALUES
(8, 'achmad sufyan', 'sufyan@sharemoment.com', 'ahmadsufyan_', '$2a$12$POhCb7IpcRQWpGdWfqZs.eHk/frfeZIhuFmXz097KhhRVjqC8s5lq', '10-profile-4-March-2020-sufyan_profile.jpg', 0, 0, 'React Developer', 'sharemomentapp.com', 'Jakarta, Indonesia', '2020-03-15T14:00:21.157Z', '2020-04-03T03:30:41.923Z'),
(10, 'user', 'user@user.com', 'user', '$2a$12$wCYjTtSDmhWMcfOwByhjcebZ6.jTXnopwpMfrZIKlPbzfiUG8yDq.', 'blank_profile.png', 0, 0, 'Javascript.js', 'xxxx.com', 'planet jupiter', '2020-03-15T16:12:30.527Z', '2020-03-19T14:34:37.267Z'),
(11, 'Arin 아린', 'arin@user.com', 'arin_', '$2a$12$A8I21dItYgF1zqQx8YUOhepXt3uzRekR8qmPZxHZVgw8w4h/73AZO', '11-profile-1-March-2020-24.jpg', 0, 0, 'Lovely Maknae OMG ~', 'ohmygirl.com', 'Seoul, South Korea', '2020-03-28T18:41:12.254Z', '2020-04-02T15:43:46.756Z'),
(12, 'Yooa', 'yooa@user.com', 'yooa', '$2a$12$KT0oY2fY45Viebpq7/C7GO.KXVgmD6iEmy7eK.Nl5iCWvJWGNyU0m', '12-profile-2-March-2020-yoaaa.jpg', 0, 0, '', '', '', '2020-03-30T17:47:29.277Z', '2020-03-30T17:56:25.102Z'),
(20, 'zahrie', 'zahrie@user.com', 'zahrieA', '$2a$12$GAzAZtDDsJuQxEqvyI6F1.7TyzsBxv19XAiBGG/mXNWsEKZpht2Cu', 'blank_profile.png', 0, 0, '', '', '', '2020-04-01T16:42:38.746Z', '2020-04-01T16:42:38.746Z');

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
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

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
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `data_notifikasi`
--
ALTER TABLE `data_notifikasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `data_postingan`
--
ALTER TABLE `data_postingan`
  MODIFY `id_postingan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `data_user`
--
ALTER TABLE `data_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
