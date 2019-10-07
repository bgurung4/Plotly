function buildMetadata(sample) {



  // @TODO: Complete the following function that builds the metadata panel



  // Use `d3.json` to fetch the metadata for a sample

    // Use d3 to select the panel with id of `#sample-metadata`

    panel = d3.select("#sample-metadata");



    // Use `.html("") to clear any existing metadata

    panel.html("");



    // Use `Object.entries` to add each key and value pair to the panel

    // Hint: Inside the loop, you will need to use d3 to append new

    // tags for each key-value in the metadata.

    d3.json(`/metadata/${sample}`).then((item) => {

      for (let [key, value] of Object.entries(item)) {

        panel

          .append("p")

          .html(`${key}: ${value}`)

      }

    });







    // BONUS: Build the Gauge Chart

    // buildGauge(data.WFREQ);

}



function buildCharts(sample) {



  // @TODO: Use `d3.json` to fetch the sample data for the plots

  d3.json(`/samples/${sample}`).then(function(response) {



    console.table(response);

    var trace = {

      type: "scatter",

      mode: "markers",

      name: "Bubble Chart",

      x: response.otu_ids,

      y: response.sample_values,

      text: response.otu_labels,

      marker: {

        color: response.otu_ids,

        symbol: "diamond-x"

      }

    };



    var data = [trace];



    var layout = {

      title: "Bubble Chart",

      xaxis: {

        type: "date"

      },

      yaxis: {

        autorange: true,

        type: "linear"

      }

    };



    Plotly.newPlot("bubble", data, layout);



    var trace2 = {

      type: "pie",

      mode: "markers",

      name: "Bubble Chart",

      labels: response.otu_ids,

      values: response.sample_values,

      text: response.otu_labels,

      marker: {

        color: response.otu_ids,

        symbol: "diamond-x"

      }

    };



    var data2 = [trace2];



    var layout2 = {

      title: "Pie Chart"

    };



    Plotly.newPlot("pie", data2, layout2);

  });



    // @TODO: Build a Bubble Chart using the sample data



    // @TODO: Build a Pie Chart

    // HINT: You will need to use slice() to grab the top 10 sample_values,

    // otu_ids, and labels (10 each).

}



function init() {

  // Grab a reference to the dropdown select element

  var selector = d3.select("#selDataset");



  // Use the list of sample names to populate the select options

  d3.json("/names").then((sampleNames) => {

    sampleNames.forEach((sample) => {

      selector

        .append("option")

        .text(sample)

        .property("value", sample);

    });



    // Use the first sample from the list to build the initial plots

    const firstSample = sampleNames[0];

    buildCharts(firstSample);

    buildMetadata(firstSample);

  });

}



function optionChanged(newSample) {

  // Fetch new data each time a new sample is selected

  buildCharts(newSample);

  buildMetadata(newSample);

}



// Initialize the dashboard

init();