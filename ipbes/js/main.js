// loader settings
let opts = {
  lines: 5, // The number of lines to draw
  length: 10, // The length of each line
  width: 10, // The line thickness
  radius: 14, // The radius of the inner circle
  color: 'lime', // #rgb or #rrggbb or array of colors
  speed: 1.9, // Rounds per second
  trail: 40, // Afterglow percentage
  className: 'spinner', // The CSS class to assign to the spinner
};

let info_measurements = {
  UN: {
    ndr: "A Benefit Gap in water quality regulation can be measured by nitrogen export, the amount not retained by vegetation that therefore enters waterways and drinking water supplies as pollution.",
    poll: "A Benefit Gap in pollination can be measured as the amount of crop losses due to insufficiently pollinated crops for pollination.",
    cv: "A Benefit Gap in coastal protection can be measured as the exposure to coastal hazards, the magnitude of exposure still remaining after the attenuation of storm surge by any coastal habitat"
  },
  pop: {
    ndr: "We use rural populations (within 100 km watersheds) as the population exposed because they are presumably less likely to have water treatment options. ",
    poll: "We consider “local” beneficiaries as populations whose dietary requirements exceed pollinator-independent production within 100 km.",
    cv: "People living either nearest to the shoreline or between 0 and 10 m above sea level are considered to be the population exposed, since these are the people most susceptible to flooding, especially with sea level rise. "
  },
  NC: {
    ndr: "Nature’s contribution to meeting potential human need is the proportion of total nitrogen pollutant load retained by ecosystems, the pollution avoided.",
    poll: "Nature’s contribution to pollination is represented by the proportion of total potential pollination- dependent crop output that is produced. ",
    cv: "Nature’s contribution to meeting potential needs for coastal protection  is the proportion of that coastal storm risk that is attenuated by ecosystems"
  }
};

const legendLabels = {
  UN: {
    ndr: "Nitrogen Export",
    poll: "Lost crop production",
    cv: "Coastal Hazard Index"
  },
  pop: {
    ndr: "Rural Population at risk",
    poll: "Pollination-dependent Population",
    cv: "Coastal Population at risk"
  },
  NC: {
    ndr: "Nitrogen Pollution Avoided",
    poll: "Pollination Need Met",
    cv: "Coastal Risk Reduction"
  }
};

const legendLabelsUnits = {
  UN: {
    ndr: "kg/year",
    poll: "eq people fed",
    cv: ""
  },
  pop: {
    ndr: "",
    poll: "",
    cv: ""
  },
  NC: {
    ndr: "",
    poll: "",
    cv: ""
  }
};

whenDocumentLoaded(() => {
  // Initialize dashboard
  addMenu(6);
  is2050 = true;
  colorSchema = {
    UN: [d3.hcl(100, 90, 100), d3.hcl(15, 90, 60)],
    pop: [d3.hcl(305, 70, 110), d3.hcl(305, 70, 30)],
    NC: [d3.hcl(119, 22, 93), d3.hcl(133, 34, 25)]
  };
  plot_object = new MapPlot('globe-plot');
  charts = {
    distribution: new DistributionChart(),
    scenario: new SuperScenarioChart(),
    population: new SuperPopulationChart()
  };
  

  // When the dataset radio buttons are changed: change the dataset
  d3.selectAll(("input[name='radio1']")).on("change", function() {
    plot_object.setDataset(this.value)
  });

  d3.selectAll(("input[name='radio2']")).on("change", function() {
    plot_object.setScenario(this.value)
  });

  showledgend(colorSchema['UN']);
});


function switchMode(mode) {
  plot_object.setMode(mode);

  showledgend(colorSchema[mode]);
  updateLabels(plot_object.currentDatasetName, mode);
  document.getElementById('info_about_measurments').innerText = info_measurements[mode][plot_object.currentDatasetName];
}


// Year toggle
function switchYear(toggle) {
  is2050 = toggle;
};

function showledgend(color) {
  const h = 25, w = 150;
  d3.selectAll(".legend")
    .remove()
    .exit()
  d3.selectAll("#gradient")
    .remove()
    .exit()

  let key = d3.select("#legendBar")
    .attr("width", w)
    .attr("height", h);

  let legend = key.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  legend.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", color[0])
    .attr("stop-opacity", 1);

  legend.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", color[1])
    .attr("stop-opacity", 1);

  key.append("rect")
    .attr("class", "legend")
    .attr("width", w)
    .attr("height", h)
    .attr("x", 3)
    .style("fill", "url(#gradient)");
}

function updateLabels(dataset, mode) {

  document.getElementById('legendHeader').innerHTML =  legendLabels[mode][dataset];
  document.getElementById('legendValue_max').innerHTML =  round(plot_object.dataExtent[1]);
  document.getElementById('distri-y-axis').innerHTML = legendLabels['UN'][dataset];

}

function updateCountryName(name) {
  document.getElementById("countryLabel").innerHTML = name + " &#x2716";
}

function updateCharts(focusedData, colorScale, allfocusedCountryData) {
  if (focusedData == 0) {
    document.getElementById('distribution-chart').style.visibility = 'hidden';
  } else {
    charts.distribution.show(focusedData, colorScale);
  }

  charts.scenario.update(allfocusedCountryData);
  charts.population.update(allfocusedCountryData);
  document.getElementById('compare-scenarios').style.visibility = 'visible';
}

function updateGlobalCharts(UNColorScale, allData){
  charts.scenario.update(allData);
  charts.population.update(allData);
}

function hideCharts() {
  document.getElementById('distribution-chart').style.visibility = 'hidden';
}


function backToGlobe() {
  plot_object.resetClick();
  document.getElementById("countryLabel").style.visibility = 'hidden';
}


function whenDocumentLoaded(action) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", action);
  } else {
    // `DOMContentLoaded` already fired
    action();
  }
}

// For hiding the popup window
function hideInfo() {
  document.getElementById('greyOut').style.visibility = "hidden";
}

// For showing the INFO popup window
function showNow() {
  document.getElementById('greyOut').style.visibility = "visible";
}
function removeCharts() {
  charts.scenario.remove();
  charts.population.remove();
}

function round(value) {
  value = parseFloat(value);
  if (Math.abs(value) > 1000000) {
      return (value / 1000000).toFixed(0) + ' million';
  } else if (Math.abs(value) > 1000) {
      return (value / 1000).toFixed(0) + 'K';
  } else if(value < 1){
    return value.toFixed(1);
  } else
      return value.toFixed(0);
}