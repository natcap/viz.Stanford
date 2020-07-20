let info_measurements = {
    UN: "A Benefit Gap in water quality regulation can be measured by nitrogen export, the amount not retained by vegetation that therefore enters waterways and drinking water supplies as pollution.",
    pop: "We use rural populations (within 100 km watersheds) as the population exposed because they are presumably less likely to have water treatment options. ",
    NC: "Nature’s contribution to Water Quality is the proportion of total nitrogen pollutant load retained by ecosystems, the pollution avoided.",
    PN: "The human pressure that creates a potential need for it in a given region or watershed is the total amount of pollutant (i.e. nitrogen load) requiring retention by vegetation in that area. -> The maximum potential benefit, which in this case is mitigating a potential harm, is based on the amount of pollution run-off (i.e. nitrogen load) requiring retention by vegetation in that area.",
};

let ipbes_cp_wms_url = 'http://viewer.ecoshard.org:8080/geoserver/ipbes/wms';


let tileLayers = {
    cur:{
        UN: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_deficit_10s_cur_compressed_md5_031d4bb444325835315a2cc825be3fd4_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; Benefit Gap 2015"}),
        pop: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_pop_30s_cur_compressed_md5_a728d722935371a17452276ba1034296_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; Population 2015"}),
        NC: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_NC_10s_cur_compressed_md5_750e58205efb24f29fb88ec282eb0143_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; NC 2015"}),
        PN: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_potential_10s_cur_compressed_md5_9e0ae4df4e399350087c1c2d00d0a1bb_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; PN 2015"}),
    },
    ssp1:{
        UN: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_deficit_change_10s_ssp1_compressed_md5_fbeb8122b920cf13c325284baeba640c_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; Benefit Gap SSP1"}),
        pop: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_pop_change_30s_ssp1_compressed_md5_fdadefe1e84c5dcc83e76dd7cb4f1564_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; Population SSP1"}),
        NC:L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_NC_change_10s_ssp1_compressed_md5_1ab5bd72043041dc3c46874d870141c4_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; NC SSP1"}),
        PN:L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_potential_change_10s_ssp1_compressed_md5_6a5228b9630642437a12a436be4ebe41_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; PN SSP1"}),
    },
    ssp3:{
        UN: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_deficit_change_10s_ssp3_compressed_md5_6a2352b77f23421c1a48711a3e1d703a_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; Benefit Gap SSP3"}),
        pop: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_pop_change_30s_ssp3_compressed_md5_2d886ae99fc3241c05398a8948bf0f3a_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; Population SSP3"}),
        NC:L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_NC_change_10s_ssp3_compressed_md5_63e2f488dd718e5e0e4801dfb6dc0d00_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; NC SSP3"}),
        PN:L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_potential_change_10s_ssp3_compressed_md5_06e7e47952d6b1ec5bc784737b7989ac_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; PN SSP3"}),
    },
    ssp5:{
        UN: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_deficit_change_10s_ssp5_compressed_md5_1244e34777bb5c0980e263390b10d6d0_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; Benefit Gap SSP5"}),
        pop: L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_pop_change_30s_ssp5_compressed_md5_72a80daaaecf1480069dfb031d4eea12_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; Population SSP5"}),
        NC:L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_NC_change_10s_ssp5_compressed_md5_1b0a700d4d150a5e6bd76d87f14ab538_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; NC SSP5"}),
        PN:L.tileLayer.wms(ipbes_cp_wms_url,{
            layers: 'ipbes:nutrient_potential_change_10s_ssp5_compressed_md5_1d6eb591625a6563bb64c06cf0f2a5a9_compressed',
            format: 'image/png',styles: [''],transparent:true,attribution: "NatCap &mdash; PN SSP5"}),
    },
}

let legend_title_2015 = {
    UN: "Nitrogen Export <br> (kg/year)",
    pop: "Rural Population",
    NC: "Pollution Avoided <br> (%)",
    PN: "Nitrogen Pollutant Load <br> (kg/year)",
};

let legend_title_2050 = {
    UN: "Change in <br> Nitrogen Export",
    pop: "Change in <br> Rural Population",
    NC: "Change in <br> Pollution Avoided",
    PN: "Change in <br> Nitrogen Pollutant Load",
};

let legend_colors_values_2015 = {
        UN:{
          1: '#fffff6',
          10: '#ffffd4',
          100: '#fed98e',
          200: '#fe9929',
          400: '#d95f0e',
          1000: '#993404'},
        pop:{
          0: "#ffffff",
          1: '#bfd6e8',
          10: '#9cacd2',
          20: '#8a7cba',
          40: '#45114d',
          50: '#000000'
        },
        NC:{
          0: '#ffffff',
          1: '#fafff7',
          25: '#caeac3',
          50: '#7bc87c',
          75: '#2a924a',
          90: '#00441b'
        },
        PN:{
            1: '#fffff6',
            10: '#ffffd4',
            100: '#fed98e',
            200: '#fe9929',
            400: '#d95f0e',
            1000: '#993404'},
    };


let legend_colors_2050 = {
        UN:{
          0: '#2c7bb6',
          1: '#5b93b6',
          2: '#abd9e9',
          3: '#ffffff',
          4: '#fdae61',
          5: '#d7191c' ,
          6: '#96191c',
          7: '#441115',
    },
        pop:{
            0: '#2c7bb6',
            1: '#5b93b6',
            2: '#abd9e9',
            3: '#ffffff',
            4: '#fdae61',
            5: '#d7191c' ,
            6: '#96191c',
            7: '#441115',
        },
        NC:{
            0: '#96191c',
            1: '#d7191c',
            2: '#fdae61',
            3: '#ffffff',
            4: '#abd9e9',
            5: '#5b93b6' ,
            6: '#2c7bb6',
        },
        PN:{
            0: '#2c7bb6',
            1: '#5b93b6',
            2: '#abd9e9',
            3: '#ffffff',
            4: '#fdae61',
            5: '#d7191c' ,
            6: '#96191c',
            7: '#441115',
        }
    };
      
let legend_values_2050 = {
    UN:{
        0: '-100%',
        1: '-50%',
        2: '-10%',
        3: '0',
        4: '+10%',
        5: '+50%' ,
        6: '+100%',
        7: '+1000%',
    },
    pop:{
        0: '-100%',
        1: '-50%',
        2: '-10%',
        3: '0',
        4: '+10%',
        5: '+50%' ,
        6: '+100%',
        7: '+1000%',
        },
    NC:{
        0: '-100%',
        1: '-50%',
        2: '-10%',
        3: '0',
        4: '+10%',
        5: '+50%' ,
        6: '+100%',
        },
    PN:{
        0: '-100%',
        1: '-50%',
        2: '-10%',
        3: '0',
        4: '+10%',
        5: '+50%' ,
        6: '+100%',
        7: '+1000%',
    }
};



whenDocumentLoaded(() => {
    // Initialize dashboard
    addMenu(2);
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




