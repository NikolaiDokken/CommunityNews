DROP TABLE IF EXISTS sak;
DROP TABLE IF EXISTS kategori;

CREATE TABLE sak
(
  sak_id int(11) NOT NULL,
  forfatter varchar(50) DEFAULT NULL,
  overskrift varchar(200) NOT NULL,
  innhold text NOT NULL,
  tidspunkt datetime NOT NULL DEFAULT '2019-11-20 20:15:00',
  bilde text NOT NULL,
  kategori_id int(11) NOT NULL,
  viktighet int(11) NOT NULL
)

ALTER TABLE sak MODIFY sak_id int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE kategori
(
  kategori_id int(11) NOT NULL,
  kategori_navn varchar
  (30) NOT NULL
);

ALTER TABLE sak ADD PRIMARY KEY(sak_id);

ALTER TABLE kategori ADD PRIMARY KEY(kategori_id);

ALTER TABLE sak ADD CONSTRAINT sak_ibfk_1 FOREIGN KEY(kategori_id) REFERENCES kategori(kategori_id);