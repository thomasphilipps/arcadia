# Zoo Arcadia
Application web créée dans le cadre de la préparation à l'examen pour l'obtention du Titre
Professionnel DéveloppeurWeb et Web Mobile (RNCP 37674).  
Organisme de formation : [STUDI](https://www.studi.com/fr)

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
- **Serveur :**
  - NodeJS : Serveur JavaScript
  - Express : Framework pour NodeJS
  - Sequelize: ORM SQL pour NodeJS
  - Mongoose : ORM NoSQL pour NodeJS
  - Bases de données
    - MySQL : Base de données relationnelles SQL
    - MongoDB : Base de donées NoSQL
- **Client :**
  - Angular 17 : Framework JavaScript (TypeScript)
  - Bulma : Framework CSS responsive
  - Material Angular : Composants UI pour Angular  
<br>

## Installation locale

>### Prérequis
>Afin de pouvoir installer cette application localement, vous devez avoir installé et configuré sur
>votre machine les logiciels suivants :<br>
>(Les versions utilisées lors du développement sont entre parenthèses)
>- [**NodeJS**](https://www.nodejs.org) (20.13.0 LTS)
>- [**Docker**](https://docs.docker.com/) (26.1.1)
>- [**GIT**](https://git-scm.com/) (2.34.1)
>
>Un environnement de travail sous Linux est fortement conseillé.  
>Cette application a été développée dans un environnement [WSL2](https://learn.microsoft.com/fr-fr/windows/wsl/), sous Ubuntu 22.04.4 LTS.  
><br>

<br>

### 1. Téléchargement du dépôt git et installation des packages :
----

Vous devez tout d'abord cloner le dépôt distant sur votre machine.  
Ouvrez un terminal et naviguez jusqu'au répertoire où vous installez vos projets.
Puis exécutez la commande suivante :
```BASH
git clone https://github.com/thomasphilipps/arcadia.git
```
<br>

Puis naviguez dans le répertoire racine du projet :
```BASH
cd arcadia
```
<br>

> :bulb: Toutes les commandes sont à exécuter à partir de la racine du projet, sauf indication contraire  

<br>

Vous pouvez ensuite installer toutes les dépendances en une seule commande :
```BASH
npm run install-all
```
<br>

### 2. Variables d'environnement
----

Il va ensuite falloir initialiser les variables d'environnement.  
A la racine du projet, vous trouverez un  fichier **'.env'**  
Vous pouvez l'ouvrir dans votre éditeur de texte favori, ici on va utiliser l'editeur nano :  
```SH
nano .env
```
<br>

Vous devez ensuite compléter les différentes variables renseignées entre les chevrons ``< >`` 
``:warning: SAUF LES VARIABLES CONCERNANT AWS.``  

Si vous souhaitez créer une clé sécurisée aléatoire pour ``AUTH_PRIVATE_KEY``, vous pouvez lancer dans votre console la 
commande suivante :  
```BASH
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

<br>

Vous devriez obtenir un fichier ressemblant à ceci :
```BASH
NODE_ENV=development

# API VARS
API_PORT=3000
API_HOST="http://localhost"

# TOKEN KEY
AUTH_PRIVATE_KEY="ma_cle_securisee"

# MYSQL VARS
BDD_HOST="localhost"
BDD_NAME="db_arcadia_zoo"
BDD_ROOT_PASSWORD="mon_mdp_root_securise"
BDD_USER="mon_login_utilisateur_mysql"
BDD_PASSWORD="mon_mdp_utilisateur_securise"

# MONGO VARS
MONGO_ROOT_USER="root"
MONGO_ROOT_PASSWORD="mon_autre_mdp_root_securise"
MONGO_DATABASE="arcadia_zoo"
MONGOEXPRESS_LOGIN="mon_login_utilisateur_mongodb"
MONGOEXPRESS_PASSWORD="mon_mdp_utilisateur_securise"


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
MINIO_ROOT_USER="mon_login_minio"
MINIO_ROOT_PASSWORD="mon_mdp_securise"
```
<br>

Sauvegardez avec la commande ``[Ctrl]+X`` puis tapez sur ``[Entree]``

<br>

### 3. Installation des container et volumes Docker :
----
Lancez les containers docker :  
```BASH
docker compose up -d
```

Ceci va lancer plusieurs services :
- **MySql** et **PhpMyAdmin** : SGBD SQL et une interface web pour la gestion
- **MongoDb** : SGBD NoSQL
- **MailDev** : simulation de boîte mail
- **MinIo** : simulation de conteneur S3 d'Amazon Web Services (AWS)
  
<br>

Ainsi que 3 volumes pour la conservation des données :
- **mysqldbdata** pour la base de données SQL
- **mongodbdata** pour la base de données NoSQL
- **minio-data** pour la sauvegarde des images

<br>
