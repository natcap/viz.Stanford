let info_measurements = {
    UN: "A Benefit Gap in coastal risk reduction can be measured as the exposure to coastal hazards, the magnitude of exposure still remaining after the attenuation of storm surge by any coastal habitat.",
    pop:"People living either nearest to the shoreline or between 0 and 10 m above sea level are considered to be the population exposed, since these are the people most susceptible to flooding, especially with sea level rise. Population density nearest to the shoreline is shown here as the population exposed. At larger scales (aggregated up to 100 km; see 'In which country are people most at risk') we consider the population living between 0 and 10 m above sea level, since these these are the people most susceptible to flooding, especially with sea level rise.",
    NC: "Nature’s contribution to coastal risk reduction is the proportion of that coastal storm risk that is attenuated by ecosystems.",
    PN: "The potential human need for coastal risk reduction is the physical exposure to coastal storms (based on wind, waves, sea level rise, geomorphology, etc) in the absence of coastal habitat like coral reefs or mangroves. ->The maximum potential benefit, which in this case is mitigating a potential harm, is based on the physical exposure to coastal risks such as erosion and flooding (due to wind, waves, surge potential, elevation, and sea level rise) in the absence of coastal habitat like coral reefs, mangroves, sea grass and salt marshes.",
};
 
let ipbes_CV_cp_wms_url = 'http://viewer.ecoshard.org:8080/geoserver/ipbes_cv_styles/wms';



let tileLayers = {
    cur:{
        UN: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_deficit_cur'],transparent:true,attribution: "NatCap &mdash; Benefit Gap 2015"}),
        pop: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_pop_cur'],transparent:true,attribution: "NatCap &mdash; Population 2015"}),
        NC: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_NC_cur'],transparent:true,attribution: "NatCap &mdash; NC 2015"}),
        PN: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_potential_cur'],transparent:true,attribution: "NatCap &mdash; PN 2015"}),
    },
    ssp1:{
        UN: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_deficit_change_ssp1'],transparent:true,attribution: "NatCap &mdash; Benefit Gap SSP1"}),
        pop: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_pop_change_ssp1'],transparent:true,attribution: "NatCap &mdash; Population SSP1"}),
        NC:L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_NC_change_ssp1'],transparent:true,attribution: "NatCap &mdash; NC SSP1"}),
        PN:L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_potential_change_ssp1'],transparent:true,attribution: "NatCap &mdash; PN SSP1"}),
    },
    ssp3:{
        UN: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_deficit_change_ssp3'],transparent:true,attribution: "NatCap &mdash; Benefit Gap SSP3"}),
        pop: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_pop_change_ssp3'],transparent:true,attribution: "NatCap &mdash; Population SSP3"}),
        NC:L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_NC_change_ssp3'],transparent:true,attribution: "NatCap &mdash; NC SSP3"}),
        PN:L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_potential_change_ssp3'],transparent:true,attribution: "NatCap &mdash; PN SSP3"}),
    },
    ssp5:{
        UN: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_deficit_change_ssp5'],transparent:true,attribution: "NatCap &mdash; Benefit Gap SSP5"}),
        pop: L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_pop_change_ssp5'],transparent:true,attribution: "NatCap &mdash; Population SSP5"}),
        NC:L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_NC_change_ssp5'],transparent:true,attribution: "NatCap &mdash; NC SSP5"}),
        PN:L.tileLayer.wms(ipbes_CV_cp_wms_url,{
            layers: 'ipbes_cv_styles:cv_coastal_points_ipbes',
            format: 'image/png',styles: ['coastal_potential_change_ssp5'],transparent:true,attribution: "NatCap &mdash; PN SSP5"}),
    },
}

let legend_title_2015 = {
    UN: "Hazard Exposure <br> (risk index)",
    pop: "Coastal Population <br> (Population Density)",
    NC: "Risk Reduced",
    PN: "Potential Hazard <br> Exposure",
};

let legend_title_2050 = {
    UN: "Change in <br> Hazard Exposure",
    pop: "Change in <br> Coastal Population",
    NC: "Change in <br> Risk Reduction",
    PN: "Change in <br> Potential Hazard <br> Exposure",
};

let legend_colors_values_2015 = {
        UN:{
          1: '#ffffd4',
          2: '#fed98e',
          3: '#fe9929',
          4: '#d95f0e',
          5: '#993404'},
        pop:{
          //'<1': "#bfd6e8",
          1: '#a3b5d7',
          10: '#918fc4',
          100: '#6e518e',
          '>200': '#000000'
        },
        NC:{
          '<5%': '#f7fcf5',
          '5-10%': '#caeac3',
          '10-15%': '#7bc87c',
          '15-20%': '#2a924a',
          '20-30%': '#00441b',
        },
        PN:{
              1: '#ffffd4',
              2: '#fed98e',
              3: '#fe9929',
              4: '#d95f0e',
              5: '#993404'},
    };

let legend_colors_2050 = {
        UN:{
            1: '#55a1cb',
            3: '#ffffff',
            4: '#f7e0d6',
            5: '#f5b193' ,
            6: '#e25e58',
            7: '#ca0020',
            8: '#7c0014',
            9:'#000000'
    },
        pop:{
            0: '#0571b0',
            1: '#55a1cb',
            2: '#a1cce2',
            3: '#ffffff',
            4: '#f7e0d6',
            5: '#f5b193' ,
            6: '#e25e58',
            7: '#ca0020',
            8: '#7c0014',
        },
        NC:{
            0: '#000000',
            1: '#ca0020',
            2: '#dd494b',
            3: '#f09377',
            4: '#f7e5dd',
            5: '#fcfcfc' ,
            6: '#1f78b4',
        },
        PN:{
            1: '#55a1cb',
            3: '#ffffff',
            4: '#f7e0d6',
            5: '#f5b193' ,
            6: '#e25e58',
            7: '#ca0020',
            8: '#7c0014',
            9:'#000000'
        }
    };

    /* 0: '#0571b0',
            1: '#55a1cb',
            2: '#a1cce2',
            3: '#ffffff',
            4: '#f7e0d6',
            5: '#f5b193' ,
            6: '#e25e58',
            7: '#ca0020',
            8: '#7c0014',
            9:'#000000'*/
      
let legend_values_2050 = {
    UN:{
            1: '↓',
            3: 'No Change',
            4: '↑ <10%',
            5: '↑ 10-20%' ,
            6: '↑ 20-30%',
            7: '↑ 30-40%',
            8: '↑ 40-50%',
            9:'↑ >50%'
    },
    pop:{
        0: '↓ >75%',
        1: '↓ ~50%',
        2: '↓ <25%',
        3: 'No Change',
        4: '↑ <10%',
        5: '↑ >10%' ,
        6: '↑ >25%',
        7: '↑ >50%',
        8: '↑ >100%',
        },
    NC:{
        0: '↓ >100%',
        1: '↓ >50%',
        2: '↓ 35%%',
        3: '↓ 10%',
        4: '↓ 1%',
        5: '0' ,
        6: '↑',
        },
    PN:{
            1: '↓',
            3: 'No Change',
            4: '↑ <10%',
            5: '↑ 10-20%' ,
            6: '↑ 20-30%',
            7: '↑ 30-40%',
            8: '↑ 40-50%',
            9:'↑ >50%'
    }
};




whenDocumentLoaded(() => {
    // Initialize dashboard
    addMenu(3);
    d3.selectAll("#landingpage").attr("class", "hidden");
});

function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", action);
    } else {
      // `DOMContentLoaded` already fired
      action();
    }
}




