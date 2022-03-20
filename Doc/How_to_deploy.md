# Guide de déploiement du site

Bienvenue dans ce fabuleux tuto pour apprendre à déployer ce site et d'autres trucs trop stylés.
La première étape va être de créer une nouvelle branche de production (si ce n'est déjà fait) qui est sensé
contenir tous les changements propre à l'édition du killer actuel (rappel: la branche master ne doit contenir
uniquement ce qui se garde d'année en année).

Dans ce guide on nommera la branche "2020".

## Où héberger le site

Le plus simple c'est VR (il y a pas de raison qu'ils refusent) surtout qu'il y a des chances d'avoir de la consanguinité entre les 2.
Ce qu'il faut demaner à VR:
- Une vm pour faire tourner du node et react (donc mininum 2 Go de ram -- on consomme pas bcp d'espace rom et la vm ne reste pas hyper longtemps donc isokay).
- Un ndd vers l'ip de la vm avec valeur "killer.cs-campus.fr"
- Une redirection de "api.killer.cs-campus.fr" vers cette même ip

Note: Il est tout à fait possible d'héberger le back et le front sur 2 vm différentes mais c'est pas spécialement utile ici donc autant pas faire chier trop les gens.

### Ce qu'il faut aussi demander à VR
On va avoir besoin d'un client mais par chance je l'a déjà créé il y a longtemps. Donc il suffit de ping les bonnes personnes pour récup les crédentials.

## Préparation de la VM

### Config de base

La première étape est de mettre la vm en ordre donc il faut se diriger du côté du ansible de la guilde. Il faut lancer le user provisionning donc on a besoin
- D'installer ansible `sudo apt install ansible`
- Modifier `hosts.yml` pour y ajouter la nouvelle vm
- Lancer la commande suivante `ansible-playbook playbook/user-provisioning.yml -i hosts.yml --user debian`

Ça devraitdonc créer un compte pour chacun des utilisateurs + installer des trucs important (pas trop besoin de développer ici).

Lorsque vous vous connectez pour la première fois à la vm, un choix vous est proposé (rentrez 0 pour avoir le theme zsh stylé).


### Préparer l'utilisateur node
Commençons par devenir super utilisateur `sudo su`. On va créer un nouvel utilisateur et groupe qui va permettre de faire tourner le site.
On commence par créer un groupe web `addgroup web`. On va ensuite créer un utilisateur et l'ajouter à ce groupe 
`adduser --ingroup web node`. Quand il demande un mdp, laissez vide.

On créé ensuite un dossier `/var/www` qui va contenir les fichiers du site. Il faut ensuite changer le groupe du dossier `chgrp web /var/www`


### Nginx

On va avoir besoin de nginx comme reverse proxy (en gros rediriger les requêtes vers le front et le back, redirection http -> https et autres folatries): `sudo apt install nginx`. Ensuite il va falloir de diriger vers `/etc/nginx/sites-enabled` et supprimer le fichier default. On va créer 2 fichier back.conf et front.conf. Dans le back.conf on va ajouter:

```
server {
    listen 80;
    server_name api.killer.cs-campus.fr;

    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://127.0.0.1:5000;
    }
}
```

Pour le front on va faire:
```
server {
    root /var/www/killer/front/build;
    listen 80;
    server_name killer.cs-campus.fr;

    location /service-worker.js {
        add_header Cache-Control "no-cache";
        proxy_cache_bypass $http_pragma;
        proxy_cache_revalidate on;
        expires off;
        access_log off;
    }

    location / {
        try_files $uri /index.html =404;
    }

}
```

Il faut tester si ce que vous avez écrit est bon. Faites un `nginx -t`. Si il vous dis que tout est ok, faites un `service nginx restart`. Tester vos 2 urls, vous devriez avoir la page d'erreur de nginx. Il fat maintenant ajouter le https. Pour ça il y a un très bon tuto [ici](https://certbot.eff.org/lets-encrypt/debianbuster-nginx.html). Si vous avez un soucis hésitez pas à me ping (@westornd). Normalement il vous demandera si vous voulez rediriger le http vers du https, dites oui.


### Clé de déploiement

On veut avoir une clé de déploiement pour pouvoir téléchargé facilement les mises à jour et autre. On va tout d'abord générer cette clé sous l'utilisateur node `su node` et utiliser `ssh-keygen`. Il faut appuyer juste sur enter quand il demande quelque chose mais il faut absolument pas mettre de passphrase. Vous devez récupérer la clé publique (`~/.ssh/id_rsa.pub`), et aller l'ajouter dans les deploy keys (onglet settings/Repository).


## Le site
On va enfin pouvoir s'attaquer au site. On va tout d'abord devoir le cloner. Avec l'utilisateur node rendez vous dans `/var/www/` et cloner le repo git. Si tout s'est bien passé avant vous devriez pas avoir de problème. (Si vous avez un soucis avec le clone essayer:
```
 eval `ssh-agent -s`
 ssh-add /home/node/.ssh/id_rsa
 ```
### Postqres

Il faut installer postgsql `sudo apt install postgresql`. Il faut ensuite créer l'utilisateur et la bdd :
```
sudo su
su postgers
psql
CREATE USER killer WITH PASSWORD 'killer';
CREATE DATABASE killerdb WITH OWNER killer;
\q
```

### Node

 Il faut maintenant installer node (nvm) et yarn 
 - [nvm](https://github.com/nvm-sh/nvm)
 - [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)


Il faut ensuite installer le back et le front (`yarn install`).

Il faut ensuite remplacer les fichiers de config correctement.

On build le front (`yarn build`) et on met à jour nginx (`service nginx restart`
)

Il ne reste plus qu'à lancer le back. Le plus simple est de créer un fichier de config `/var/www/ecosystem.config`
```
{
  "apps": [
        {
        "name": "api",
        "cwd": "/var/www/killer/back",
        "script": "index.js",
        "instances": 1,
        "exec_mode": "cluster",
        "interpreter": "/usr/bin/node",
        "env": {
                "PORT": "5000",
                },
    },
   ]
}
```

Et d'installer [pm2](https://pm2.keymetrics.io/)

Il suffit après de faire un `pm2 startOrRestart ecosystem.json` pour lancer le back.


## Installation d'un .htaccess
La on veut pas quel les conna.. gpas trouvent le site donc on va cacher un peu:
```
sudo sh -c "echo -n 'killer:' >> /etc/nginx/.htpasswd"
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"
```

Il faut ensuite remplacer dans `/etc/nginx/sites-enabled/front.conf` le bloc `server ` du bloc https (port 443)

```
auth_basic "You shall not pass";
auth_basic_user_file /etc/nginx/.htpasswd;
```
