async function construct_cases(){

    //////////////////CHAPTER 6//////////////////////
    // Case 6-1
    //console.log("cases",data_loader.cases);
        //create
        data_loader.cases['6-1'].create_data = async function(){
            //preload 6_1-1
            d3.csv("data/line_plot.csv",function(lineplot_data){
                    data_points_acres.push({x: parseInt(lineplot_data['yr'],10) ,y:lineplot_data['Total_Acres']/1000000})
                    data_points_money.push({x: parseInt(lineplot_data['yr'],10),y:lineplot_data['Total_Money']/1000000})
            });
            choropleth_map_county = await shp(window.location.href + "/data/county/counties");
            case_6_1_fig2_data = await  d3.csv("data/acres_new.csv");
            choropleth_from_csv(case_6_1_fig2_data, ['2016'],[0, 0, 1, 5, 10],true,1);

            //preload case_6_1-3
            case_6_1_fig3_data = await d3.csv("data/acres_payments.csv");
            choropleth_from_csv(case_6_1_fig3_data, ['2016'],[0, 0, 20, 40, 80],false,2);
            return;
        }
        //show
        data_loader.cases['6-1'].show = function(button_id){
            clean_layers();
            //console.log(button_id,"button",choropleth_map_objs,'legend-'+button_id);
            description=["Land enrolled in CRP (%)","Soil rental rate (USD/ha)"];
            $("#button-"+button_id).css('background-color','#00cc66');
            choropleth_map_objs['2016geo-'+button_id].addTo(map)//add choropleth layer
            choropleth_map_objs['legend-'+button_id].addTo(map);//add legend
            add_legend_to_right_menu(choropleth_map_objs['legend-'+button_id],"6-1",description[button_id-1]);
        }
        //hide
        data_loader.cases['6-1'].hide = function(){
            $('#button-1').css('background-color', 'rgb(220, 220, 220)');
            $('#button-2').css('background-color', 'rgb(220, 220, 220)');
            map.removeControl(choropleth_map_objs['legend-1']);
            map.removeControl(choropleth_map_objs['legend-2']);
            //map.removeControl(choropleth_map_objs['slider']);

            Object.keys(choropleth_map_objs).forEach(function(key) {
                map.removeLayer(choropleth_map_objs[key]);
            });
        }

    ///////////Case 6-2///////////
    data_loader.cases['6-2'].create_data = async function(a){
        let files=["Aqueducts","Croton_","Incityflow","NY_City","Tunnels","dfw_hudson_river_morphology","huygtfr"];
        colors = ['#ffffff', '#71c7ec', '#189ad3', '#107dac', '#005073',"#214587","#71c7ec"]
        let kml_layer = omnivore.kml("data/6-2/doc.kml");
        add_shape_file(this.id,files,colors,kml_layer);
        return;
    }

    //show
    data_loader.cases['6-2'].show = async function(a){
        for (var layer in this.layers){
            map.addLayer(this.layers[layer]);
        }
    //console.log("6-2")
        return;
    }
    //hide
    data_loader.cases['6-2'].hide = async function(a){
        for (var layer in this.layers){
            map.removeLayer(this.layers[layer]);
        }
        return;
    }

    ///////////Case 6-3///////////

    data_loader.cases['6-3'].show = async function(a){
        var lg;
        var imageUrl = './data/sonuc.png';

        case_6_3_fig1_legend = L.control({position: 'bottomleft'});
        /*
        geojson.eachLayer(function(layer) {
            if (layer.feature.properties.name == 'South Africa') {
                layer.setStyle({fillOpacity: 0});
            }
        });
        */

        case_6_3_fig1_legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend');
            categories = ['0 or no data','0 - 5%','5 - 10%','> 10%','Clearing areas'];
            colors = ['', '#EBB57D', '#CF6042', '#980001', '#386507']
            lgnd = [];

            for (var i = 0; i < categories.length; i++) {
                div.innerHTML +=  lgnd.push('<i style="background:' + colors[i] + '"></i> ' + (categories[i]));
            }

            div.innerHTML = lgnd.join('<br>');
            return div;
            };
        //add legend
        case_6_3_fig1_legend.addTo(map);
        add_legend_to_right_menu(case_6_3_fig1_legend,"6-3","Invasive Alien Species (%)");
        imageBounds = [[-22.046289062500017, 33.80013281250005], [-34.885742187500006, 15.747558593750045]];
        case_6_3_fig1_layer = L.imageOverlay(imageUrl, imageBounds).addTo(map);//add image as overlay on the map using boundaries of South Africa

        return;
    }
    data_loader.cases['6-3'].hide = async function(a){
        map.removeLayer(case_6_3_fig1_layer);
        map.removeControl(case_6_3_fig1_legend);
        geojson.eachLayer(function(layer) {

            if (layer.feature.properties.name == 'South Africa') {
                //layer.setStyle({fillOpacity: 0});
                geojson.resetStyle(layer);
            }
        });
        return;
    }

    /////////case 7-1/////////
    data_loader.cases['7-1'].create_data = async function(a){
        let case_7_1_files=["NHDArea"];
        for (var file in case_7_1_files){
            let shape_file = await shp(window.location.href + "/data/7.1/"+case_7_1_files[file]);
            case_7_1_fig1_layer.push(shape_file);
        }
        let colors=['#71c7ec', 'red', 'yellow', '#ffffff'];
        let overlay_maps={}
        for (var i in case_7_1_fig1_layer){
            color=colors[i];
            overlay_maps[i] = new L.Shapefile(case_7_1_fig1_layer[i], {style:style});
            //console.log("7.1",i,case_7_1_fig1_layer[i]);
        }
    //create layer control by adding layer groups
        case_7_1_fig1_layer_group['layers']=overlay_maps;
        return;
    }

    data_loader.cases['7-1'].show = async function(a){
        for (var layer in case_7_1_fig1_layer_group['layers']){
            map.addLayer(case_7_1_fig1_layer_group['layers'][layer]);
        }
        return;
    }
    data_loader.cases['7-1'].hide = async function(a){
        for (var layer in case_7_1_fig1_layer_group['layers']){
            map.removeLayer(case_7_1_fig1_layer_group['layers'][layer])
        }
        return;
    }
    //case 7-2
    data_loader.cases['7-2'].create_data = async function(a){

      var myIcon = L.icon({
         iconUrl: './static/marker/blue_drop_24.png',
         iconRetinaUrl: './static/marker/blue_drop_48.png',
         iconSize: [24, 24],
         iconAnchor: [9, 21],
         popupAnchor: [0, -14]
       });


       case_7_2_fig1_clusters = L.markerClusterGroup({
         iconCreateFunction: function (cluster) {
           var markers = cluster.getAllChildMarkers();
           var n= markers.length;
           if (n<10){
             var myclassname= 'cluster-small-7-2';
             var size = 20+Math.sqrt(n)*3;}
           else if (n<100){
             var myclassname= 'cluster-medium-7-2';
             var size = 20+Math.sqrt(n)*3;}
           else{
             var myclassname= 'cluster-large-7-2';
             var size = 20+Math.sqrt(n)*3;}

           return L.divIcon({ html: n, className: myclassname +' cluster', iconSize: L.point(size,size) , html: '<span style= "line-height:'+size+'px">'+n+'</span>'});
         },
         //set options
         showCoverageOnHover: true, zoomToBoundsOnClick: false,
         maxClusterRadius: 80, disableClusteringAtZoom: 8
       });

       //case_7_2_fig1_clusters = L.markerClusterGroup();

       for ( var i = 0; i < markers_7_2.length; ++i )
       {
         var popup = '<b>'+markers_7_2[i].Name+'</b>' +
                     '<br/><u>Bank Type:</u> ' + markers_7_2[i].Bank_Type +
                     '<br/><u>Bank Status:</u> ' + markers_7_2[i].Bank_Status;

         var m = L.marker( [markers_7_2[i].lat, markers_7_2[i].lng], {icon:myIcon}).bindPopup( popup )
         .on('mouseover', function (e) {
             this.openPopup();
         }).on('mouseout', function (e) {
             this.closePopup();
        });
         case_7_2_fig1_clusters.addLayer( m );
       }

       //legend
       case_7_2_fig1_legend = L.control({position: 'bottomleft'});
       case_7_2_fig1_legend.onAdd = function (map){
           var div = L.DomUtil.create('div', 'info legend');
           let categories = ['>100','10 - 100','1 - 10','1'];

        colors= ['#033fff','#4a9ff5','#5ff4ee','#c2fcf6'];
        lgnd = [];
        for (var i = 0; i < categories.length-1; i++) {
            div.innerHTML +=  lgnd.push('<i style="background:' + colors[i] + '; border-radius:50%;"></i> ' + (categories[i]));
        }
        div.innerHTML +=  lgnd.push('<i id="blue-drop-icon"></i>'+ (categories[3]))
        div.innerHTML = lgnd.join('<br>');
        return div;
        }

        return;
    }
    data_loader.cases['7-2'].show = async function(a){
        map.addLayer(case_7_2_fig1_clusters);
        case_7_2_fig1_legend.addTo(map);//add legend
        add_legend_to_right_menu(case_7_2_fig1_legend,"7-2","Wetlands (u)");

        return;
    }
    data_loader.cases['7-2'].hide = async function(a){
        map.removeLayer(case_7_2_fig1_clusters);
        map.removeControl(case_7_2_fig1_legend);
        return;
    }
    ///////////// 7-3 //////////////
    data_loader.cases['7-3'].create_data = async function(a){
      var myIcon = L.icon({
         iconUrl: './static/marker/green_pentagon_24.png',
         iconRetinaUrl: './static/marker/green_pentagon_48.png',
         iconSize: [24, 24],
         iconAnchor: [9, 21],
         popupAnchor: [0, -14]
       });


        var markers = [];

        case_7_3_fig1_clusters = L.markerClusterGroup({
          iconCreateFunction: function (cluster) {
            var markers = cluster.getAllChildMarkers();
            var n= markers.length;
            if (n<10){
              var myclassname= 'cluster-small-7-3';
              var size = 30+Math.sqrt(n)*6;}
            else if (n<100){
              var myclassname= 'cluster-medium-7-3';
              var size = 30+Math.sqrt(n)*6;}
            else{
              var myclassname= 'cluster-large-7-3';
              var size = 30+Math.sqrt(n)*6;}

            return L.divIcon({ html: n, className: myclassname+' cluster', iconSize: L.point(size,size) , html: '<span style= "line-height:'+size+'px">'+n+'</span>'});
          },
          //set options
          showCoverageOnHover: true, zoomToBoundsOnClick: false,
          maxClusterRadius: 80, disableClusteringAtZoom: 8
        });

        d3.csv("data/7-3/CA_Conservation Banks.csv",function(mitigation_data){


          var popup = "<b>"+mitigation_data['Name']+"</b>"
                    +"<br><u>Bank Type:</u>"+mitigation_data['Bank Type']+"<br>"
                    +"<u>Bank Status:</u>"+mitigation_data['Bank Status'];
          //create marker
          var m = L.marker([mitigation_data['Y'],mitigation_data['X']], {icon:myIcon}).bindPopup( popup )
            .on('mouseover', function (e) {
                this.openPopup();
            }).on('mouseout', function (e) {
                this.closePopup();
           });



            case_7_3_fig1_clusters.addLayer(m);
            //markers.push(marker);
        });

        //legend
        case_7_3_fig1_legend = L.control({position: 'bottomleft'});
        case_7_3_fig1_legend.onAdd = function (map){
            var div = L.DomUtil.create('div', 'info legend');
            let categories = ['>100','10 - 100','1 - 10','1'];

         colors= ['#3c6e57','#469b4c','#7cb855','#bbe06c'];
         lgnd = [];
         for (var i = 0; i < categories.length-1; i++) {
             div.innerHTML +=  lgnd.push('<i style="background:' + colors[i] + '; border-radius:50%;"></i> ' + (categories[i]));
         }
         div.innerHTML +=  lgnd.push('<i id="green-pentagon-icon"></i>'+ (categories[3]))
         div.innerHTML = lgnd.join('<br>');
         return div;
         }


        return;
    }

    //show
    data_loader.cases['7-3'].show = async function(a){
      map.addLayer(case_7_3_fig1_clusters);
      case_7_3_fig1_legend.addTo(map);//add legend
      add_legend_to_right_menu(case_7_3_fig1_legend,"7-3","Conservation Banks (u)");
      return;
    }


    //hide
    data_loader.cases['7-3'].hide = async function(a){
      map.removeLayer(case_7_3_fig1_clusters);
      map.removeControl(case_7_3_fig1_legend);
      return;
    }

    //case 7-4
    data_loader.cases['7-4'].create_data = async function(a){
      case_7_4_fig1_clusters = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          var markers = cluster.getAllChildMarkers();
          var n= markers.length;
          if (n<10){
            var myclassname= 'cluster-small-7-4';
            var size = 30+Math.sqrt(n)*6;}
          else if (n<100){
            var myclassname= 'cluster-medium-7-4';
            var size = 30+Math.sqrt(n)*6;}

          return L.divIcon({ html: n, className: myclassname+' cluster', iconSize: L.point(size,size) , html: '<span style= "line-height:'+size+'px">'+n+'</span>'});
        },
        //set options
        showCoverageOnHover: true, zoomToBoundsOnClick: false,
        maxClusterRadius: 80, disableClusteringAtZoom: 8
      });

      for ( var i = 0; i < markers_7_4.length; ++i )
      {
        var popup = '<b>'+markers_7_4[i].Name+'</b>' +
                    '<br/><u>Area:</u> ' + markers_7_4[i].Area +' hectares'

        var m = L.marker([markers_7_4[i].Lat, markers_7_4[i].Long], {icon: L.divIcon({
                html: '<i class="fa fa-tree fa-2x" aria-hidden="true" style="color:#b5ff7d;"></i>',
                className: 'myDivIcon'
                })}).bindPopup( popup )
                  .on('mouseover', function (e) {
                      this.openPopup();
                  }).on('mouseout', function (e) {
                      this.closePopup();
                 });

        case_7_4_fig1_clusters.addLayer( m );
      }

      //legend
      case_7_4_fig1_legend = L.control({position: 'bottomleft'});
      case_7_4_fig1_legend.onAdd = function (map){
          var div = L.DomUtil.create('div', 'info legend');
          let categories = ['10+','1 - 10','1'];

       colors= ['#00ad7c','#52d681','#b5ff7d'];
       lgnd = [];
       for (var i = 0; i < categories.length-1; i++) {
           div.innerHTML +=  lgnd.push('<i style="background:' + colors[i] + '; border-radius:50%;"></i> ' + (categories[i]));
       }
       div.innerHTML +=  lgnd.push('<i id="green-tree-icon"></i>'+ (categories[2]))
       div.innerHTML = lgnd.join('<br>');
       return div;
       }


      return;
    }
    data_loader.cases['7-4'].show = async function(a){
        map.addLayer(case_7_4_fig1_clusters);
        case_7_4_fig1_legend.addTo(map);//add legend
        add_legend_to_right_menu(case_7_4_fig1_legend,"7-4","Forest offset projects (u)");
        return;
    }
    data_loader.cases['7-4'].hide = async function(a){
        map.removeLayer(case_7_4_fig1_clusters);
        map.removeControl(case_7_4_fig1_legend);
        return;
    }
    //case 8-1
    data_loader.cases['8-1'].create_data = async function(a){
        geojson = await shp(window.location.href + "/data/brazil/ucs_arpa_br_mma_snuc_2017_w");
        case_8_1_fig1_layer1 = L.geoJson(geojson, {style: {"color": "#00ff99","opacity": 1}});

        data = await $.getJSON('data/brazil/amapoly_ivb.json');
        case_8_1_fig1_layer2 = L.geoJson(data, {style: {"color": "#665BCE", "opacity": 0.5}});

        data = await $.getJSON('data/brazil/amazonriver_865.json');
        case_8_1_fig1_layer3 = L.geoJson(data, {style: {"weight": 5}});
        //console.log("---8-1");
        return;
    }
    //show
    data_loader.cases['8-1'].show = async function(a){
        case_8_1_fig1_layer1.addTo(map);
        case_8_1_fig1_layer2.addTo(map);
        case_8_1_fig1_layer3.addTo(map);

        case_8_1_fig1_legend = L.control({position: 'bottomleft'});

        //create legend
        case_8_1_fig1_legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend');
            categories = ['ARPA System','Amazon Basin','Amazon River'];
            colors = ["#00ff99","rgb(102, 91, 206)",  "rgb(84, 131, 244)"]
            lgnd = [];

            for (var i = 0; i < categories.length; i++) {
                div.innerHTML +=  lgnd.push('<i style="background:' + colors[i] + '"></i> ' + (categories[i]));
            }

            div.innerHTML = lgnd.join('<br>');
            return div;
        };


        case_8_1_fig1_legend.addTo(map);
        add_legend_to_right_menu(case_8_1_fig1_legend,"8-1","Amazon Region Protected Area (ARPA) System");
        return;
    }
    //show
    data_loader.cases['8-1'].hide = async function(a){
            map.removeLayer(case_8_1_fig1_layer1);
            map.removeLayer(case_8_1_fig1_layer2);
            map.removeLayer(case_8_1_fig1_layer3);
            map.removeControl(case_8_1_fig1_legend);
        return;
    }


        ////////case 8-2//////////
        //create
        data_loader.cases['8-2'].create_data = async function(a){
             //"NCED_Polygons_08152017"
             //choropleth map
            let file = await shp(window.location.href + "/data/8-2/NCED_with_")
            this.layers['8-2']=L.geoJson(file, {style: style_blue_8_2});

            //legend
            this.layers['8-2-legend'] = L.control({position: 'bottomleft'});
            this.layers['8-2-legend'].onAdd = function (map){
                var div = L.DomUtil.create('div', 'info legend');
                colors = ['#ffffff', '#71c7ec', '#189ad3', '#107dac', '#005073']
                categories = ['0 - 1%','1 - 20%','20 - 40%','40 - 80%','> 80%'];
                lgnd = [];
                for (var i = 0; i < categories.length; i++) {
                    div.innerHTML +=  lgnd.push('<i style="background:' + colors[i] + '"></i> ' + (categories[i]));
                }
                div.innerHTML = lgnd.join('<br>');
                return div;
            }
            return;
        }
        //show
        data_loader.cases['8-2'].show = async function(a){
        //  description=["blabla(%)"];
          this.layers['8-2'].addTo(map)//add choropleth layer
          this.layers['8-2-legend'].addTo(map);//add legend
          add_legend_to_right_menu(this.layers["8-2-legend"],"8-2","Conservation easements extend in the US(%)");

            console.log("8-2")
            return;
        }
        //hide
        data_loader.cases['8-2'].hide = async function(a){
            for (var layer in Object.keys(this.layers)){
                map.removeLayer(this.layers[Object.keys(this.layers)[layer]]);
            }
            return;
        }


    //case 9-1
    data_loader.cases['9-1'].create_data = async function(a){
        case_9_1_fig1_data = await d3.csv("data/Water_Funds.csv");
        return;
    }
    data_loader.cases['9-1'].show = data_loader.cases['9-1'].show = async function(a){
        data=case_9_1_fig1_data;
        //case_6_1_button_active = '1'

        case_no = 9.1;
        fig_no = 1;
        //init marker lists of each phase
        waterfund_markers['phase_'] = [];
        waterfund_markers['phase_0'] = [];
        waterfund_markers['phase_1'] = [];
        waterfund_markers['phase_2'] = [];
        waterfund_markers['phase_3'] = [];
        waterfund_markers['phase_4'] = [];
        waterfund_markers['phase_5'] = [];

        // iterate over water funds
        for(var i=0;i< data.length;i++){
            //create marker
            var marker = L.marker([data[i]['Latitude'],data[i]['Longitude']], {
                icon: L.divIcon({
                  html: '<i class="fa fa-tint fa-lg" aria-hidden="true" style="color:'+get_marker_color('phase_'+data[i]['Phase_Code'])+'"></i>',
                  className: 'myDivIcon'
                })}
            );

            let text="<b>City:</b>"+data[i]['City']+"<br>"+"<b>Country:</b>"+data[i]['Country'];
            if (data[i]['State']!=""){
                text+="<br>"+"<b>State:</b>"+data[i]['State'];
            }

            //set values in popup
            if (data[i]['Phase']==('Operation'||'Maturity'))
                text+="<br>"+"<b>Operational since:</b>"+data[i]['Operational']


            marker.bindPopup(text).on('mouseover', function (e) {
                this.openPopup();
            }).on('mouseout', function (e) {
                this.closePopup();
            });;

            waterfund_markers['phase_'+data[i]['Phase_Code']].push(marker);
            //waterfund_objs[i]=marker
        }
        //create layer groups containing markers for each case
        waterfund_objs['Potential Future'] = L.layerGroup(waterfund_markers['phase_0'].concat(waterfund_markers['phase_1'].concat(waterfund_markers['phase_']))).addTo(map);
        waterfund_objs['In Development'] = L.layerGroup(waterfund_markers['phase_2'].concat(waterfund_markers['phase_3'])).addTo(map);
        waterfund_objs['Operating'] = L.layerGroup(waterfund_markers['phase_4'].concat(waterfund_markers['phase_5'])).addTo(map);

        var overlayMaps = {
            '<img src="./static/marker/orange_drop_24.png"> Potential Future':    waterfund_objs['Potential Future'],
            '<img src="./static/marker/yellow_drop_24.png"> In Development':        waterfund_objs['In Development'],
            '<img src="./static/marker/green_drop_24.png"> Operating':              waterfund_objs['Operating']
        };



        //waterfund_objs['con_layers'] = L.control.layers(null,overlayMaps,{collapsed:false, position: 'bottomleft'},{'<i id="blue-drop-icon"></i>',});
        waterfund_objs['con_layers'] = L.control.layers(null,overlayMaps,{collapsed:false, position: 'bottomleft'});

        //waterfund_objs['con_layers'] = L.control.layers(null,{'<img src="./static/marker/blue_drop_24.png">Some text':new L.layerGroup(),})

        waterfund_objs['con_layers'].addTo(map)
        $('.leaflet-control-layers-selector:checked')
        add_legend_to_right_menu(waterfund_objs['con_layers'],"9-1","Water Funds phases");
        waterfund_bool=true;
        return;
    }
    data_loader.cases['9-1'].hide = async function(a){
        waterfund_markers=[]
        waterfund_objs['con_layers'].remove(map);
        waterfund_objs['Potential Future'] .clearLayers();
        waterfund_objs['In Development'].clearLayers();
        waterfund_objs['Operating'].clearLayers();
        return;
    }

     ///////9-2/////////
    //create
    data_loader.cases['9-2'].create_data = async function(a){
      //legend
      this.layers['9-2-legend'] = L.control({position: 'bottomleft'});
      this.layers['9-2-legend'].onAdd = function (map){
          var div = L.DomUtil.create('div', 'info legend');
          colors = ['#a45c54','#5c5cac','#ac5cac']
          categories = ['Sagana-Gura','Maragua','Thika-Chania'];
          lgnd = [];
          for (var i = 0; i < categories.length; i++) {
              div.innerHTML +=  lgnd.push('<i style="background:' + colors[i] + '"></i> ' + (categories[i]));
          }
          div.innerHTML = lgnd.join('<br>');
          return div;
      }
    }
    //show
    data_loader.cases['9-2'].show = async function(a){
        this.layers['9-2-legend'].addTo(map);//add legend
        add_legend_to_right_menu(this.layers["9-2-legend"],"9-2","Watersheds");
        imageBounds = [[-0.176425,37.328452], [-1.03,36.532694]];
        data_loader.cases['9-2'].layers["image"] = L.imageOverlay("./data/9-2.png", imageBounds).addTo(map);
        return;
    }
    //hide
    data_loader.cases['9-2'].hide = async function(a){
        map.removeLayer(this.layers["image"]);
    }

    ///////10-3/////////
    //create
    data_loader.cases['10-3'].create_data = async function(a){
        //"NCED_Polygons_08152017"
        this.layers["markers"] = L.layerGroup();
        var locations = [[-28.5,144],[-36,138.5],[-33,142],[-35,144]];
        var texts= ["MURRAY-DARLING BASIN","Murray","Darling","Lachlan"];

        colors=['#81abef','#0050cc'];
        let files=["mdb_boundary","Rivers_in_MDB"];
        add_shape_file(this.id,files,colors);

        for (var i in texts){
            var marker = new L.marker(locations[i], { opacity: 0.01 }); //opacity may be set to zero
            marker.bindTooltip(texts[i], {permanent: true, className: "my-label", offset: [0, 0] });
            marker.addTo(this.layers["markers"])
        }

        return;
    }
    //show
    data_loader.cases['10-3'].show = async function(a){

        for (var i in Object.keys(this.layers)){
            key =  Object.keys(this.layers)[i];
            map.addLayer(this.layers[key]);
        }

        return;
    }
    //hide
    data_loader.cases['10-3'].hide = async function(a){
        for (var i in Object.keys(this.layers)){
            key =  Object.keys(this.layers)[i];
            map.removeLayer(this.layers[key]);
        }
        return;
    }

    ///////11-2/////////
    //create
    data_loader.cases['11-2'].create_data = async function(a){
      data = await $.getJSON('data/brazil/amapoly_ivb.json');
      case_11_2_fig1_layer = L.geoJson(data, {style: {"color": "#665BCE", "opacity": 0.5}});

    return
    }
    //show
    data_loader.cases['11-2'].show = async function(a){
      case_11_2_fig1_layer.addTo(map);

      case_11_2_fig1_legend = L.control({position: 'bottomleft'});

      //create legend
      case_11_2_fig1_legend.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'info legend');
          lgnd = [];

          div.innerHTML +=  lgnd.push('<i style="background:' + "rgb(102, 91, 206)" + '"></i> ' + ('Amazon Basin'));

          div.innerHTML = lgnd.join('<br>');
          return div;
      };
      case_11_2_fig1_legend.addTo(map);
      add_legend_to_right_menu(case_11_2_fig1_legend,"11-2","");

    return
    }
    //hide
    data_loader.cases['11-2'].hide = async function(a){
      map.removeLayer(case_11_2_fig1_layer);
      map.removeControl(case_11_2_fig1_legend);
    return
    }

     ///////13-1/////////
    //create
    data_loader.cases['13-1'].create_data = async function(a){
        //"NCED_Polygons_08152017"
        colors=['rgb(0,204,0)','rgb(61,144,201)'];
        let files=["guanacaste","agropaisaje"];
        add_shape_file(this.id,files,colors);
        this.layers['legend'] = L.control({position: 'bottomleft'});
        this.layers['legend'].onAdd = function (map){
            var div = L.DomUtil.create('div', 'info legend');
            colors=['rgb(0,204,0)','rgb(61,144,201)'];
            categories = ['Guanacaste','Agropaisaje'];
            lgnd = [];
            for (var i = 0; i < categories.length; i++) {
                div.innerHTML +=  lgnd.push('<i style="background:' + colors[i] + '"></i> ' + (categories[i]));
            }
            div.innerHTML = lgnd.join('<br>');
            return div;
        }
    return;
    }
    //show
    data_loader.cases['13-1'].show = async function(a){
        this.layers['legend'].addTo(map);//add legend
        add_legend_to_right_menu(this.layers["legend"],"13-1","Guanacaste Conservation Area");

        map.addLayer(this.layers[1],true);
        map.addLayer(this.layers[0]);
    //console.log("13-1")
        return;
    }
    //hide
    data_loader.cases['13-1'].hide = async function(a){
        for (var layer in this.layers){
            map.removeLayer(this.layers[layer]);
        }
        return;
    }

    ///////14-1/////////
    //show
    data_loader.cases['14-1'].show = async function(a){
        show_image('14-1','./static/figure_and_images/14_1-1.png',
        'US coastal hazard','US coastal hazard','Katie Arkema (Natural Capital Project)');
    //console.log("13-1")
        return;
    }
    //hide
    data_loader.cases['14-1'].hide = async function(a){
        remove_image();
    }


    ///////14-2/////////
    //show
    data_loader.cases['14-2'].show = async function(a){
        show_image('14-2','./static/figure_and_images/14_2-1.png',
        'Huricane population hit','Huricane population hit','Katie Arkema (Natural Capital Project)');

        return;
    }
    //hide
    data_loader.cases['14-2'].hide = async function(a){
        remove_image();
    }

    ///////14-3/////////
/*
    //show
    data_loader.cases['14-3'].show = async function(a){
    show_image('14-3','./static/figure_and_images/14_3-1.png',
    'Belize scenarios');

    return;
    }
    //hide
    data_loader.cases['14-3'].hide = async function(a){
    remove_image();
    }
*/
    //show
    data_loader.cases['16-1'].show = async function(a){
        show_image('16-1','./static/figure_and_images/16_1-1.png',
        'Belize scenarios','Belize scenarios','Katie Arkema (Natural Capital Project)');
    //console.log("13-1")
        return;
    }
    //hide
    data_loader.cases['16-1'].hide = async function(a){
        remove_image();
    }

    //data_loader.preloadDynamicFigures();
    return "cases";
}


function style(feature) {
    //console.log(color);
    return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: color,
        dashArray: '3',
        fillOpacity: 0.7
    };
}


async function add_shape_file(id,files,colors,additional_layer){
    for (var file in files){
        let shape_file = await shp(window.location.href + "/data/"+id+'/'+files[file]);
        data_loader.cases[id].files.push(shape_file);
    }
    let overlay_maps={}
    for (var i in data_loader.cases[id].files){
        shape = data_loader.cases[id].files[i];
        color=colors[i]
        data_loader.cases[id].layers[i] = new L.Shapefile(shape, {style:style});
    }
    if (additional_layer!=null){
        i+=1
        data_loader.cases[id].layers[i] = additional_layer;
    }
//create layer control by adding layer groups
}

function show_image(id, src,alt,title_text,credit_text) {

    var background_overlay = document.createElement('div');
    var divBox = document.getElementById("static-overlay");
    var div_dark = document.getElementById("static-background-overlay");
    div_dark.style.display = "initial";
    var img = document.createElement("img");
    img.left= "0px"; /* Stay in place */
    img.src = src;
    var title = document.createElement("p");
    var credit = document.createElement("p");

    title.style.zIndex = 2000;
    credit.style.zIndex = 2000;
    title.style.color = 'white';
    credit.style.color = '#f1efefb0';
    title.style.textAlign = 'center';
    credit.style.textAlign = 'center';
    title.style.fontSize = '1.4vw';
    credit.style.fontSize = '1.1vw';
    credit.style.fontFamily= 'Maven Pro'
    title.style.fontFamily= 'Maven Pro'
    if(id=='14-1' || id =='14-2'){
      img.style.height = 'auto';
      img.style.width = '52vw';
      $('#static-overlay').css({'top': '20vh', 'left': '8.5vw'})
    }
    else if (id=='14-3'){
      img.style.height = 'auto';
      img.style.width = '52vw';
      $('#static-overlay').css({'top': '15vh', 'left': '8.5vw'})
    }
    else if(id=='16-1'){
      img.style.height = '78vh';
      img.style.width = 'auto';
      $('#static-overlay').css({'top': '10vh', 'left': '12vw'})
    }
    title.innerHTML = title_text
    credit.innerHTML = 'Credits: '+ credit_text


    img.alt = alt;
    img.style.zIndex = 1000000;
    divBox.appendChild(title);
    divBox.appendChild(img);
    divBox.appendChild(credit);


    $('#static-overlay').css('z-index',1000)

}
function remove_image(){
    document.getElementById("static-overlay").innerHTML = "";
    document.getElementById("static-background-overlay").style.display = "none";
    $('#static-overlay').css('z-index',-1)
}
