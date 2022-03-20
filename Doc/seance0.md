# Séance 0

## Setup
- Créer le dossier sur le gitlab (ping @westornd pour les accès)
- Cloner avec git le repo sur votre ordinateur
- Créer un dossier pour le back
- Créer le dossier front avec create-react-app (npx create-react-app front)
- Tester avec `yarn start` dans le dossier front (une page devrait s'ouvrir dans le navigateur)
- Prérequis de javascript (mais hésitez pas à ping @westornd)

## Premier pas sur le back
Les premiers commits ont foiré donc il faut se référer à la brance [premier pas](https://gitlab.viarezo.fr/guilde/killer/tree/mon-premier-serveur)

### Structure du dossier

```
├── .gitignore
├── config.json
├── package.template.json
├── index.js
├── package.json
├── src
│   ├── app.js
│   ├── controllers
│   │   └── user.controller.js
│   ├── controllers.js
│   ├── models
│   │   ├── db.js
│   │   └── user.js
│   ├── routers
│   │   └── user.router.js
│   └── routers.js
└── yarn.lock
```

### .gitignore
ce fichier contient tout les fichiers qui doivent être ignoré par git:
* Les fichiers avec les secrets
* Les fichiers temporaire
* Les fichiers trop lourd (node module que l'on peut recréer)
* ...

### Config.json et config.template.json
Ces fichiers contiennent les variables d'envirronement du site (en gros toutes les variables qui ne doivent pas être hard-codées dans le site):
* port sur lequel tourne le serveur
* secrets
Le config.json est celui qui contient les vrai valeurs et il n'est pas gité. Config.template.json est le template sur comment doit ressembler le fichier

### package.json
C'est un fichier géré par yarn qui permet de gérer les paquets (les librairies) installées et de réinstaller facilement les librairies

### yarn.lock
C'est un fichier générer par yarn pour connaitre l'état des librairies installées

### index.js
C'est ici que le fun commence vraiment. Ce fichier sert juste à récupérer le serveur (app) et le lancer sur un port (c'est lui qui le lance)

### src/app.js
app.js c'est lui qui définit notre serveur

```
const express = require('express');
const bodyParser = require('body-parser');
const {
    user,
    } = require('./routers');
    
const app = express();
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("hello"));
app.use('/users', user)

module.exports = app;
```
* Express c'est la librairie qui permet de créer le serveur
* bodyParser c'est une librairie qui permet de transformer les requêtes faites au serveur en json (c'est pour faciliter)
* user c'est un routeur (en gros ce fichier qui permet de décrire ce qu'il faut faire pour chaque URL - on y vient après)
* app c'est le serveur en tant que tel
* app.use(bodyParser) c'est pour que le serveur utilise le BodyParser
* `app.get("/" ...)` c'est un début de routeur. Cette ligne signifie que si on va sur killer.cs-campus.fr/, on va renvoyer hello (on explique plus après)
* `app.use('/users', user)` c'est pour dire qu'on utilise le routeur user sur les url qui commençeront `users`

### src/routers.js
Ce fichier permet de récupérer la liste des routeurs pour les exporter mais pour l'instant il n'y en a qu'un.

### src/routers/user.router.js
```
const express = require('express');
const router = new express.Router();
const { user } = require('../controllers')

router.route('/').get(user.get_user);
router.route('/').post(user.post_user);


module.exports = router;
```
* Express (le serveur web) va nous permetter de créer un objet routeur. Cet objet routeur va permettre de définir des actions à effecture lorsqu'on effectue une requête web (il y a différent type de requête mais par exemple aller sur une page web c'est faire une requêt GET mais il existe aussi pour créer des données (post), les update (put/patch), les delete(delete))
* `router.route('/').get(user.get_user)` permet d'associer à l'url '/' (il faut se souvenir que ça se rajoute à l'url qui a été défnie lors qu'on a demandé à app d'utiliser le router donc pour l'instant l'url complète c'est bien `url + /users + /`), la requête GET et d'effectuer l'action défénie par user.get_user.
* user.get_user (et user.post_user) sont des controlleurs en gros des fonctions qui permettent de réagir à des requêts web

### src/controllers.js
Ce fichier permet de récupérer la liste des routeurs pour les exporter.

### src/controllers/user.controller.js
Dans ce fichier on définit les fonction qui vont réagir à une requête web.

* `get_user(req,res)` définit une fonction qui prend 2 arguments:
  * req: cet objet définit la requête qui a été effectuée (paramètres, body, path)
  * res: cet objet définit la réponse qui va être renvoyée. Donc c'est lui qu'on doit modifier
On remarque aussi que l'on récupère user qui est un objet Désignant la table user (comme dans le cours de SIP) de la BDD.
`user.findAll()` est une fonction qui va effectuer une requête sur la table `user` pour récupérer l'ensemble des utilisateurs.

---
Le javascript utilise de l'asynchrone c'est à dire que c'est parce qu'on demande un résultat qu'on le récupère tout de suite. Donc on va souvent devoir utilier: 
```
Fonction_Asynchrone.then((data)=>{
// chose à faire avec data
})
```
qui permet d'attendre le résultat de `Fonction_Asynchrone` et qui va le stocker dans data et effectuer une suite de chose à faire (si on regarde bien c'est une fonction sans nom)

---
Lorsqu'on a récupéré l'ensemble des utilisateurs on les renvoit avec res.send().
* `post_user(req,res)`: cette fonction va permettre de créer un utilisateur via `user.create(req.body)` avec les champs contenue dans `req.body`. Ces champs doivent respecter ceux qui sont défini dans la BDD sinon ça crash. On finit par renvoyer le résultat.

### src/models/db.js
* On va utiliser Sequelize qui est un [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) en gros ça permet de convertir du javascript et autre en requête sql. ce qui nous simplifie grandement la vie.

* On donne différent paramètre à la BDD (genre le nom, l'utilisateur, l'endroit de stockage, ect).

* `db.authenticate()`: On établit la connexion a la base d donnée
* ` const user = db.import('user', require('./user'));` on va importer dans la base de donnée le modèle d'un user
* `db.sync()` permet de synchroniser les changements qui ont été fais (par exemple lorsqu'on a importé les users)

### src/model/user.js
Dans ce fichier on utilise sequelize pour définir le modèle utilisateur, c'est assez simple à comprendre normalement.

### Où on est ?
Pour l'instant on a le premier pas pour le serveur:
* On a un serveur back
* Qui permet de gérer une BDD
* On a une table utilisateur 
* On peux créer des utilisateurs et les récupérer


## Team
On a fais un premier jet pour rajouter les teams (elles se basent sur ce qu'on a fait pour les utilisateurs). Regarder ça [Ici](https://gitlab.viarezo.fr/guilde/killer/commit/bd357cb425ccb5f0976c46489833885c5798ba61)

## Validation
Ici on va rajouter la validation qui va être une amélioration pour nos requêtes

### Package.json
Avant pour lancer le serveur `node index.js` et chaque fois qu'on changeait quelque chose il fallait quitter le processus et le relancer. Maintenant on utilise un script qu'on définit dans `package.json`. ce script est appelé lorsqu'on a fait `yarn start`. Ce script va utiliser nodemon qui va surveiller les fichiers et restart le serveur si il detect un changement.

### src/validations.js
En gros la validation va nous permettre de comparer un objet à un template et permettre de continuer l'exécution de la requête ou renvoyer une erreur.

Dans ce fichier on importe les différents fichiers de schémas et on définit la fonction validate. Celle-ci prend un schéma en argument et va comparer `req.body` au schéma. Req.body c'est l'ensemble des argumemts de la requête.

### src/validations/user.validation
Dans ce fichier on définit les différents schémas. Pour l'insant il n'y a qu'un schéma post (qui correspond à la création d'un utilisateur). En se basant sur le modèle de l'utilisateur on peut donc définir le template.

## Add simple request
Ici on ajouter des requêtes pour récupérer un utilisateur, le modifier et le supprimer

### src/controller/user.controller
On renome get_user en get_users vu que c'est pour plusieurs utilisateurs

On rajoute une fonction `get_user(req,res)` qui permet de récupérer son id. `findOne` permet de renvoyer le premier utilisateur qui correspond à la requête et si aucun utilisateur est trouvé null est renvoyé. on utilise `where:{ id: req.params.id }` pour dire quel utilisateur on veux récupérer (donc l'utilisateur dont l'id est spécifié en paramètre).

La fonction `put_user(req,res)` permet de modifier un utilisateur. En premier lieu on récupère l'utilisateur dont l'id est spécifié par le paramètre et puis on update les champs correspondant. 

La fonction `del_user(req,res)` peremt de supprimer un utilisateur. En premier lieu on récupère l'utilisateur correspondant à l'id spécifié en paramètre  et puis on le suppprime. Si ça a bien fonctionné on renvoit true

### src/router/user.router
On rajoute les nouvelles routes. On remarque ici qu'elles prennent la forme de `/:id` qui définissent en fait le paramètre id qui est alors utilisible dans le controlleur.

### src/validations/user.validation
On rajoute un schéma pour l'update d'un utilisateur. Ce qui change c'est que les champs obligatoire.

## Ce qui va être fait
* L'ajout des requêtes simple pour les teams
* Trouver les grandes fonctionnalités du site du killer
