-- TODO: supprimer l'insertion de l'admin avant la mise en ligne
-- Insertion des utilisateurs
INSERT INTO `Users` (`userId`, `userEmail`, `userName`, `userPassword`, `userRole`) VALUES
('15ee5d2b-c0b7-4c40-8534-4e20ee8b144a', 'henri@zoo-arcadia.com', 'Henri', '$2b$10$P33QAsOnTa2k9Jc4hFbyTO3mBfbsEcv.f3/wjdbdZ2otftbmEk9qm', 'ROLE_VETERINARY'),
('48ac9728-0000-11ef-8213-00155d07f9b8', 'admin@zoo-arcadia.com', 'José', '$2b$10$VgGJXGl9HghBi7QmSEaGa.kRk5g5dyos4vA1y6MuZ/7OyGtKcjWaW', 'ROLE_ADMIN'),
('51347675-b55a-4cbc-855f-2576d39f9b72', 'paul@zoo-arcadia.com', 'Paul', '$2b$10$NFo2YBcgotmm0JPX2YWsT.qrNS26zYEfu2D5pk1HDDYCHGyXLwtSe', 'ROLE_EMPLOYEE');

  -- Initial schedules
INSERT INTO `Schedules` (`dayId`, `dayName`, `openAm`, `closeAm`, `openPm`, `closePm`) VALUES
(1, 'Lundi', '09:30:00', NULL, NULL, '18:00:00'),
(2, 'Mardi', '09:30:00', NULL, NULL, '18:00:00'),
(3, 'Mercredi', '09:30:00', NULL, NULL, '19:30:00'),
(4, 'Jeudi', '09:30:00', NULL, NULL, '18:00:00'),
(5, 'Vendredi', '09:30:00', NULL, NULL, '18:00:00'),
(6, 'Samedi', '09:30:00', NULL, NULL, '19:30:00'),
(7, 'Dimanche', NULL, NULL, NULL, NULL);

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
(1, 'Girafes', 'Giraffa camelopardalis', 'La girafe, reconnue pour son cou exceptionnellement long et ses taches uniques, est la plus haute des créatures terrestres. Ces gracieux herbivores se nourrissent principalement des feuilles d\'arbres hauts, une adaptation évolutive à leur habitat de savane africaine.', 1),
(2, 'Zèbres', 'Equus quagga', 'Les zèbres sont célèbres pour leurs rayures distinctives noires et blanches, chaque individu ayant un motif unique comme les empreintes digitales chez l\'humain. Ils sont très sociaux et parcourent la savane en grands troupeaux.', 1),
(3, 'Gnous', 'Connochaetes taurinus', 'Les gnous, ou antilopes à barbe, sont connus pour leur migration spectaculaire en masse à travers les plaines africaines. Ces herbivores robustes jouent un rôle clé dans l\'écosystème en tant que proies pour de nombreux prédateurs.', 1),
(4, 'Antilopes Cobe de Lechwe','Kobus leche', 'Les Cobe de Lechwe sont des antilopes adaptées aux zones humides, avec des sabots larges parfaits pour la boue et l\'eau. Leur pelage huileux repousse l\'eau, et ils sont souvent vus en train de patauger dans l\'eau pour échapper aux prédateurs.', 1);

-- Insertion des espèces de la Jungle
INSERT INTO `Species` (`specieId`, `specieName`, `specieTaxon`, `specieDescr`, `biomeKey`) VALUES
(5, 'Singes Araignées', 'Ateles geoffroyi', 'Le singe araignée se distingue par sa grande agilité dans les arbres de la jungle, utilisant sa longue queue préhensile comme cinquième membre pour se balancer entre les branches. Ces primates sociaux forment des groupes complexes et communicatifs.', 2),
(6, 'Perroquets Ara', 'Ara macao', 'Les perroquets Ara sont réputés pour leur plumage brillant et coloré et leur intelligence remarquable. Ils sont capables d\'imiter les sons et les voix humaines, faisant d\'eux des favoris parmi les visiteurs de zoos.', 2),
(7, 'Tigres', 'Panthera tigris', 'Le tigre, le plus grand des félins, captive les visiteurs par son allure majestueuse et ses rayures emblématiques. Chasseur solitaire par nature, le tigre est un prédateur topique dans son habitat forestier.', 2),
(8, 'Paresseux', 'Bradypus variegatus', 'Les paresseux passent la majorité de leur vie suspendus aux arbres de la jungle, se déplaçant lentement pour conserver de l\'énergie. Leur métabolisme extrêmement lent est fascinant, adapté à leur régime alimentaire faible en calories.', 2);

-- Insertion des espèces des Marais
INSERT INTO `Species` (`specieId`, `specieName`, `specieTaxon`, `specieDescr`, `biomeKey`) VALUES
(9, 'Crocodiles du Nil', 'Crocodylus niloticus', 'Les crocodiles du Nil sont parmi les plus grands crocodiles au monde, avec une impressionnante capacité d\'adaptation à divers habitats aquatiques. Redoutés comme prédateurs, ils jouent un rôle crucial dans la régulation des populations d\'autres espèces.', 3),
(10, 'Loutres de rivière', 'Lontra canadensis', 'Les loutres de rivière, agiles et joueuses, sont un plaisir à observer, surtout lorsqu\'elles manipulent des objets ou jouent entre elles. Leur forte socialisation contribue à renforcer les liens familiaux et groupaux.', 3),
(11, 'Hérons cendrés', 'Ardea cinerea', 'Le héron cendré est admiré pour sa stature élancée et sa technique de pêche patiente et précise. Ces grands échassiers sont souvent vus immobiles dans l\'eau, attendant de harponner un poisson avec leur long bec pointu.', 3);


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
