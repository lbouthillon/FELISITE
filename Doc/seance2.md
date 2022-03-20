# Séance 2
## Filtre oauth user
les fichiers sont dispo [https://gitlab.viarezo.fr/guilde/killer/commit/5db02a8ffe683bc8a6c5d94ab50141ac4fa8fa7b](ici)

Ici c'est assez simple. On va rajouter une condition pour vérifier que l'utilisateur est bien un étudiant

## Rajouts de droits
Les fichiers sont dispo [https://gitlab.viarezo.fr/guilde/killer/commit/ecebf263dd3685100d1858d23729f6987e7bbd87](ici)
On a partionné les droits en 3, super admin, admin, joueur. les super admin auront des responsabilités en plus mais un admin pourra modifier un super-admin. Le but concret reste à définir pour savoir quel droit revient à qui mais tout est en place. Il faudrait aussi empecher un admin de modifier un super-admin.

### model/user.js
On change le boolean en enum

### auth.controller.js
puisqu'on a plus un boolean, il faut regarder si la personne est un super admin ou bien juste un joueur

### src/validation.js
On rajoute le nouveau validator

### validation/right.validation.js
On ajoute 3 fonctions:
* auth: demande que la personne soit connectée
* authAdmin: demande que la personne soit connectée et ait les droits admins
* authSuperAdmin: demanque que la personne soit connectée et ait les droits super-admins

On aurait pu définir 3 fonctions qui s'enchaînait mais ça permet d'avoir des validators plus court au niveau des routes

#### auth
On récupère le token et on le décode, on a des erreurs si il n'y a pas de token où si il est malformé

#### authAdmin
De même on récup le token puis avec l'identifiant contenu dedans on récupère l'utilisateur et on vérifie que celui-ci est bien un admin ou un super-admin

#### authSuperAdmin
La même sauf qu'on ne regarde que si la personne est super-admin

## Gestion de la team
On peut retrouver les fichiers [https://gitlab.viarezo.fr/guilde/killer/commit/a18300cf8be8d7a55f1bcb1542b273eae55fb3e2](ici)

### Environnement de test
On va devoir tester pas mal de chose donc il faut avoir des données sur lesquels travailler. Donc on rajoute des données de test dans la bdd lorsqu'on dev et on les rajoute pas en prod. Ensuite on pourra s'attaquer à la création de team et à sa gestion

#### config.template.json
On rajoute la variable pour savoir si on est en dev ou en prod

#### models/db.js
On regarde si on est en dev ou en prod. Si on est en dev on va rajouter des utilisateurs fictifs dans la bdd

#### seeds/users.json
Utilisateurs fictifs 

#### validations/right.validation.js
Si on est en dev, on renvoit automatiquement un token (ça permet d'éviter de devoir le spécifier pour tout et n'importe quoi).

### Gestion de la team
Le but c'est de pouvoir créer, ajouter et retirer des gens d'un team

#### team.controller.js
##### adminRightTeam
On commence par définir une fonction qui détermine si une personne a les droits suffisants pour faire ça. Il faut que la personne soit
* leader de la team
* admin ou superadmin
Etant donné qu'on va demander souvent cette information on en a fait une fonction.

##### post_team
* On récupère l'utilisateur qui a fait ra requête
* On regarde si il est dans une team
* Sinon on crée une team
* On set le champs leader de la team à cet utilisateur
* On set le champs teamId de l'utilisateur avec l'id de la team

##### del_team
On vérifie qu'on a les droits et puis on la supprime

##### add_user
* On vérifie que l'utilisateur a les droits d'en rajouter un autre
* On trouve l'utilisateur qu'on veut ajouter
* On compte le nombre de personnes dans la team
* On regarde si on peut l'ajouter
* On ajoute l'utilisateur

##### del_user
* On vérifie que l'utilisateur a les droits pour en retirer un autre
* On trouve l'utilisateur qu'on veut retirer
* Le leader ne peut pas se retirer de la team
* On regarde si on peut le retirer
* On retire l'utilisateur

