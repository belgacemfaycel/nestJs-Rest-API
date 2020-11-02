-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 02, 2020 at 11:57 PM
-- Server version: 5.7.31-0ubuntu0.16.04.1
-- PHP Version: 7.1.27-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_nestjs_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `type_of_notification` int(11) NOT NULL,
  `is_unread` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `created_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`sender_id`, `recipient_id`, `type_of_notification`, `is_unread`, `post_id`, `id`, `created_time`) VALUES
(4, 4, 1, 0, 1, 1, '2020-10-28 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `creator_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `created_time` datetime NOT NULL,
  `filename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`creator_id`, `id`, `content`, `title`, `created_time`, `filename`) VALUES
(4, 1, 'a', '3 reasons to visit Tunisia\n', '2020-10-25 13:11:43', 'img-c109.png'),
(4, 3, 'teee', 'Beaches and ancient wonders', '2020-10-26 15:12:12', 'img-c309.png');

-- --------------------------------------------------------

--
-- Table structure for table `push_subscription`
--

CREATE TABLE `push_subscription` (
  `id` int(11) NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `expirationTime` datetime NOT NULL,
  `p256dh` varchar(255) NOT NULL,
  `auth` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `push_subscription`
--

INSERT INTO `push_subscription` (`id`, `endpoint`, `expirationTime`, `p256dh`, `auth`) VALUES
(1, 'https://fcm.googleapis.com/fcm/send/e5IGCjTrdFM:APA91bGQVJ_FM74T6l19HEcx4kwi_5vgyT9a9BADbIkJrQkmOSm-UwFC_4LTXBN7XiTvQZCb1crnSBOc330UyEuHPJsYoahXo1eCGO9dNafwPPq-t-VJBRuD-csGkHVra_3HX_viIZyj', '2020-11-01 23:16:13', 'BMRzJgVm-WXSgDRB0nhZZ9ZmSxufHiXBbQOnPI-wZZM5zIqrttLyWf7s95tKoxPylcCoJqCaovdZl1pq32KBdPc', 'Pr7ej3_bk9c1M73CXKib_g'),
(2, 'https://fcm.googleapis.com/fcm/send/e5IGCjTrdFM:APA91bGQVJ_FM74T6l19HEcx4kwi_5vgyT9a9BADbIkJrQkmOSm-UwFC_4LTXBN7XiTvQZCb1crnSBOc330UyEuHPJsYoahXo1eCGO9dNafwPPq-t-VJBRuD-csGkHVra_3HX_viIZyj', '2020-11-02 21:24:54', 'BMRzJgVm-WXSgDRB0nhZZ9ZmSxufHiXBbQOnPI-wZZM5zIqrttLyWf7s95tKoxPylcCoJqCaovdZl1pq32KBdPc', 'Pr7ej3_bk9c1M73CXKib_g');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `fullName` varchar(25) NOT NULL,
  `birthday` date NOT NULL,
  `isActive` tinyint(4) NOT NULL,
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cookie` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`fullName`, `birthday`, `isActive`, `id`, `email`, `password`, `cookie`) VALUES
('User B', '2020-10-05', 1, 4, 'belg.faycel@gmail.com', '$2b$10$5X7vnpNgMGAvHuTeYxA1ue2MFkiUZZ9TnuDZqBdGz6XwYOUpRGmmC', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `push_subscription`
--
ALTER TABLE `push_subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `push_subscription`
--
ALTER TABLE `push_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
