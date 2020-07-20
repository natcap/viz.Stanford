class DistributionChart {

  constructor() {
    // Initialize the barchart
    const svgWidth = 230;
    const svgHeight = 180;
    this.margin = {
      top: 15,
      right: 60,
      bottom: 10,
      left: 20
    };

    this.width = svgWidth - this.margin.left - this.margin.right,
      this.height = svgHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select('#distribution')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.labels = {
      1: "Green Growth",
      3: "Regional Rivalry",
      5: "Fossil Fuels",
      c: "2015"
    };

  }
  /*Function to update the bar chart*/
  update(bins, color) {
    // Change label on header
    document.getElementById('distri-chart-choosen-scenario').innerHTML = this.labels[`${plot_object.currentScenario}`];
    //Remove old data
    this.remove();

    //Preprocess bins
    const labels = bins.selected.map(x => (x.x0 + x.x1) / 2);
    const data = bins.selected.map(x => (x.map(y => y.pop).reduce((a, b) => a + b, 0)));
    const data_current = bins.current.map(x => (x.map(y => y.pop).reduce((a, b) => a + b, 0)));

    //Scale axises
    const x = d3.scaleLinear().range([0, this.width]);
    const y = d3.scaleBand().range([this.height, 0]);
    x.domain([0, max(d3.max(data, d => d), d3.max(data_current, d => d))]);
    y.domain(data.map((d, i) => labels[i])).padding(0);

    // Append x axis
    this.g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).ticks(2).tickSizeInner([-this.height]));

    // Add the bars
    let bars = this.g.selectAll(".bar")
      .data(data)


    // Append bars for selected data
    bars.enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("y", function(d, i) {
        return y(labels[i]);
      })
      .attr("width", function(d) {
        return x(d);
      })
      .attr("fill-opacity", "0.7")
      .style("stroke-opacity", "0.9")
      .style("fill", (d, i) => color((bins.selected[i].x0 + bins.selected[i].x1) / 2))
      .style("stroke", (d, i) => color((bins.selected[i].x0 + bins.selected[i].x1) / 2))
      .style("stroke-width", 1)

    // Append bars for 2015 data
    if (is2050) {
      bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", (d, i) => y(labels[i]))
        .attr("width", (d, i) => x(data_current[i]))
        .attr("stroke-opacity", "0.9")
        .style("fill", "none")
        .style("stroke-width", 1.5)
        .style("stroke", "white");

      bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", this.width - 10)
        .attr("height", 10)
        .attr("y", -13)
        .attr("width", 15)
        .attr("stroke-opacity", "0.5")
        .style("fill", "none")
        .style("stroke-width", 1)
        .style("stroke", "white");

      this.g.append("g")
        .attr("class", "labelText")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .selectAll(".textlabel")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "textlabel")
        .attr("x", this.width + 7)
        .attr("y", -18)
        .text("- 2015");
    }

  }
  remove() {
    this.g.selectAll(".bar")
      .remove()
      .exit()
    this.g.selectAll("g")
      .remove()
      .exit()
  }
  show(focusedData, colorScale) {
    let bins = this.calculateDistribution(focusedData, colorScale.quantiles());
    this.update(bins, colorScale);
    document.getElementById('distribution-chart').style.visibility = 'visible';
  }

  calculateDistribution(focusedData, thresholds) {
    const distri_data_selceted = focusedData.map(x => ({
      UN: parseFloat(x[`UN_${plot_object.currentScenario}`]),
      pop: parseFloat(x[`pop_${plot_object.currentScenario}`])
    }));
    const distri_data_current = focusedData.map(x => ({
      UN: parseFloat(x[`UN_c`]),
      pop: parseFloat(x[`pop_c`])
    }));

    // Accessor function for the objects unmet need property.
    const getUN = d => d.UN;

    // Generate a histogram using twenty uniformly-spaced bins.
    return {
      "selected": d3.histogram()
        .domain(plot_object.UNdataExtent)
        .thresholds(thresholds)
        .value(getUN) // Provide accessor function for histogram generation
      (distri_data_selceted),
      "current": d3.histogram()
        .domain(plot_object.UNdataExtent)
        .thresholds(thresholds)
        .value(getUN) // Provide accessor function for histogram generation
      (distri_data_current)
    };
  }
}
class ScenarioChart {

  constructor() {
    // Initialize the barchart
    const svgWidth = 255;
    const svgHeight = 180;
    this.margin = {
      top: 20,
      right: 2,
      bottom: 10,
      left: 30
    };

    this.width = svgWidth - this.margin.left - this.margin.right,
      this.height = svgHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select('#scenario-comparison-svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.labels = ["Green Growth", "Regional Rivalry", "Fossil Fuels"];
  }
  /*Function to update the bar chart*/
  update(focusedData) {
    // Remove old data
    this.remove();

    // calculate changes
    const data = this.calculateChangeInUnmetNeed(focusedData)
    // Scale axis
    const y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([min(d3.min(data, d => d), 0), max(0, d3.max(data, d => d))]);
    const x = d3.scaleBand().range([0, this.width]);
    x.domain(data.map((d, i) => this.labels[i])).padding(0.1);

    // Add new bars
    this.g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", (d, i) => {
        switch (i % 3) {
          case 0:
            return 'bar greenGrowth';
          case 1:
            return 'bar regionalRivalry';
          case 2:
            return 'bar fossilFuels';
        }
      })
      .attr("y", d => d < 0 ? y(0) : y(d))
      .attr("x", (d, i) => x(this.labels[i]))
      .attr("width", d => x.bandwidth())
      .attr("height", d => Math.abs(y(d) - y(0)))

    const paddingTop = Math.abs(y(max(0, d3.max(data, d => d))) - y(0))
    const xAxis = d3.axisBottom(d3.scaleLinear().range([0, this.width - 1])).ticks(0)
    this.g.append("g")
      .attr("transform", "translate(" + "0," + paddingTop + ")")
      .attr("class", "X axis")
      .call(xAxis);

    // Append values
    this.g.append("g")
      .attr("class", "labelText")
      .selectAll(".textlabel")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("x", (d, i) => x(this.labels[i]) + x.bandwidth() / 2)
      .attr("y", d => d > 0 ? y(d) + 13 : y(d) - 5)
      .text(d => d.toFixed(0) + "%");

    // Append scenario labels
    this.g.append("g")
      .attr("class", "labelText")
      .selectAll(".textlabel")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("x", (d, i) => x(this.labels[i]) + x.bandwidth() / 2)
      .attr("y", -5)
      .style("width", x.bandwidth())
      .style("height", 20)
      .style("font-size", "0.6rem")
      .html((d, i) => this.labels[i]);

    //Append tics and Y-axis
    this.g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y)
        .ticks(5, "s"));
  }
  remove() {
    this.g.selectAll(".bar.greenGrowth")
      .remove()
      .exit()
    this.g.selectAll(".bar.regionalRivalry")
      .remove()
      .exit()
    this.g.selectAll(".bar.fossilFuels")
      .remove()
      .exit()
    this.g.selectAll("g")
      .remove()
      .exit()
  }

  calculateChangeInUnmetNeed(focusedData) {
    if (focusedData == 0) {
      return [0, 0, 0];
    }
    let UN_c = 0,
      UN_1 = 0,
      UN_3 = 0,
      UN_5 = 0;

    focusedData.forEach((d) => {
      if (d) {
        UN_c += parseFloat(d.UN_c);
        UN_1 += parseFloat(d.UN_1);
        UN_3 += parseFloat(d.UN_3);
        UN_5 += parseFloat(d.UN_5);
      }
    });

    return [(UN_1 / UN_c - 1) * 100, (UN_3 / UN_c - 1) * 100, (UN_5 / UN_c - 1) * 100];
  }
}

class SuperScenarioChart {

  constructor() {
    // Initialize the barchart
    const svgWidth = 255;
    const svgHeight = 200;
    this.margin = {
      top: 20,
      right: 2,
      bottom: 10,
      left: 30
    };

    this.width = svgWidth - this.margin.left - this.margin.right,
      this.height = svgHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select('#scenario-comparison-svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.serviceLabels = ["Coastal Risk", "Water Quality", "Pollination"];
    this.scenarioLabels = ["Green Growth", "Regional Rivalry", "Fossil Fuels"];

    // Define the div for the tooltip
    this.tooltip = d3.select('body').append("div").attr("class", "tooltip").style("opacity", 0);

  }
  /*Function to update the bar chart*/
  update(focusedData) {
    // Remove old data
    this.remove();

    // transform index
    let getServiceIndex = (i) => (i - i % 3) / 3;
    let getScenarioIndex = (i) => i % 3;

    // calculate changes
    let data = this.refineData(focusedData);
    // Scale axis
    const y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([min(d3.min(data, d => d), 0), max(0, d3.max(data, d => d))]);
    const x = d3.scaleBand().range([0, this.width]);
    x.domain(data.map((d, i) => this.serviceLabels[getServiceIndex(i)])).padding(0.1);

    // Add new bars
    this.g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", (d, i) => {
        switch (getScenarioIndex(i)) {
          case 0:
            return 'bar greenGrowth';
          case 1:
            return 'bar regionalRivalry';
          case 2:
            return 'bar fossilFuels';
        }
      })
      .attr("y", d => d < 0 ? y(0) : y(d))
      .attr("x", (d, i) => {
        switch (getScenarioIndex(i)) {
          case 0:
            return x(this.serviceLabels[getServiceIndex(i)]) + 7;
          case 1:
            return x(this.serviceLabels[getServiceIndex(i)]) + x.bandwidth() - 38;
          case 2:
            return x(this.serviceLabels[getServiceIndex(i)]) + 2 * x.bandwidth() - 83;
        }
      })
      .attr("width", d => x.bandwidth() - 45)
      .attr("height", d => Math.abs(y(d) - y(0)))
      .on("mouseover", (d, i, nodes) => {
        const tooltipClass = d > 0 ? '<p class="tooltip_positive">' : '<p class="tooltip_negative">';
        this.tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        this.tooltip.html('<p class="tooltip_scenario">' + this.scenarioLabels[getScenarioIndex(i)] + '</p>' +
            tooltipClass + d.toFixed(0) + '%</p>')
          .style("left", (d3.event.pageX - 40) + "px")
          .style("top", (d3.event.pageY - 50) + "px")
          .style("font-size", '0.8rem');

        d3.select(nodes[i]).attr("stroke-opacity", "0.5")
          .style("stroke-width", 1)
          .style("stroke", "white");
      })
      .on("mouseout", (d, i, nodes) => {
        this.tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        d3.select(nodes[i]).attr("stroke-opacity", "0")
          .style("stroke-width", 0);
      });

    const paddingTop = Math.abs(y(max(0, d3.max(data, d => d))) - y(0))
    const xAxis = d3.axisBottom(d3.scaleLinear().range([0, this.width - 1])).ticks(0)
    this.g.append("g")
      .attr("transform", "translate(" + "0" + "," + paddingTop + ")")
      .attr("class", "X axis")
      .call(xAxis);

    this.g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y)
        .ticks(5, "s"));

    // Append Service labels
    this.g.append("g")
      .attr("class", "labelText")
      .selectAll(".textlabel")
      .data(this.serviceLabels)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("x", (d, i) => x(d) + x.bandwidth() / 2)
      .attr("y", -5)
      .style("width", x.bandwidth())
      .style("height", 20)
      .text((d, i) => d);
   
    // nodata label
    let checkingData = [data[0],data[3],data[6]];
     this.g.append("g")
      .attr("class", "labelText")
      .selectAll(".textlabel")
      .data(this.serviceLabels)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("x", (d, i) => x(d) + x.bandwidth() / 2)
      .attr("y", y(0) - 20)
      .style("width", x.bandwidth())
      .style("height", 20)
      .text((d, i) => Math.abs(checkingData[i]) > 0 ? "" : "no data");
  }
  remove() {
    this.g.selectAll(".bar.greenGrowth")
      .remove()
      .exit()
    this.g.selectAll(".bar.regionalRivalry")
      .remove()
      .exit()
    this.g.selectAll(".bar.fossilFuels")
      .remove()
      .exit()
    this.g.selectAll("g")
      .remove()
      .exit()
  }

  refineData(allData) {
    return this.calculateChangeInUnmetNeed(allData.cv)
      .concat(this.calculateChangeInUnmetNeed(allData.ndr))
      .concat(this.calculateChangeInUnmetNeed(allData.poll))
  }

  calculateChangeInUnmetNeed(focusedData) {
    if (focusedData == 0) {
      return [0, 0, 0];
    }
    let UN_c = 0,
      UN_1 = 0,
      UN_3 = 0,
      UN_5 = 0;

    focusedData.forEach((d) => {
      if (d) {
        UN_c += parseFloat(d.UN_c);
        UN_1 += parseFloat(d.UN_1);
        UN_3 += parseFloat(d.UN_3);
        UN_5 += parseFloat(d.UN_5);
      }
    });

    return [(UN_1 / UN_c - 1) * 100, (UN_3 / UN_c - 1) * 100, (UN_5 / UN_c - 1) * 100];
  }

}

class PopulationChart {
  constructor() {
    // Initialize the barchart
    const svgWidth = 255;
    const svgHeight = 180;
    this.margin = {
      top: 20,
      right: 2,
      bottom: 10,
      left: 30
    };

    this.width = svgWidth - this.margin.left - this.margin.right,
      this.height = svgHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select('#population-comparison-svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.labels = ["Green Growth", "Regional Rivalry", "Fossil Fuels"];
  }
  /*Function to update the bar chart*/
  update(focusedData) {
    // Remove old data
    this.remove();

    // calculate changes
    const data = this.getPopulation(focusedData)
    // Scale axis
    const y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([min(d3.min(data, d => d), 0), max(0, d3.max(data, d => d))]);
    const x = d3.scaleBand().range([0, this.width]);
    x.domain(data.map((d, i) => this.labels[i])).padding(0.1);

    // Add new bars
    this.g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", (d, i) => {
        switch (i % 3) {
          case 0:
            return 'bar greenGrowth';
          case 1:
            return 'bar regionalRivalry';
          case 2:
            return 'bar fossilFuels';
        }
      })
      .attr("y", d => d < 0 ? y(0) : y(d))
      .attr("x", (d, i) => x(this.labels[i]))
      .attr("width", d => x.bandwidth())
      .attr("height", d => Math.abs(y(d) - y(0)))

    const paddingTop = Math.abs(y(max(0, d3.max(data, d => d))) - y(0))
    const xAxis = d3.axisBottom(d3.scaleLinear().range([0, this.width - 1])).ticks(0)
    this.g.append("g")
      .attr("transform", "translate(" + "0," + paddingTop + ")")
      .attr("class", "X axis")
      .call(xAxis);

    // Append values
    this.g.append("g")
      .attr("class", "labelText")
      .selectAll(".textlabel")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("x", (d, i) => x(this.labels[i]) + x.bandwidth() / 2)
      .attr("y", d => d > 0 ? y(d) + 13 : y(d) - 5)
      .text(d => round(d));

    // Append scenario labels
    this.g.append("g")
      .attr("class", "labelText")
      .selectAll(".textlabel")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("x", (d, i) => x(this.labels[i]) + x.bandwidth() / 2)
      .attr("y", -5)
      .style("width", x.bandwidth())
      .style("height", 20)
      .style("font-size", "0.6rem")
      .text((d, i) => this.labels[i]);

    //Append Y-axis
    this.g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y)
        .ticks(5, "s"));
  }
  remove() {
    this.g.selectAll(".bar.greenGrowth")
      .remove()
      .exit()
    this.g.selectAll(".bar.regionalRivalry")
      .remove()
      .exit()
    this.g.selectAll(".bar.fossilFuels")
      .remove()
      .exit()
    this.g.selectAll("g")
      .remove()
      .exit()
  }

  getPopulation(focusedData) {
    if (focusedData == 0) {
      return [0, 0, 0];
    }
    let pop_c = 0,
      pop_1 = 0,
      pop_3 = 0,
      pop_5 = 0;

    focusedData.forEach((d) => {
      if (d) {
        pop_c += parseFloat(d.pop_c);
        d.UN_c < d.UN_1 ? pop_1 += parseFloat(d.pop_1) : pop_1 += 0;
        d.UN_c < d.UN_3 ? pop_3 += parseFloat(d.pop_3) : pop_3 += 0;
        d.UN_c < d.UN_5 ? pop_5 += parseFloat(d.pop_5) : pop_5 += 0;
      }
    });
    return [pop_1, pop_3, pop_5];
  }


}
class SuperPopulationChart {

  constructor() {
    // Initialize the barchart
    const svgWidth = 255;
    const svgHeight = 190;
    this.margin = {
      top: 20,
      right: 2,
      bottom: 10,
      left: 35
    };

    this.width = svgWidth - this.margin.left - this.margin.right,
      this.height = svgHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select('#population-comparison-svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.serviceLabels = ["Coastal Risk ", "Water Quality", "Pollination"];
    this.scenarioLabels = ["Green Growth", "Regional Rivalry", "Fossil Fuels"];

    // Define the div for the tooltip
    this.tooltip = d3.select('body').append("div").attr("class", "tooltip").style("opacity", 0);

  }
  /*Function to update the bar chart*/
  update(focusedData) {
    // Remove old data
    this.remove();

    // transform index
    let getServiceIndex = (i) => (i - i % 3) / 3;
    let getScenarioIndex = (i) => i % 3;

    // calculate changes
    let data = this.getTotalPopulation(focusedData);

    // Scale axis
    const y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([min(d3.min(data, d => d), 0), max(0, d3.max(data, d => d))]);
    const x = d3.scaleBand().range([0, this.width]);
    x.domain(data.map((d, i) => this.serviceLabels[getServiceIndex(i)])).padding(0.1);


    // Add new bars
    this.g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", (d, i) => {
        switch (getScenarioIndex(i)) {
          case 0:
            return 'bar greenGrowth';
          case 1:
            return 'bar regionalRivalry';
          case 2:
            return 'bar fossilFuels';
        }
      })
      .attr("y", d => d < 0 ? y(0) : y(d))
      .attr("x", (d, i) => {
        switch (getScenarioIndex(i)) {
          case 0:
            return x(this.serviceLabels[getServiceIndex(i)]) + 7;
          case 1:
            return x(this.serviceLabels[getServiceIndex(i)]) + x.bandwidth() - 38;
          case 2:
            return x(this.serviceLabels[getServiceIndex(i)]) + 2 * x.bandwidth() - 83;
        }
      })
      .attr("width", d => x.bandwidth() - 45)
      .attr("height", d => Math.abs(y(d) - y(0)))
      .on("mouseover", (d, i, nodes) => {
        this.tooltip.transition()
          .duration(200)
          .style("opacity", .9);

        this.tooltip.html('<p class="tooltip_scenario">' + this.scenarioLabels[getScenarioIndex(i)] + '</p>' + round(d));
        this.tooltip
          .style("left", (d3.event.pageX - 40) + "px")
          .style("top", (d3.event.pageY - 60) + "px")
          .style("font-size", '0.8rem');

        d3.select(nodes[i]).attr("stroke-opacity", "0.5")
          .style("stroke-width", 1)
          .style("stroke", "white");
      })
      .on("mouseout", (d, i, nodes) => {
        this.tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        d3.select(nodes[i]).attr("stroke-opacity", "0")
          .style("stroke-width", 0);
      });

    const paddingTop = Math.abs(y(max(0, d3.max(data, d => d))) - y(0))
    const xAxis = d3.axisBottom(d3.scaleLinear().range([0, this.width - 1])).ticks(0)
    this.g.append("g")
      .attr("transform", "translate(" + "0" + "," + paddingTop + ")")
      .attr("class", "X axis")
      .call(xAxis);

    this.g.append("g")

      .attr("class", "axis")
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickFormat(function(d) {
          return d3.format("~s")(d).replace(/G/,"B");
        }));
          
          
        

    // Append Service labels
    this.g.append("g")
      .attr("class", "labelText")
      .selectAll(".textlabel")
      .data(this.serviceLabels)
      .enter()
      .append("text")
      .attr("class", "textlabel")
      .attr("x", (d, i) => x(d) + x.bandwidth() / 2)
      .attr("y", -5)
      .style("width", x.bandwidth())
      .style("height", 20)
      .text((d, i) => d);

      let checkingData = [data[0],data[3],data[6]];

     // nodata label
     this.g.append("g")
     .attr("class", "labelText")
     .selectAll(".textlabel")
     .data(this.serviceLabels)
     .enter()
     .append("text")
     .attr("class", "textlabel")
     .attr("x", (d, i) => x(d) + x.bandwidth() / 2)
     .attr("y", y(0) - 20)
     .style("width", x.bandwidth())
     .style("height", 20)
     .text((d, i) => checkingData[i] > 0 ? "" : "no data");
  }
  remove() {
    this.g.selectAll(".bar.greenGrowth")
      .remove()
      .exit()
    this.g.selectAll(".bar.regionalRivalry")
      .remove()
      .exit()
    this.g.selectAll(".bar.fossilFuels")
      .remove()
      .exit()
    this.g.selectAll("g")
      .remove()
      .exit()
  }

  getTotalPopulation(allData) {
    let cvPop = this.getPopulation(allData.cv);
    let ndrPop = this.getPopulation(allData.ndr);
    let pollPop = this.getPopulation(allData.poll);
    return cvPop
      .concat(ndrPop)
      .concat(pollPop)

  }

  getPopulation(focusedData) {
    if (focusedData == 0) {
      return [0, 0, 0];
    }
    let pop_c = 0,
      pop_1 = 0,
      pop_3 = 0,
      pop_5 = 0;

    focusedData.forEach((d) => {
      if (d) {
        pop_c += parseFloat(d.pop_c);
        d.UN_c < d.UN_1 ? pop_1 += parseFloat(d.pop_1) : pop_1 += 0;
        d.UN_c < d.UN_3 ? pop_3 += parseFloat(d.pop_3) : pop_3 += 0;
        d.UN_c < d.UN_5 ? pop_5 += parseFloat(d.pop_5) : pop_5 += 0;
      }
    });
    return [pop_1, pop_3, pop_5];
  }

}

function max(a, b) {
  return a > b ? a : b;
}

function min(a, b) {
  return a > b ? b : a;
}

function round(value) {
  if (Math.abs(value) > 1000000) {
    return (value / 1000000).toFixed(1) + 'million';
  } else if (Math.abs(value) > 1000) {
    return (value / 1000).toFixed(0) + 'K';
  } else
    return value.toFixed(0);
}