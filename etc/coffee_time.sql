-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Des 2020 pada 21.17
-- Versi server: 10.4.13-MariaDB
-- Versi PHP: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee_time`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `category_updated_at` datetime NOT NULL,
  `category_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_created_at`, `category_updated_at`, `category_status`) VALUES
(1, 'Coffee', '2020-12-14 05:34:22', '2020-12-14 05:46:46', 1),
(2, 'Non-Coffee', '2020-12-14 05:34:31', '0000-00-00 00:00:00', 1),
(4, 'Foods', '2020-12-14 10:09:49', '0000-00-00 00:00:00', 1),
(5, 'Add-on', '2020-12-14 10:10:25', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `coupon`
--

CREATE TABLE `coupon` (
  `coupon_id` int(11) NOT NULL,
  `coupon_name` varchar(100) NOT NULL,
  `coupon_image` varchar(50) NOT NULL,
  `coupon_discount` int(11) NOT NULL,
  `minimum_order` int(11) NOT NULL,
  `coupon_description` varchar(255) NOT NULL,
  `coupon_valid` int(11) NOT NULL,
  `coupon_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `coupon_updated_at` datetime NOT NULL,
  `coupon_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `coupon`
--

INSERT INTO `coupon` (`coupon_id`, `coupon_name`, `coupon_image`, `coupon_discount`, `minimum_order`, `coupon_description`, `coupon_valid`, `coupon_created_at`, `coupon_updated_at`, `coupon_status`) VALUES
(1, 'CPN0001', '', 100, 0, 'Deskripsi coupon', 0, '2020-12-14 11:33:41', '0000-00-00 00:00:00', 1),
(3, 'CPN0003', '', 100, 0, 'Hello', 0, '2020-12-29 06:36:11', '2020-12-29 06:33:19', 1),
(4, 'CPN0004', '', 100, 0, 'Hello', 0, '2020-12-29 06:36:20', '2020-12-29 06:33:29', 1),
(5, 'CUST0006', '', 100, 0, 'Cek', 0, '2020-12-30 13:52:56', '2020-12-30 06:52:56', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_invoices` varchar(50) NOT NULL,
  `history_payment_method` varchar(100) NOT NULL,
  `history_status` int(1) NOT NULL,
  `history_subtotal` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `history_created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`history_id`, `history_invoices`, `history_payment_method`, `history_status`, `history_subtotal`, `user_id`, `history_created_at`) VALUES
(1, 'CUST0001', 'Cash', 1, 2000, 1, '0000-00-00 00:00:00'),
(3, 'CUST0003', 'Cash', 1, 50000, 1, '2020-12-29 06:53:16'),
(4, 'CUST0004', 'Cash', 1, 50000, 1, '2020-12-30 00:52:26'),
(5, 'CUST0005', 'Cash', 1, 50000, 1, '2020-12-30 06:35:44'),
(6, 'CUST0005', 'Cash', 1, 50000, 1, '2020-12-30 06:50:58'),
(7, 'CUST0006', 'Cash', 1, 50000, 1, '2020-12-30 08:06:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history_detail`
--

CREATE TABLE `history_detail` (
  `history_detail_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `history_detail_qty` int(11) NOT NULL,
  `size` varchar(100) NOT NULL,
  `history_detail_total` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `history_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history_detail`
--

INSERT INTO `history_detail` (`history_detail_id`, `product_id`, `history_detail_qty`, `size`, `history_detail_total`, `history_id`, `history_created_at`) VALUES
(1, 22, 2, 'Small', 2000, 1, '2020-12-29 13:51:31'),
(2, 2, 2, '', 40000, 3, '2020-12-30 07:52:42'),
(3, 2, 2, 'Large', 40000, 3, '2020-12-30 07:54:47'),
(4, 1, 2, 'Large', 50000, 2, '2020-12-30 07:55:39'),
(5, 1, 2, 'Large', 50000, 2, '2020-12-30 13:35:52'),
(6, 1, 2, 'Large', 50000, 2, '2020-12-30 15:06:20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `orders_id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `orders_qty` int(11) NOT NULL,
  `orders_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_stock` int(11) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_order_delivery` int(11) NOT NULL,
  `product_dine_in` int(11) NOT NULL,
  `product_take_away` int(11) NOT NULL,
  `product_image` varchar(100) NOT NULL,
  `product_created_at` datetime NOT NULL,
  `product_updated_at` datetime NOT NULL,
  `product_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_price`, `product_stock`, `product_description`, `product_order_delivery`, `product_dine_in`, `product_take_away`, `product_image`, `product_created_at`, `product_updated_at`, `product_status`) VALUES
(24, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 16:55:28', '0000-00-00 00:00:00', 1),
(25, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:08', '0000-00-00 00:00:00', 1),
(26, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:09', '0000-00-00 00:00:00', 1),
(27, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:10', '0000-00-00 00:00:00', 1),
(28, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:10', '0000-00-00 00:00:00', 1),
(29, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:11', '0000-00-00 00:00:00', 1),
(30, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:12', '0000-00-00 00:00:00', 1),
(31, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:13', '0000-00-00 00:00:00', 1),
(32, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:13', '0000-00-00 00:00:00', 1),
(33, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:14', '0000-00-00 00:00:00', 1),
(34, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:15', '0000-00-00 00:00:00', 1),
(35, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:15', '0000-00-00 00:00:00', 1),
(36, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:16', '0000-00-00 00:00:00', 1),
(37, 1, 'Orange Juice', 10000, 0, 'Example Description', 0, 1, 1, '', '2020-12-20 17:38:17', '0000-00-00 00:00:00', 1),
(45, 1, 'Coffe Latte', 50000, 0, 'Coffe latte', 1, 1, 1, '2020-12-30T04-26-50.958Z-web.PNG', '2020-12-30 04:26:50', '0000-00-00 00:00:00', 1),
(49, 1, 'Coffe Latte', 50000, 0, 'Coffe latte', 1, 1, 1, '2020-12-30T06-08-46.717Z-web.PNG', '2020-12-30 06:08:46', '0000-00-00 00:00:00', 1),
(50, 1, 'Burung', 50000, 100, 'Coffe latte', 1, 1, 1, '2020-12-30T07-27-45.060Z-wallpaper.jpg', '2020-12-30 07:27:45', '0000-00-00 00:00:00', 1),
(51, 1, 'Burung aja', 50000, 100, 'Coffe latte', 1, 1, 1, '2020-12-30T07-28-32.274Z-wallpaper.jpg', '2020-12-30 07:28:32', '0000-00-00 00:00:00', 1),
(52, 1, 'Burung aja', 50000, 100, 'Coffe latte', 1, 1, 1, '2020-12-30T08-04-56.087Z-wallpaper.jpg', '2020-12-30 08:04:56', '0000-00-00 00:00:00', 1),
(54, 1, 'Burung aja', 50000, 100, 'Coffe latte', 1, 1, 1, '2020-12-30T08-42-48.154Z-wallpaper.jpg', '2020-12-30 08:42:48', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `size`
--

CREATE TABLE `size` (
  `size_id` int(11) NOT NULL,
  `size_type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  `user_image` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `user_gender` varchar(20) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `display_name`, `user_image`, `first_name`, `last_name`, `user_phone`, `delivery_address`, `date_of_birth`, `user_gender`, `user_role`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(2, 'Hasbialwi71@gmail.com', '$2b$10$tZSqxNXuHlM2/qXx9UDtkeOoM1TAgTZKkk63Q5Ed/Gwwv7HJqvPzC', 'Hasbi Alwi Kusmana', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', '', '1999-10-26', 'male', 2, 1, '2020-12-27 18:24:47', '2020-12-27 18:24:47'),
(3, 'Hasbialwi72@gmail.com', '$2b$10$lgl0UDui35JMGnmx6Zp3x.CotoBFnrEv6qv1Tq1yPYKtC6E7MmH6e', 'Hasbi Alwi Kusmana', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', '', '1999-10-26', 'male', 1, 1, '2020-12-27 18:49:28', '2020-12-27 18:49:28'),
(4, 'Hasbialwi73@gmail.com', '$2b$10$jBXebDqBggjZfLt4U9/PYeV16vSXMvUaM347rndI3hIVCCLwAS81e', 'Hasbi Alwi Kusmana', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', '', '1999-10-26', 'male', 1, 1, '2020-12-27 18:56:33', '0000-00-00 00:00:00'),
(5, 'Hasbialwi74@gmail.com', '$2b$10$iowvhNm28lJ9PT4Zg3ASmOb1yfD0ukyx.XX7jQph80aYBVJ.Xx1mS', 'Hasbi Alwi Kusmana', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', 'Ciamis', '1999-10-26', 'male', 2, 0, '2020-12-27 19:19:29', '0000-00-00 00:00:00'),
(6, 'Hasbialwi75@gmail.com', '$2b$10$UxAr0TfAkktC.O.9nO5faODQMMMMKMPMs1DpbKWYrDSq9TUm4qlLy', 'Hasbi Alwi Kusmana', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', 'Ciamis', '1999-10-26', 'male', 2, 0, '2020-12-27 19:36:31', '0000-00-00 00:00:00'),
(7, 'Hasbialwi76@gmail.com', '$2b$10$6L5g01gM0FrZpWtJLhXRp.CDB.1dhhbdJESTQ3FAsjEuoQTr8QyNe', 'Hasbi Alwi Kusmana', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', 'Ciamis', '1999-10-26', 'male', 1, 1, '2020-12-27 19:40:53', '0000-00-00 00:00:00'),
(8, 'mimin@gmail.com', '$2b$10$Kn3QA0md1ysnj0Q4yDYIrO6U1VPkd.M2LDaip4RkYP.0kaLX46vzy', 'mimintamvan', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', 'Ciamis', '1999-10-26', 'male', 1, 1, '2020-12-30 07:10:51', '0000-00-00 00:00:00'),
(9, 'custumer@gmail.com', '$2b$10$K3B10P67g4qxDspFpkd7MuosP43gS4sT.DgdzhzuwCFu/Ii7fZYLq', 'custumersombong', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', 'Ciamis', '1999-10-26', 'male', 1, 1, '2020-12-30 07:11:42', '0000-00-00 00:00:00'),
(10, 'custumer1@gmail.com', '$2b$10$z.WIMX238HgPBt1HPJP/S.2q8682PWDJX2mmsSlMt/p80DndBcxDC', 'custumersombong', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', 'Ciamis', '1999-10-26', 'male', 0, 0, '2020-12-30 07:20:07', '0000-00-00 00:00:00'),
(11, 'custumer2@gmail.com', '$2b$10$uUOhONRaoZzRwa1jRcMRdOTbE4GZaflfJQ2PAuhJzreUcdLX7mBw2', 'custumersombong', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', 'Ciamis', '1999-10-26', 'male', 2, 0, '2020-12-30 07:52:05', '0000-00-00 00:00:00'),
(12, 'custumer3@gmail.com', '$2b$10$rRMPFj56FJwhbpuzIG28QeOhjuL/dfvAy8y6nqBWgoAJJS7rAHJ92', 'custumersombong', 'Hasbi', '', 'Hasbi', 'Alwi', '089684811299', 'Ciamis', '1999-10-26', 'male', 1, 1, '2020-12-30 08:01:38', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indeks untuk tabel `history_detail`
--
ALTER TABLE `history_detail`
  ADD PRIMARY KEY (`history_detail_id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orders_id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `coupon`
--
ALTER TABLE `coupon`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `history_detail`
--
ALTER TABLE `history_detail`
  MODIFY `history_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT untuk tabel `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
