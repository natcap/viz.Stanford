let dataset_global = 'Data/data_pol_2d.csv';
let legendTitle = document.getElementsByClassName("title2DLegend")[0];
let gradient_blue = 'radial-gradient( circle at 37%, rgb(105, 190, 255) 29%, rgb(236, 246, 255) 36%, rgb(228, 255, 255) 42%, rgb(215, 254, 255) 49%, rgb(204, 245, 255) 56%, rgb(191, 234, 255) 63%, rgb(147, 193, 227) 70%, rgb(147, 193, 227) 77%, rgb(147, 193, 227) 84%, rgb(81, 119, 164) 91%)';
let counter = 0;
let PN_unit = "eq people fed";
let PN_title = "Pollination-dependent crop production";
var zoom_2D_global = get_global_zoom();
let region_text_global = "Pollination";


let width_global = $(".box.box-2-global").width(),
  height_global = $(".box.box-2-global").height();

let svg_global = d3.select(".map-global").append("svg")
  .attr("id", "svg_map_global")
  
  .on("click", stopped, true);

svg_global.attr('transform', 'translate(0,-60) scale(1.3)');

let g_global = svg_global.append('g');

let projection_global = d3.geoNaturalEarth().scale(d3.min([width_global / 2, height_global / 2]) * 0.49).translate([width_global / 2 - 52, (height_global + 150) / 2]).precision(.1);
let path_global = d3.geoPath().projection(projection_global);
let map_global = document.getElementsByClassName('map-global')[0];

map_global.setAttribute("style", "height: 80%;");

svg_global.call(zoom_2D_global);

let pollination_box = document.getElementById("pollination-box");
let water_box = document.getElementById("water-quality-box");
let coastal_box = document.getElementById("coastal-risk-box");

function load_pollination_data() {
  if (pollination_box.checked == true) {
    if (water_box.checked == false && coastal_box.checked == false) {
      legendTitle.innerHTML = "Pollination Key Areas";
      PN_unit = "eq people fed";
      PN_title = "Pollination-dependent crop production";
      region_text_global = "Pollination";

      dataset_global = 'Data/data_pol_2d.csv'
      parseDataGlobal(dataset_global, draw_points);
    } else {
      legendTitle.innerHTML = "Hotspots";
    }
  } else {
    if (water_box.checked == true) {
      load_waterquality_data();
    }
  }
}

function load_waterquality_data() {
  if (water_box.checked == true) {
    if (pollination_box.checked == false && coastal_box.checked == false) {
      region_text_global = "Water Quality Regulation";
      legendTitle.innerHTML = "WQ Key Areas";
      PN_unit = "kg/Year";
      PN_title = "Nitrogen Pollutant Load";

      dataset_global = 'Data/data_water_2d.csv'
      parseDataGlobal(dataset_global, draw_points);

    } else {
      legendTitle.innerHTML = "Hotspots";
    }


  } else {
    if (pollination_box.checked == true) {
      load_pollination_data();
    }
  }
}

function load_coastalrisk_data() {
  if (coastal_box.checked == true) {
    if (pollination_box.checked == false && water_box.checked == false) {
      region_text_global = "Coastal Risk Mitigation";
      PN_unit = "(Index)";
      PN_title = "Potential Hazard Exposure";
      legendTitle.innerHTML = "CR Key Areas";

      dataset_global = 'Data/data_coastal_2d.csv'
      parseDataGlobal(dataset_global, draw_points);
    } else {
      legendTitle.innerHTML = "Hotspots";
    }
  }
}

// Load pollination data 2D
function ready_global(g, path) {
  d3.json("Data/world/countries.json", function(error, data) {
    if (error) throw error;

    let features = topojson.feature(data, data.objects.units).features;
    g.selectAll("path")
      .data(features)
      .enter().append("path")
      .attr("d", path)
      .attr("fill", "rgb(165, 198, 230)")
      .attr("class", "feature");
    // Creates a mesh around the border
    g.append("path")
      .datum(topojson.mesh(data, data.objects.units, function(a, b) {
        return a !== b;
      }))
      .attr("class", "mesh")
      .attr("d", path);
  });
}

function load_2d_global(dataset) {
  let result = {};
  d3.csv(dataset, function(error, data) {
    data.forEach(function(d) {
      result[d.fid] = d;
    });
  });
  return result;
}

let data_2D_global;
let promise_global = new Promise(function(resolve, reject) {
  ready_global(g_global, path_global);
  setTimeout(() => resolve(1), 400);
});
promise_global.then(function(result) {
   parseDataGlobal(dataset_global, draw_points);
});

// Adding tip for hover
let tip_global = d3.tip()
  .attr('class', 'd3-tip')

  .offset([0, 0])
  // Here d -> is basically the data which is given to the circle -> right now it is just lat long
  .html(function(d) {

    // the data is not coherent, NCP_cur ranges from 1-100 for water + poll but 0-1 for coastal
    let nc = coastal_box.checked == false ? Number(d['NCP_cur']).toFixed(0 ): Number(d['NCP_cur'] * 100).toFixed(0);
    let pop = d.pop == "" ?"No data" : d.pop;

    return '<p style="text-shadow: 1px 1px rgba(59, 59, 59, 0.726); margin:0; padding: 0;">' + d['country'] + "</p>" +
      "<p class='tooltipInfo'>" + "Nature's Contribution: " + nc + "% <br>" +
      "People's Need: <br>" + 
      "&nbsp &nbsp Population density: " + pop + " <br> " +
      "&nbsp &nbsp " + PN_title + ": " + d['PN'] +"</p>";
  })
// Adding tip to the svg
svg_global.call(tip_global);

function getColor(PNpop_value, NCP_value, PNpop_third_q, PNpop_2_third_q, NCP_third_q, NCP_2_third_q) {
  let colors = [
    ["rgb(232,232,244)", "rgb(211,244,215)", "rgb(89,202,93)"],
    ["rgb(248,226,252)", "rgb(137,143,143)", "rgb(33,112,55)"],
    ["rgb(249,95,250)", "rgb(174,38,168)", "rgb(33,38,38)"]
  ];
  var pnpop = 0;
  var ncp = 0;

  if (PNpop_value > PNpop_third_q && PNpop_value < PNpop_2_third_q) {
    pnpop = 1;
  } else if (PNpop_value >= PNpop_2_third_q) {
    pnpop = 2;
  }
  if (NCP_value > NCP_third_q && NCP_value < NCP_2_third_q) {
    ncp = 1;
  } else if (NCP_value >= NCP_2_third_q) {
    ncp = 2;
  }
  return colors[pnpop][ncp];
}

// plot points on the map for 2D global map
function showDataGlobal(the_g, data, PNpop_third_q, PNpop_2_third_q, NCP_third_q, NCP_2_third_q) {

  // This is just for 2D, we are creating a raster by creating a rectangle
  the_g.selectAll(".plot-point")
    .data(data).enter()
    .append("polygon")
    .classed('plot-point', true)
    .attr("points", function(d) {
      let x_1 = projection_global([d['lat1'], d['long1']])[0];
      let y_1 = projection_global([d['lat1'], d['long1']])[1];
      let x_2 = projection_global([d['lat2'], d['long2']])[0];
      let y_2 = projection_global([d['lat2'], d['long2']])[1];
      let x_3 = projection_global([d['lat3'], d['long3']])[0];
      let y_3 = projection_global([d['lat3'], d['long3']])[1];
      let x_4 = projection_global([d['lat4'], d['long4']])[0];
      let y_4 = projection_global([d['lat4'], d['long4']])[1];
      let x_5 = projection_global([d['lat5'], d['long5']])[0];
      let y_5 = projection_global([d['lat5'], d['long5']])[1];

      return (x_1 + ',' + y_1 + ' ' +
        x_2 + ',' + y_2 + ' ' +
        x_3 + ',' + y_3 + ' ' +
        x_4 + ',' + y_4 + ' ' +
        x_5 + ',' + y_5);
    })
    .attr("fill", function(d) {
      return getColor(d['PNpop_c_norm'], d['NCP_cur'], PNpop_third_q, PNpop_2_third_q, NCP_third_q, NCP_2_third_q)
    })
    .on('mouseover', tip_global.show)
    .on('mouseout', tip_global.hide);

}

function get_global_zoom() {
  return d3.zoom()
    .scaleExtent([1, 12])
    .translateExtent([
      [0, 0],
      [$(".map-global").width(), $(".map-global").width() / 2]
    ])
    .extent([
      [0, 0],
      [$(".map-global").width(), $(".map-global").width() / 2]
    ])
    .on("zoom", zoomed_2D_global);
}

// Changes both groups in 2D
function zoomed_2D_global() {
  g_global.attr("transform", d3.event.transform);
}

function draw_points(data) {
  //Data is usable here
  g_global.selectAll('.plot-point').remove();
  array_PNpop_c_norm = [];
  array_NCP_cur = [];
  for (i = 0; i < data.length; i++) {
    array_NCP_cur[i] = Number(data[i]['NCP_cur']);
    array_PNpop_c_norm[i] = Number(data[i]['PNpop_c_norm']);
  }
  showDataGlobal(g_global, data, Quartile_33(array_PNpop_c_norm),
    Quartile_66(array_PNpop_c_norm), Quartile_33(array_NCP_cur), Quartile_66(array_NCP_cur));
}

function parseDataGlobal(url, callBack) {
  Papa.parse(url, {
    download: true,
    dynamicTyping: false, // Parse values as their true type (not as strings)
    header: true, // to parse the data as a dictionary
    complete: function(results) {
      callBack(results.data);
    }
  });
}

function round(value) {
  value = parseFloat(value);
  if (Math.abs(value) > 1000000) {
      return (value / 1000000).toFixed(0) + ' million';
  } else if (Math.abs(value) > 1000) {
      return (value / 1000).toFixed(0) + 'K';
  } else if(value < 1){
    return "NaN";
  } else
      return value.toFixed(0);
}