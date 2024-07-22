-- Insertion des utilisateurs
INSERT INTO `Users` (`userId`, `userEmail`, `userName`, `userPassword`, `userRole`) VALUES
('095e7eef-b25e-427e-9c4e-7c603bb76487', 'paul@zoo-arcadia.com', 'Paul', '$2b$10$NFo2YBcgotmm0JPX2YWsT.qrNS26zYEfu2D5pk1HDDYCHGyXLwtSe', 'ROLE_EMPLOYEE'),
('15ee5d2b-c0b7-4c40-8534-4e20ee8b144a', 'henri@zoo-arcadia.com', 'Henri', '$2b$10$P33QAsOnTa2k9Jc4hFbyTO3mBfbsEcv.f3/wjdbdZ2otftbmEk9qm', 'ROLE_VETERINARY'),
('321d9219-3dcd-4cc3-9431-c52981ad7452', 'carine@zoo-arcadia.com', 'Carine', '$2b$10$lWMW8KHYnlVOGhV5nvKMr.LvtzGXw4PDQAGcYzYIAxF6Q0de/WLuK', 'ROLE_EMPLOYEE'),
('b8464391-b7e8-4534-aa7b-fc30f1875cc5', 'frank@zoo-arcadia.com', 'Frank', '$2b$10$GplW5cQjj3NfiXqBbe6//uWrHJWysaMtx2M73mL8Kk9kTvv5hNXJa', 'ROLE_VETERINARY');


  -- Initial schedules
UPDATE `Schedules` SET `openAm` = '09:30:00', `closeAm` = NULL, `openPm` = NULL, `closePm` = '18:00:00' WHERE `dayId` = 1;
UPDATE `Schedules` SET `openAm` = '09:30:00', `closeAm` = NULL, `openPm` = NULL, `closePm` = '18:00:00' WHERE `dayId` = 2;
UPDATE `Schedules` SET `openAm` = '09:30:00', `closeAm` = NULL, `openPm` = NULL, `closePm` = '19:30:00' WHERE `dayId` = 3;
UPDATE `Schedules` SET `openAm` = '09:30:00', `closeAm` = NULL, `openPm` = NULL, `closePm` = '18:00:00' WHERE `dayId` = 4;
UPDATE `Schedules` SET `openAm` = '09:30:00', `closeAm` = NULL, `openPm` = NULL, `closePm` = '18:00:00' WHERE `dayId` = 5;
UPDATE `Schedules` SET `openAm` = '09:30:00', `closeAm` = NULL, `openPm` = NULL, `closePm` = '19:30:00' WHERE `dayId` = 6;
UPDATE `Schedules` SET `openAm` = NULL, `closeAm` = NULL, `openPm` = NULL, `closePm` = NULL WHERE `dayId` = 7;


  -- Initial biomes
INSERT INTO `Biomes` (`biomeId`, `biomeName`, `biomeShortDescr`, `biomeLongDescr`, `biomeStatus`) VALUES
(1, 'Savane', 'Une vaste plaine herbeuse avec des arbres dispersés', 'La savane est un biome ouvert caractérisé par des herbes hautes et des arbres clairsemés. Elle est principalement située dans les régions tropicales et subtropicales où la saison des pluies est suivie par une longue saison sèche. Ce biome soutient une grande diversité d\'herbivores, ce qui, à son tour, attire de nombreux prédateurs.', NULL),
(2, 'Jungle', 'Une forêt tropicale dense et riche en vie', 'La jungle, caractérisée par sa densité végétale élevée, est un habitat crucial pour des milliers d\'espèces animales et végétales. Avec une canopée épaisse et un sous-bois riche, elle est essentielle pour la régulation du climat mondial et le stockage du carbone. La diversité biologique dans les jungles est parmi les plus élevées sur Terre.', NULL),
(3, 'Marais', 'Un habitat humide riche en biodiversité', 'Les marais sont des écosystèmes humides où l\'eau est présente en grande quantité toute l\'année. Ils abritent une variété d\'espèces de plantes aquatiques et terrestres ainsi que de nombreux animaux, des oiseaux aux reptiles. Ces zones jouent un rôle crucial dans la régulation des cycles de l\'eau et sont des sites importants pour la biodiversité.', NULL);

-- Initial services
INSERT INTO `Services` (`serviceId`, `serviceName`, `serviceShortDescr`, `serviceLongDescr`) VALUES
(1, 'Zoo Gourmet', 'Restauration diversifiée au cœur du zoo', 'Zoo Gourmet offre une expérience culinaire unique pour nos visiteurs avec une sélection de plats inspirés de la cuisine du monde entier. Situé au centre du zoo, notre service comprend des options végétariennes, des grillades, des rafraîchissements et des plats adaptés aux enfants. Profitez d\'un repas tranquille tout en observant la beauté de la nature et la diversité des animaux du zoo.'),
(2, 'Visite guidée', 'Visite guidée gratuite du zoo', 'Profitez d\'une expérience enrichissante avec nos visites guidées gratuites, disponibles tous les jours. Nos guides experts vous emmèneront à travers divers habitats du zoo, vous fourniront des informations détaillées sur les espèces que nous hébergeons et les efforts de conservation en cours. C\'est une opportunité parfaite pour les familles, les étudiants et les passionnés de nature d\'apprendre tout en explorant le zoo de manière interactive et éducative.'),
(3, 'Zoo Express Train', 'Circuit en petit train à travers le zoo', 'Découvrez le Zoo Express Train, notre service de petit train qui offre une visite panoramique du zoo. Parfait pour les familles et les visiteurs qui souhaitent découvrir les différentes zones du zoo sans se fatiguer. Le train passe par tous les principaux habitats et points d\'intérêt, permettant aux visiteurs de voir les animaux de près tout en apprenant sur eux grâce à un commentaire audio disponible en plusieurs langues.');


-- Insertion des espèces de la Savane
INSERT INTO `Species` (`specieId`, `specieName`, `specieTaxon`, `specieDescr`, `biomeKey`) VALUES
(1, 'Girafe', 'Giraffa camelopardalis', 'La girafe, reconnue pour son cou exceptionnellement long et ses taches uniques, est la plus haute des créatures terrestres. Ces gracieux herbivores se nourrissent principalement des feuilles d\'arbres hauts, une adaptation évolutive à leur habitat de savane africaine.', 1),
(2, 'Zèbre', 'Equus quagga', 'Les zèbres sont célèbres pour leurs rayures distinctives noires et blanches, chaque individu ayant un motif unique comme les empreintes digitales chez l\'humain. Ils sont très sociaux et parcourent la savane en grands troupeaux.', 1),
(3, 'Gnou', 'Connochaetes taurinus', 'Les gnous, ou antilopes à barbe, sont connus pour leur migration spectaculaire en masse à travers les plaines africaines. Ces herbivores robustes jouent un rôle clé dans l\'écosystème en tant que proies pour de nombreux prédateurs.', 1),
(4, 'Antilope Cobe de Lechwe','Kobus leche', 'Les Cobe de Lechwe sont des antilopes adaptées aux zones humides, avec des sabots larges parfaits pour la boue et l\'eau. Leur pelage huileux repousse l\'eau, et ils sont souvent vus en train de patauger dans l\'eau pour échapper aux prédateurs.', 1);

-- Insertion des espèces de la Jungle
INSERT INTO `Species` (`specieId`, `specieName`, `specieTaxon`, `specieDescr`, `biomeKey`) VALUES
(5, 'Singe Araignée', 'Ateles geoffroyi', 'Le singe araignée se distingue par sa grande agilité dans les arbres de la jungle, utilisant sa longue queue préhensile comme cinquième membre pour se balancer entre les branches. Ces primates sociaux forment des groupes complexes et communicatifs.', 2),
(6, 'Perroquet Ara', 'Ara macao', 'Les perroquets Ara sont réputés pour leur plumage brillant et coloré et leur intelligence remarquable. Ils sont capables d\'imiter les sons et les voix humaines, faisant d\'eux des favoris parmi les visiteurs de zoos.', 2),
(7, 'Tigre', 'Panthera tigris', 'Le tigre, le plus grand des félins, captive les visiteurs par son allure majestueuse et ses rayures emblématiques. Chasseur solitaire par nature, le tigre est un prédateur topique dans son habitat forestier.', 2),
(8, 'Paresseux', 'Bradypus variegatus', 'Les paresseux passent la majorité de leur vie suspendus aux arbres de la jungle, se déplaçant lentement pour conserver de l\'énergie. Leur métabolisme extrêmement lent est fascinant, adapté à leur régime alimentaire faible en calories.', 2);

-- Insertion des espèces des Marais
INSERT INTO `Species` (`specieId`, `specieName`, `specieTaxon`, `specieDescr`, `biomeKey`) VALUES
(9, 'Crocodile du Nil', 'Crocodylus niloticus', 'Les crocodiles du Nil sont parmi les plus grands crocodiles au monde, avec une impressionnante capacité d\'adaptation à divers habitats aquatiques. Redoutés comme prédateurs, ils jouent un rôle crucial dans la régulation des populations d\'autres espèces.', 3),
(10, 'Loutre de rivière', 'Lontra canadensis', 'Les loutres de rivière, agiles et joueuses, sont un plaisir à observer, surtout lorsqu\'elles manipulent des objets ou jouent entre elles. Leur forte socialisation contribue à renforcer les liens familiaux et groupaux.', 3),
(11, 'Héron cendré', 'Ardea cinerea', 'Le héron cendré est admiré pour sa stature élancée et sa technique de pêche patiente et précise. Ces grands échassiers sont souvent vus immobiles dans l\'eau, attendant de harponner un poisson avec leur long bec pointu.', 3);


INSERT INTO `Animals` (`animalId`, `animalName`, `animalDescr`, `animalBirth`, `animalGender`, `biomeKey`, `specieKey`) VALUES
-- Girafes
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Giselle', 'Girafe adulte reconnue pour son long cou et son pelage tacheté.', '2015-03-12 00:00:00', 'Femelle', 1, 1),
('f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3', 'Gilbert', 'Girafe mâle adulte, se distingue par sa taille imposante et son cou long.', '2013-06-25 00:00:00', 'Mâle', 1, 1),
('e2e24dc4-6578-40b3-bde8-1ad376b3a8f8', 'Gina', 'Jeune girafe curieuse et énergique avec un pelage tacheté distinctif.', '2021-08-04 00:00:00', 'Femelle', 1, 1),

-- Zèbres
('a3e1b3e4-4449-47a1-8434-0b97d8a8b755', 'Zara', 'Zèbre femelle adulte avec des rayures uniques et un tempérament social.', '2014-02-16 00:00:00', 'Femelle', 1, 2),
('4b837d26-19e8-45a8-b144-9072dd7b9f33', 'Zack', 'Zèbre mâle adulte connu pour ses rayures distinctes et son comportement protecteur.', '2012-11-19 00:00:00', 'Mâle', 1, 2),
('d6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f', 'Zoe', 'Jeune zèbre joueur avec des rayures noires et blanches marquées.', '2022-05-30 00:00:00', 'Femelle', 1, 2),

-- Gnous
('f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6', 'Gary', 'Gnou mâle adulte, robuste et vigilant, souvent en tête des troupeaux migrateurs.', '2014-07-23 00:00:00', 'Mâle', 1, 3),
('b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f', 'Grace', 'Gnou femelle adulte, reconnue pour sa nature protectrice envers les jeunes.', '2015-09-05 00:00:00', 'Femelle', 1, 3),
('e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9', 'Gavin', 'Jeune gnou curieux et énergique, toujours proche de sa mère.', '2022-03-14 00:00:00', 'Mâle', 1, 3),
('97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8', 'Gemma', 'Jeune gnou espiègle et agile, aimant jouer avec les autres jeunes du troupeau.', '2022-04-18 00:00:00', 'Femelle', 1, 3),

-- Antilopes Cobe de Lechwe
('85d0f75b-c55a-4d4c-809e-13a2b8f55de2', 'Andy', 'Antilope mâle adulte adaptée aux zones humides, agile et rapide dans l\'eau.', '2013-05-11 00:00:00', 'Mâle', 1, 4),
('e94f41e9-4e4b-4211-9ab6-70543fef99e4', 'Anna', 'Antilope femelle adulte, gracieuse et souvent observée près des cours d\'eau.', '2015-11-09 00:00:00', 'Femelle', 1, 4),
('64bc243b-2b13-4a56-96f1-37780b564d48', 'Aaron', 'Jeune antilope, curieux et joueur, souvent vu près des marécages.', '2021-06-15 00:00:00', 'Mâle', 1, 4),

-- Singes Araignées
('8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1', 'Simba', 'Singe araignée mâle adulte, agile et social, vit en groupes complexes.', '2013-02-20 00:00:00', 'Mâle', 2, 5),
('c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4', 'Sia', 'Singe araignée femelle adulte, connue pour sa grande agilité et sa nature sociale.', '2014-10-12 00:00:00', 'Femelle', 2, 5),
('9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85', 'Sammy', 'Jeune singe araignée, curieux et joueur, toujours en train d\'explorer.', '2021-09-22 00:00:00', 'Mâle', 2, 5),
('bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb', 'Sophie', 'Jeune singe araignée, espiègle et énergique, aime grimper aux arbres.', '2022-01-10 00:00:00', 'Femelle', 2, 5),

-- Perroquets Ara
('d7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85', 'Pablo', 'Perroquet Ara mâle, connu pour son plumage vibrant et ses vocalisations.', '2015-08-16 00:00:00', 'Mâle', 2, 6),
('f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d', 'Penelope', 'Perroquet Ara femelle, avec un plumage coloré et une personnalité vive.', '2016-04-30 00:00:00', 'Femelle', 2, 6),

-- Tigres
('b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b', 'Tara', 'Tigre femelle adulte, imposante et majestueuse, un prédateur apex.', '2014-03-17 00:00:00', 'Femelle', 2, 7),
('c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b', 'Tim', 'Jeune tigre mâle, curieux et explorateur, avec un pelage rayé distinctif.', '2021-12-25 00:00:00', 'Mâle', 2, 7),

-- Paresseux
('b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f', 'Peter', 'Paresseux mâle, passe la majorité de son temps suspendu aux arbres.', '2012-07-29 00:00:00', 'Mâle', 2, 8),

-- Crocodiles du Nil
('f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a', 'Caesar', 'Crocodile du Nil mâle adulte, imposant et redoutable dans l\'eau.', '2010-06-21 00:00:00', 'Mâle', 3, 9),
('d3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f', 'Cleo', 'Crocodile du Nil femelle adulte, agile et discrète.', '2011-09-11 00:00:00', 'Femelle', 3, 9),
('e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f', 'Cyrus', 'Jeune crocodile du Nil, curieux et rapide dans l\'eau.', '2022-02-18 00:00:00', 'Mâle', 3, 9),
('b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d', 'Celia', 'Jeune crocodile du Nil, active et toujours proche de l\'eau.', '2022-03-27 00:00:00', 'Femelle', 3, 9),

-- Loutres de rivière
('e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d', 'Oliver', 'Loutre de rivière mâle adulte, agile et joueuse.', '2014-07-14 00:00:00', 'Mâle', 3, 10),
('c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d', 'Olivia', 'Loutre de rivière femelle adulte, sociable et active.', '2015-05-06 00:00:00', 'Femelle', 3, 10),
('d8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e', 'Ollie', 'Jeune loutre de rivière, espiègle et curieuse.', '2021-10-20 00:00:00', 'Mâle', 3, 10),
('e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c', 'Opal', 'Jeune loutre de rivière, toujours en mouvement et explorant son environnement.', '2022-01-13 00:00:00', 'Femelle', 3, 10),

-- Hérons cendrés
('c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e', 'Henry', 'Héron cendré mâle, admiré pour sa stature élancée et sa capacité à harponner des poissons.', '2013-11-08 00:00:00', 'Mâle', 3, 11),
('d1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f', 'Harriet', 'Héron cendré femelle, élégante et souvent vue près de l\'eau.', '2014-02-19 00:00:00', 'Femelle', 3, 11);

-- Insertion des images
INSERT INTO `Images` (`imageId`, `imagePath`, `imageDescription`, `referenceId`, `referenceType`) VALUES
('049412086b9a4fc7928e43e93cb013e9', 'http://localhost:9000/arcadia-zoo/049412086b9a4fc7928e43e93cb013e9.png', 'Image de l\'animal', '97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8', 'Animal'),
('078ba54d01094082954ceb69aef176fb', 'http://localhost:9000/arcadia-zoo/078ba54d01094082954ceb69aef176fb.png', 'Image de l\'animal', 'e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d', 'Animal'),
('09afcec6d2064f69a6948f9612e5799e', 'http://localhost:9000/arcadia-zoo/09afcec6d2064f69a6948f9612e5799e.png', 'Image de l\'animal', 'd6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f', 'Animal'),
('0c76a5d513334398ba47d0bb06ea32b0', 'http://localhost:9000/arcadia-zoo/0c76a5d513334398ba47d0bb06ea32b0.png', 'Image de l\'animal', 'b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d', 'Animal'),
('18a7e1cd60084e58a526e2bef1b0d8e9', 'http://localhost:9000/arcadia-zoo/18a7e1cd60084e58a526e2bef1b0d8e9.png', 'Image d\'illustration du service', '3', 'Service'),
('1d4d0922510141e9afbb1a357688d0c9', 'http://localhost:9000/arcadia-zoo/1d4d0922510141e9afbb1a357688d0c9.png', 'Image de l\'animal', 'a3e1b3e4-4449-47a1-8434-0b97d8a8b755', 'Animal'),
('1f1a9d3b49144a7caa9847d186dab0c9', 'http://localhost:9000/arcadia-zoo/1f1a9d3b49144a7caa9847d186dab0c9.png', 'Image d\'illustration du service', '2', 'Service'),
('281be55312ea46f0a45c9c8bed1e1579', 'http://localhost:9000/arcadia-zoo/281be55312ea46f0a45c9c8bed1e1579.png', 'Image de l\'animal', 'b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f', 'Animal'),
('38203440333549bfa3eeee7e41464999', 'http://localhost:9000/arcadia-zoo/38203440333549bfa3eeee7e41464999.png', 'Image de l\'animal', 'd7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85', 'Animal'),
('3b0c581301e142cfa9f32dde960b5dac', 'http://localhost:9000/arcadia-zoo/3b0c581301e142cfa9f32dde960b5dac.png', 'Image de l\'animal', 'f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a', 'Animal'),
('45c06c897aa64e2c94483229164d1c16', 'http://localhost:9000/arcadia-zoo/45c06c897aa64e2c94483229164d1c16.png', 'Image de l\'animal', 'bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb', 'Animal'),
('4aa53b99d5b6475ebff5b255031e7acc', 'http://localhost:9000/arcadia-zoo/4aa53b99d5b6475ebff5b255031e7acc.png', 'Image de l\'animal', 'e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c', 'Animal'),
('5b8b0d55b9214ca886025b05c6c5568d', 'http://localhost:9000/arcadia-zoo/5b8b0d55b9214ca886025b05c6c5568d.png', 'Image de l\'animal', 'c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4', 'Animal'),
('5d1dd4f48ed343ca8898eb0d4d8f362c', 'http://localhost:9000/arcadia-zoo/5d1dd4f48ed343ca8898eb0d4d8f362c.png', 'Image de l\'animal', '4b837d26-19e8-45a8-b144-9072dd7b9f33', 'Animal'),
('640ed38e670143b2a45376af04e81185', 'http://localhost:9000/arcadia-zoo/640ed38e670143b2a45376af04e81185.png', 'Image de l\'animal', 'b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f', 'Animal'),
('652ebf17a57f4b8da3d47c3afda4f4c6', 'http://localhost:9000/arcadia-zoo/652ebf17a57f4b8da3d47c3afda4f4c6.png', 'Image de l\'animal', '64bc243b-2b13-4a56-96f1-37780b564d48', 'Animal'),
('6547d99cc89e4f088a5a3e6036a88868', 'http://localhost:9000/arcadia-zoo/6547d99cc89e4f088a5a3e6036a88868.png', 'Image de l\'animal', 'f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6', 'Animal'),
('661a289d1620420fb4c22a787df2e0b1', 'http://localhost:9000/arcadia-zoo/661a289d1620420fb4c22a787df2e0b1.png', 'Image de l\'habitat', '3', 'Biome'),
('6a52d02d526e4f8b9bc4c70a63449c0c', 'http://localhost:9000/arcadia-zoo/6a52d02d526e4f8b9bc4c70a63449c0c.png', 'Image de l\'habitat', '1', 'Biome'),
('6f4a359a04cc46df97b63bb1367252e4', 'http://localhost:9000/arcadia-zoo/6f4a359a04cc46df97b63bb1367252e4.png', 'Image de l\'animal', 'd8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e', 'Animal'),
('75d8f316ff6046adb77dfb92db19be9f', 'http://localhost:9000/arcadia-zoo/75d8f316ff6046adb77dfb92db19be9f.png', 'Image de l\'animal', 'e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f', 'Animal'),
('7db00ff15dfe4fd8ac67b8011a1b8348', 'http://localhost:9000/arcadia-zoo/7db00ff15dfe4fd8ac67b8011a1b8348.png', 'Image de l\'animal', 'e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9', 'Animal'),
('983be54ea4854b47a605a60e5f8a9b1b', 'http://localhost:9000/arcadia-zoo/983be54ea4854b47a605a60e5f8a9b1b.png', 'Image de l\'animal', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Animal'),
('9d33d3318b1d4e31b29840332eedcb8c', 'http://localhost:9000/arcadia-zoo/9d33d3318b1d4e31b29840332eedcb8c.png', 'Image d\'illustration du service', '1', 'Service'),
('9d4263fa1a0240cfbf13924648ad7cd5', 'http://localhost:9000/arcadia-zoo/9d4263fa1a0240cfbf13924648ad7cd5.png', 'Image de l\'animal', 'f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3', 'Animal'),
('9dcf8d80ab904f3f9a5595f11879c959', 'http://localhost:9000/arcadia-zoo/9dcf8d80ab904f3f9a5595f11879c959.png', 'Image de l\'animal', 'c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d', 'Animal'),
('9e273448f4184692a6fa0f186331b591', 'http://localhost:9000/arcadia-zoo/9e273448f4184692a6fa0f186331b591.png', 'Image de l\'animal', 'b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b', 'Animal'),
('bb4288b225164c38bcc3afc0d903b430', 'http://localhost:9000/arcadia-zoo/bb4288b225164c38bcc3afc0d903b430.png', 'Image de l\'animal', 'd1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f', 'Animal'),
('bed522b316504ffa9d8661a06131d2ac', 'http://localhost:9000/arcadia-zoo/bed522b316504ffa9d8661a06131d2ac.png', 'Image de l\'animal', '9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85', 'Animal'),
('bf8dc310219a4497acf9046155a29a1a', 'http://localhost:9000/arcadia-zoo/bf8dc310219a4497acf9046155a29a1a.png', 'Image de l\'animal', 'e2e24dc4-6578-40b3-bde8-1ad376b3a8f8', 'Animal'),
('c6e82a5c1b3442a48dfd611f4ab6fb10', 'http://localhost:9000/arcadia-zoo/c6e82a5c1b3442a48dfd611f4ab6fb10.png', 'Image de l\'animal', 'd3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f', 'Animal'),
('cbe237e47b494ed69b424dff2a3f9963', 'http://localhost:9000/arcadia-zoo/cbe237e47b494ed69b424dff2a3f9963.png', 'Image de l\'animal', 'c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e', 'Animal'),
('ce09b585c2ee4a51b040153470a880f5', 'http://localhost:9000/arcadia-zoo/ce09b585c2ee4a51b040153470a880f5.png', 'Image de l\'animal', 'f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d', 'Animal'),
('d200c4b2ae604398a9ea0b0987bb9a20', 'http://localhost:9000/arcadia-zoo/d200c4b2ae604398a9ea0b0987bb9a20.png', 'Image de l\'habitat', '2', 'Biome'),
('d4cb5dc0b8354e548b90e200ac0cd175', 'http://localhost:9000/arcadia-zoo/d4cb5dc0b8354e548b90e200ac0cd175.png', 'Image de l\'animal', 'e94f41e9-4e4b-4211-9ab6-70543fef99e4', 'Animal'),
('d6d145b05e5646c5a97af224229b1544', 'http://localhost:9000/arcadia-zoo/d6d145b05e5646c5a97af224229b1544.png', 'Image de l\'animal', '85d0f75b-c55a-4d4c-809e-13a2b8f55de2', 'Animal'),
('e631ddaf24934647ae0846ef1b85f54f', 'http://localhost:9000/arcadia-zoo/e631ddaf24934647ae0846ef1b85f54f.png', 'Image de l\'animal', 'c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b', 'Animal'),
('ebbeae709f764ccebbad7a6bb407c55d', 'http://localhost:9000/arcadia-zoo/ebbeae709f764ccebbad7a6bb407c55d.png', 'Image de l\'animal', '8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1', 'Animal');


-- Insertion des commentaires
INSERT INTO `Reviews` (`reviewAlias`, `reviewContent`, `reviewRating`, `reviewPostedOn`, `reviewApproved`, `reviewApprovedBy`) VALUES
('JeanDupont', 'Le Zoo Arcadia est incroyable ! La savane est tellement réaliste, on se croirait en Afrique.', 5, '2024-05-20 14:32:00', 0, NULL),
('MarieL', 'J\'ai adoré la visite guidée. Les guides sont très informés et passionnés.', 5, '2024-05-18 09:45:00', 0, NULL),
('PierreD', 'Le Zoo Gourmet offre une cuisine délicieuse, mais un peu chère.', 4, '2024-05-15 17:20:00', 0, NULL),
('ClaraB', 'Les habitats sont bien entretenus, mais certains animaux étaient difficiles à voir.', 3, '2024-05-10 11:10:00', 0, NULL),
('LucasM', 'Le Zoo Express Train est parfait pour voir tout le zoo sans se fatiguer.', 5, '2024-05-08 20:55:00', 0, NULL),
('SophieR', 'Déçue par le marais, je m\'attendais à voir plus d\'animaux.', 2, '2024-05-05 15:05:00', 0, NULL),
('AntoineC', 'Mes enfants ont adoré les singes araignées. Super expérience familiale.', 5, '2024-04-30 13:30:00', 0, NULL),
('EmmaT', 'Les crocodiles du Nil étaient impressionnants. On apprend beaucoup de choses.', 4, '2024-04-25 18:45:00', 0, NULL),
('NathalieG', 'Belle journée au zoo, mais il manque des endroits pour se reposer à l\'ombre.', 3, '2024-04-20 10:05:00', 0, NULL),
('PaulH', 'Les perroquets Ara sont magnifiques, surtout lors des spectacles.', 5, '2024-04-15 16:25:00', 0, NULL),
('AliceF', 'Les girafes sont majestueuses. Super expérience pour les enfants.', 5, '2024-05-22 12:30:00', 1, '321d9219-3dcd-4cc3-9431-c52981ad7452'),
('BrunoG', 'La visite en train est agréable, mais un peu courte.', 4, '2024-05-21 11:50:00', 1, '321d9219-3dcd-4cc3-9431-c52981ad7452'),
('CelineH', 'Le marais est fascinant, surtout les crocodiles.', 5, '2024-05-19 14:00:00', 1, '095e7eef-b25e-427e-9c4e-7c603bb76487'),
('DavidK', 'Les zèbres et les gnous étaient très actifs. Moment agréable.', 4, '2024-05-17 10:30:00', 1, '095e7eef-b25e-427e-9c4e-7c603bb76487'),
('EliseL', 'Bonne ambiance générale, mais il manque des toilettes.', 3, '2024-05-16 16:00:00', 1, '095e7eef-b25e-427e-9c4e-7c603bb76487');

INSERT INTO `Reports` (`reportState`, `reportDate`, `reportDetails`, `reportFoodType`, `reportFoodAmount`, `animalKey`, `veterinaryKey`) VALUES
-- Rapports pour les Girafes
('En bonne santé', '2024-05-01 10:00:00', 'Aucun signe de maladie.', 'Feuilles', '5 kg', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Fatiguée', '2024-04-20 14:00:00', 'Légère fatigue observée.', 'Herbes', '4 kg', 'd290f1ee-6c54-4b01-90e6-d701748f0851', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-03-15 11:00:00', 'Très active et joueuse.', 'Fruits', '3 kg', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('En bonne santé', '2024-05-02 10:30:00', 'Pas de problème de santé.', 'Feuilles', '6 kg', 'f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère boiterie', '2024-04-15 15:00:00', 'Boiterie légère observée.', 'Herbes', '5 kg', 'f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('En forme', '2024-03-10 09:00:00', 'Très en forme.', 'Fruits', '4 kg', 'f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('Energique', '2024-05-05 11:30:00', 'Très énergique et joueuse.', 'Feuilles', '4 kg', 'e2e24dc4-6578-40b3-bde8-1ad376b3a8f8', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Légère toux', '2024-04-18 14:30:00', 'Petite toux observée.', 'Herbes', '3 kg', 'e2e24dc4-6578-40b3-bde8-1ad376b3a8f8', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Bonne condition', '2024-03-12 10:45:00', 'En bonne condition générale.', 'Fruits', '3.5 kg', 'e2e24dc4-6578-40b3-bde8-1ad376b3a8f8', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

-- Rapports pour les Zèbres
('En bonne santé', '2024-05-03 09:00:00', 'Aucun problème détecté.', 'Herbes', '4 kg', 'a3e1b3e4-4449-47a1-8434-0b97d8a8b755', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Fatiguée', '2024-04-12 13:00:00', 'Fatigue légère observée.', 'Feuilles', '3 kg', 'a3e1b3e4-4449-47a1-8434-0b97d8a8b755', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-03-08 12:00:00', 'Très active et sociale.', 'Fruits', '2.5 kg', 'a3e1b3e4-4449-47a1-8434-0b97d8a8b755', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('En bonne santé', '2024-05-04 10:30:00', 'Pas de soucis de santé.', 'Herbes', '5 kg', '4b837d26-19e8-45a8-b144-9072dd7b9f33', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère boiterie', '2024-04-22 14:00:00', 'Boiterie légère détectée.', 'Feuilles', '4 kg', '4b837d26-19e8-45a8-b144-9072dd7b9f33', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('En forme', '2024-03-09 11:00:00', 'Très en forme et actif.', 'Fruits', '3 kg', '4b837d26-19e8-45a8-b144-9072dd7b9f33', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('Energique', '2024-05-06 12:30:00', 'Très énergique et joueuse.', 'Herbes', '3 kg', 'd6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Légère toux', '2024-04-19 15:00:00', 'Toux légère observée.', 'Feuilles', '2.5 kg', 'd6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Bonne condition', '2024-03-13 10:45:00', 'En bonne condition générale.', 'Fruits', '2.8 kg', 'd6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

-- Rapports pour les Gnous
('En bonne santé', '2024-05-07 11:00:00', 'Aucun signe de maladie.', 'Herbes', '5 kg', 'f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Fatigué', '2024-04-21 13:30:00', 'Fatigue légère observée.', 'Foin', '4 kg', 'f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Active', '2024-03-10 10:00:00', 'Très actif et joueur.', 'Légumes', '3.5 kg', 'f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('En bonne santé', '2024-05-08 12:00:00', 'Pas de problème de santé.', 'Herbes', '6 kg', 'b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Légère boiterie', '2024-04-23 15:00:00', 'Boiterie légère observée.', 'Foin', '5 kg', 'b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('En forme', '2024-03-11 11:00:00', 'Très en forme.', 'Légumes', '4 kg', 'b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('Energique', '2024-05-09 13:00:00', 'Très énergique et joueur.', 'Herbes', '4 kg', 'e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère toux', '2024-04-24 14:00:00', 'Toux légère observée.', 'Foin', '3 kg', 'e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Bonne condition', '2024-03-12 12:00:00', 'En bonne condition générale.', 'Légumes', '3.5 kg', 'e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('En bonne santé', '2024-05-10 10:30:00', 'Aucun problème de santé.', 'Herbes', '4.5 kg', '97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Fatiguée', '2024-04-25 11:30:00', 'Fatigue légère observée.', 'Foin', '3.5 kg', '97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-03-13 09:30:00', 'Très active et joueuse.', 'Légumes', '3 kg', '97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

-- Rapports pour les Antilopes Cobe de Lechwe
('En bonne santé', '2024-05-11 11:30:00', 'Aucun signe de maladie.', 'Herbes', '5 kg', '85d0f75b-c55a-4d4c-809e-13a2b8f55de2', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Fatigué', '2024-04-26 13:30:00', 'Fatigue légère observée.', 'Feuilles', '4 kg', '85d0f75b-c55a-4d4c-809e-13a2b8f55de2', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Active', '2024-03-14 10:00:00', 'Très actif et joueur.', 'Légumes', '3.5 kg', '85d0f75b-c55a-4d4c-809e-13a2b8f55de2', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('En bonne santé', '2024-05-12 12:00:00', 'Pas de problème de santé.', 'Herbes', '6 kg', 'e94f41e9-4e4b-4211-9ab6-70543fef99e4', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère boiterie', '2024-04-27 15:00:00', 'Boiterie légère observée.', 'Feuilles', '5 kg', 'e94f41e9-4e4b-4211-9ab6-70543fef99e4', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('En forme', '2024-03-15 11:00:00', 'Très en forme.', 'Légumes', '4 kg', 'e94f41e9-4e4b-4211-9ab6-70543fef99e4', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('Energique', '2024-05-13 13:00:00', 'Très énergique et joueur.', 'Herbes', '4 kg', '64bc243b-2b13-4a56-96f1-37780b564d48', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère toux', '2024-04-28 14:00:00', 'Toux légère observée.', 'Feuilles', '3 kg', '64bc243b-2b13-4a56-96f1-37780b564d48', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Bonne condition', '2024-03-16 12:00:00', 'En bonne condition générale.', 'Légumes', '3.5 kg', '64bc243b-2b13-4a56-96f1-37780b564d48', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

-- Rapports pour les Singes Araignées
('En bonne santé', '2024-05-14 11:30:00', 'Aucun signe de maladie.', 'Fruits', '2 kg', '8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Fatigué', '2024-04-29 13:30:00', 'Fatigue légère observée.', 'Insectes', '1.5 kg', '8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-03-17 10:00:00', 'Très actif et joueur.', 'Noix', '1 kg', '8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('En bonne santé', '2024-05-15 12:00:00', 'Pas de problème de santé.', 'Fruits', '2.5 kg', 'c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Légère boiterie', '2024-04-30 15:00:00', 'Boiterie légère observée.', 'Insectes', '2 kg', 'c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('En forme', '2024-03-18 11:00:00', 'Très en forme.', 'Noix', '1.5 kg', 'c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('Energique', '2024-05-16 13:00:00', 'Très énergique et joueur.', 'Fruits', '2 kg', '9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère toux', '2024-04-25 14:00:00', 'Toux légère observée.', 'Insectes', '1.5 kg', '9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Bonne condition', '2024-03-19 12:00:00', 'En bonne condition générale.', 'Noix', '1.8 kg', '9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('En bonne santé', '2024-05-17 10:30:00', 'Aucun problème de santé.', 'Fruits', '2.2 kg', 'bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Fatiguée', '2024-04-26 11:30:00', 'Fatigue légère observée.', 'Insectes', '1.7 kg', 'bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Active', '2024-03-20 09:30:00', 'Très active et joueuse.', 'Noix', '1.4 kg', 'bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

-- Rapports pour les Perroquets Ara
('En bonne santé', '2024-05-18 11:30:00', 'Aucun signe de maladie.', 'Graines', '0.5 kg', 'd7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Fatigué', '2024-04-27 13:30:00', 'Fatigue légère observée.', 'Fruits', '0.4 kg', 'd7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-03-21 10:00:00', 'Très actif et joueur.', 'Légumes', '0.3 kg', 'd7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('En bonne santé', '2024-05-19 12:00:00', 'Pas de problème de santé.', 'Graines', '0.6 kg', 'f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Légère boiterie', '2024-04-28 15:00:00', 'Boiterie légère observée.', 'Fruits', '0.5 kg', 'f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('En forme', '2024-03-22 11:00:00', 'Très en forme.', 'Légumes', '0.4 kg', 'f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

-- Rapports pour les Tigres
('En bonne santé', '2024-05-20 11:30:00', 'Aucun signe de maladie.', 'Viande', '10 kg', 'b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Fatiguée', '2024-04-29 13:30:00', 'Fatigue légère observée.', 'Poulet', '9 kg', 'b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-03-23 10:00:00', 'Très active et joueuse.', 'Poisson', '8 kg', 'b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('En bonne santé', '2024-05-21 12:00:00', 'Pas de problème de santé.', 'Viande', '11 kg', 'c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère boiterie', '2024-04-30 15:00:00', 'Boiterie légère observée.', 'Poulet', '10 kg', 'c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('En forme', '2024-03-24 11:00:00', 'Très en forme.', 'Poisson', '9 kg', 'c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

-- Rapports pour les Paresseux
('En bonne santé', '2024-05-22 11:30:00', 'Aucun signe de maladie.', 'Feuilles', '0.8 kg', 'b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Fatigué', '2024-05-01 13:30:00', 'Fatigue légère observée.', 'Fruits', '0.6 kg', 'b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-04-25 10:00:00', 'Très actif et joueur.', 'Légumes', '0.4 kg', 'b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

-- Rapports pour les Crocodiles du Nil
('En bonne santé', '2024-05-23 11:30:00', 'Aucun signe de maladie.', 'Poisson', '8 kg', 'f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Fatigué', '2024-05-02 13:30:00', 'Fatigue légère observée.', 'Viande', '7 kg', 'f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-04-26 10:00:00', 'Très actif et joueur.', 'Poulet', '6 kg', 'f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('En bonne santé', '2024-05-24 12:00:00', 'Pas de problème de santé.', 'Poisson', '9 kg', 'd3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère boiterie', '2024-05-03 15:00:00', 'Boiterie légère observée.', 'Viande', '8 kg', 'd3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('En forme', '2024-04-27 11:00:00', 'Très en forme.', 'Poulet', '7 kg', 'd3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('Energique', '2024-05-25 13:00:00', 'Très énergique et joueur.', 'Poisson', '8 kg', 'e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Légère toux', '2024-05-04 14:00:00', 'Toux légère observée.', 'Viande', '7 kg', 'e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Bonne condition', '2024-04-28 12:00:00', 'En bonne condition générale.', 'Poulet', '6.5 kg', 'e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('En bonne santé', '2024-05-26 10:30:00', 'Aucun problème de santé.', 'Poisson', '7 kg', 'b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Fatiguée', '2024-05-05 11:30:00', 'Fatigue légère observée.', 'Viande', '6 kg', 'b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-04-29 09:30:00', 'Très active et joueuse.', 'Poulet', '5 kg', 'b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

-- Rapports pour les Loutres de rivière
('En bonne santé', '2024-05-27 11:30:00', 'Aucun signe de maladie.', 'Poisson', '2 kg', 'e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Fatigué', '2024-05-06 13:30:00', 'Fatigue légère observée.', 'Crustacés', '1.5 kg', 'e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Active', '2024-04-30 10:00:00', 'Très actif et joueur.', 'Insectes', '1 kg', 'e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('En bonne santé', '2024-05-28 12:00:00', 'Pas de problème de santé.', 'Poisson', '2.5 kg', 'c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère boiterie', '2024-05-07 15:00:00', 'Boiterie légère observée.', 'Crustacés', '2 kg', 'c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('En forme', '2024-05-01 11:00:00', 'Très en forme.', 'Insectes', '1.5 kg', 'c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('Energique', '2024-05-08 13:00:00', 'Très énergique et joueur.', 'Poisson', '2 kg', 'd8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère toux', '2024-05-02 14:00:00', 'Toux légère observée.', 'Crustacés', '1.5 kg', 'd8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Bonne condition', '2024-04-30 12:00:00', 'En bonne condition générale.', 'Insectes', '1.8 kg', 'd8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

('En bonne santé', '2024-05-09 10:30:00', 'Aucun problème de santé.', 'Poisson', '2.2 kg', 'e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Fatiguée', '2024-05-03 11:30:00', 'Fatigue légère observée.', 'Crustacés', '1.7 kg', 'e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Active', '2024-04-29 09:30:00', 'Très active et joueuse.', 'Insectes', '1.4 kg', 'e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),

-- Rapports pour les Hérons cendrés
('En bonne santé', '2024-05-10 11:30:00', 'Aucun signe de maladie.', 'Poisson', '0.7 kg', 'c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Fatigué', '2024-05-04 13:30:00', 'Fatigue légère observée.', 'Amphibiens', '0.5 kg', 'c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5'),
('Active', '2024-04-30 10:00:00', 'Très actif et joueur.', 'Insectes', '0.4 kg', 'c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),

('En bonne santé', '2024-05-11 12:00:00', 'Pas de problème de santé.', 'Poisson', '0.8 kg', 'd1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('Légère boiterie', '2024-05-05 15:00:00', 'Boiterie légère observée.', 'Amphibiens', '0.6 kg', 'd1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f', '15ee5d2b-c0b7-4c40-8534-4e20ee8b144a'),
('En forme', '2024-05-01 11:00:00', 'Très en forme.', 'Insectes', '0.5 kg', 'd1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f', 'b8464391-b7e8-4534-aa7b-fc30f1875cc5');


-- Table des repas
INSERT INTO `Feedings` (`feedingType`, `feedingAmount`, `feedingDate`, `feedingBy`, `reportKey`, `animalKey`) VALUES
('Herbes', '4.87 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 13, '4b837d26-19e8-45a8-b144-9072dd7b9f33'),
('Herbes', '3.85 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 37, '64bc243b-2b13-4a56-96f1-37780b564d48'),
('Herbes', '4.66 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 31, '85d0f75b-c55a-4d4c-809e-13a2b8f55de2'),
('Herbes', '4.5 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 28, '97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8'),
('Herbes', '4.34 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 10, 'a3e1b3e4-4449-47a1-8434-0b97d8a8b755'),
('Herbes', '5.69 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 22, 'b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f'),
('Feuilles', '5.04 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 1, 'd290f1ee-6c54-4b01-90e6-d701748f0851'),
('Herbes', '3 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 16, 'd6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f'),
('Feuilles', '3.67 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 7, 'e2e24dc4-6578-40b3-bde8-1ad376b3a8f8'),
('Herbes', '4.35 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 25, 'e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9'),
('Herbes', '6.01 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 34, 'e94f41e9-4e4b-4211-9ab6-70543fef99e4'),
('Feuilles', '5.68 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 4, 'f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3'),
('Herbes', '5.27 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 19, 'f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6'),
('Fruits', '1.94 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 40, '8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1'),
('Fruits', '2.03 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 46, '9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85'),
('Feuilles', '0.75 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 64, 'b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f'),
('Viande', '9.16 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 58, 'b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b'),
('Fruits', '2.09 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 49, 'bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb'),
('Fruits', '2.56 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 43, 'c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4'),
('Viande', '10.23 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 61, 'c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b'),
('Graines', '0.48 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 52, 'd7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85'),
('Graines', '0.61 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 55, 'f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d'),
('Poisson', '6.98 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 76, 'b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d'),
('Poisson', '2.62 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 82, 'c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d'),
('Poisson', '0.69 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 91, 'c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e'),
('Poisson', '0.82 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 94, 'd1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f'),
('Poisson', '8.38 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 70, 'd3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f'),
('Poisson', '2.14 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 85, 'd8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e'),
('Poisson', '2.24 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 88, 'e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c'),
('Poisson', '1.81 kg', '2024-06-04 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 79, 'e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d'),
('Poisson', '7.73 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 73, 'e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f'),
('Poisson', '8.69 kg', '2024-06-04 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 67, 'f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a'),
('Herbes', '5.3 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 13, '4b837d26-19e8-45a8-b144-9072dd7b9f33'),
('Herbes', '4.14 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 37, '64bc243b-2b13-4a56-96f1-37780b564d48'),
('Herbes', '5.19 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 31, '85d0f75b-c55a-4d4c-809e-13a2b8f55de2'),
('Herbes', '4.93 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 28, '97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8'),
('Herbes', '3.94 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 10, 'a3e1b3e4-4449-47a1-8434-0b97d8a8b755'),
('Herbes', '6.24 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 22, 'b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f'),
('Feuilles', '5.18 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 1, 'd290f1ee-6c54-4b01-90e6-d701748f0851'),
('Herbes', '3.05 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 16, 'd6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f'),
('Feuilles', '4.2 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 7, 'e2e24dc4-6578-40b3-bde8-1ad376b3a8f8'),
('Herbes', '4.2 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 25, 'e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9'),
('Herbes', '6.46 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 34, 'e94f41e9-4e4b-4211-9ab6-70543fef99e4'),
('Feuilles', '5.54 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 4, 'f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3'),
('Herbes', '5.07 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 19, 'f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6'),
('Fruits', '2.11 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 40, '8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1'),
('Fruits', '2.07 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 46, '9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85'),
('Feuilles', '0.87 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 64, 'b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f'),
('Viande', '9.86 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 58, 'b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b'),
('Fruits', '2.36 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 49, 'bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb'),
('Fruits', '2.72 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 43, 'c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4'),
('Viande', '10.91 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 61, 'c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b'),
('Graines', '0.5 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 52, 'd7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85'),
('Graines', '0.63 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 55, 'f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d'),
('Poisson', '7.06 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 76, 'b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d'),
('Poisson', '2.46 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 82, 'c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d'),
('Poisson', '0.64 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 91, 'c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e'),
('Poisson', '0.8 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 94, 'd1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f'),
('Poisson', '8.22 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 70, 'd3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f'),
('Poisson', '2.17 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 85, 'd8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e'),
('Poisson', '2.33 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 88, 'e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c'),
('Poisson', '2.18 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 79, 'e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d'),
('Poisson', '7.92 kg', '2024-06-05 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 73, 'e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f'),
('Poisson', '7.92 kg', '2024-06-05 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 67, 'f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a'),
('Herbes', '4.52 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 13, '4b837d26-19e8-45a8-b144-9072dd7b9f33'),
('Herbes', '3.69 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 37, '64bc243b-2b13-4a56-96f1-37780b564d48'),
('Herbes', '4.51 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 31, '85d0f75b-c55a-4d4c-809e-13a2b8f55de2'),
('Herbes', '4.72 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 28, '97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8'),
('Herbes', '3.72 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 10, 'a3e1b3e4-4449-47a1-8434-0b97d8a8b755'),
('Herbes', '5.45 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 22, 'b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f'),
('Feuilles', '4.94 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 1, 'd290f1ee-6c54-4b01-90e6-d701748f0851'),
('Herbes', '2.86 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 16, 'd6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f'),
('Feuilles', '4.32 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 7, 'e2e24dc4-6578-40b3-bde8-1ad376b3a8f8'),
('Herbes', '4.13 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 25, 'e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9'),
('Herbes', '5.66 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 34, 'e94f41e9-4e4b-4211-9ab6-70543fef99e4'),
('Feuilles', '6.02 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 4, 'f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3'),
('Herbes', '5.13 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 19, 'f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6'),
('Fruits', '1.91 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 40, '8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1'),
('Fruits', '2.15 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 46, '9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85'),
('Feuilles', '0.81 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 64, 'b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f'),
('Viande', '10.34 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 58, 'b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b'),
('Fruits', '2.34 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 49, 'bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb'),
('Fruits', '2.72 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 43, 'c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4'),
('Viande', '10.33 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 61, 'c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b'),
('Graines', '0.48 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 52, 'd7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85'),
('Graines', '0.58 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 55, 'f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d'),
('Poisson', '7.29 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 76, 'b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d'),
('Poisson', '2.69 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 82, 'c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d'),
('Poisson', '0.77 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 91, 'c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e'),
('Poisson', '0.83 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 94, 'd1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f'),
('Poisson', '8.17 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 70, 'd3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f'),
('Poisson', '2.02 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 85, 'd8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e'),
('Poisson', '2.04 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 88, 'e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c'),
('Poisson', '1.93 kg', '2024-06-06 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 79, 'e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d'),
('Poisson', '7.46 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 73, 'e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f'),
('Poisson', '7.61 kg', '2024-06-06 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 67, 'f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a'),
('Herbes', '4.78 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 13, '4b837d26-19e8-45a8-b144-9072dd7b9f33'),
('Herbes', '4.12 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 37, '64bc243b-2b13-4a56-96f1-37780b564d48'),
('Herbes', '4.99 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 31, '85d0f75b-c55a-4d4c-809e-13a2b8f55de2'),
('Herbes', '4.39 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 28, '97fa8cbb-25a1-4f0c-85c4-d7ef31b0d2c8'),
('Herbes', '3.98 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 10, 'a3e1b3e4-4449-47a1-8434-0b97d8a8b755'),
('Herbes', '5.55 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 22, 'b0d3f29a-431e-4b8a-99ab-8a2e6c1c8e4f'),
('Feuilles', '5.47 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 1, 'd290f1ee-6c54-4b01-90e6-d701748f0851'),
('Herbes', '2.91 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 16, 'd6f74cc5-5c6c-4f0f-bf6c-8384f6e8a47f'),
('Feuilles', '3.79 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 7, 'e2e24dc4-6578-40b3-bde8-1ad376b3a8f8'),
('Herbes', '4.22 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 25, 'e60b1a8f-d06b-4d53-9813-0b4b2d6f26b9'),
('Herbes', '6.42 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 34, 'e94f41e9-4e4b-4211-9ab6-70543fef99e4'),
('Feuilles', '5.51 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 4, 'f1c2a5d4-68e4-4d8b-9fd8-f5cbb07b5bc3'),
('Herbes', '4.57 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 19, 'f7e9e8c2-d8ef-472d-b408-9e3b1f35a8d6'),
('Fruits', '1.84 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 40, '8edc7e2d-9ff1-42ae-8b71-92e2f4eb92a1'),
('Fruits', '2.14 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 46, '9b9c8e5e-5b78-44cf-84d7-1b5c0bdb0a85'),
('Feuilles', '0.77 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 64, 'b2e8f7d9-5a4e-4d8b-8c7e-2f1d8a9c5e7f'),
('Viande', '9.52 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 58, 'b9f8e7c2-5c4b-4d9e-8d3f-2b8f9e5d5a8b'),
('Fruits', '2.28 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 49, 'bc8f4e0a-48ed-4ed9-8f9a-0e6b8e6e6efb'),
('Fruits', '2.35 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 43, 'c2d3baf0-06a1-4e15-9181-9c55c9f5f1e4'),
('Viande', '10.01 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 61, 'c4d2b3e4-7f6a-4d8c-8d7f-8b2e9d1a6c3b'),
('Graines', '0.51 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 52, 'd7d6f8c3-29e6-4c1e-a6a5-9f1e5b5b7f85'),
('Graines', '0.58 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 55, 'f1a2d9b4-7e9d-48e8-8f6e-8d1b2f3f5b6d'),
('Poisson', '7.41 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 76, 'b7e6d9f2-8c5a-4d9b-8e6d-7a5c8b2f1e4d'),
('Poisson', '2.36 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 82, 'c3d1b9e6-7a5c-4d9e-8b6d-8f2d7a5e1c3d'),
('Poisson', '0.69 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 91, 'c7e9f6d2-5a4c-4d8b-8e7d-9a6f7b5d2c1e'),
('Poisson', '0.84 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 94, 'd1f9e8c2-6a4d-4e8b-8f7c-2b5c9a7e6d3f'),
('Poisson', '8.71 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 70, 'd3b2f1e7-8e6c-4a7e-8f2d-9b7c6a8b3d2f'),
('Poisson', '2.01 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 85, 'd8e7f9b6-4c5e-4d8b-8c7e-9a6f7b5d3a2e'),
('Poisson', '2.3 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 88, 'e2d7f9b6-5a4c-4d8e-8b7f-6c5d8a9f7e4c'),
('Poisson', '1.91 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 79, 'e8f9d6b2-4c5a-4d8e-8b7c-6a9e7c8d3f2d'),
('Poisson', '8.55 kg', '2024-06-07 21:39:13', '321d9219-3dcd-4cc3-9431-c52981ad7452', 73, 'e9d1f8c2-6a4f-4d8c-8e7d-2b5f9a8e7d6f'),
('Poisson', '8.57 kg', '2024-06-07 21:39:13', '095e7eef-b25e-427e-9c4e-7c603bb76487', 67, 'f8e6c9b2-7c5a-4e9d-8c2f-5d1f9a8d7b3a');
