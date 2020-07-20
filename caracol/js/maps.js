//Base Map
var mymap = L.map('mapid').setView([16.872890378907783, -88.87390136718749], 10);

//setting up map pane
//mymap.createPane('labels');
//mymap.getPane('labels').style.zIndex= 50; 
//mymap.getPane('labels').style.pointerEvents = 'none';
mymap.createPane('labels');
mymap.getPane('labels').style.zIndex = 650;
mymap.getPane('labels').style.pointerEvents = 'none';
var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        pane: 'labels'
});//.addTo(mymap);


var baseMapOne = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri'
});
baseMapOne.addTo(mymap);


var baseMapTwo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri '
});

var baseMapTwoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19,
	pane: 'labels'
});


//Mini Map
		//mini map 1
		var osmUrl='https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
		var osmAttrib='Tiles &copy; Esri';
		var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 18, attribution: osmAttrib});


		var osm1 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib });
		var miniMap = new L.Control.MiniMap(osm1, { toggleDisplay: true, position:'topleft' });
		//miniMap.addTo(mymap);

		//mini map 2
		var osmUrl2='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
		var osmAttrib2='Tiles &copy; Esri';
		var osm = new L.TileLayer(osmUrl2, {minZoom: 5, maxZoom: 18, attribution: osmAttrib});


		var osm2 = new L.TileLayer(osmUrl2, baseMapTwoLabels, {minZoom: 0, maxZoom: 13, attribution: osmAttrib2 });
		var miniMap2 = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:'topleft' });
		//miniMap2.addTo(mymap);


//Map and Satellite Toggle

miniMap.addTo(mymap);

//display on load event
$(document).ready(function(){
	$("#mapRadio").prop("checked", true);
			miniMap.addTo(mymap);
	});

document.getElementById("mapRadio").onclick = function(){
	if (this.checked){
		mymap.removeLayer(baseMapTwo);
		mymap.removeLayer(baseMapTwoLabels);
		mymap.removeLayer(positronLabels);
		baseMapOne.addTo(mymap);

	}
}

document.getElementById("satelliteRadio").onclick = function(){
	if (this.checked){
		mymap.removeLayer(baseMapOne);
		//mymap.removeLayer(minimap);
		baseMapTwo.addTo(mymap);
		baseMapTwoLabels.addTo(mymap);
		positronLabels.addTo(mymap);
		//miniMap2.addTo(mymap);
	}
}


