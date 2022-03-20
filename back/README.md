
un jour je complète, promis


## Installation
....
Installer les dépendances `yarn`
Créer un dossier `logs` et `static`
Remplir l'environnement (`config.template.json` en `config.json`)



### Postgres
Il faut installer postgres. Quand c'est bon il faut ouvrir l'interface postgres
```sh
sudo su
su postgres
psql
```

Ensuite
```sh
CREATE USER killer WITH PASSWORD 'killer';
CREATE DATABASE killerdb WITH OWNER killer;
```
Pour quitter un `\q` est suffisant