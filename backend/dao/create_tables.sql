SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE kategori (
  kategori_id int(11) NOT NULL,
  kategori_navn varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE sak (
  sak_id int(11) NOT NULL,
  forfatter varchar(50) DEFAULT NULL,
  overskrift varchar(200) NOT NULL,
  innhold text NOT NULL,
  tidspunkt datetime NOT NULL DEFAULT '2019-11-20 20:15:00',
  bilde text NOT NULL,
  kategori_id int(11) NOT NULL,
  viktighet int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE kommentar (
  kommentar_id int(11) NOT NULL,
  brukernavn varchar(20) NOT NULL,
  kommentar varchar(200) NOT NULL,
  tidspunkt datetime NOT NULL DEFAULT '2019-11-20 20:15:00',
  sak_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE kategori
  ADD PRIMARY KEY (kategori_id);

--
-- Indexes for table sak
--
ALTER TABLE sak
  ADD PRIMARY KEY (sak_id),
  ADD KEY kategori (kategori_id);

ALTER TABLE kommentar
  ADD PRIMARY KEY (kommentar_id),
  ADD KEY sak_id (sak_id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table kategori
--
ALTER TABLE kategori
  MODIFY kategori_id int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table sak
--
ALTER TABLE sak
  MODIFY sak_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE kommentar
  MODIFY kommentar_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE sak
  ADD CONSTRAINT FOREIGN KEY (kategori_id) REFERENCES kategori (kategori_id);

ALTER TABLE kommentar
  ADD CONSTRAINT FOREIGN KEY (sak_id) REFERENCES sak (sak_id);
COMMIT;