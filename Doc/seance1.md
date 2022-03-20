# Séance 1
## Rajouter l'auth
Salut les petits potes, aujourd'hui on va regarder pour ajouter l'auth sur le site du killer.

### Le client
La première étape est de se rendre sur [auth.viarezo.fr](auth.viarezo.fr) et de créer un client (c'est déjà fais). Ce qu'il faut faire attention, c'est de cocher la méthode `authorization_code` et de rajouter une urls de redirection `http://localhost:5000/auth/callback`. Le bon bail c'est de connaitre des gens admins de l'oauth VR car ça moins les couilles quand on crée un client et qu'on sait pas ce qu'on fait. Pour les scopes vous laisser `default`.

#### Oui mais c'est quoi ?
En gros le client, c'est ce qui va permettre d'identifier notre site auprès de ViaRézo et ce qui permettre donc aux utilisateurs de VR de se connecter à notre site et nous on sait que ces gens vont venir de la. Et tout les trucs qu'on a ça sert à authentifié notre site donc si au final tu peux dire qu'on fait de la magie et que tout marche dans le meilleur des mondes mais si tu as encore des questions tu peux aller lire la doc qui est dispo aussi sur `auth.viarezo.fr`


### Le code
Pour le code rajouté, il suffit de se rendre [ici](https://gitlab.viarezo.fr/guilde/killer/commit/77709235d8527a23da8a72be2c8e0ce8932fbabb)

#### Config.template.json
Il a beaucoup changé car on a rajouté pas mal de truc. Il devrait plus énormément bouger par après:
* port: c'est toujours le port sur lequel tourne le back
* admin: c'est la listed des identifiants VR qui seront admins dés leur création. Ça permet d'avoir des premiers admins qui rajoutent les autres
* bot_token: c'est le token du bot telegram qui sert de monitoring
* chan_monitoring_id: c'est le chan telegram du monitoring
* session_secret: c'est un secret qu'on doit générer pour chiffrer les sessions des utilisateurs (savoir qui s'est connecté en gros)
* frontUrl: l'url du front (c'est pour les redirections)
* backUrl: l'url du back (aussi pour les redirections)
* token_secret: c'est pour chiffrer le token (on explique plus tard)
* oauth: tout ce qui est lié directement à l'oauth de notre site
  * client_id: id généré par l'auth
  * client_secret: secret généré par l'auth
  * accessTokenUri: url pour récup l'accessToken
  * authorizationUri: url pour récup les autorisations
  * apiUrl: url de l'api de l'auth (et donc l'endroit ou on peut récup les infos sur les gens)

Pingez [@westornd](@westornd) pour chopper les secrets (mais si ils fuitent, vous savez ce qui vous attend...)


#### App
Rappel: ce fichier nous permet de lancer notre serveur. Principalement on a rajouté des paquets pour activer les sessions et ensuite on a aussi rajouté une route pour l'auth

#### controllers/oauth.controller
En gros dans ce controller on va définir 3 fonctions

##### getUri
Permet de récupérer l'uri d'authentification de l'oauth

##### getToken
Permet de récupérer l'accessToken d'un utilisateur (grâce au code et state). L'access Token nous permet de récup des infos sur `https://auth.viarezo.fr/api/user/show/me`

##### Apicall
Permet de récupr les infos sur `https://auth.viarezo.fr/api/user/show/me` avec l'access Token


#### controllers/auth.controller
On définit 3 fonctions qui vont permetter d'authentifier un utilisateur

##### login
Cette fonction permet de recevoir une requête `/auth/login` et de faire une requête à l'oauth.

##### callback
Cette fonction permet de récupérer le retour de l'oauth (c'est celle qu'on a paramétrée dans le client `http://localhost:5000/auth/callback`). Ce qui se passe dans cette fonction:
* On commence par récup la réponse de l'oauth
* On récupère l'accessToken
* On récupère les infos de l'utilisateur
* On regarde si cet utilisateur existe
* Si Oui
  * on va rediriger vers le front avec un token
  * Ce token est un token généré par notre site qui donne des infos sur l'user
  * Il ne faut pas que ce soit l'accessToken
* Si Non
  * On créé un utilisateur dans la bdd avec les infos qu'on a récup
  * Quand c'est fait on renvoit un token au front avec les infos
  * On fais une requête (grâce au paquet axios) pour poster un message sur le chan monitoring
##### validate
Cette fonction permet de voir si le token du front est toujours ok (donc si il a pas été modifié)


