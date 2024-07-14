# Zoo Arcadia
Application web créée dans le cadre de la préparation à l'examen pour l'obtention du Titre
Professionnel DéveloppeurWeb et Web Mobile (RNCP 37674).  
Organisme de formation: [STUDI](https://www.studi.com/fr)

## Contexte du sujet
Arcadia est un zoo situé en France près de la forêt de Brocéliande, en bretagne depuis 1960.  
Ils possèdent tout un panel d’animaux, réparti par habitat (savane, jungle, marais) et font 
extrêmement attention à leurs santés. Chaque jour, plusieurs vétérinaires viennent afin d’effectuer
les contrôles sur chaque animal avant l’ouverture du zoo afin de s’assurer que tout se passe bien,
de même, toute la nourriture donnée est calculée afin d’avoir le bon grammage (le bon grammage est
précisé dans le rapport du vétérinaire).  
Le zoo, se porte très bien financièrement, les animaux sont heureux. Cela fait la fierté de son
directeur, José, qui a de grandes ambitions.  
A ce jour, l’informatique et lui ça fait deux, mais, il a envie d’une application web qui
permettrait aux visiteurs de visualiser les animaux, leurs états et visualiser les services ainsi
que les horaires du zoo.  
Ne sachant pas comment faire, José à demander à Josette, son assistante,
de trouver une entreprise lui permettant d’obtenir cette application et augmenter ainsi la
notoriété et l’image de marque du zoo.  
Après l’obtention de votre diplôme, vous avez été embauché au sein de DevSoft, entreprise
qui a été choisi par Josette afin de réaliser l’application.  

## Stack technique
- **Serveur:**
  - NodeJS: Serveur JavaScript
  - Express: Framework pour NodeJS
  - Sequelize: ORM SQL pour NodeJS
  - Mongoose: ORM NoSQL pour NodeJS
  - Bases de données
    - MySQL: Base de données relationnelles SQL
    - MongoDB: Base de donées NoSQL
- **Client:**
  - Angular 17: Framework JavaScript (TypeScript)
  - Bulma: Framework CSS responsive
  - Material Angular: Composants UI pour Angular  
<br>

## Installation locale

>### Prérequis
>Afin de pouvoir installer cette application localement, vous devez avoir installé et configuré sur
>votre machine les logiciels suivants:<br>
>(Les versions utilisées lors du développement sont entre parenthèses)
>- [**NodeJS**](https://www.nodejs.org) (20.13.0 LTS)
>- [**Docker**](https://docs.docker.com/) (26.1.1)
>- [**GIT**](https://git-scm.com/) (2.34.1)
>
>Un environnement de travail sous Linux est fortement conseillé.  
>Cette application a été développée dans un environnement [WSL2](https://learn.microsoft.com/fr-fr/windows/wsl/), sous Ubuntu 22.04.4 LTS.  
><br>
>### Remarques générales
>- Bien qu'il s'agisse d'un projet local, gardez pour bonne pratique d'utiliser des mots de passe suffisament forts.  
Cet aspect est contrôlé par l'application elle-même pour les utilisateurs, par contre les variables d'environnement abordées au point 2. ne le sont pas.  
><br>

<br>

### 1. Téléchargement du dépôt git et installation des packages:
----

Vous devez tout d'abord cloner le dépôt distant sur votre machine.  
Ouvrez un terminal et naviguez jusqu'au répertoire où vous installez vos projets.
Puis exécutez la commande suivante:
```BASH
git clone https://github.com/thomasphilipps/arcadia.git
```
<br>

Puis naviguez dans le répertoire racine du projet:
```BASH
cd arcadia
```
<br>

>:bulb: Toutes les commandes sont à exécuter à partir de la racine du projet, sauf indication contraire  

<br>

Vous pouvez ensuite installer toutes les dépendances en une seule commande:
```BASH
npm run install-all
```
<br>

### 2. Variables d'environnement
----

Il va ensuite falloir initialiser les variables d'environnement.  
A la racine du projet, créez un  fichier ``.env``  
Ouvrez-le ensuite dans votre éditeur de texte favori.  

Copiez et collez le document suivant:  

```BASH
NODE_ENV=development

# API VARS
PORT=3000
HOST="http://localhost"

# FRONTEND URL(s)
FRONTEND_URL="http://localhost:4200, http://127.0.0.1:4200"

# TOKEN KEY
AUTH_PRIVATE_KEY=<ma_cle_securisee>

# MYSQL VARS
BDD_HOST="localhost"
BDD_NAME="db_arcadia_zoo"
BDD_ROOT_PASSWORD=<mon_mdp_root_securise>
BDD_USER=<mon_login_utilisateur_mysql>
BDD_PASSWORD=<mon_mdp_utilisateur_securise>

# MONGO VARS
MONGO_ROOT_USER="root"
MONGO_ROOT_PASSWORD=<mon_autre_mdp_root_securise>
MONGO_DB_NAME="arcadia_zoo"
MONGO_USER=<mon_login_utilisateur_mongo>
MONGO_PASSWORD=<mon_mdp_utilisateur_mongo>
MONGO_COLLECTION="animal_visits"

# MAILING VARS
SMTP_HOST="localhost"
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=# LEAVE BLANK IN DEV MODE
SMTP_PASS=# LEAVE BLANK IN DEV MODE

#AWS S3 VARS
AWS_REGION='eu-west-3'
AWS_USE_PATH_STYLE_ENDPOINT='true'
AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
AWS_BUCKET_NAME='arcadia-zoo'
AWS_ENDPOINT='http://localhost:9000'

#MINIO VARS
MINIO_ROOT_USER=<mon_login_minio>
MINIO_ROOT_PASSWORD=<mon_mdp_securise>
```

<br>

Vous devez ensuite compléter les différentes variables renseignées entre les chevrons ``< >``, n'oubliez pas de les encadrer de guillemets (simples ou doubles).
>:warning: SAUF LES VARIABLES ``YOUR_ACCESS_KEY`` et ``YOUR_SECRET_ACCESS_KEY`` (elles seront renseignées plus tard)

Si vous souhaitez créer une clé sécurisée aléatoire pour ``AUTH_PRIVATE_KEY``, vous pouvez lancer dans votre terminal la commande suivante:  
```BASH
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

<br>

Sauvegardez le fichier.

<br>

### 3. Installation des container et volumes Docker:
----
Lancez les containers docker:  
```BASH
docker compose up -d
```

Ceci va lancer plusieurs services:
- **MySql** et **PhpMyAdmin**: SGBD SQL et son interface web
- **MongoDb**: SGBD NoSQL
- **MailDev**: simulation de boîte mail
- **MinIo**: simulation de conteneur S3 d'Amazon Web Services (AWS)
  
<br>

Ainsi que 3 volumes pour la conservation des données:
- **mysqldbdata** pour la base de données SQL
- **mongodbdata** pour la base de données NoSQL
- **minio-data** pour la sauvegarde des images
  
<br>

### 4. Initialisation des variables AWS
----
Ouvrez l'interface MiniO l'adresse suivante: http://localhost:8900  
Connectez-vous avec les identifiants que vous avez renseigné dans le fichier ``.env`` sous la rubrique ``# MINIO VARS``  

Dans le menu de gauche, allez dans: ``Administrator > Buckets`` et créez un bucket appelé ``arcadia-zoo``  

Puis dans ``Users > Access Keys`` créez un couple clé d'accès / clé d'authentification secrète

>:warning: ENREGISTREZ BIEN CES DEUX CLES, VOUS N'AUREZ PLUS ACCES A LA CLE SECRETE ENSUITE

Renseignez ensuite ces deux clés dans le fichier ``.env``
  
<br>

### 5. Créaton de la base de données MySQL et de son andministrateur
----
Lancez Mysql en local avec la commande:
```BASH
docker exec -it mysqldb mysql -u root -p
```
Le password est celui que vous avez renseigné dans ``.env`` sous ``BDD_ROOT_PASSWORD``  
Vous obtiendrez l'invite de commandes de MySql

Pour créer la base de données et son administrateur, entrer les commandes suivantes: 
> Remplacez les valeurs de ``utilisateur`` et de ``password`` par les valeurs déclarées dans ``.env`` sous ``BDD_USER``  et ``BDD_PASSWORD``, en laissant les guillemets.
```SQL
-- Crée une nouvelle base de données appelée db_arcadia_zoo
CREATE DATABASE db_arcadia_zoo;

-- Crée un nouvel utilisateur MySQL
CREATE USER 'utilisateur'@'%' IDENTIFIED BY 'password';

-- Accorde tous les privilèges sur la base de données db_arcadia_zoo à l'utilisateur
GRANT ALL PRIVILEGES ON db_arcadia_zoo.* TO 'utilisateur'@'%';

-- Applique les modifications de privilèges
FLUSH PRIVILEGES;
```

Vous pouvez ensuite sortir en tapant la commande 
```SQL
EXIT;
```
  
<br>

### 6. Initialisation des tables de la base de données MySQL
----  
Le fichier situé dans le dossier ``server/scripts/database_init.sql`` contient toutes les commandes pour initialiser la base de données. Elles sont à éxécuter dans l'ordre et permettent de créer:  
- Les tables de la base:
  - **Users**: L'administrateur, les employés et les vétérinaires du zoo
  - **Biomes**: Les zones d'habitats
  - **Species**: Les espèces du zoo
  - **Animals**: Les animaux du zoo
  - **Services**: Les services du zoo
  - **Schedules**: Les horaires d'ouverture du zoo
  - **Reviews**: Les avis laissés par les visiteurs du site
  - **Reports**: Les rapports des vétérinaires
  - **Feedings**: L'alimentation des animaux
  - **Images**: Les liens vers les images du site  
  
- Les triggers:
  - **PreventMultipleAdmins**: ne permet pas l'ajout d'un nouvel administrateur du site (sécurité supplémentaire contre les scripts malveillants)
  - **PreventAdminDeletion**: ne permet pas la suppression d'un administrateur
  - **AfterAnimalDelete**: Nettoyage des données de la base lors de la suppression d'un animal
  - **AfterBiomeDelete**: Nettoyage de des données de la base lors de la suppression d'un habitat
  - **AfterServiceDelete**: Nettoyage de des données de la base lors de la suppression d'un service
  - **AfterSpecieDelete**: Nettoyage de des données de la base lors de la suppression d'une espèce
    
- Enfin, une commande ``INSERT`` permettra d'initialiser les jours de la base des horaires.  

<br>

Vous pouvez tout installer en une seule commande:  
```BASH
node ./server/scripts/db_initialize.js
```

Si vous avez le message: ``Script SQL effectué avec succès``, bonne nouvelle, tout s'est bien passé et vos tables sont correctement initialisées.

<br>

Si vous préférez l'installer manuellement, relancez l'invite de commande MySQL.  
Connectez-vous avec le compte administrateur précédemment créé, puis naviguez vers la base de données en tapant:
```SQL
USE db_arcadia_zoo;
```

Puis entrez toutes les commandes qui vous intéressent du fichier.  
> Pour les triggers, veillez à modifier le délimiteur afin que les ``;`` intermédiaires ne soient pas considérés comme des fins d'instruction.
> Exemple: 
> ```SQL
> --  changer le délimiteur
> delimiter //
>
> -- instruction
> DROP TRIGGER IF EXISTS PreventMultipleAdmins;
> CREATE TRIGGER PreventMultipleAdmins BEFORE INSERT ON Users
> FOR EACH ROW
> BEGIN
>   DECLARE admin_count INT DEFAULT 0;
>   IF NEW.userRole = 'ROLE_ADMIN' THEN
>     SELECT COUNT(*) INTO admin_count FROM Users WHERE userRole = 'ROLE_ADMIN';
>     IF admin_count >= 1 THEN
>       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impossible de créer un autre administrateur';
>     END IF;
>   END IF;
> END// -- changer le dernier ; par le nouveau délimiteur
>
> -- assigner à nouveau le délimiteur standard
> delimiter ;
> ```

<br>

### 7. Ajout de l'administrateur du site
----
1. Avec un script automatisé  
   Lancez le script suivant:
   ```BASH
   node ./server/scripts/create_admin.js
   ```
   Il vous sera demandé l'email, le nom ainsi que le mot de passe de l'administrateur.

   > Les données entrées sont vérifiées par le script pour être cohérentes.

   > Bien que ce soit en mode local, le mot de passe doit faire minimum 12 caractères et contenir au moins 3 parmi: majuscule, minuscule, chiffre, caractère spécial.  

<br>

2. Manuellement  
   >:warning: Utilisez le script fourni pour le hashage du mot de passe, afin de ne pas avoir d'incompatibilité entre les modules d'encryption
   - Générez et sauvegardez un UUID pour l'id du user
     ```BASH
     node ./server/scripts/create_uuid.js
     ```
   - Hashez le mot de passe pour ne pas permettre sa lecture dans le stockage:
     ```BASH
     node ./server/scripts/hash_password.js
     ```
   - Lancez MySQL à partir de docker avec l'utilisateur que vous avez crée précédemment:
     ```BASH
     docker exec -it mysqldb mysql -u <mon_utilisateur> -p
     ```
   - Ajoutez l'administrateur du site:
     ```SQL
     -- Aller à la base de données
     USE db_arcadia_zoo;

     -- Ajouter l'utilisateur - NE PAS OUBLIER LES GUILLEMETS ENCADRANT LES VALEURS INSEREES
     INSERT INTO Users (userId, userEmail, userName, userPassword, userRole) VALUES ('<UUID générée>', '<email administrateur>', '<nom administrateur>', '<mot de passe hashé>', 'ROLE_ADMIN');

     -- Si tout s'est bien passé, sortir de MySQL
     EXIT;
     ```


<br>

### 8. Initialisation de la base MongoDB et création de l'administrateur
----
Connectez-vous à MongoDB et lancez l'invite de commande mongosh :
```BASH
docker compose exec mongodb mongosh -u <MONGO_ROOT_USER> -p
```
En remplaçant la valeur de <MONGO_ROOT_USER> par celle que vous avez renseignée dans ``.env``, et utilisez le mot de passe correspondant.  
<br>
Exécutez dans mongosh les commandes suivantes :
```mongodb
use arcadia_zoo;
db.createCollection('animal_visits');
```
<br>

Enfin, créer l'administrateur de cette base de données, n'oubliez pas de remplacer les valeurs <MONGO_USER> et <MONGO_PASSWORD> par celles présentes dans votre ``.env``, entre guillemets pour chacune.
```mongodb
db.createUser({user: <MONGO_USER>, pwd: <MONGO_PASSWORD>, roles: [{role: "readWrite", db: "arcadia_zoo"}]});
```
Quittez mongosh en effectuant 2 fois ``Ctrl+C`` ou en tapant ``.exit``  
<br>

> Vous pouvez maintenant vous connecter à mongosh avec les identifiants administrateur:
> ```BASH
> docker compose exec mongodb mongosh -u <MONGO_USER> -p --authenticationDatabase arcadia_zoo
> ```
><br>
>
> Si vous préférez travailler sur MongoDB avec une interface graphique, vous pouvez télécharger le client [**MongoDB Compass**](https://www.mongodb.com/products/tools/compass)  
> <br>

<br>

### 9. Fixtures (optionnel)
----
1. Base de données MySQL  
    La commande suivante initialisera toutes les données dans la base:
   ```BASH
   node ./server/scripts/db_populate.js
   ```
   <br>

   Si vous préférez l'insertion manuelle dans les tables, ré-ouvrez l'invite de commandes à partir de Docker:
   ```BASH
   docker exec -it mysqldb mysql -u root -p
   ```
   Vous pouvez ensuite copier/coller les informations qui vous intéressent situées dans le fichier ``server/scripts/database_populate.sql``  

   <br>
2. Base de données MongoDB  
   (WIP)
   
   <br>
3. Images du site
   - Vérifiez la présence de ``/docs/minio_backup.tar``
   - Executez la commande suivante pour restaurer les images dans Minio:
     ```BASH
     docker run --rm --volumes-from minio -v $(pwd)/docs:/backup ubuntu bash -c \
     "cd /data/ && \
     tar xvf /backup/minio_backup.tar --strip 1"

     # Explication de chaque partie de la commande:
     # docker run --rm: Exécute un conteneur et le supprime une fois terminé
     # --volumes-from minio: Monte les volumes depuis le conteneur 'minio'
     # -v $(pwd)/docs:/backup: Monte le répertoire local 'docs' du répertoire courant vers '/backup' dans le conteneur
     # ubuntu: Utilise l'image Ubuntu comme base pour le conteneur
     # bash -c: Utilise bash pour exécuter la commande suivante
     # "cd /data/ && tar xvf /backup/minio_backup.tar --strip 1":
     #   cd /data/: Change le répertoire courant pour '/data/' dans le conteneur
     #   tar xvf /backup/minio_backup.tar --strip 1: Extrait les fichiers de l'archive 'minio_backup.tar' située dans '/backup' tout en supprimant le premier niveau de répertoires dans l'archive     
     ```

<br>

Redémarrez maintenant Docker pour prendre en compte les modifications:
```BASH
docker-compose down && docker-compose up -d
```

<br>

### 10. Lancement de l'application
----
Vous pouvez maintenant lancer l'application avec la commande:
```BASH
npm run dev
```

Et en visualiser le résultat à l'adresse:

[**http://localhost:4200**](http://localhost:4200)


#### Si vous n'avez pas utilisé les fixtures, vous allez alors devoir utiliser la console d'administration pour initialiser toutes les données.






