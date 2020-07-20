class MapPlot {
  static get SCALE() {
    return 380;
  }

  constructor(svg_element_id, mode = "UN", dataSet = "poll") {
    this.svg = d3.select('#' + svg_element_id);

    // may be useful for calculating scales
    const svg_viewbox = this.svg.node().viewBox.animVal;
    this.svgWidth = svg_viewbox.width;
    this.svgHeight = svg_viewbox.height;

    const map_promise_110 = d3.json("Data/map_data/110m.json").then(topojson_raw => {
      const country_features = topojson.feature(topojson_raw, topojson_raw.objects.countries).features;
      // remove leading zeros for the id:s
      country_features.forEach(x => x.id = x.id.replace(/^0+/, ''));
      return country_features;
    })

    const map_promise_50 = d3.json("Data/map_data/50m.json").then(topojson_raw => {
      const country_features = topojson.feature(topojson_raw, topojson_raw.objects.countries).features;
      // remove leading zeros for the id:s
      country_features.forEach(x => x.id = x.id.replace(/^0+/, ''));
      return country_features;
    })

    const country_mapping_ndr_promise = d3.json("Data/preprocessed_data/updated_data3/ndr_countries.json")
    const country_mapping_poll_promise = d3.json("Data/preprocessed_data/updated_data3/poll_countries.json")
    const country_mapping_cv_promise = d3.json("Data/preprocessed_data/updated_data3/cv_countries.json")
    const country_mapping_cv_high_res_promise = d3.json("Data/preprocessed_data/updated_data3/cv_high_res_countries.json")

    const ndr_promise = d3.csv("Data/preprocessed_data/updated_data3/ndr_table_preprocessed.csv").then(data => data)
    const poll_promise = d3.csv("Data/preprocessed_data/updated_data3/poll_table_preprocessed.csv").then(data => data)
    const cv_promise = d3.csv("Data/preprocessed_data/updated_data3/cv_table_preprocessed.csv").then(data => data)
    const cv_high_res_promise = d3.csv("Data/preprocessed_data/updated_data3/cv_high_res_table_preprocessed.csv").then(data => data)

    const cities_promise = d3.csv("Data/city_data/cities1000000.csv").then(data => data)
    const country_label_promise = d3.tsv("Data/map_data/world-110m-country-names.tsv").then(data => data)

    Promise.all([map_promise_110, map_promise_50, country_label_promise, ndr_promise,
      poll_promise, cv_promise, country_mapping_ndr_promise, country_mapping_poll_promise,
      country_mapping_cv_promise, cities_promise, cv_high_res_promise,
      country_mapping_cv_high_res_promise
    ]).then((results) => {

      this.map_data = results[0]; // 110m map
      this.map_data_50 = results[1]; // 50m map
      const country_label_data = results[2]; // country label names

      this.ndr_data = results[3]; // data
      this.poll_data = results[4];
      this.cv_data = results[5];

      this.ndr_country_mapping = results[6]; // mapping between country name and data points
      this.poll_country_mapping = results[7];
      this.cv_country_mapping = results[8];

      this.cities_data = results[9];

      this.cv_high_res_data = results[10];
      this.cvHighResCountryMapping = results[11];

      this.currentData = this.cv_data;
     // showGlobalChart(this.currentData);
      this.currentCountryMapping = this.cv_country_mapping


      // add country name labels to map_data objects
      this.map_data.forEach(x => Object.assign(x, country_label_data.find(country_label => country_label['id'] == x['id'])))
      this.map_data_50.forEach(x => Object.assign(x, country_label_data.find(country_label => country_label['id'] == x['id'])))

      const center_x = this.svgWidth / 2;
      const center_y = this.svgHeight / 2;

      this.scaleExtent = [0.8, 5];
      this.countryBorderWidth = "0.3";
      this.resetScale = MapPlot.SCALE;
      this.resetRotate = [0, 0];
      this.activeClick = d3.select(null)
      this.clickedRotate;
      this.clickedScale;
      this.focused = false;
      this.focusedCountry = "";
      this.currentDatasetName = dataSet;
      this.modes = ["UN", "NC", "pop"]
      this.currentModeName = mode;
      // the current scenario, either 'c', '1', '3' or '5'
      this.scenarios = ["c", "1", "3", "5"];
      this.currentScenario = "1";
      // The population limit for a city to be displayed
      this.pop_limit = 2000000;

      // set current max and min for the data
      this.dataExtent;


      // initialize versor vectors
      this.v0;
      this.r0;
      this.q0;

      this.setCurrentColorScale();
      this.setUNColorScale();

      this.projection = d3.geoOrthographic()
        .rotate([0, 0])
        .scale(MapPlot.SCALE)
        .translate([center_x, center_y]);

      this.path = d3.geoPath(this.projection);

      this.countryTooltip = d3.select("body").append("div").attr("class", "countryTooltip");

      // the main globe object
      let that = this;
      this.svg.selectAll("path")
        .data(this.map_data)
        .enter().append("path")
        .attr("class", "globe")
        .attr("fill", "grey")
        .attr("d", this.path)
        .on("mouseover", function(d) {
          let info = that.getShortInfo(d);
          if(info){
            that.countryTooltip.html(d.name + 
              "<br><p class='tooltipInfo'>Nature's Contribution: " + (100 * info.nc).toFixed(0) + "%" +
              "<br>People Exposed: " + round(info.pop) +
              "<br>" + legendLabels['UN'][that.currentDatasetName] + ":<br>  &nbsp &nbsp" 
              + round(info.potentialBenefit) +" "+ legendLabelsUnits['UN'][that.currentDatasetName]+ "</p>")
              .style("left", (d3.event.pageX + 7) + "px")
              .style("top", (d3.event.pageY - 15) + "px")
              .style("display", "block")
              .style("opacity", 1);
            d3.select(this).classed("selected", true)
          }
          else{
            that.countryTooltip.html(d.name )                          
            .style("left", (d3.event.pageX + 7) + "px")
            .style("top", (d3.event.pageY - 15) + "px")
            .style("display", "block")
            .style("opacity", 1);
          d3.select(this).classed("selected", true)
          }
        })
        .on("mouseout", function(d) {
          that.countryTooltip.style("opacity", 0)
            .style("display", "none");
          d3.select(this).classed("selected", false)
        })
        .on("click", this.clicked())

      // print city text
      this.svg.selectAll("text")
        .data(this.cities_data.filter((d) => d.population > this.pop_limit))
        .enter()
        .append("text")
        .text((d) => d.name)
        .style("fill", "white")

      this.initializeZoom();
      this.update_all();

      d3.selectAll("#landingpage").attr("class", "hidden");
      this.setDataset(dataSet);
      this.allData = {"ndr": this.ndr_data,
      "poll": this.poll_data,
      "cv": this.cv_data}
      updateGlobalCharts(this.UNColorScale, this.allData);
    });

  }

  render() {
    // Update countries
    this.svg.selectAll("path.globe").attr('d', this.path)

    if (!this.focused) {
      let data = this.worldData();

      if (this.currentDatasetName === "cv") { // render regular dots for cv data
        // Remove the country coloring for cv
        this.svg.selectAll("path")
          .attr("fill", "grey")

        let dataSelection = this.svg.selectAll("circle.datapoints").data(data, (d) => d);
        dataSelection.exit().remove();
        this.initWorldMapData(dataSelection);
      } else { 
        this.color_countries_by_average();
      }
    }

    // Update positions of circles
    this.svg.selectAll("circle")
      .attr("transform", (d) => `translate(${this.projection([d.lng, d.lat])})`)

    // print city text
    this.pop_limit = 2000000000000 / this.projection.scale();
    let textSelection = this.svg.selectAll("text")
      .data(this.cities_data.filter((d) => d.population > this.pop_limit), (d) => d);

    textSelection.exit().remove();

    textSelection
      .enter()
      .append("text")
      .text((d) => d.name)
      .style("fill", "white")
      .attr("transform", (d) => `translate(${this.projection([d.longitude, d.latitude])})`)
      .style("display", (d) => {
        let globeDistance = d3.geoDistance([d.longitude, d.latitude], this.projection.invert([this.svgWidth / 2, this.svgHeight / 2]));
        return (globeDistance > 1.42) ? 'none' : 'inline';
      })
  }

  color_countries_by_average() {
    this.svg.selectAll("path")
          .attr("fill", (d) => {
            if (this.currentCountryMapping[d.name] === undefined) {
              return "grey";
            }
            let averages = this.currentCountryMapping[d.name].averages;
            if (averages == null) {
              return "grey";
            } else {
              return this.currentColorScale(averages[`${this.currentModeName}_${this.currentScenario}`]);
            }
          })
  }

  initializeZoom() {
    // Call the zoom on the svg instead of the path elements to make sure that it is possible to drag
    // everywhere on the globe (and not just on land)
    let that = this;
    this.svg.call(d3.zoom()
      .on("start", function() {
        that.v0 = versor.cartesian(that.projection.invert(d3.mouse(this)));
        that.r0 = that.projection.rotate();
        that.q0 = versor(that.r0);
      })
      .on('zoom', function() {
        let scaleFactor = d3.event.transform.k * (that.svgHeight - 10) / 2;
        that.projection.scale(scaleFactor);

        let v1 = versor.cartesian(that.projection.rotate(that.r0).invert(d3.mouse(this)));
        let q1 = versor.multiply(that.q0, versor.delta(that.v0, v1));
        let r1 = versor.rotation(q1);
        r1[2] = 0; // Don't rotate Z axis
        that.projection.rotate(r1);
        that.render()
      })
      .scaleExtent(this.scaleExtent));
  }


  setupQuadtree() {
    let data = this.currentData;
    // Use high res cv data if conditions are met
    if (this.currentDatasetName == "cv" && (this.currentModeName == "NC" || this.currentModeName == "UN")) {
      data = this.cv_high_res_data;
    }
    let quadtree = d3.quadtree()
      .x((d) => d.lng)
      .y((d) => d.lat)
      .addAll(data);
    return quadtree;
  }

  updateNodes(quadtree) {
    quadtree.visit(function(node, x1, y1, x2, y2) {
      node.width = x2 - x1;
    });
  }

  // Find the nodes within the specified rectangle.
  search(quadtree, x0, y0, x3, y3) {
    let pts = [];
    let subPixel = false;
    let subPts = [];
    let scaleFactor;
    switch (this.currentDatasetName) {
      case 'ndr':
        scaleFactor = 1; // let scalefactor be 1 in ndr and poll case, since we want to show every point here
        break;
      case 'poll':
        scaleFactor = 1;
        break;
      case 'cv':
        scaleFactor = 0.0008;
    }

    let nodeScale = Math.pow(this.projection.scale(), 1.05) * scaleFactor;
    let counter = 0;
    let counter2 = 0;

    let mapCenter = this.projection.invert([this.svgWidth / 2, this.svgHeight / 2]);

    quadtree.visit(function(node, x1, y1, x2, y2) {
      let p = node.data;
      let pwidth = node.width * nodeScale;

      // -- if this is too small rectangle only count the branch and set opacity
      if ((pwidth * pwidth) <= 1) {
        // start collecting sub Pixel points
        subPixel = true;
      }
      // -- jumped to super node large than 1 pixel
      else {
        // end collecting sub Pixel points
        if (subPixel && subPts && subPts.length > 0) {

          subPts[0].group = subPts.length;
          let indexOfMax = d3.scan(subPts, (a, b) => parseFloat(b[`${plot_object.currentModeName}_${plot_object.currentScenario}`]) - parseFloat(a[`${plot_object.currentModeName}_${plot_object.currentScenario}`]));
          pts.push(subPts[indexOfMax]); // add only the point with the highest data value
          counter += subPts.length - 1;
          subPts = [];
        }
        subPixel = false;
      }

      if ((p) && d3.geoDistance([p.lng, p.lat], mapCenter) < 1.42) {
        counter2 += 1;
        if (subPixel) {
          subPts.push(p);
        } else {
          if (p.group) {
            delete(p.group);
          }
          pts.push(p);
        }
      }

      // if the quad tree visit rectangle is outside of the search rectangle then we don't want to visit the sub nodes
      // the rather complex logic here is because of the -180/180 longitude border
      if (y2 < y3 - 10 || y1 > y0 + 10) return true; // The added and subtracted 10s are to make sure points are rendered at top and bottom properly
      if (x3 > x0 && x2 > x1) // if none of the areas are over the longitude 180/-180
        return x1 > x3 || x2 < x0; // if true, don't search over this area (because it does not overlap)
      else if (x3 > x0 || x2 > x1) // if one of the areas are over the longitude 180/-180
        return x1 > x3 && x2 < x0;
      else return false // else both areas are over the longitude 180/-180 ==> they are overlapping ==> return false
    });
    return pts;

  }

  // Updates all data using the currentData variable
  update_all(scenario_change = false) {
    this.quadtree = this.setupQuadtree();
    this.updateNodes(this.quadtree);
    if (this.focused) {
      let chartData = this.focusedData();
      let renderData = chartData
      // change renderData to high res if current dataset is cv and the mode is NC or UN
      if (this.currentDatasetName == "cv" && (this.currentModeName == "NC" || this.currentModeName == "UN")) {
        renderData = this.cvHighResFocusedData();
      }

      this.svg.selectAll("circle").remove();
      // Clear the country coloring
      this.svg.selectAll("path")
        .attr("fill", "grey");
      if (!scenario_change) this.setCurrentColorScale();
      this.initFocusedMapData(renderData);
      updateCharts(chartData, this.UNColorScale, this.allfocusedCountryData())
      

    } else {
      if (!scenario_change) this.setCurrentColorScale();
      this.render();
    }
  }

  worldData() {
    let topLeft = this.projection.invert([0, 0]);
    let topRight = this.projection.invert([this.svgWidth, 0]);
    let top = this.projection.invert([this.svgWidth / 2, 0])[1];
    let bottom = this.projection.invert([this.svgWidth / 2, this.svgHeight])[1];
    let bottomLeft = this.projection.invert([0, this.svgHeight]);
    let bottomRight = this.projection.invert([this.svgWidth, this.svgHeight]);

    return this.search(this.quadtree, Math.min(bottomLeft[0], topLeft[0]), top, Math.max(bottomRight[0], topRight[0]), bottom);
  }

  setCurrentColorScale() {
    let hcl = d3.interpolateHcl(colorSchema[this.currentModeName][0], colorSchema[this.currentModeName][1]);
    this.currentColorScale = d3.scaleQuantile()
      .range(d3.quantize(hcl, 7));

    // get the extents for the data of the 4 different scenarios
    let extents = this.scenarios.flatMap((scenario) => d3.extent(this.currentData, x => parseFloat(x[`${this.currentModeName}_${scenario}`])))
    // set the domain to the extent (min and max) of the 4 extents
    this.dataExtent = d3.extent(extents);
    // Use the ${this.currentModeName}_c scenario as the domain, but add the dataExtent points as well to include the outliers
    this.currentColorScale.domain(this.currentData.map(x => parseFloat(x[`${this.currentModeName}_c`])).concat(this.dataExtent));
  }

  /*
  This function sets and saves the UNcolorScale for a particular dataset, so that
  this color scale is always available for the distribution chart in the focused
  mode. (No other color scale should be used for the dist chart since it is
  based on UN)
  */
  setUNColorScale() {
    let hcl = d3.interpolateHcl(colorSchema['UN'][0], colorSchema['UN'][1]);
    this.UNColorScale = d3.scaleQuantile()
      .range(d3.quantize(hcl, 7));

    // get the extents for the data of the 4 different scenarios
    let extents = this.scenarios.flatMap((scenario) => d3.extent(this.currentData, x => parseFloat(x[`UN_${scenario}`])))
    this.UNdataExtent = d3.extent(extents);

    // Use the ${this.currentModeName}_c scenario as the domain, but add the dataExtent points as well to include the outliers
    this.UNColorScale.domain(this.currentData.map(x => parseFloat(x[`UN_c`])).concat(this.UNdataExtent));

  }

  initWorldMapData(worldDataSelection) {
    let that = this;
    worldDataSelection.enter().append("circle")
      .attr("r", 3)
      .attr("class", "datapoints")
      .style("fill", (d) => this.currentColorScale(parseFloat(d[`${this.currentModeName}_${this.currentScenario}`])))
  }

  focusedData() {
    // Get data for just the country that is focused (all data available)
    if(this.currentCountryMapping[`${this.focusedCountry}`]){
      return this.currentCountryMapping[`${this.focusedCountry}`].datapoints.reduce((acc, cur) => {
        acc.push(this.currentData[cur]);
        return acc;
      }, [])
    }
    return [];
    
  }

  cvHighResFocusedData() {
    // get the focused high res country data for cv. This is not done for modes with population
    return this.cvHighResCountryMapping[`${this.focusedCountry}`].datapoints.reduce((acc, cur) => {
      acc.push(this.cv_high_res_data[cur]);
      return acc;
    }, [])
  }

  allfocusedCountryData() {
    const ndr = this.ndr_country_mapping[`${this.focusedCountry}`].datapoints.reduce((acc, cur) => {
      acc.push(this.ndr_data[cur]);
      return acc;
    }, []);



    const poll = this.poll_country_mapping[`${this.focusedCountry}`].datapoints.reduce((acc, cur) => {
      acc.push(this.poll_data[cur]);
      return acc;
    }, []);

    const cv = this.cv_country_mapping[`${this.focusedCountry}`].datapoints.reduce((acc, cur) => {
      acc.push(this.cv_data[cur]);
      return acc;
    }, [])

    return {
      "ndr": ndr,
      "poll": poll,
      "cv": cv
    };
  }


  initFocusedMapData(focusedData) {
    if (this.currentDatasetName === "cv") {
      // Add focused country data
      let focusedDataSelection = this.svg.selectAll("circle.datapoints").data(focusedData, (d) => d);
      focusedDataSelection.enter().append("circle")
        .attr("r", "3")
        .attr("class", "datapoints")
        .attr("transform", (d) => `translate(${this.projection([d.lng, d.lat])})`)
        .style("fill", (d) => this.currentColorScale(d[`${this.currentModeName}_${this.currentScenario}`]))
        .style("display", "inline")
    } else {
      this.color_countries_by_average();
    }
  }


  getShortInfo(d){
    const reducer = (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue);
    this.focusedCountry = d.name;
    let countryData = this.focusedData();
    if(countryData != 0){
      let scenario = this.currentScenario
      let nc = 0;
      let potentialBenefit = 0;

      if(this.currentDatasetName == "cv"){
        nc = this.cvHighResCountryMapping[d.name].averages[`NC_${scenario}`];
        potentialBenefit = this.cvHighResCountryMapping[d.name].averages[`UN_${scenario}`];
      }
      else{
        nc = countryData.map(function(value,index){return value[`NC_${scenario}`];}).reduce(reducer) / countryData.length;
        potentialBenefit = countryData.map(function(value,index){return value[`UN_${scenario}`];}).reduce(reducer);
      }

      let pop = countryData.map(function(value,index){return value[`pop_${scenario}`];}).reduce(reducer);
     
      return {nc,pop,potentialBenefit};
    }
    return null;
  }


  clicked(that = this) {
    return function(d) {
      // hide points
      that.svg.selectAll("circle").remove();
      that.svg.selectAll("text").remove();
      removeCharts();

      if (that.activeClick.node() === this) return that.resetClick(); // zoom out again if click on the same country
      else if (that.activeClick.node() != null) return null; // else if we are already zoomed in, do nothing

      that.focusedCountry = d.name;
      if (that.focusedCountry == undefined) return null;

      // Don't allow clicks during transition
      d3.select(".wrapper").style("pointer-events", "none")

      that.activeClick.classed("active", false);
      that.activeClick = d3.select(this).classed("active", true);

      that.svg.on('.zoom', null).on('.start', null); // disable zoom and drag while focused on a country

      let currentRotate = that.projection.rotate();
      let currentScale = that.projection.scale();
      that.resetRotate = currentRotate;
      that.resetScale = currentScale

      let p_center = d3.geoCentroid(d)

      that.projection.rotate([-p_center[0], -p_center[1]]);
      that.path.projection(that.projection);

      // calculate the scale and translate required:
      let b = that.path.bounds(d);
      that.clickedScale = currentScale * 1.5 / Math.max((b[1][0] - b[0][0]) / (that.svgWidth / 2), (b[1][1] - b[0][1]) / (that.svgHeight / 2));
      that.clickedRotate = that.projection.rotate();

      let end_callback_triggered = false;

      // Update the map:
      d3.selectAll("path")
        .transition()
        .attrTween("d", that.zoomRotateFactory(currentRotate, currentScale, that.clickedRotate, that.clickedScale))
        .duration(1000)
        .on("end", () => {
          if (!end_callback_triggered) {
            that.init_50map(d)
            end_callback_triggered = true
            d3.select(this).classed("selected", false)
            that.focused = true;

            that.update_all();

            // Allow clicks after transition is done
            d3.select(".wrapper").style("pointer-events", "all")
          }
        });

      // Remove the world map data
      // dataSelection.exit().remove()

      // change country name
      updateCountryName(d.name);

      // display reset button and country name
      document.getElementById("countryLabel").style.visibility = 'visible';
    }
  }

  resetClick() {
    this.activeClick.classed("active", false);
    this.activeClick = d3.select(null);

    // Don't allow clicks during transition
    d3.select(".wrapper").style("pointer-events", "none")

    this.init_110map();

    this.focused = false;

    let already_triggered = false;
    this.svg.selectAll("circle").remove();
    this.svg.selectAll("text").remove();

    if(this.currentDatasetName != "cv") {
      this.render()
    }
   

    d3.selectAll("path")
      .transition()
      .attrTween("d", this.zoomRotateFactory(this.clickedRotate, this.clickedScale, this.resetRotate, this.resetScale))
      .duration(1000)
      .on("end", () => {
        if (!already_triggered) {
          this.initializeZoom();
          this.render();
          already_triggered = true;
          // Allow clicks after transition is done
          d3.select(".wrapper").style("pointer-events", "all")
        }
      })

    //show global chart
    updateGlobalCharts(this.UNColorScale, this.allData);
    hideCharts();

    // Remove reset button and country label
    document.getElementById("countryLabel").style.visibility = 'hidden';

  }

  zoomRotateFactory(currRot, currScale, nexRot, nexScale, that = this) {
    return (d) => {
      let r = d3.interpolate(currRot, nexRot);
      let s = d3.interpolate(currScale, nexScale);
      return function(t) {
        that.projection
          .rotate(r(t))
          .scale(s(t));
        that.path.projection(that.projection);
        if (that.path(d) == null) return "";
        else return that.path(d);
      }
    }
  }

  // initializing HD map after zooming in
  init_50map(country_sel) {
    // hide tooltip
    this.countryTooltip.style("opacity", 0)
      .style("display", "none");


    this.svg.selectAll("path.globe").remove().enter()
      .data(this.map_data_50)
      .enter().append("path")
      .attr("class", "globe")
      .attr("fill-opacity", function(d) {if(d.name == country_sel.name) {return "1"} return "0.7"})
      .attr("d", this.path)
      .on("click", () => {
        this.resetClick(false)
      })
    this.render()
  }

  // initializing LOW RES map after zooming out
  init_110map() {
    let that = this;
    this.svg.selectAll("path.globe").remove().enter()
      .data(this.map_data)
      .enter().append("path")
      .attr("class", "globe")
      .attr("fill", "grey")
      .attr("d", this.path)
      .on("click", this.clicked())
      .on("mouseover", function(d) {
        let info = that.getShortInfo(d);
        if(info){
          that.countryTooltip.html(d.name + 
            "<br><p class='tooltipInfo'>Nature's Contribution: " + (100 * info.nc).toFixed(0) + "%" +
            "<br>People Exposed: " + round(info.pop) +
            "<br> Potential Benefit: " + round(info.potentialBenefit) + "</p>")
            .style("left", (d3.event.pageX + 7) + "px")
            .style("top", (d3.event.pageY - 15) + "px")
            .style("display", "block")
            .style("opacity", 1);
          d3.select(this).classed("selected", true)
        }
        else{
          that.countryTooltip.html(d.name )                          
          .style("left", (d3.event.pageX + 7) + "px")
          .style("top", (d3.event.pageY - 15) + "px")
          .style("display", "block")
          .style("opacity", 1);
        d3.select(this).classed("selected", true)
        }
      })
      .on("mouseout", function(d) {
        that.countryTooltip.style("opacity", 0)
          .style("display", "none");
        d3.select(this).classed("selected", false)
      })
  }

  // find country object in json
  getCountryByCode(code) {
    return this.map_data.filter(
      function(map_data) {
        return map_data.name == code
      }
    );
  }

  setDataset(dataset) {
    this.currentDatasetName = dataset;
    switch (this.currentDatasetName) {
      case 'cv':
        this.currentData = this.cv_data;
        this.currentCountryMapping = this.cv_country_mapping;
        break;
      case 'ndr':
        this.currentData = this.ndr_data;
        this.currentCountryMapping = this.ndr_country_mapping;
        break;
      case 'poll':
        this.currentData = this.poll_data;
        this.currentCountryMapping = this.poll_country_mapping;
        break;
    }
    if (this.currentDatasetName != 'cv') this.svg.selectAll("circle").remove();

    this.setUNColorScale();
    this.update_all();
    // update zoom, since the scaleExtent might have changed
    this.initializeZoom();
    this.render();
    // change labels depending on dataset
    updateLabels(`${this.currentDatasetName}`, `${this.currentModeName}`);
    document.getElementById('info_about_measurments').innerText = info_measurements[this.currentModeName][this.currentDatasetName];

  }

  setScenario(scenario) {
    this.currentScenario = scenario;
    this.update_all(true);
  }

  setMode(mode) {
    this.currentModeName = mode;
    this.update_all();
  }

}