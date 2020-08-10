//Layer Styling - these are independent, need separate styling for layers
	var currentAgStyle = {
		"color": "#ff6b1a",
		"fillOpacity":0.9,
		"weight": 0.5,
	};

	var agExpansionStyle = {
		"color": "#ff6b1a",
		"fillOpacity":0.5,
		"weight": 0.5,
	};

	var miningExpansionStyle = {
		"color": "#773399",
		"fillOpacity":0.5,
		"weight": 0.5,
	};

	var tourismExpansionStyle = {
		"color": "#ffd500",
		"fillOpacity":0.7,
		"weight": 0.5,
	};

	var roadStyle = {
		"color": "#8B0000"

	};

	var allRoadsStyle = {
		"color": "#cd7f32",
		"weight": 1,
	};

	var myStyle2 = {
		"color": "green"
	}

	var CMCCGeographicZoneStyle = {
		"color": "#FC4A1A",
		"stroke-width": 2,
		"fillOpacity":0,
	}

	var currentTimberStyle = {
		"color": "#1eb6a7",
		"fillOpacity":0.7,
		"stroke": "#1eb6a7",
		"weight": 0.5,
	}

	var currentTimberInactiveStyle = {
		"color": "#7E7E7E",
		"fillOpacity":0.7,
		"stroke": "#7E7E7E",
		"weight": 0.5,
	}

		var timberExpansionStyle = {
		"color": "#48d1cc",
		"fillOpacity":0.4,
		"stroke": "#48d1cc",
		"weight": 0.5,
	}

	var waterwaysStyle = {
		"color": "#4169E1",
		"fillOpacity":0.8,
		"weight": 0.5,		
	}

	var heatmapClass1Style = {
		"color": "#2c7bb6",
		"stroke": "#2c7bb6",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass2Style = {
		"color": "#3f9ccd",
		"stroke": "#3f9ccd",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass3Style = {
		"color": "#52bde4",
		"stroke": "#52bde4",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass4Style = {
		"color": "#8fd89b",
		"stroke": "#8fd89b",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass5Style = {
		"color": "#daf233",
		"stroke": "#daf233",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass6Style = {
		"color": "#ffed15",
		"stroke": "#ffed15",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass7Style = {
		"color": "#fec940",
		"stroke": "#fec940",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass8Style = {
		"color": "#f99e59",
		"stroke": "#f99e59",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass9Style = {
		"color": "#e85b3a",
		"stroke": "#e85b3a",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapClass10Style = {
		"color": "#d7191c",
		"stroke": "#d7191c",
		"fillOpacity": 1,
		"weight": 0.5,
	} 

		var heatmapStyle = {
		"color": "#BDBDBD",
		"fillOpacity":1,
		"stroke": "#BDBDBD",
		"weight": 0.5,
	}

		var waterFlowsStyle1 = {
		"color": "#f7fbff",
		"fillOpacity":1,
		"stroke": "#f7fbff",
		"weight": 0.5,
	}

		var waterFlowsStyle2 = {
		"color": "#d1e3f3",
		"fillOpacity":1,
		"stroke": "#d1e3f3",
		"weight": 0.5,
	}

		var waterFlowsStyle3 = {
		"color": "#9ac8e1",
		"fillOpacity":1,
		"stroke": "#9ac8e1",
		"weight": 0.5,
	}

		var waterFlowsStyle4 = {
		"color": "#529dcc",
		"fillOpacity":1,
		"stroke": "#529dcc",
		"weight": 0.5,
	}

		var waterFlowsStyle5 = {
		"color": "#1c6cb1",
		"fillOpacity":1,
		"stroke": "#1c6cb1",
		"weight": 0.5,
	}

		var waterFlowsStyle6 = {
		"color": "#08306b",
		"fillOpacity":1,
		"stroke": "#08306b",
		"weight": 0.5,
	}

		var waterQualityStyle1 = {
		"color": "#67000d",
		"fillOpacity":1,
		"stroke": "#67000d",
		"weight": 0.5,
	}

		var waterQualityStyle2 = {
		"color": "#c5161b",
		"fillOpacity":1,
		"stroke": "#c5161b",
		"weight": 0.5,
	}

		var waterQualityStyle3 = {
		"color": "#f44d37",
		"fillOpacity":1,
		"stroke": "#f44d37",
		"weight": 0.5,
	}

		var waterQualityStyle4 = {
		"color": "#fc8f6f",
		"fillOpacity":1,
		"stroke": "#fc8f6f",
		"weight": 0.5,
	}

		var waterQualityStyle5 = {
		"color": "#fdccb8",
		"fillOpacity":1,
		"stroke": "#fdccb8",
		"weight": 0.5,
	}

		var waterQualityStyle6 = {
		"color": "#fff5f0",
		"fillOpacity":1,
		"stroke": "#fff5f0",
		"weight": 0.5,
	}

		var carbonStyle1 = {
		"color": "#ffe0bb",
		"fillOpacity":1,
		"stroke": "#ffe0bb",
		"weight": 0.5,
	}

		var carbonStyle2 = {
		"color": "#b1895d",
		"fillOpacity":1,
		"stroke": "#b1895d",
		"weight": 0.5,
	}

		var carbonStyle3 = {
		"color": "#623200",
		"fillOpacity":1,
		"stroke": "#623200",
		"weight": 0.5,
	}

//Icon Declarations 
	var hotelLodgingIcon = L.icon({
    iconUrl: 'img/bed.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var tourismSitesIcon = L.icon({
    iconUrl: 'img/leaf.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var culturalSitesIcon = L.icon({
    iconUrl: 'img/chichen-itza-pyramid.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var currentMiningIcon = L.icon({
    iconUrl: 'img/pickaxe.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});



	var solarGoodIcon = L.icon({
    iconUrl: 'img/solar-panel-2.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var solarBestIcon = L.icon({
    iconUrl: 'img/solar-panel.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});


	var windGoodIcon = L.icon({
    iconUrl: 'img/wind-2.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var windBestIcon = L.icon({
    iconUrl: 'img/wind.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var tourismSitesIcon = L.icon({
    iconUrl: 'img/leaf.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var cmccCommunityIcon = L.icon({
    iconUrl: 'img/home-run.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var damsIcon = L.icon({
    iconUrl: 'img/dam.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var tourismScoreIcon = L.icon({
    iconUrl: 'img/pin.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});

	var communityWaterIcon = L.icon({
    iconUrl: 'img/water.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
	});
//Popup On Mouse Over

 function popUpOnMouseHover(feature, layer){ //isolate this function out
			layer.on('mouseover', function (e) {
            	this.openPopup();
        	});
       		layer.on('mouseout', function (e) {
            	this.closePopup();
        	});
		}

//Open Link for infoLink
function openLinkOnClick(feature, layer){
	layer.on('click', function (e) {
		var link = feature.properties.infoLink;
		window.open(link);
	})
}

function openPhotoOnClick(feature, layer){
	layer.on('click', function(e){
		var photosphere = feature.properties.photosphereLink;
		window.open(photosphere);
	})
}


//PopUp Content

function popUpCulturalSites(feature, layer){
	layer.bindPopup("<h6>Cultural Sites</h6>" + feature.properties.Name + "<br>" + "<h6>Click icon for more info</h6>");
	popUpOnMouseHover(feature, layer);
	openPhotoOnClick(feature, layer);
}
function popUpNatureSites(feature, layer){
	layer.bindPopup("<h6>Nature Sites</h6>" + feature.properties.Name + "<br>" + "<h6>Click icon for more info</h6>");
	popUpOnMouseHover(feature, layer);
	openPhotoOnClick(feature, layer);
}
function popUpCMCCCommunities(feature, layer){
	layer.bindPopup("<h6>CMCC Communities</h6>" + feature.properties.SETTNAME + " | Population: " + feature.properties.POPULATION);
	popUpOnMouseHover(feature, layer);
}
function popUpHotelSites(feature, layer){
	layer.bindPopup("<h6>Hotel/Lodging</h6>" + feature.properties.Name + "<br>");
	popUpOnMouseHover(feature, layer);
}
function popUpSolarEnergy(feature, layer){
	layer.bindPopup("<h5>Ideal Sites for Solar Farms</h5>" + "<br>" + "<h6>The terrain in the region and the amount of solar energy hitting the surface were examined to determine suitability of this site.</h6>" + "<br>" + "Solar Irradiance: " + feature.properties.PV_out + " kWh/m2" + "<br>" + "<h6>Click icon for info</h6>");
	popUpOnMouseHover(feature, layer);
}
function popUpSolarEnergyGood(feature, layer){
	layer.bindPopup("<h5>Suitable Sites for Solar Farms</h5>" + "<br>" + "<h6>The terrain in the region and the amount of solar energy hitting the surface were examined to determine suitability of this site.</h6>" + "<br>" + "Solar Irradiance: " + feature.properties.PV_out + " kWh/m2" + "<br>" + "<h6>Click icon for info</h6>");
	popUpOnMouseHover(feature, layer);
}
function popUpWindEnergy(feature, layer){
	layer.bindPopup("<h5>Ideal Sites for Wind Farms</h5>" + "<br>" + "<h6>The terrain in the region and the speed of the wind in the region were examined to determine suitability of this site.</h6>" + "<br>" + "Average wind speed: " + feature.properties.v_avg_disp  + " m/s" + "<br>" + "<h6>Click icon for info</h6>")
	popUpOnMouseHover(feature, layer);
}
function popUpWindEnergyGood(feature, layer){
	layer.bindPopup("<h5>Suitable Sites for Wind Farms</h5>" + "<br>" + "<h6>The terrain in the region and the speed of the wind in the region were examined to determine suitability of this site.</h6>" + "<br>" + "Average wind speed: " + feature.properties.v_avg_disp  + " m/s" + "<br>" + "<h6>Click icon for info</h6>")
	popUpOnMouseHover(feature, layer);
}
function popUpSingleMining(feature, layer){
	layer.bindPopup("Click on marker for more information");
	popUpOnMouseHover(feature, layer);
}

function popUpDams(feature, layer){
	var linkName = String(feature.properties.infoLink);
	damsContent = feature.properties.descript  + "<br>" + "<img src='img/damsImage.jpg' width='120'>" + "<br>" + "<h6>Click icon for info</h6>";
	layer.bindPopup(damsContent);//.className(damsPopupStyling);
	popUpOnMouseHover(feature, layer);
	openLinkOnClick(feature, layer);

}

function popUpBullRidge(feature, layer){
	layer.bindPopup("<h6>Timber Concessions</h6>" + "<br>" + "Bull Ridge Limited" + "<br>" + "<img src='img/timberCurrentPopupImage.jpg' width='120'>");
	popUpOnMouseHover(feature, layer);
}

function popUpfd(feature, layer){
	layer.bindPopup("<h6>Timber Concessions</h6>" + "<br>" + "FD Portion MPR" + "<br>" + "<img src='img/timberCurrentPopupImage.jpg' width='120'>");
	popUpOnMouseHover(feature, layer);
}

function popUpRecinos(feature, layer){
	layer.bindPopup("<h6>Timber Concessions</h6>" + "<br>" + "Recinos Management Area" + "<br>" + "<img src='img/timberCurrentPopupImage.jpg' width='120'>");
	popUpOnMouseHover(feature, layer);
}

function popUpplc(feature, layer){
	layer.bindPopup("<h6>Timber Concessions</h6>" + "<br>" + "Pine Lumber Company Ltd." + "<br>" + "<img src='img/timberCurrentPopupImage.jpg' width='120'>");
	popUpOnMouseHover(feature, layer);
}

function popUpTourismScore(feature, layer){
	layer.bindPopup(feature.properties.Name + "<h6>Impacts of Site Development for Tourism</h6>" + "<br>" + "Environmental Impact: " + feature.properties.Env_Impact + "/10" + "<br>" + "Community Impact: " + feature.properties.Com_Impact + "/10" + "<br>" + "<h6>High Environmental Impact Scores indicate that development at this site is likely to have a large impact on the surrounding environment, and high Community Impact Scores indicate that development here is likely to have negative impact on more downstream communities, sites, and businesses.</h6>");
	popUpOnMouseHover(feature, layer);
}

//Popup Links - layer groups only
//function damsLinkClick(){
//	window.open('https://en.wikipedia.org/wiki/Chalillo_Dam');
//}

function energyLinkClick(){
	window.open('data/dataInfoDocuments/renewablesOnePager.pdf');
}

function hotelLinkClick() {
	window.open('https://www.belizehotels.org/interactive-map/');
}

//Pane set up for roads
mymap.createPane('road');
mymap.getPane('road').style.zIndex = 650;
mymap.getPane('road').style.pointerEvents = 'none';

//Layer Data Load In
	var newRoad = new L.Shapefile("data/newRoad.zip", {style: roadStyle, pane: 'road'});

	var agZones = new L.Shapefile("data/ag_defined_v1.zip", {style: currentAgStyle});

	var agExpansion = L.geoJSON.ajax("data/belizeExpansionLayers/agExpansionLayerClip.geojson", {style: agExpansionStyle});


	var waterWays = new L.Shapefile("data/ALEX/WaterWays.zip", {style: waterwaysStyle});
	var waterBody = new L.Shapefile("data/ALEX/WaterBody.zip", {style: waterwaysStyle});
	var majorRivers = new L.Shapefile("data/ALEX/MajorRivers.zip", {style: waterwaysStyle});

	var water = L.layerGroup([waterWays, waterBody, majorRivers]);

	var communityWater = L.geoJSON.ajax("data/communityWaterSites.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, communityWaterIcon)}});

	var hotelLodging = L.geoJSON.ajax("data/hotelResorts.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, hotelLodgingIcon)}, 
		onEachFeature:popUpHotelSites}).on('click', hotelLinkClick);

	var tourismSites = L.geoJSON.ajax("data/tourismData/naturalSitesTourism.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, tourismSitesIcon)}, 
		onEachFeature: popUpNatureSites});
	var culturalSites = L.geoJSON.ajax("data/tourismData/culturalSitesTourism.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, culturalSitesIcon)}, 
		onEachFeature: popUpCulturalSites}); 

	var allTourism = L.layerGroup([tourismSites, culturalSites]);

	var tourismExpanded = L.geoJSON.ajax("data/belizeExpansionLayers/tourismExpansionLayer.geojson", {style: tourismExpansionStyle});

	var cmccCommunities = new L.geoJSON.ajax("data/cmccCommunititesGJ.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, cmccCommunityIcon)}, 
		onEachFeature: popUpCMCCCommunities});

	var cmccGeographicZone = new L.geoJSON.ajax("data/protectedAreas.geojson", {style:CMCCGeographicZoneStyle});

	var bullRidgeCompartmentBoundry = new L.geoJSON.ajax("data/timberConcessions/bullRidgeCompartmentBoundryGJ.geojson", {style: currentTimberStyle, onEachFeature: popUpBullRidge});
	var CFR = new L.Shapefile("data/timberConcessions/CFR.zip", {style: currentTimberInactiveStyle});
	var fdPortionMPR = new L.geoJSON.ajax("data/timberConcessions/fdPortionMPR.geojson", {style: currentTimberInactiveStyle, onEachFeature: popUpfd});
	var plcArea = new L.geoJSON.ajax("data/timberConcessions/plcArea.geojson", {style: currentTimberStyle, onEachFeature: popUpplc});
	var recinosMngtArea = new L.geoJSON.ajax("data/timberConcessions/recinosMngtArea.geojson", {style: currentTimberInactiveStyle, onEachFeature: popUpRecinos});

	var solarGood = new L.geoJSON.ajax("data/energy/solarGoodGJ.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, solarGoodIcon)}, 
		onEachFeature: popUpSolarEnergyGood}).on('click', energyLinkClick);
	var solarBest = new L.geoJSON.ajax("data/energy/solarBestGJ.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, solarBestIcon)}, 
		onEachFeature: popUpSolarEnergy}).on('click', energyLinkClick);
	var windGood = new L.geoJSON.ajax("data/energy/windGoodDisp.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, windGoodIcon)}, 
		onEachFeature:popUpWindEnergyGood}).on('click', energyLinkClick);
	var windBest = new L.geoJSON.ajax("data/energy/windBestDisp.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, windBestIcon)}, 
		onEachFeature:popUpWindEnergy}).on('click', energyLinkClick);
	var energySites = L.layerGroup([solarGood, solarBest, windGood, windBest]);

	var dams = new L.geoJSON.ajax("data/energy/damsFullInfoLink.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, damsIcon)}, 
		onEachFeature:popUpDams})/*.on('click', damsLinkClick)*/;

	var allRoads = new L.Shapefile("data/allRoads.zip", {style: allRoadsStyle});

	var currentMining = new L.geoJSON.ajax("data/miningRegionsGJ.geojson", {pointToLayer:returncurrentMiningMarker});
	var miningSingle = L.marker([16.51408574, -89.12677427], {icon: currentMiningIcon}).bindTooltip("Click icon for more information").on('click', miningMarkerClick);

	var miningExpansion = L.geoJSON.ajax("data/belizeExpansionLayers/miningExpansionLayer.geojson", {style: miningExpansionStyle});

	var timberExpansion = L.geoJSON.ajax("data/belizeExpansionLayers/timberExpansionLayer.geojson", {style: timberExpansionStyle});

	var allEnergy = L.layerGroup([solarBest, solarGood, windBest, windGood, dams]);

	var scoreTourism = L.geoJSON.ajax("data/tourismImpactScore.geojson", {
		pointToLayer: function (json, latlng, iconName) {return returnIconMarker(json, latlng, tourismScoreIcon)}, onEachFeature: popUpTourismScore});

	var agZone = L.layerGroup([agZones]);
		cmccZone = L.layerGroup([cmccGeographicZone]);
		timberConcessions = L.layerGroup([bullRidgeCompartmentBoundry, fdPortionMPR, plcArea, recinosMngtArea]);

	var heatMapNull = L.geoJSON.ajax("data/surveyedImpact.geojson", {style: heatmapStyle});
	var heatmapClass1 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass1.geojson", {style: heatmapClass1Style});
	var heatmapClass2 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass2.geojson", {style: heatmapClass2Style});
	var heatmapClass3 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass3.geojson", {style: heatmapClass3Style});
	var heatmapClass4 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass4.geojson", {style: heatmapClass4Style});
	var heatmapClass5 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass5.geojson", {style: heatmapClass5Style});
	var heatmapClass6 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass6.geojson", {style: heatmapClass6Style});
	var heatmapClass7 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass7.geojson", {style: heatmapClass7Style});
	var heatmapClass8 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass8.geojson", {style: heatmapClass8Style});
	var heatmapClass9 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass9.geojson", {style: heatmapClass9Style});
	var heatmapClass10 = L.geoJSON.ajax("data/heatmapAreaBenefitsImp/heatmapFinalClass10.geojson", {style: heatmapClass10Style});

	var heatmapAllClasses = L.layerGroup([heatMapNull, heatmapClass1, heatmapClass2, heatmapClass3, heatmapClass4, heatmapClass5, heatmapClass6, heatmapClass7, heatmapClass8, heatmapClass9, heatmapClass10]);

	var waterFlowClass1 = L.geoJSON.ajax("data/waterFlows/waterFlowsFinalClass1.geojson", {style: waterFlowsStyle1});
	var waterFlowClass2 = L.geoJSON.ajax("data/waterFlows/waterFlowsFinalClass2.geojson", {style: waterFlowsStyle2});
	var waterFlowClass3 = L.geoJSON.ajax("data/waterFlows/waterFlowsFinalClass3.geojson", {style: waterFlowsStyle3});
	var waterFlowClass4 = L.geoJSON.ajax("data/waterFlows/waterFlowsFinalClass4.geojson", {style: waterFlowsStyle4});
	var waterFlowClass5 = L.geoJSON.ajax("data/waterFlows/waterFlowsFinalClass5.geojson", {style: waterFlowsStyle5});
	var waterFlowClass6 = L.geoJSON.ajax("data/waterFlows/waterFlowsFinalClass6.geojson", {style: waterFlowsStyle6});

	var waterFlowsAllClasses = L.layerGroup([waterFlowClass1, waterFlowClass2, waterFlowClass3, waterFlowClass4, waterFlowClass5, waterFlowClass6]);

	var waterQualityClass1 = L.geoJSON.ajax("data/waterQuality/waterQualityFinalClass1.geojson", {style: waterQualityStyle1});
	var waterQualityClass2 = L.geoJSON.ajax("data/waterQuality/waterQualityFinalClass2.geojson", {style: waterQualityStyle2});
	var waterQualityClass3 = L.geoJSON.ajax("data/waterQuality/waterQualityFinalClass3.geojson", {style: waterQualityStyle3});
	var waterQualityClass4 = L.geoJSON.ajax("data/waterQuality/waterQualityFinalClass4.geojson", {style: waterQualityStyle4});
	var waterQualityClass5 = L.geoJSON.ajax("data/waterQuality/waterQualityFinalClass5.geojson", {style: waterQualityStyle5});
	var waterQualityClass6 = L.geoJSON.ajax("data/waterQuality/waterQualityFinalClass6.geojson", {style: waterQualityStyle6});

	var waterQualityAllClasses = L.layerGroup([waterQualityClass1, waterQualityClass2, waterQualityClass3, waterQualityClass4, waterQualityClass5, waterQualityClass6]);

	var carbonClass1 = L.geoJSON.ajax('data/carbonClasses/carbonFinalClass1.geojson', {style: carbonStyle1});
	var carbonClass2 = L.geoJSON.ajax('data/carbonClasses/carbonFinalClass2.geojson', {style: carbonStyle2});
	var carbonClass3 = L.geoJSON.ajax('data/carbonClasses/carbonFinalClass3.geojson', {style: carbonStyle3});

	var carbonAllClasses = L.layerGroup([carbonClass1, carbonClass2, carbonClass3]);



//Layer Toggling
	//half function set up
function toggleOn(layer, elementIL) { // this one works well above too
	layer.addTo(mymap);
	x = document.getElementById(elementIL);
	x.className = "ILImage";
}

function toggleOff(layer, elementIL) {
	mymap.removeLayer(layer); //toggle off()
	x = document.getElementById(elementIL);
	x.className = "close";
}

//LayerLegendToggleFunction
function layerLegendToggle(layer, elementIL, checkBox) {
	var checkbox = document.getElementById(checkBox);
	if (checkbox.checked == true){
		toggleOn(layer, elementIL);
	} else{
		toggleOff(layer, elementIL);
	}
}


//first three layers start on

newRoadIL = "newRoadIL"
$(document).ready(function(){
	$("#newRoadCheckBox").prop("checked", true);
			newRoad.addTo(mymap);
			x = document.getElementById(newRoadIL); //need onload setting, but not quite working
			x.className = "ILImage";
	});


document.getElementById("newRoadCheckBox").onclick = function(){
	if (this.checked){
		toggleOn(newRoad, newRoadIL);
	} else {
		toggleOff(newRoad, newRoadIL);
	}
}	

watershedsIL = "watershedsIL"
$(document).ready(function(){
	$("#watershedsCheckBox").prop("checked", true);
			water.addTo(mymap);
			x = document.getElementById(watershedsIL); //need onload setting, but not quite working
			x.className = "ILImage";
	});


document.getElementById("watershedsCheckBox").onclick = function(){
	if (this.checked){
		toggleOn(water, watershedsIL);
	} else {
		toggleOff(water, watershedsIL);
	}
}


CMCCCommunitiesIL = "CMCCCommunitiesIL"
$(document).ready(function(){
	$("#CMCCCommunitiesCheckBox").prop("checked", true);
			cmccCommunities.addTo(mymap);
			x = document.getElementById(CMCCCommunitiesIL); //need onload setting, but not quite working
			x.className = "ILImage";
	});


document.getElementById("CMCCCommunitiesCheckBox").onclick = function(){
	if (this.checked){
		toggleOn(cmccCommunities, CMCCCommunitiesIL);
	} else {
		toggleOff(cmccCommunities, CMCCCommunitiesIL);
	}
}


//these layers start off
	tourismArchKeyIL = "tourismArckKeyIL"
	tourismArchKeyCheck = "tourismArchKeyCheckBox"
	document.getElementById("tourismArchKeyCheckBox").onclick = function(){
		layerLegendToggle(allTourism, tourismArchKeyIL, tourismArchKeyCheck);

	}	

	tourismExpansionIL = "tourismExpansionIL"
	tourismExpandedCheck = "tourismExpandedCheckBox"
	document.getElementById("tourismExpandedCheckBox").onclick = function(){
		layerLegendToggle(scoreTourism, tourismExpansionIL, tourismExpandedCheck);
	}			

	//keep this one
	currentMiningIL = "currentMiningIL"
	document.getElementById("miningCheckBox").onclick = function(){
		if (this.checked){
			toggleOn(miningSingle, currentMiningIL);
		} else {
			toggleOff(miningSingle, currentMiningIL);
			mymap.removeLayer(currentMining);
		}
	}	

	function miningMarkerClick(){
		currentMining.addTo(mymap);
	}


	currentAgricultureIL = "currentAgricultureIL"
	currentAgricultureCheck = "currentAgricultureCheckBox"
	document.getElementById("currentAgricultureCheckBox").onclick = function(){
		layerLegendToggle(agZones, currentAgricultureIL, currentAgricultureCheck);
	}	

	hotelResortIL = "hotelResortIL"
	hotelResortCheck = "hotelLodgingCheckBox"
	document.getElementById("hotelLodgingCheckBox").onclick = function(){
		layerLegendToggle(hotelLodging, hotelResortIL, hotelResortCheck);
	}
	

	heatmapIL = "heatmapIL"
	heatmapCheck = "heatmapCheckBox"
	document.getElementById("heatmapCheckBox").onclick = function(){
		layerLegendToggle(heatmapAllClasses, heatmapIL, heatmapCheck);
	}


	currentTimberIL = "currentTimberIL"
	timberCheck = "timberCheckBox"
	document.getElementById("timberCheckBox").onclick = function(){
		layerLegendToggle(timberConcessions, currentTimberIL, timberCheck);
	}	


	energyIL = "energyIL"
	energyCheck = "energyCheckBox"
	document.getElementById("energyCheckBox").onclick = function(){
		layerLegendToggle(dams, energyIL, energyCheck);
	}	

	potentialEnergyIL = "potentialEnergyIL"
	energySitesCheck = "energySitesCheckBox"
	document.getElementById("energySitesCheckBox").onclick = function(){
		layerLegendToggle(energySites, potentialEnergyIL, energySitesCheck);
	}			
	

	CMCCAreasIL = "CMCCAreasIL"
	CMCCAreasCheck = "CMCCAreasCheckBox"
	document.getElementById("CMCCAreasCheckBox").onclick = function(){
		layerLegendToggle(cmccGeographicZone, CMCCAreasIL, CMCCAreasCheck);
	}	

	roadsIL = "roadsIL"
	roadsCheck = "roadsCheckBox"
	document.getElementById("roadsCheckBox").onclick = function(){
		layerLegendToggle(allRoads, roadsIL, roadsCheck);
	}	


	communityWaterIL = "communityWaterIL"
	communityWaterCheck = "communityWaterCheckBox"
	document.getElementById("communityWaterCheckBox").onclick = function(){
		layerLegendToggle(communityWater, communityWaterIL, communityWaterCheck);
	}


	//Variable declaractions for functions below
	waterQualityIL = "waterQualityIL"
	carbonStorageIL = "carbonStorageIL"


	waterFlowIL = "waterFlowIL"
	waterFlowCheck = "waterflowCheckBox"
	var checkbox1 = document.getElementById("waterflowCheckBox");
	document.getElementById("waterflowCheckBox").onclick = function(){
		if (checkbox1.checked == true){
			toggleOff(waterQualityAllClasses, waterQualityIL);
			toggleOff(carbonAllClasses, carbonStorageIL);
			toggleOn(waterFlowsAllClasses, waterFlowIL);
			document.getElementById("waterQualityCheckBox").checked = false;
			document.getElementById("carbonStorageCheckBox").checked = false;
		}
		else{
			toggleOff(waterFlowsAllClasses, waterFlowIL);
		}
	}


	waterQualityIL = "waterQualityIL"
	waterQualityCheck = "waterQualityCheckBox"
	var checkbox2 = document.getElementById("waterQualityCheckBox");
	document.getElementById("waterQualityCheckBox").onclick = function(){
		if (checkbox2.checked == true){
			toggleOff(waterFlowsAllClasses, waterFlowIL);
			toggleOff(carbonAllClasses, carbonStorageIL);
			toggleOn(waterQualityAllClasses, waterQualityIL);
			document.getElementById("waterflowCheckBox").checked = false;
			document.getElementById("carbonStorageCheckBox").checked = false;
		}
		else{
			toggleOff(waterQualityAllClasses, waterQualityIL);
		}
	}	


	carbonStorageIL = "carbonStorageIL"
	carbonStorageCheck = "carbonStorageCheckBox"
	var checkbox3 = document.getElementById("carbonStorageCheckBox");
	document.getElementById("carbonStorageCheckBox").onclick = function(){
		if (checkbox3.checked == true){
			toggleOff(waterFlowsAllClasses, waterFlowIL);
			toggleOff(waterQualityAllClasses, waterQualityIL);
			toggleOn(carbonAllClasses, carbonStorageIL);
			document.getElementById("waterflowCheckBox").checked = false;
			document.getElementById("waterQualityCheckBox").checked = false;
		}
		else{
			toggleOff(carbonAllClasses, carbonStorageIL);
		}
	}	


//Icon setups 
function returnIconMarker (json, latlng, iconName){
	return L.marker(latlng, {
		icon: iconName
	});
}

function returncurrentMiningMarker(json, latlng){
	return L.marker(latlng, {
		icon: currentMiningIcon
	});
}

