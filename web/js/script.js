var map;



function init() {
showFunctionnalInformation();
var extent = new OpenLayers.Bounds(-45,21.1,-36,26.25);
var wmsAdress = "http://esipe.geonef.fr/mapserver/seigneur-des-anneaux/project";
map = new OpenLayers.Map('map',{
restrictedExtent: extent
});
//OpenLayers.ProxyHost = "http://10.0.4.2:3128?url=";
var raster = new OpenLayers.Layer.WMS(
	"Raster",
	wmsAdress ,
	{
		layers: 'Middle_Earth',
		maxResolution:10000,
		minResolution:1000,
		transitionEffect: 'resize'
	},
	{
		isBaseLayer:true
	}
);
var poi = new OpenLayers.Layer.WMS(
	"POI",
	wmsAdress ,
	{
		layers: 'POI',
		transparent: 'true'
	},
	{
		visibility:true,
		isBaseLayer:false,
		transitionEffect: 'resize'
	}
);
var plan = new OpenLayers.Layer.WMS(
	"Plan",
	wmsAdress ,
	{
		layers: 'Seas,Fields,Mountains,Forests,Marsh,Hills,Rivers,Lakes,Roads',
		transparent: 'true',
		transitionEffect: 'resize'
	},
	{
		isBaseLayer:false
	}
);

var wms_species = new OpenLayers.Layer.WMS(
	"Species",
	wmsAdress ,
	{
		layers: 'Species,Species_Labels',
		transparent: 'true',
		transitionEffect: 'resize'

	},
	{
		isBaseLayer:false,
		visibility:false
	}
);

var wms_regions = new OpenLayers.Layer.WMS(
	"Regions",
	wmsAdress ,
	{
		layers: 'Regions,Territories,Regions_Labels,Territories_Labels',
		transparent: 'true',
		transitionEffect: 'resize'

	},
	{
		isBaseLayer:false,
		visibility:false
	}
);
var wms_evil = new OpenLayers.Layer.WMS(
	"Evil presence",
	wmsAdress ,
	{
		layers: 'Evil_Presence',
		transparent: 'true',
		transitionEffect: 'resize'

	},
	{
		isBaseLayer:false,
		visibility:false
	}
);
var regions_limits = new OpenLayers.Layer.WMS(
	"Limits",
	wmsAdress ,
	{
		layers: 'Limits,Regions_Labels,Territories_Labels',
		transparent: 'true',
		transitionEffect: 'resize'

	},
	{
		isBaseLayer:false,
		visibility:false
	}
);
var controleSelection = new OpenLayers.Control.WMSGetFeatureInfo({
            url: wmsAdress,
            title: 'Identify features by clicking',
            layers: [poi],
            queryVisible: true,
            eventListeners: {
                getfeatureinfo: function(event) {
                    map.addPopup(new OpenLayers.Popup.FramedCloud(
                        "chicken",
                        map.getLonLatFromPixel(event.xy),
                        null,
                        event.text,
                        null,
                        true
                    ));
                }
            }
        });
map.addControl(new OpenLayers.Control.ScaleLine());
map.addControl(new OpenLayers.Control.OverviewMap());
map.addControl(controleSelection);
controleSelection.activate();
map.addLayers([raster,plan,wms_regions,wms_species,wms_evil,regions_limits,poi]);
var ls = new OpenLayers.Control.LayerSwitcher();
map.addControl(ls);
map.zoomToExtent(extent, true);
}

function displayInfo(){
	if(document.getElementById('information').style.display=='none'){
		document.getElementById('information_container').style.display='inline-block';
		document.getElementById('information').style.display='inline-block';
	}else{
		document.getElementById('information').style.display='none';
		document.getElementById('information_container').style.display='none';
	}
}

function showGeneralInformation(){
var text = "	<div style='width: 100%;'>\
		<input type='image' onClick='showLegends()' alt='Previous' src='./images/previous.png' align='left'/>\
		<input type='image' onClick='showFunctionnalInformation()' alt='Next' src='./images/next.png' align='right'/>\
		</div>\
		<h1>Crédits : </h1>\
		<p><h2>Références utilisées :</h2><p><ul>\
		<li><a href='http://fr.gde-fon.com/download/vieille-carte_Le-Seigneur-des-Anneaux_llaboration/437821/3000x1713' >Provenance du raster : fr.gde-fon.com</a></li>\
		<li><a href='http://www.tolkiendil.com/encyclo'>Tolkiendil</a></li>\
		<li><a href='http://lotr.wikia.com/wiki/Main_Page'>Wiki LOTR</a></li>\
		</ul></p>\
		<p>Les autres données ont été créer par :</p>\
		<ul>\
			<li>Girardet Mathilde,</li>\
			<li>Calvet Benoit,</li>\
			<li>Cannard Christophe</li>\
		</ul>\
		<p style='text-align:justify'>Apprentis sigistes et informaticiens à l'ESIPE-UPEM et, dans le cadre d'un projet de cartographie, nous avons choisi de faire honneur au monde de Tolkien en essayant de géoréférencer, au plus précis, les informations géographiques relatives à la Terre du Milieu.</p>\
		<p>Nous avons consacré une bonne partie de notre travail à la recherche d'informations afin d'enrichir notre carte de la Terre du milieu le plus précisément possible. Nous nous sommes concentré sur la période nommée troisième âge car elle retrace l'histoire de Sauron et les péripéties de Bilbon et Frodon Saquet.</p>\
		<p>Nous avons découpé la terre du milieu en fonction des régions et royaumes de cette ère. Nous avons également matérialisé les forêts, champs, rivières, lacs, collines et montagnes de la terre du milieu. Concernant les points d'interêt, nous avons rassemblé les villes, ponts, lieux caractéristiques, batailles et chemins des deux héros des sagas : \"Le Hobbit\" et \"Le Seigneur des Anneaux\".</p>\
		<p>Par la suite, nous avons écrit un MapFile et construit la page Internet.</p>";
		document.getElementById('information').innerHTML = text;
}
function showFunctionnalInformation(){
var text = "	<div style='width: 100%;'>\
		<input type='image' onClick='showGeneralInformation()' alt='Previous' src='./images/previous.png' align='left'/>\
		<input type='image' onClick='showDatasInformation()' alt='Next' src='./images/next.png' align='right'/>\
		</div>\
		<h1>Fonctionnement : </h1>\
		<p>\
		<h2>Zoom :</h2>\
		<p>Pour zoomer, utilisez la molette de la souris ou les boutons \"+\" et \"-\" situés en haut à gauche.</p>\
		<h2>Gestion des couches :</h2>\
		<p>Pour activer/désactiver les couches, développez le menu de couche en cliquant sur le bouton \"+\" situé en haut à droite.<p/>\
		<h2>Panneau d'informations :</h2>\
		<p>Pour afficher/masquer le panneau que vous consultez actuellement, cliquez sur le \"?\" situé en bas de l'écran.</p>\
		</p>";
	document.getElementById('information').innerHTML = text;
}
function showDatasInformation(){
var text = "	<div style='width: 100%;'>\
		<input type='image' onClick='showFunctionnalInformation()' alt='Previous' src='./images/previous.png' align='left'/>\
		<input type='image' onClick='showCompatibilities()' alt='Next' src='./images/next.png' align='right'/>\
		</div>\
		<h1>Données : </h1>\
		<p>\
		<h2>Couches affichées :</h2>\
		<ul>\
		<li><b>Raster :</b> Fond de plan par défaut</li>\
		<li><b>Plan :</b> Affichage des éléments géographiques standards.</li>\
		<li><b>Regions :</b> Affichage des régions, territoires et leurs libellés.</li>\
		<li><b>Species :</b> Affichage des espèces prédominantes en fonction des territoires.</li>\
		<li><b>Evil presence :</b> Présence du mal présumé pendant la guerre de l'anneau.</li>\
		<li><b>POI :</b> Affichage des lieux, batailles, villes, étapes de l'épopée de Frodon et de Bilbon et autres points d'intérêts.</li>\
		<li><b>Limits :</b> Affichage des régions et leurs libellés.</li>\
		</ul>\
		<h2>Touts layers de MapServer :</h2>\
		<p>\
		<h3>Raster :</h3>\
		<ul>\
		<li><b>Middle_Earth :</b> carte de la Terre du milieu</li>\
		</ul>\
		<h3>Vecteur :</h3>\
		<ul>\
		<li><b>Rivers :</b> Rivières, fleuves et cours d'eau. (Polygone)</li>\
		<li><b>Mountains :</b> Montagnes. (Polygone)</li>\
		<li><b>Lakes :</b> Lacs, étangs et autres étendues d'eau. (Polygone)</li>\
		<li><b>Forests :</b> Forêts et bois. (Polygone)</li>\
		<li><b>Seas :</b> Mers et océans. (Polygone)</li>\
		<li><b>Fields :</b> Plaines. (Polygone)</li>\
		<li><b>Marsh :</b> Marais. (Polygone)</li>\
		<li><b>Hills :</b> Collines. (Polygone)</li>\
		<li><b>Roads :</b> Routes et trajets aller et retour de Frodon. (Line)</li>\
		<li><b>Regions :</b> Régions de la Terre du milieu. (Polygone)</li>\
		<li><b>Territories :</b> Territoires de la Terre du milieu. (Polygone)</li>\
		<li><b>Regions_Labels :</b> Libellés des régions. (Point)</li>\
		<li><b>Territories_Labels :</b> Libellés des territoires. (Point)</li>\
		<li><b>POI :</b> Lieux, batailles, villes, étapes de l'épopée de Frodon et de Bilbon et autres points d'intérêt. (Point)</li>\
		<li><b>Species :</b> Espèces prédominantes en fonction par territoires. (Polygone)</li>\
		<li><b>Species_Labels :</b> Libellés des espèces. (Point)</li>\
		<li><b>Evil_Presence :</b> Présence du mal (présumée) dans les territoires pendant la guerre de l'anneau. (Polygone)</li>\
		<li><b>Limits :</b> Régions de la Terre du milieu. (Polygone)</li>\
		</ul>\
		</p>\
		</p>";
	document.getElementById('information').innerHTML = text;
}
function showCompatibilities(){
var text = "	<div style='width: 100%;'>\
		<input type='image' onClick='showDatasInformation()' alt='Previous' src='./images/previous.png' align='left'/>\
		<input type='image' onClick='showLegends()' alt='Next' src='./images/next.png' align='right'/>\
		</div>\
		<h1>Compatibilités : </h1>\
		<p><p style='color:red'>Pour cause de conflit CORS, les popups sont actuellement indisponibles.</p>\
		<p style='font-weight:bold'>Compatible Chrome : Version 34.0.1847.131 m</p>\
		<p style='font-weight:bold'>Compatible Firefox : Version 29.0.1</p>\
		<p style='font-weight:bold'>Compatible IE : Version 11</p>\
		<p style='font-weight:bold'>Compatible Safari : Version 5.1.7</p></p>";
	document.getElementById('information').innerHTML = text;
}
function showLegends(){
var text = "	<div style='width: 100%;'>\
		<input type='image' onClick='showCompatibilities()' alt='Previous' src='./images/previous.png' align='left'/>\
		<input type='image' onClick='showGeneralInformation()' alt='Next' src='./images/next.png' align='right'/>\
		</div>\
		<h1>Légendes : </h1>\
		<p><table>\
		<tr><td colspan='2'><h2>Plan</h2></td></tr>\
		<tr>\
			<td>Route principale</td>\
			<td><img width='40' height='40'  src='./images/legends/mainRoad.png'/></td>\
		</tr>\
		<tr>\
			<td>Trajet aller de Frodon</td>\
			<td><img width='40' height='40'  src='./images/legends/frodonReturn.png'/></td>\
		</tr>\
		<tr>\
			<td>Trajet retour de Frodon</td>\
			<td><img width='40' height='40'  src='./images/legends/frodonGo.png'/></td>\
		</tr>\
		<tr>\
			<td>Plaines</td>\
			<td><img width='40' height='40'  src='./images/legends/fields.png'/></td>\
		</tr>\
		<tr>\
			<td>Collines</td>\
			<td><img width='40' height='40'  src='./images/legends/hills.png'/></td>\
		</tr>\
		<tr>\
			<td>Marais</td>\
			<td><img width='40' height='40'  src='./images/legends/marsh.png'/></td>\
		</tr>\
		<tr>\
			<td>Montagnes</td>\
			<td><img width='40' height='40'  src='./images/legends/mountains.png'/></td>\
		</tr>\
		<tr>\
			<td>Forêts</td>\
			<td><img width='40' height='40'  src='./images/legends/forest.png'/></td>\
		</tr>\
		<tr>\
			<td>Etendues d'eau</td>\
			<td><img width='40' height='40'  src='./images/legends/lakes.png'/></td>\
		</tr>\
		<tr>\
			<td>Rivières et cours d'eau</td>\
			<td><img width='40' height='40'  src='./images/legends/rivers.png'/></td>\
		</tr>\
		<tr><td colspan='2'><h2>POI</h2></td></tr>\
		<tr>\
			<td>Bataille</td>\
			<td><img width='40' height='40'  src='./images/legends/battle.png'/></td>\
		</tr>\
		<tr>\
			<td>Lieu</td>\
			<td><img width='40' height='40'  src='./images/legends/lieu.png'/></td>\
		</tr>\
		<tr>\
			<td>Etape de Frodon</td>\
			<td><img width='40' height='40'  src='./images/legends/ring.png'/></td>\
		</tr>\
		<tr>\
			<td>Etape de Bilbo</td>\
			<td><img width='40' height='40'  src='./images/legends/dragon.png'/></td>\
		</tr>\
		<tr>\
			<td>Ville</td>\
			<td><img width='40' height='40'  src='./images/legends/castle.png'/></td>\
		</tr>\
		<tr>\
			<td>Divers</td>\
			<td><img width='40' height='40'  src='./images/legends/divers.png'/></td>\
		</tr>\
		<tr><td colspan='2'><h2>Species</h2></td></tr>\
		<tr>\
			<td>Humains</td>\
			<td><img width='40' height='40'  src='./images/legends/humans.png'/></td>\
		</tr>\
		<tr>\
			<td>Orcs</td>\
			<td><img width='40' height='40'  src='./images/legends/orcs.png'/></td>\
		</tr>\
		<tr>\
			<td>Gobelins</td>\
			<td><img width='40' height='40'  src='./images/legends/goblins.png'/></td>\
		</tr>\
		<tr>\
			<td>Hobbits</td>\
			<td><img width='40' height='40'  src='./images/legends/hobbits.png'/></td>\
		</tr>\
		<tr>\
			<td>Nains</td>\
			<td><img width='40' height='40'  src='./images/legends/dwarves.png'/></td>\
		</tr>\
		<tr>\
			<td>Sorciers et Magiciens</td>\
			<td><img width='40' height='40'  src='./images/legends/wizards.png'/></td>\
		</tr>\
		<tr>\
			<td>Elfes</td>\
			<td><img width='40' height='40'  src='./images/legends/elvens.png'/></td>\
		</tr>\
		<tr><td colspan='2'><h2>Evil Presence</h2></td></tr>\
		<tr>\
			<td>Présence du mal forte</td>\
			<td><img width='40' height='40'  src='./images/legends/evil.png'/></td>\
		</tr>\
		<tr>\
			<td>Présence du mal faible</td>\
			<td><img width='40' height='40' src='./images/legends/notEvil.png'/></td>\
		</tr>\
		</table>\
		</p>";
	document.getElementById('information').innerHTML = text;
}