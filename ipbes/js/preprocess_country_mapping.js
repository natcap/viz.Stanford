/*
Script to create a mapping between a country name and the indexes of the
data points which are inside of this country.

The mapping is supposed to be used when we focus in on a country to provide quicker (delay-free) access to
the data points that we want to display.

The indexing of the data points are the indexing order in their respective preprocessed tables.

This is done using the 50m.json country border data, since this is the country borders that are shown when we focus in.
To run this for the poll data takes a couple of tens ofseconds, for the ndr data a couple of minutes and for the cv data I haven't tested it yet.
It might take too long for the cv data. Using the 110m country borders makes the process much faster, so this could perhaps be used for the cv case
instead.
*/


const map_promise = d3.json("Data/map_data/50m.json").then(topojson_raw => {
  const country_features = topojson.feature(topojson_raw, topojson_raw.objects.countries).features;
  // remove leading zeros for the id:s
  country_features.forEach(x => x.id = x.id.replace(/^0+/, ''));
  return country_features;
})
const country_label_promise = d3.tsv("Data/map_data/world-110m-country-names.tsv").then(data => data);

["poll", "ndr", "cv", "cv_high_res"].forEach((dataset) => {
  const data_promise = d3.csv(`Data/preprocessed_data/updated_data3/${dataset}_table_preprocessed.csv`).then(data => data)


  Promise.all([map_promise, country_label_promise, data_promise]).then((results) => {
    const map_data = results[0];
    const country_label_data = results[1];
    const data = results[2];

    map_data.forEach(x => Object.assign(x, country_label_data.find(country_label => country_label['id'] == x['id'])));

    // Remove the entries in the map data that does not have a name.
    let no_undefined = map_data.filter((x) => x.name != undefined)

    // remove one australia, which exists twice, at place 7 (for the 50m.json map data only)
    no_undefined.splice(7, 1)

    console.log("Constructing array for \"" + dataset + "\" dataset...")

    // Creates an array of objects where each object has a country name and a list of indices for the data array for the data pointthat are within the boundaries of that country
    let countryMapping = no_undefined.map((x, i) => {
      console.log("Processing country " + (i + 1) + ":   " + x.name);
      return {
        name: x.name,
        dataPointList: data.map((d, i) => i).filter(index => {
          if (x.geometry.type == "MultiPolygon") { // This is if the country has several areas on the map (for example USA with Alaska and Hawaii)
            for (var j = 0; j < x.geometry.coordinates.length; j++) {
              if (d3.polygonContains(x.geometry.coordinates[j][0], [data[index].lng, data[index].lat])) return true
            }
            return false
          } else if (x.geometry.type == "Polygon") {
            return d3.polygonContains(x.geometry.coordinates[0], [data[index].lng, data[index].lat])
          } else {
            Console.log("Error: not valid geometry type");
            return false
          }
        })
      }
    })

    console.log("Calculating averages...")

    // Calculate averages over the datapoints per country:
    // We do not need to sum lat or lng
    let data_keys = Object.keys(data[0]).filter(x => !(["lat", "lng"].includes(x)))

    countryMapping.forEach((country) => {
      let averages = null;  // If we don't have any datapoints; let averages be null
      if (country.dataPointList.length > 0) {
        // Sum up all the values per data category
        averages = country.dataPointList.reduce((acc, cur) => {
          data_keys.forEach(key => acc[key] = acc[key] + parseFloat(data[cur][key]));
          return acc;
        }, data_keys.reduce((o, key) => ({ ...o, [key]: 0}), {}));

        // Divide by the amount of data points to get averages
        Object.keys(averages).forEach(key => averages[key] /= country.dataPointList.length);
      }
      country['averages'] = averages;
    })

    console.log("Converting array to object...")
    // We want to save the mapping as an object (dictionary) instead of an array for easier access
    let countryMappingObject = countryMapping.reduce((acc, cur) => {
      acc[cur.name] = {
        datapoints: cur.dataPointList,
        averages: cur.averages
      }
      return acc;
    }, {});

    download(JSON.stringify(countryMappingObject), `${dataset}_countries.json`, 'text/plain');
    console.log("Done!")

  })
})

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {
    type: contentType
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}