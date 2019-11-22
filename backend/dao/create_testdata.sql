INSERT INTO kategori (
kategori_id,
kategori_navn
) VALUES
(1, 'Sport'),
(2, 'Religion'),
(3, 'Kultur'),
(4, 'Teknologi');

INSERT INTO sak (
sak_id,
forfatter
, overskrift, innhold, tidspunkt, bilde, kategori_id, viktighet) VALUES
(1, 'Nikolai Roede Dokken', 'overskrift1', 'beskrivelse1', '2019-11-11 15:41:33', 'https://vgc.no/drfront3/images/b75095955af58653c5b0aeff959b5ca0.jpg', 3, 1),
(2, 'Nikolai Roede Dokken', 'Køene blir stadig lengre ved oslofjordtunellen', 'Her er det jævelig mye content som du må lese for at du skal skjønne noe som helst av hva denne saken inneholder. Heldigvis er dette en sykt interessant artikkel så det er ikke noe problem å henge med. \n\nKasper Gundersen er fortsatt på jakt etter fremtidige Fru Gundersen.', '2019-11-11 15:45:22', 'https://dbstatic.no/70968195.jpg?imageId=70968195&width=1024&height=615', 1, 1),
(3, 'Nikolai Roede Dokken', 'Etter uttallige forsøk klarte Nikolai endelig å fikse \"Slett sak\" knappen', 'Nikolai kan nå oppdatere saker på localhost:3000', '2019-11-11 14:32:10', 'https://dbstatic.no/71794114.jpg?imageId=71794114&width=1024&height=615', 1, 1),
(4, 'Nikolai Roede Dokken', 'Petter Northug lei av all festingen', 'Siden Northug Jr. la opp ski karrieren har han gjort lite annet enn  ta opp tapte ungdomsår. Nå er han likevel lei av festingen. Mye pulver og alkohol har gjort den nå eldre mannen sliten, og han innrømmer selv at ting ikke har vært lett i det siste.', '2019-11-11 14:34:05', 'https://dbstatic.no/71794913.jpg?imageId=71794913&x=2.4926686217009&y=14.977973568282&cropw=94.281524926686&croph=75.550660792952&width=643&height=344', 1, 1);

INSERT INTO kommentar (kommentar_id, brukernavn, kommentar, tidspunkt, sak_id) VALUES
(1, 'brukernavn1', 'kommentar1', '2019-11-22 19:40:31', 11),
(2, 'Olav Gudrund', 'Ja disse polikerne klarer stadig å imponere...', '2019-11-22 19:46:10', 11),
(6, 'KasperG', 'Nydelig med kø', '2019-11-22 20:47:37', 11),
(7, 'Berit', 'Dette var trist å lese :(', '2019-11-22 22:32:25', 26),
(8, 'DataNerd34', 'Hah dette funket faktisk, takk!', '2019-11-22 22:48:56', 56);