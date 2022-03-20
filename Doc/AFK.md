# Away From Killer

Chaque joueur a un score qui symbolise si il est afk ou non et en fonction de ce score, les mj passe quelqu'un afk.
Quelqu'un d'afk peut demander à ne plus l'être ou bien il clique juste sur un bouton.


## Calcul du score
En gros il faut que sur une journée du killer (7h00 à 00h00), un joueur pas du tout afk passe afk. Donc mettons que pour chaque minute passée on perd un point.
* Max point = 17*60 = 1020 points

Pour le calcul du score on aura le score interne aux quel on retire l'heure actuelle -7h00 convertit en minute.
* Max point en début de journée = 1020
* Max point en fin de journée = 2040

## Changement de jour
Lorsqu'on change de jour il faut update le score
* On retire 1020 points pour s'adapter au changement d'heure
* On divise le score par 2.5 pour prendre en compte que les gens se désintéresse d'un jour à l'autre

## Regagner des points
Les actions suivantes remplissent à 100% (donc 1020 + (H-7h).inMinute()) car elle reflète un bon investissement dans le killer:
* Faire un kill
* Dire à Catherine que c'est une super Vp killer
* Se faire réssurecter (oui ce mot est pas fr mais blk easter egg)
* Acheter une amélioration d'arme ou autre déclinaison

Un autre moyen de gagner des points est d'être au lobby. Il y aura un bouton sur la page des afks. Faut déterminer la valeur de ce bouton je pensais sur 100 points

Un autre moyen de gagner des points est d'utiliser le site. A chaque requête effectué sur le site on gagne quelques points (1,2 ou 3 ?)