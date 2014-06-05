
**Découvrir en live : http://esipe.geonef.fr/seigneur-des-anneaux/**

Apprentis sigistes et informaticiens à l'ESIPE-UPEM et, dans le cadre d'un projet de cartographie, nous avons choisi de faire honneur au monde de Tolkien en essayant de géoréférencer, au plus précis, les informations géographiques relatives à la Terre du Milieu.

Nous avons consacré une bonne partie de notre travail à la recherche d'informations afin d'enrichir notre carte de la Terre du milieu le plus précisément possible. Nous nous sommes concentré sur la période nommée troisième âge car elle retrace l'histoire de Sauron et les péripéties de Bilbon et Frodon Saquet.


Visualiser en WMS sous QGIS
---------------------------

...ou tout autre [client WMS](http://fr.wikipedia.org/wiki/Web_Map_Service).
Procédure pour [QGIS](http://www.qgis.org/) :

 * *Couche* -> *Ajouter une couche WMS*
 * cliquer sur *Nouveau* pour ajouter ce serveur WMS :
   * Nom : *seigneur-des-anneaux* (ou autre)
   * URL : *http://mapserver.esipe.geonef.fr/seigneur-des-anneaux/map?*
 * cliquer *OK* puis de retour à la fenêtre précédente, cliquer en bas sur *Ajouter* puis *Fermer*
 * c'est prêt : la couche devrait apparaître sous quelques secondes, navigable évidemment. Enjoy!


Installation
------------
Le [tutoriel du cours](http://www.geonef.fr/doc/cours/mapserver-et-wms/installation-systeme)
vous guide dans la mise en place de l'environnement sur une machine virtuelle
VirtualBox, donc utilisable depuis Windows, Mac ou Linux.

La machine installée est une *Debian GNU/Linux* exploitant
*MapServer* en FastCGI derrière le serveur HTTP *Nginx*.

Il est bien-sûr possible d'utiliser d'autres environnements comme par
exemple Apache sur Windows.


Auteurs
-------

Projet réalisé par :
 * Mathilde Girardet <mgirar07@etudiant.univ-mlv.fr>
 * Christophe Cannard <ccannard@etudiant.univ-mlv.fr>
 * Benoît Calvet <bcalvet@etudiant.univ-mlv.fr>

étudiants IG2 de
[l'École Supérieure D'Ingénieurs de l'Université Paris-Est Marne-la-Vallée (ESIPE)](http://esipe.u-pem.fr/),
dans le cadre du cours *[Serveurs cartographiques](http://www.geonef.fr/doc/cours/mapserver-et-wms/)*.


Licence
-------

Les fichiers présents dans ce dépôt sont distribués sous les termes de
la licence CeCILL 2.1 contenue dans le fichier [LICENSE](LICENSE) et dont l'original
est disponible à l'URL http://www.cecill.info/licences/Licence_CeCILL_V2.1-fr.html
