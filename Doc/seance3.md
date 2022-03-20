# Séance 3
aujourd'hui on va s'attaquer au front pour avoir un premier visuel du site !


## Setup
On rajoute un config.json dans le front et on le gitignore (on oublie pas le template). On va principalement y mettre les urls du front et du back.

On en profite pour changer aussi des petits trucs comme le favicon.ico et donner le nom de Killer au site.

On nettoye le fichier App.css


## front/src/App.js
Il est temps à s'attaquer au vrai boulot. C'est dans App.js qu'on a la première logique de commande. Bien sur c'est plus simple de faire du front si on voit ce qu'est l'html et le css. Mais en gros:
* Html: structure du site
* Css: habillage
* Javascript: dynamique

on commence par importer des libraires de `React` on va les utiliser après. Ensuite on charge les feuilles de `CSS` (habillage). Et on finit par importer des Composants. Les composants c'est des structrues qu'on a définie nous mêmes et qu'on va utiliser. Ici ces composants vont bien souvent renvoyer du html et donc faire varier la structure de notre site web

On définit une fonction `App()` cette fonction contient donc notre logique et doit renvoyer la structrue du site. Pour l'instant on a une grosse condition qui regarde la taille du site. Si le site est trop étroit (mobile) on va changer les composants et donc la méthode d'affichage.

Quand on sait quel affichage on veut, on va le renvoyer. Ce qu'on renvoit c'est d'abord un `div` (donc un élément de structure basique que sert à contenir d'autres éléments). Ce `div` contien un Router qui lui contient `MenuD` et des `Route`. `MenuD` est un composant qui sert à afficher une barre de navigation. Les routes eux vont regarder l'url et retourner un composant en fonction de cette URL (tout comme les routers dans le back). Pour l'instant on a 4 composants:
* AccueilD
* LoginComponent
* Users
* Teams

## front/src/components/bar/navbarD.js
En gros ce composant est assez simple. On renvoit un `div` qui contient des `a`

## front/src/pages/accueil.js
On retourne ne gros juste une image

## front/src/components/auth/login.component.js
Ce composant est un peu tricky. Si vous souvenez du back on avait une route pour nous logger et qui renvoyait au front un token. Il est maintenant temps de récupérer ce token. 

On arrive sur ce composants avec la route `/login/:token/`

React c'est un peu compliqué comme ça mais pour résumer ce qu'il se passe avec un composant. En premier lieu la fonction render est appelée donc on regarde la structure du composant et des actions peuvent s'exécuter (genre le clic d'un bouton) ce qui donnera un refresh du composant render et un nouvel appel à la fonction render.

Donc ici ce qu'il se passe:
* On affiche que l'utilisateur va être redirigé
* La fonction CompomentDidMount s'exécute quand le composant est contsruit
  * On clean le cache local
  * On récupère le token
  * on fait une redirection
* On gère les autres cas mais la on s'en fout

## front/src/pages/users.js
ici on veux afficher la liste des joueurs. Un truc que j'ai pas parlé c'est le state. Le state c'est une sorte de variable que je peux set et récupèrer. Et lorsque je mets à jour le state, la fonction render est appelée à nouveau.

Donc ici si la logique est la suivante:
* Le state est init avec users: null
* On render le component. Donc vu que this.state.users == null on renvoit une barre de chargement
* Quand le composant est monté (ComponenentDidMount) on fais une requête au back pour récup la liste des utilisateurs.
* On met le state à jour quand on reçoit l'info
* Le composant se met à jour et réapplique le render
* On affiche la liste des gens

On remarque qu'on importe des choses de Semantic-ui-React. En gros c'est une librairie qui a des composants pour faire des trucs jolis (on a du rajouter la ligne dans le fichier `front/public/index.html`).

## front/src/pages/teams.js
Même chose que pour les users
