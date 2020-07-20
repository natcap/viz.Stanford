

# **InVEST Rangeland Production **


# **Model Documentation**


[TOC]



# Summary {#summary}

The InVEST Rangeland Production model uses gridded climate and soils data to quantify the productivity of a rangeland area to support ruminant livestock and wildlife populations.  The model uses a remotely sensed vegetation index to estimate spatially disaggregated livestock densities at a monthly timestep by comparing modeled forage productivity in the absence of grazing to observed vegetation detected by the remotely sensed index.  With this estimated livestock density and gridded climate inputs, the model predicts the combined impacts of livestock management and climate in controlling rangeland condition and livestock diet sufficiency.


# The Model {#the-model}


## **How it Works** {#how-it-works}

The model uses a gridded adaptation of the Century model (version 4.6, Parton _et al. _1988) to predict forage growth from climate and soils data, including the impacts of grazing.  Coupled with the forage production model, the herbivore diet selection and physiology submodel simulates diet selection and estimates whether the selected diet meets or exceeds maintenance energy needs. The herbivore diet and physiology submodels are adapted from GRAZPLAN, which was developed for ruminant livestock (Freer _et al._ 2012).  Full equations for both model adaptations appear in the relevant submodel sections below.


## **Entities, state variables and scales** {#entities-state-variables-and-scales}

The model operates at a monthly time step, over a time period and a fixed area specified by the user.  The spatial resolution of the model is dictated by the remotely sensed vegetation index so that all model inputs and outputs are resampled to match the vegetation index rasters.  Within the simulated area, each pixel is characterized by a set of state variables and parameters at the level of site, herbaceous plant functional type, and grazing animal.  Each pixel is associated with one a single site type, a single herbivore type, and one or more plant functional types.  Site types correspond to broad ecosystem categories and are characterized by state variables describing soil water content, carbon (C), nitrogen (N), and phosphorus (P) in surface litter, and C, N, and P in inorganic and organic pools of the soil (table 1).  Following Century, site state variables include three soil organic matter pools (active, slow, and passive), above and belowground litter pools, and a surface microbial pool.  Each of these pools are composed of a stock of C, N, and P.  At each model time step, site-level state variables are updated as precipitation flows through soil water layers and is removed by transpiration, and C, N, and P decompose from one pool into another.

Table 1. Site-level state variables of the InVEST rangeland production model.  Each pixel of the simulated area is associated with a single set of site state variables.


<table>
  <tr>
   <td><strong>State variable</strong>
   </td>
   <td><strong>Definition</strong>
   </td>
   <td><strong>Units</strong>
   </td>
  </tr>
  <tr>
   <td>metabc_1
   </td>
   <td>Surface metabolic C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>metabc_2
   </td>
   <td>Belowground metabolic C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som1c_1
   </td>
   <td>Surface microbial C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som1c_2
   </td>
   <td>Active organic C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som2c_1
   </td>
   <td>Surface slow organic C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som2c_2
   </td>
   <td>Soil slow organic C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som3c
   </td>
   <td>Passive organic C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>strlig_1
   </td>
   <td>Lignin content of surface structural material
   </td>
   <td>g lignin/ g biomass
   </td>
  </tr>
  <tr>
   <td>strlig_2
   </td>
   <td>Lignin content of soil structural material
   </td>
   <td>g lignin/ g biomass
   </td>
  </tr>
  <tr>
   <td>strucc_1
   </td>
   <td>Surface structural C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>strucc_2
   </td>
   <td>Belowground structural C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>metabe_1_1
   </td>
   <td>Surface metabolic N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>metabe_2_1
   </td>
   <td>Belowground metabolic N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_1_1
   </td>
   <td>Mineral N for soil layer 1
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_10_1
   </td>
   <td>Mineral N for soil layer 10
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_2_1
   </td>
   <td>Mineral N for soil layer 2
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_3_1
   </td>
   <td>Mineral N for soil layer 3
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_4_1
   </td>
   <td>Mineral N for soil layer 4
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_5_1
   </td>
   <td>Mineral N for soil layer 5
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_6_1
   </td>
   <td>Mineral N for soil layer 6
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_7_1
   </td>
   <td>Mineral N for soil layer 7
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_8_1
   </td>
   <td>Mineral N for soil layer 8
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_9_1
   </td>
   <td>Mineral N for soil layer 9
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som1e_1_1
   </td>
   <td>Surface microbe N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som1e_2_1
   </td>
   <td>Active organic N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som2e_1_1
   </td>
   <td>Surface slow organic N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som2e_2_1
   </td>
   <td>Soil slow organic N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som3e_1
   </td>
   <td>Passive organic N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>struce_1_1
   </td>
   <td>Surface structural N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>struce_2_1
   </td>
   <td>Belowground structural N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>metabe_1_2
   </td>
   <td>Surface metabolic P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>metabe_2_2
   </td>
   <td>Belowground metabolic P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_1_2
   </td>
   <td>Mineral P for soil layer 1
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_10_2
   </td>
   <td>Mineral P for soil layer 10
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_2_2
   </td>
   <td>Mineral P for soil layer 2
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_3_2
   </td>
   <td>Mineral P for soil layer 3
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_4_2
   </td>
   <td>Mineral P for soil layer 4
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_5_2
   </td>
   <td>Mineral P for soil layer 5
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_6_2
   </td>
   <td>Mineral P for soil layer 6
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_7_2
   </td>
   <td>Mineral P for soil layer 7
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_8_2
   </td>
   <td>Mineral P for soil layer 8
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>minerl_9_2
   </td>
   <td>Mineral P for soil layer 9
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>occlud
   </td>
   <td>Occluded P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>parent_2
   </td>
   <td>Parent P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>plabil
   </td>
   <td>Labile P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>secndy_2
   </td>
   <td>Strongly sorbed P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som1e_1_2
   </td>
   <td>Surface microbe P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som1e_2_2
   </td>
   <td>Active organic P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som2e_1_2
   </td>
   <td>Surface slow organic P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som2e_2_2
   </td>
   <td>Soil slow organic P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>som3e_2
   </td>
   <td>Passive organic P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>struce_1_2
   </td>
   <td>Surface structural P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>struce_2_2
   </td>
   <td>Belowground structural P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_1
   </td>
   <td>Moisture in soil layer 1
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_2
   </td>
   <td>Moisture in soil layer 2
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_3
   </td>
   <td>Moisture in soil layer 3
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_4
   </td>
   <td>Moisture in soil layer 4
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_5
   </td>
   <td>Moisture in soil layer 5
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_6
   </td>
   <td>Moisture in soil layer 6
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_7
   </td>
   <td>Moisture in soil layer 7
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_8
   </td>
   <td>Moisture in soil layer 8
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>asmos_9
   </td>
   <td>Moisture in soil layer 9
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>avh2o_3
   </td>
   <td>Moisture in top two soil layers
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>snlq
   </td>
   <td>Liquid in snow
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>snow
   </td>
   <td>Standing snowpack
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
</table>


Plant functional types (PFT) are herbaceous plants with different growth patterns or nutritive quality for herbivores (for example, different types of grass) and are characterized by state variables adapted from Century that describe C, N, and P in live and standing dead biomass (table 2).  A PFT may occupy less than 100%  of a pixel and multiple PFT may occur on a single pixel.  In this case, the PFT do not directly interact but are assumed to have access to soil water and nutrient resources on that pixel in proportion to their fractional cover.  At each model time step, PFT-level state variables are updated as new growth, senescence, and grazing by herbivores occur.

Table 2. Plant functional type (PFT) level state variables of the InVEST rangeland production model. Each pixel of the simulated area may contain one or more PFTs.


<table>
  <tr>
   <td><strong>State variable</strong>
   </td>
   <td><strong>Definition</strong>
   </td>
   <td><strong>Units</strong>
   </td>
  </tr>
  <tr>
   <td>aglivc
   </td>
   <td>Aboveground live C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>bglivc
   </td>
   <td>Belowground live C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>stdedc
   </td>
   <td>Standing dead C
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>aglive_1
   </td>
   <td>Aboveground live N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>bglive_1
   </td>
   <td>Belowground live N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>crpstg_1
   </td>
   <td>Retranslocation N storage pool
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>stdede_1
   </td>
   <td>Standing dead N
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>aglive_2
   </td>
   <td>Aboveground live P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>bglive_2
   </td>
   <td>Belowground live P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>crpstg_2
   </td>
   <td>Retranslocation P storage pool
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>stdede_2
   </td>
   <td>Standing dead P
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
  <tr>
   <td>avh2o_1
   </td>
   <td>Water available for plant growth
   </td>
   <td>g/m<sup>2</sup>
   </td>
  </tr>
</table>


While multiple animal types may occur across the study area, a single pixel may be occupied by only one (or zero) grazing animal type.  Each animal type is characterized by its type (cattle, sheep, or goat), sex, average age (days), average weight (kg), weight at birth (kg), standard reference weight (kg), and disaggregated density (animals per pixel; table 3).  The standard reference weight (cf. Freer _et al._ 2012) is the weight of a mature female in median condition and varies by breed.  Additional state variables characterizing male animals include castrate status (castrate or entire), and breeding females are characterized by their reproductive stage.

The density of livestock on each simulated pixel is estimated at each monthly time step through comparison of modeled biomass in the absence of grazing with a remotely sensed vegetation index such as NDVI.  The extent of grazing animals’ presence is given by user input in the form of management polygons, which indicate areas grazed by animals over the course of the simulation. The relative density of animals across pixels within the management polygons is estimated via the comparison of modeled biomass in the absence of grazing with the remotely sensed vegetation index.

A modeled livestock herd is characterized in a general way and is static throughout a model run.  When breeding females are simulated, animals undergo cycles of conception, pregnancy, and lactation because these reproductive stages have strong influences on energy demands of the herd (IPCC 2006). The model does not estimate allocation of the diet to growth above maintenance requirements, but instead simply records whether maintenance needs were met or exceeded. Therefore most animal state variables, including age and weight, are static; only reproductive status of breeding females and its impact on energy and protein requirements is updated.  The model does not simulate herd dynamics.  Births and deaths are not tracked, and suckling calves are assumed to receive nutrition only from milk.

Table 3. State variables of the animal submodel.


<table>
  <tr>
   <td><strong>State variable</strong>
   </td>
   <td><strong>Units or allowable values</strong>
   </td>
  </tr>
  <tr>
   <td>Type
   </td>
   <td>B. indicus, B. taurus, sheep, goat
   </td>
  </tr>
  <tr>
   <td>Age
   </td>
   <td>days
   </td>
  </tr>
  <tr>
   <td>Weight
   </td>
   <td>kg
   </td>
  </tr>
  <tr>
   <td>Weight at birth
   </td>
   <td>kg
   </td>
  </tr>
  <tr>
   <td>Standard reference weight
   </td>
   <td>kg
   </td>
  </tr>
  <tr>
   <td>Sex
   </td>
   <td>Entire male, castrate male, breeding female, non-breeding female
   </td>
  </tr>
  <tr>
   <td>Reproductive stage (for breeding females)
   </td>
   <td>Pregnant, open, lactating
   </td>
  </tr>
  <tr>
   <td>Disaggregated density
   </td>
   <td>Animals per pixel
   </td>
  </tr>
</table>



## **Process overview and scheduling** {#process-overview-and-scheduling}

At each monthly time step, the model simulates soil water dynamics and decomposition of surface and soil organic pools.  To estimate the monthly distribution of animal density within management polygons, the model first estimates provisional forage growth and standing biomass for the current month in the absence of grazing, then compares this provisional forage biomass to a remotely sensed vegetation index for the current month.  Inside the areas where animals are grazing, pixels with a higher degree of mismatch between modeled biomass without grazing and remotely sensed vegetation index for the current month are assumed to experience a greater grazing intensity and hence to be occupied by a greater number of herbivores during the current month. 

The user is required to specify a management threshold, representing the minimum required total biomass across PFTs to be left standing after animal diet selection. The management threshold does not describe carrying capacity _per se_, but instead is a modeling artifact that is required for boundary cases where simulated densities are high relative to the productivity of the site. In a case when herbivore demand for forage is greater than the management threshold would allow, intake of forage is restricted to leave residual biomass equal to the management threshold. It is expected that in this case, the restricted diet would be insufficient to meet maintenance requirements.

After the spatial distribution of herbivores is estimated, the diet selection submodel simulates selective feeding by herbivores from the total available forage across PFTs according to the provisional forage production in the absence of grazing.  The diet selection submodel predicts the forage intake of an individual animal, then multiplies that predicted intake by the density of animals per pixel to get the total offtake of each PFT consumed by herbivores on each pixel.  If the sum of forage biomass selected by herbivores exceeds available forage according to the management threshold, intake is reduced such that forage consumed is equal to available forage.  This rule is applied separately to each PFT, meaning that if demand for one PFT exceeds availability, intake of that PFT may be decreased while intake of other PFTs remains unchanged.  In this situation, the relative proportions of different PFTs would differ from what was selected according to the diet selection submodel.

After the calculation of offtake selected from provisional biomass in the current month, the model calculates final biomass production, this time incorporating impacts of grazing.  This final calculation includes altered root:shoot ratio and altered N content of live shoots and roots according to grazing pressure (Holland _et al. _1992).  Following Century, grazing pressure is expressed as the fraction of live and dead biomass removed following senescence of live material and fall of standing dead, but prior to new growth (i.e., input parameters “flgrem” and “fdgrem” of Century).  The absolute offtake of grazing calculated by the diet selection submodel is converted to the fraction of standing live and dead relative to this intermediate point.

Energy and protein contents of the diet are compared to maintenance energy and protein requirements for maintenance, including pregnancy and lactation for breeding females.  The ability of the selected diet to satisfy maintenance needs is summarized with the metric of diet sufficiency, which indicates whether the selected diet is adequate for animals to maintain their current condition or size.


## **Initialization** {#initialization}

	Simulations run over a short time frame are dominated by initial condition uncertainty, while those run over a longer period are more likely to be dominated by boundary condition uncertainty (Li _et al._ 2009). For this reason, the Century model is customarily run for a long “spin-up” period, as long as several thousand years, to establish equilibrium soil nutrient pools.  The rangeland production model instead requires that initial conditions be supplied by the user, with the expectation that initial conditions may be derived from a similar “spin-up” process or from reasonable prior knowledge of the study area via an external analysis.  A table of values for each state variable covering the study area (tables 1 and 2) must be supplied.  If multiple PFT are simulated, a separate raster for each PFT-level state variable (table 2) must be supplied for each PFT.


## **Input** {#input}

	Data inputs for the model consist of site inputs and temporal controls, including climate and soil inputs, and a series of remotely sensed vegetation index rasters covering the study area (table 3).  Precipitation and vegetation index rasters must be supplied for each month of the simulation; precipitation inputs must be supplied for at least 12 months to allow the model to calculate annual precipitation.

	Another set of spatial inputs are required that give the extent of site types, PFTs, and animal types.  These link site, PFT, and animal parameters to each other spatially.  For the site spatial index, this input gives broad ecosystem types and indexes parameters controlling site-level processes such as N deposition rate, soil depth, and maximum decomposition rate of each soil organic matter pool (see Appendix 1, table 1 for required site parameters).  The site spatial index should be a raster of integers, where the integer value of each pixel is matched to a row in the site parameter table by the field “site_id”.

Parameters describing PFTs such as maximum growth rate, optimum temperature for growth, and senescence month (Appendix 1, table 2) are linked to their spatial extent via fractional cover rasters that give the fraction cover (0 - 1) of one PFT in each pixel of the study area. These rasters are linked to the PFT parameter table via their filename.

The animal types spatial index is a polygon layer indicating the areas over which animals graze.  Each feature in this polygon layer is grazed by one animal type, and features may not overlap (thus enforcing the rule that each pixel may be grazed by only one animal type).  Features in this polygon layer are indexed to animal parameters in table 6 by the field “animal_id”.  The layer must also have a field called “num_animals”, which gives the number of animals grazing inside the associated polygon.

All spatial inputs must be in geographic coordinates (i.e., latitude and longitude).

Table 3. Required data inputs for the InVEST Rangeland Production model.


<table>
  <tr>
   <td><strong>Category</strong>
   </td>
   <td><strong>Dataset</strong>
   </td>
   <td><strong>Format</strong>
   </td>
   <td><strong>Units or allowable values</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="6" >Site
   </td>
   <td>Number of months to run simulation
   </td>
   <td>integer
   </td>
   <td>months
   </td>
  </tr>
  <tr>
   <td>Starting year
   </td>
   <td>integer
   </td>
   <td>E.g. 2015
   </td>
  </tr>
  <tr>
   <td>Starting month
   </td>
   <td>integer
   </td>
   <td>E.g. 1, for January
   </td>
  </tr>
  <tr>
   <td>Area of interest
   </td>
   <td>polygon shapefile
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Management threshold
   </td>
   <td>float
   </td>
   <td>kg/ha
   </td>
  </tr>
  <tr>
   <td>Proportion legume
   </td>
   <td>raster
   </td>
   <td>fraction (0 - 1)
   </td>
  </tr>
  <tr>
   <td rowspan="3" >Soil
   </td>
   <td>Fraction sand, silt, clay (20 cm depth)
   </td>
   <td>rasters
   </td>
   <td>fraction (0 - 1)
   </td>
  </tr>
  <tr>
   <td>Bulk density (20 cm depth)
   </td>
   <td>raster
   </td>
   <td>g per cm<sup>3</sup>
   </td>
  </tr>
  <tr>
   <td>pH (20 cm depth)
   </td>
   <td>raster
   </td>
   <td>pH scale
   </td>
  </tr>
  <tr>
   <td rowspan="3" >Climate
   </td>
   <td>Monthly average minimum daily temperature
   </td>
   <td>rasters
   </td>
   <td>degrees C
   </td>
  </tr>
  <tr>
   <td>Monthly average maximum daily temperature
   </td>
   <td>rasters
   </td>
   <td>degrees C
   </td>
  </tr>
  <tr>
   <td>Monthly precipitation
   </td>
   <td>rasters
   </td>
   <td>cm
   </td>
  </tr>
  <tr>
   <td>Vegetation index
   </td>
   <td>Monthly vegetation index
   </td>
   <td>rasters
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td rowspan="3" >Parameter spatial indices
   </td>
   <td>Site spatial index
   </td>
   <td>raster
   </td>
   <td>integer
   </td>
  </tr>
  <tr>
   <td>Plant functional type fractional cover
   </td>
   <td>rasters, one per PFT
   </td>
   <td>fraction (0 - 1)
   </td>
  </tr>
  <tr>
   <td>Animal grazing areas
   </td>
   <td>polygon shapefile
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td rowspan="3" >Parameters
   </td>
   <td>Site parameter table
   </td>
   <td>comma separated value table
   </td>
   <td>See table 4 for required values
   </td>
  </tr>
  <tr>
   <td>Plant functional type parameter table
   </td>
   <td>comma separated value table
   </td>
   <td>See table 5 for required values
   </td>
  </tr>
  <tr>
   <td>Animal parameter table
   </td>
   <td>comma separated value table
   </td>
   <td>See table 6 for required values
   </td>
  </tr>
  <tr>
   <td>Initial conditions
<p>
tables
   </td>
   <td>Initial conditions table: site state variables
   </td>
   <td>comma separated value table containing initial value for each site state variable
   </td>
   <td>See table 1 for required values
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Initial conditions table: plant functional type state variables
   </td>
   <td>comma separated value table containing initial value for each PFT state variable
   </td>
   <td>See table 2 for required values
   </td>
  </tr>
</table>


For vegetation index, precipitation, and temperature rasters, the filename of each raster must allow the model to identify the year and month that each raster pertains to.  The user indicates how the year and month can be identified from the raster file names by giving a path pattern for each of these input types.

The path pattern for precipitation and vegetation index rasters must contain a substring “<year>” and a substring “<month>” that can be replaced with the year and month that the raster pertains to.  For example, if the value for the monthly precipitation path pattern is given as "./workspace/precip/<month>_<year>.tif", the starting year of the model run is 2010, the starting month of the model run is 1, and the number of months to run the model is 13, the model will expect to find raster files named "./workspace/precip/01_2010.tif" to "./workspace/precip/01_2011.tif".  The "<month>" value in input filenames must be two digits.

Similarly, for PFT fractional cover rasters, the filename of each fractional cover raster must indicate the PFT that it pertains to.  The user must supply a PFT fractional cover path pattern that includes the substring “<PFT>”, where "<PFT>" can be replaced with an integer value for each simulated plant functional type. Integer values for each plant functional type must match values in the column named "PFT" in the plant functional type parameter table.   For example, if the PFT fractional cover pattern is given as "./workspace/pft_<PFT>.tif" and the directory "workspace" contains these files: "pft_1.tif", "pft_10.tif", then the "PFT" column of the plant functional type parameter table must contain the values 1 and 10.

	Table 6 gives required parameters in the animal parameter table, which must contain an integer field called “animal_id” that corresponds to the field “animal_id” of the grazing areas polygon layer.  The parameter “grzeff” controls the relationship between grazing intensity and altered root:shoot ratio and aboveground production, using empirical relationships derived from Holland _et al._ (1992).  The levels of grzeff have the following effects: 0: grazing has no direct effect on production; 1: linear impact on aboveground production; 2: quadratic impact on aboveground production and root/shoot ratio; 3: quadratic impact on root/shoot ratio; 4: linear impact on root/shoot ratio; 5: quadratic impact on aboveground production and linear impact on root/shoot ratio; 6: linear impact on agb and root/shoot ratio.

[Table 6](https://docs.google.com/spreadsheets/d/1OjxMmKu80QP6bVjvUzqc4BDb_7cDkIdP64iaRqb2wQk/edit?usp=sharing). Required parameters in the animal parameter table.

	The user must supply a table of initial values for site-level state variables in table 1, and a table of PFT state variables in table 1.  The site state variable initial value table should be in a similar format to the site parameter table, with a column named “site” containing integers that match integer values in the site spatial index raster.  Similarly, the format of the PFT initial value state variables should be similar to the PFT parameter table.  The PFT initial value table must contain an integer column named “PFT” with values for each PFT identified by filenames of the PFT fractional cover rasters.


## **Model outputs** {#model-outputs}

Model outputs consist of a series of rasters covering the study area and giving, for each modeled time step, the values in table 8.  These outputs are located in a folder called “output” that is created inside the model workspace directory.

Table 8. Model outputs. For each of these quantities, the model produces a series of rasters covering the study area, one per monthly time step of the time period simulated.


<table>
  <tr>
   <td><strong>Quantity</strong>
   </td>
   <td><strong>Units</strong>
   </td>
   <td><strong>Filename</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td>Total potential biomass
   </td>
   <td>kg/ha
   </td>
   <td>potential_biomass_ <year>_<month>.tif
   </td>
   <td>Total potential modeled biomass in the absence of grazing, including live and standing dead fractions of all plant functional types
   </td>
  </tr>
  <tr>
   <td>Total standing biomass
   </td>
   <td>kg/ha
   </td>
   <td>standing_biomass_ <year>_<month>.tif
   </td>
   <td>Total modeled biomass after offtake by grazing animals, including live and standing dead fractions of all plant functional types
   </td>
  </tr>
  <tr>
   <td>Observed biomass
   </td>
   <td>kg/ha
   </td>
   <td>observed_biomass_<year>_<month>.tif
   </td>
   <td>Total observed biomass, calculated via regression from remotely sensed vegetation index
   </td>
  </tr>
  <tr>
   <td>Animal density
   </td>
   <td>animals/ha
   </td>
   <td>animal_density_ <year>_<month>.tif
   </td>
   <td>Distribution of animals inside grazing area polygons
   </td>
  </tr>
  <tr>
   <td>Diet sufficiency
   </td>
   <td>
   </td>
   <td>diet_sufficiency_ <year>_<month>.tif
   </td>
   <td>Ratio of metabolizable energy intake to maintenance energy requirements on pixels where animals grazed
   </td>
  </tr>
</table>



## **Limitations and Simplifications** {#limitations-and-simplifications}

The model is designed to be applicable in multiple climatic zones and regions of the world; this generality implies necessary simplifications that distinguish the model from other existing models that are much more complex and site-specific (e.g., SPUR (Foy _et al_. 1999), GrassGro (Moore _et al._ 1997), EcoMod (Johnson _et al_. 2008)).

Although multiple plant functional types may occupy a pixel, direct interactions between functional types such as competition for water and nutrients are not modeled. However, plant types can exhibit indirect facilitation through herbivore diet selection, such that preference for one plant type will free the other from consumption.

We assume that the livestock herd consists of adult animals only and do not model population dynamics such as births or deaths.  While energy demand of pregnancy and lactation are accounted, the number of animals in each sex and age class does not change. We assume that all cattle are of beef cattle type, thus ignoring slightly modified parameter values provided in Freer_ et al._ (2012) that apply to lactating cows of dairy type.  During pregnancy, we do not track the weight of the fetus explicitly, but assume that it is in median condition for its stage of development.

The model does not include importation of supplemental feed above what the simulated forage growth provides.  The model is therefore limited to extensive grazing systems where this restriction is acceptable.


## **Submodels** {#submodels}


## **Plant production submodel** {#plant-production-submodel}

The submodels that predict soil water content, soil organic matter and nutrient content, forage production, and impacts of grazing were adapted from the Century model (Parton _et al_. 1988).  Century model equations describing the flow of water, carbon, nitrogen, and phosphorus were transcribed from the Century version 4.6 Users’ Manual, from peer reviewed publications describing the model, and from source code when necessary.


### **Naming conventions** {#naming-conventions}

For portions of the rangeland production model that were adapted from Century, state variables and parameters take their names from Century version 4.6.  Most Century state variables and parameters include array indices pertaining to an element (i.e., 1 = N, 2 = P) or a soil layer (i.e., 1 = surface, 2 = soil).  For example, the state variable metabc_1 represents metabolic surface C, while metabc_2 represents metabolic belowground C. Other indices refer to another group of related quantities.  For example, the site parameter pcemic1(1,1) references a layer index, an element index, and an index to three related quantities (maximum ratio, minimum ratio, and minimum absolute content): pcemic<layer>(<element>,<max ratio, min ratio, or absolute content>.

The rangeland production model reproduces these indices by simply replacing parentheses and commas with underscores.  For example, the Century site parameter pcemic1(1,1) becomes pcemic1_1_1 in the rangeland production model.  In this document, we refer to rangeland production model name versions. 

Most of the flow of N and P in Century is identical; the pools, equations, and parameters pertaining to each element are simply indexed by the element.  Here, we reproduce that structure by presenting the flow of one generic element indexed by “<iel>”.  In state variables and parameters, iel=1 indicates N, and iel=2 indicates P.


### **Differences between Century and the Rangeland Production model** {#differences-between-century-and-the-rangeland-production-model}



*   The Rangeland Production model can simulate multiple plant functional types, while Century simulates only one community-level vegetation type.  The Rangeland Production model therefore contains multiple pools for aboveground and belowground C, N and P in live plant material, one for each PFT, while Century includes only one of each of these pools.
*   No support for woody vegetation in the Rangeland Production model: GRAZPLAN, the animal diet and physiology model that was adapted to the animal submodel of the Rangeland Production model, does not support diet selection from woody vegetation.
*   No support for modeling annual plants (crops) with the Rangeland Production model: valid values for the PFT parameter frtcindx are 0 or 1 only.
*   Sulfur is not modeled by the Rangeland Production model: it is not important for predicting forage growth and quality.
*   The Rangeland Production model does not support irrigation.
*   The Rangeland Production model does not support simulation of enriched CO2 on biomass production.
*   The Rangeland Production model does not track CO2 or N released into the atmosphere.
*   The Rangeland Production model does not support stable isotope analysis.
*   The Rangeland Production model does not support impacts of cultivation.
*   The Rangeland Production model calculates non-symbiotic soil N fixation from annual precipitation only, not from annual evapotranspiration.
*   The Rangeland Production model does not calculate baseflow, streamflow, or mineral content of water flowing out of the soil as baseflow.
*   The Rangeland Production model does not compute soil erosion.
*   The following Century parameters were fixed:
    *   swflag=1 (use equations from Gupta and Larson 1979 to determine both soil wilting point, awilt (-15 bar) and field capacity, afiel (-0.33 bar))
    *   idef=2 (use the ratio of rainfall/PET to calculate effect of soil moisture on decomposition)
    *   nsnfix=0 (non-symbiotic N fixation is based on annual precipitation)
    *   bioflg=1 (new growth is reduced by physical obstruction)
    *   texesp_1=0 (the flow of secondary P to occluded P is fixed, not influenced by soil texture or pH)
    *   texepp_1=0 (the rate of mineralization from parent P is fixed, not influenced by soil texture)

The following derived parameters do not change the course of the simulation and are calculated upon initialization:



*   Field capacity (afiel) and wilting point (awilt) for each soil layer are calculated according to the method of Gupta and Larson 1979, ('Estimating soil and water retention characteristics from particle size distribution, organic matter percent and bulk density'. Water Resources Research 15:163), assuming -15 bar for wilting point and -0.33 bar for field capacity.
*   wc, water content used to calculate potential production = afiel - awilt for the first soil layer
*   eftext, the effect of soil texture on soil microbe decomposition rate = peftxa + peftxb * sand
*   p1co2_2, the fraction of C lost to CO<sub>2</sub> during decomposition from som1c_2 = p1co2a_2 + p1co2b_2 + sand
*   fps1s3, the effect of clay content on decomposition from som1c_2 = ps1s3_1 + ps1s3_2 * clay
*   fps2s3, the effect of clay content on decomposition from som2c_2 = ps2s3_1 + ps2s3_2 * clay
*   orglch, the effect of sand content on organic leaching from soil = omlech_1 + omlech_2 * sand
*   vlossg, the percent of gross mineralized N that is volatized to the atmosphere during decomposition, is calculated from soil clay content:
    *   vlossg = 0.03 if clay < 0.1; vlossg = 0.01 if clay > 0.3; else
    *   vlossg = -0.1 * (clay - 0.3) + 0.01
*   potential intake for each animal type (Freer _et al._ 2012 eq. 2)

Where



*   adep_<lyr>, peftxa, peftxb, p1co2a_2, p1co2b_2, omlech_1), omlech_2, ps2s3_1), ps2s3_2 are fixed parameters
*   sand is proportion sand content of soil (0 - 1)
*   clay is proportion clay content of soil (0 - 1)

Calculate required maximum C/N and C/P ratios for decomposition of structural material (i.e., material containing lignin): these limit the decomposition of structural material and do not change throughout the simulation. The names of these ratios contain three indices that distinguish them from each other: one index indicating whether above- or belowground material is decomposing; an index indicating the mineral element that the ratio pertains to; and an index indicating whether the ratio pertains to material decomposing to som1 or som2.  These indices are positioned in the ratio names as:

rnew<a or b, indicating above- or belowground material>s_<1 or 2, indicating N or P>_<1 or 2, indicating decomposition to som1 or som2>

For example, the ratio rnewas_1_1 is the required N ratio for aboveground material decomposing into som1; the ratio rnewbs_2_1 is the required P ratio for belowground material decomposing into som1.

First calculate cemicb1 and cemicb2, intermediate parameters:



*   cemicb1_<iel> = (pcemic1_2_<iel> - pcemic1_1_<iel> / pcemic1_3_<iel>
*   cemicb2<iel> = (pcemic2_2_<iel> - pcemic2_1_<iel> / pcemic2_3_<iel>

Then calculate maximum ratios for surface material flowing into som1c_1:



*   if (strucc_1 * 2.5) < 0
    *   econt_<iel> = 0. 
    *   else: econt_<iel> = struce_1_<iel> / (strucc_1 * 2.5)
*   if econt_<iel> > pcemic1_3_<iel>:
    *   rnewas_<iel>_1 = pcemic1_2_<iel>
    *   else: rnewas_<iel>_1 = pcemic1_1_<iel> + econt_<iel> * cemicb1_<iel>

Then do the same thing for the flow of N and P into som2, using parameters pcemic2_<lyr>_<iel>:



*   if (strucc_1 * 2.5) < 0.0000000001:
    *   econt_<iel> = 0. 
    *   else: econt_<iel> = struce_1_<iel> / (strucc_1 * 2.5)
    *   if econt_<iel> > pcemic2_3_<iel>:
        *   rnewas_<iel>_2 = pcemic2_2_<iel> 
    *   else: rnewas_<iel>_2 = pcemic2_1_<iel> + econt_<iel> * cemicb2_<iel>

The ratios for flow of N and P into som2 are adjusted with the addition of a fraction of the ratios entering som1, calculated with the parameters rad1p_<>_<iel>:



*   radds1_<iel> = rad1p_1_<iel> + rad1p_2_<iel> * (rnewas_<iel>_1 - pcemic1_2_<iel>
*   rnewas_<iel>_2 = rnewas_<iel>_2 + radds1_<iel>
*   rnewas_<iel>_2 = max(rnewas_<iel>_2, rad1p_3_<iel>

Similarly, the maximum required ratios of C/N and C/P flowing from soil structural C (strucc_2) into soil microbial C (som1c_2) and soil slow organic C (som2c_2) are calculated upon initialization and do not change throughout the simulation. These are simply equal to the input parameters varat1_<>_<iel> and varat22_<>_<iel>.



*   rnewbs_<iel>_1 = varat1_1_<iel>
*   rnewbs_<iel>_2 = varat22_1_<iel>


### **Potential Production Submodel** {#potential-production-submodel}

For each PFT, if plant growth is scheduled to occur this month, calculate potential production.

The effect of soil water availability on potential production is calculated from reference evapotranspiration, water content of the top layer of soil, and soil texture:



*   h2ogef_1, the limiting effect of soil water availability on growth = 1 + 1 / (pprpts_3 - (pprpts_1 + (pprpts_2 * wc))) * (h2ogef_1_prior - pprpts_3), bounded to be between 0.01 and 1

Where



*   wc, water content, is calculated during initialization and described above
*   h2ogef_1_prior = pet if pet < 0.01, else
*   h2ogef_1_prior = (avh2o_1 + precip<sub>m</sub>) / pet
*   avh2o_1, water in soil available for plant growth, is calculated in soil water submodel in previous monthly timestep (or supplied as an initial parameter)
*   pet, reference evapotranspiration modified by fwloss parameter = monpet * fwloss_4
*   monpet, reference evapotranspiration for this month calculated with FAO Penman-Monteith method

Average soil surface temperature, ctemp, is calculated from temperature inputs and modified by current live biomass, aglivc and the fixed parameter pmxbio:



*   biomass = min(aglivc * 2.5, pmxbio)
*   tmxs, maximum temperature = tmax<sub>m </sub>+ (25.4 / 1 + 18 * exp(-0.2 * tmax<sub>m</sub>)) * (exp(pmxtmp * biomass) - 0.13)
*   tmns, minimum temperature = tmin<sub>m</sub> + pmntmp * biomass - 1.87
*   ctemp = (tmxs + tmns) / 2

The limiting effect of temperature on potential production, potprd, is calculated from soil surface temperature and by the PFT parameters describing response to temperature, ppdf_1-4_1:



*   frac = (ppdf_2_1 - ctemp) / (ppdf_2_1 - ppdf_1_1)
*   If frac <= 0, potprd = 0
*   Else potprd = exp(ppdf_2_1  / ppdf_3_1  * _1 - frac^ppdf_4_1 ) * frac^ppdf_3_1
*   If average temperature (calculated from temperature inputs) is < 0, potprd = 0

The limiting effect of obstruction by standing dead material on potential production, biof, is calculated from current standing dead biomass (stdedc) and litter (strucc_1), the ratio of current live biomass to standing dead biomass, and PFT parameters controlling this effect:



*   bioc, maximum potential effect = stdedc + 0.1 * strucc_1, bounded to be greater than 0 and less than pmxbio
*   bioprd = 1 - (bioc / biok5 + bioc)
*   temp1 = 1 - bioprd
*   temp2 = temp1 * 0.75
*   temp3 = temp1 * 0.25
*   ratlc = aglivc / bioc
*   biof = (bioprd + temp2) + (temp3 * (ratlc - 1)) if ralc >= 1.
*   biof = (bioprd + temp2) + temp3 * (ratlc - 1) if ratlc > 1 and ratlc <= 2
*   biof = 1 if ratlc > 2

Solar radiation outside the atmosphere, shwave, is calculated from the site latitude:



*   shwave = f(month, latitude)

Total potential production (tgprod_pot_prod, aboveground and belowground production combined) is calculated from the PFT intrinsic growth capacity, limited by the preceding factors:



*   tgprod_pot_prod = prdx_1 * shwave * potprd * h2ogef_1 * biof


### **Root:shoot Ratio Submodel** {#root-shoot-ratio-submodel}

Production is allocated to above and belowground fractions according to water and nutrient availability; if the plant experiences water stress or nutrient stress, additional production is allocated to the roots.  Because plant demand for N and P depends on potential production, a provisional fraction of C allocated to roots (fracrc_p) must be calculated.  Calculation of fracrc_p follows the value of the input parameter frtcindx, which indicates whether the plant should be treated as a perennial plant, or whether the “Great Plains equation” should be used (i.e., the original Century formulation developed for use in the great plains of the US).



*   Great Plains:
    *   fracrc_p = 1 / (1 / rtsh + 1)
    *   Where rtsh = (bgppa + grwprc * bgppb) / (agppa + grwprc * agppb)
    *   Where grwprc = growing season precipitation
*   Perennial plant:
    *   fracrc_p = (cfrtcw_1 + cfrtcw_2 + cfrtcn_1 + cfrtcn_2) / 4

Before calculating the availability of soil nutrients, favail_2, the intermediate parameter describing availability of P, must be calculated.  Favail_2 is calculated from mineral N in the surface layer and from the site parameters favail(4-7).

The availability of soil available nutrients, eavail_<iel>, depends partly on the site parameter favail_<iel> (fraction of N or P available), rimpct, the impact of current root biomass, and estimated <iel> in crop storage:



*   eavail_<iel> = (availm_<iel> * favail_<iel> * rimpct) + crpstg_<iel>
*   eavail<N> = eavail_<N> + maxNfix

Where



*   availm<iel> is the sum of mineral <iel> in soil layers accessible by plant roots (i.e., sum(minerl_<layer>_<iel> for layer in 1:number of layers for plant growth)
*   favail_<iel> is a PFT-specific parameter
*   crpstg_<iel> is retranslocation <iel> storage pool for the PFT
*   rimpct = 1 if (rictrl * bglivc * 2.5) > 33
*   Else rimpct = 1 - riint * exp(-rictrl * bglivc * 2.5)
*   Where
    *   riint and rictrl are PFT-specific parameters
    *   bglivc is current belowground live biomass
*   maxNfix, N fixation by the PFT = snfxmx * (tgprod_pot_prod / 2.5)
*   Where
    *   snfxmx is a PFT-specific parameter

The plant demand for N and P is calculated from the minimum allowable C/N and C/P ratios for the PFT:



*   demand_<iel> = demand<sub>above_<iel</sub>> + demand<sub>below</sub><iel>
*   demand<sub>above_<iel</sub>> = (agprod / 2.5) * (1 / cercrp<sub>min</sub>_<iel>_above))
*   demand<sub>below</sub><iel> = (tgprod_pot_prod - agprod) / 2.5) * (1 / cercrp<sub>min</sub>_<iel>_below)
*   cercrp<sub>min</sub>_<iel>_above, the minimum C/<iel> ratio in aboveground biomass = min(pramn_<iel>_1 + (pramn_<iel>_2 - pramn_<iel>_1) * 2.5 * aglivc / biomax, pramn_<iel>_2)
*   cercrp<sub>min</sub>_<iel>_below, the minimum C/<iel> ratio in belowground biomass = prbmn_<iel>_1 + prbmn_<iel>_2 * grwprc

Where



*   pramx_<iel>_1, pramx_<iel>_2, biomax, are PFT-specific parameters
*   grwprc = growing season precipitation
*   agprod, provisional aboveground production = tgprod_pot_prod * (1 - fracrc_p)

The revised fraction of C allocated to roots, fracrc, is recalculated from the effects of nutrient and water stress. If the “Great Plains equation” is used, nutrient and water stress are not considered and fracrc is equal to the provisional fraction calculated above.  For perennial plants, the fraction is the maximum of that limited by water stress, and that limited by nutrient stress (where the most limiting nutrient determines nutrient stress).



*   Great Plains:
    *   fracrc = 1 / (1 / rtsh + 1)
    *   Where rtsh = (bgppa + grwprc * bgppb) / (agppa + grwprc * agppb)
    *   Where grwprc = growing season precipitation
*   Perennial plant:
    *   fracrc = max(h2oeff, ntreff), bounded to be <= 0.99
    *   h2oeff, the limiting effect of water, is the y-value lying on the line described by (0, cfrtcw_1) and (1, cfrtcw_2), corresponding to the x-value h2ogef_1 (the limiting effect of soil water availability on growth, calculated above) 
    *   ntreff, the limiting effect of N and P, is the maximum value across <iel> of the y-value lying on the line described by (0, cfrtcn_1) and (1, cfrtcn_2), corresponding to the x-value a2drat_<iel>

Where



*   a2drat_<iel>, the effect of nutrient <iel> demand on root/shoot allocation = evail_<iel> / demand_<iel>, bounded to be between 0 and 1

Above- and belowground production is then calculated according to tgprod_pot_prod, total production limited by solar radiation, temperature, soil moisture, and obstruction, and the fraction of C allocated to roots:



*   bgprod, belowground production = tgprod_pot_prod* fracrc
*   agprod, aboveground production = tgprod_pot_prod- pgprod
*   rtsh, root:shoot ratio = bgprod / agprod

The final calculation of aboveground production and the root:shoot ratio are modified by the removal of biomass by grazing, If grazing occurred during the previous month.  The impact of grazing is controlled by the PFT-specific input parameters grzeff and gremb, which specify the effect of grazing on production and the root-shoot ratio, and by flgrem, the fraction of aboveground live biomass removed by grazing (between 0 and 1).



*   If grzeff = 0, aboveground production and root:shoot ratio are unchanged
*   If grzeff = 1:
    *   agprod = (1 - (2.21 * flgrem)) * agprod, bounded to be >= 0.02
*   If grzeff = 2:
    *   agprod = (1 + 2.6 * flgrem - (5.83 * flgrem<sup>2</sup>)) * agprod, bounded to be >= 0.02
    *   rtsh = rtsh * 3.05 * flgrem - 11.78 * flgrem<sup>2</sup>, bounded to be >= 0.01
*   If grzeff = 3:
    *   rtsh = rtsh * 3.05 * flgrem - 11.78 * flgrem<sup>2</sup>, bounded to be >= 0.01
*   If grzeff = 4:
    *   rtsh = 1 - (flgrem * gremb)
*   If grzeff = 5:
    *   agprod = (1 + 2.6 * flgrem - (5.83 * flgrem<sup>2</sup>) * agprod, bounded to be >= 0.02
    *   rtsh = 1 - (flgrem * gremb)
*   If grzeff = 6:
    *   agprod = (1 - (2.21 * flgrem)) * agprod, bounded to be >=0.02
    *   rtsh = 1 - (flgrem * gremb)
*   bgprod = rtsh * agprod

Total final potential production, tgprod, is calculated from the adjusted above- and belowground production. Potential C production, pcropc, is calculated from tgprod.  Note that pcropc is the value that is used to calculate actual (realized) production in the plant growth submodel.



*   tgprod, total final potential production = agprod + bgprod
*   pcropc = tgprod / 2.5


### **Soil Water Submodel** {#soil-water-submodel}

The soil water submodel simulates the flow of precipitation through interception by plants, infiltration into the soil, percolation through the soil, and transpiration by plants.  Outputs that must be saved from this model are avh2o(1), water available to plants for growth (used in the potential production submodel), avh2o(3), water in the first two soil layers (used in the decomposition submodel to calculate the impact of soil moisture on decomposition), and amov_2, an index indicating whether movement of water occurs from the top soil layer (used in the decomposition submodel to determine whether leaching of nutrients occurs). These quantities are calculated by partitioning precipitation among soil layers after accounting for losses to evapotranspiration.

The model simulates precipitation as snow and the effects of lingering snowpack.  As the fate of moisture in new snow and existing snowpack is followed, we track moisture inputs after snow, inputs_after_snow.  This gives the water draining into the soil after snowfall, evaporation from snow, and melting of existing snowpack.  If the temperature is below freezing, all precipitation falls as snow and inputs_after_snow = 0.  If the temperature is above freezing and some previous snowpack exists, inputs_after_snow is calculated as liquid that melts from the snow.  If the temperature is above freezing, and there is no existing snowpack to melt, then inputs_after_snow is equal to precip.

If the average air temperature is below freezing (i.e., tave <= 0), precipitation occurs in the form of snow.



*   snow, snowpack = snow + precip
*   inputs_after_snow = 0

If the temperature is above freezing, but some snowpack exists, the incoming precipitation is added to snowpack liquid (snlq).



*   snlq = snlq + precip
*   inputs_after_snow = 0

If some snowpack exists, even if the temperature is below freezing, some snow is evaporated with associated consumption of potential energy for evapotranspiration.  Evaporation from snow consumes both the ice and liquid portions of snow:



*   snowtot, liquid and ice portions of snow = snow + snlq
*   evsnow, evaporation from snowpack = pet * 0.87, bounded to be less than or equal to snowtot
*   snow_rem, snow remaining after evaporation = max(snow - evsnow * (snow / snowtot), 0)
*   snlq_rem, liquid in snowpack remaining after evaporation = max(snlq - evsnow * (snlq / snowtot), 0)
*   petrem, PET energy remaining after evaporation of snow = pet - evsnow / 0.87, bounded to be greater than or equal to 0

Where



*   pet, reference evapotranspiration modified by fwloss parameter = monpet * fwloss(4)
*   monpet, reference evapotranspiration for this month calculated with FAO Penman-Monteith method

If snowpack exists following evaporation and the air temperature is sufficient (if tave >= tmelt(1)), then some snow melts.  The melted snow is moved to snlq, liquid in the snowpack, and the excess liquid above 50% of snowpack is drained into the soil as moisture inputs after snow (inputs_after_snow).



*   snowmelt, liquid melted from snow = tmelt_2 * (tave - tmelt(1)) * shwave
*   snowmelt is bounded to be greater than or equal to zero, and less than or equal to snow
*   snow = snow - snowmelt
*   snlq = snlq + snowmelt
*   If snlq > 0.5 * snow:
    *   add, additional liquid draining from snow = snlq - 0.5 * snow
    *   snlq = snlq - add
    *   inputs_after_snow = inputs_after_snow + add
    *   snowmelt, liquid melted from snow = inputs_after_snow 

Where



*   tmelt_2 and tmelt(1) are fixed parameters
*   tave is average air temperature
*   shwave is solar radiation outside the atmosphere, calculated from current month and site latitude

After accounting for snowfall, evaporation from snow, and water melting from snow, moisture is allocated to runoff, canopy interception and bare soil evaporation. Potential total transpiration water loss is calculated according to aboveground live biomass, and then water is distributed sequentially to each soil layer. 

Moisture is first lost to runoff:



*   runoff = fracro * (inputs_after_snow  - precro), bounded to be greater than or equal to 0
*   winputs, water available for evapotranspiration = inputs_after_snow - runoff

The loss of precipitation to canopy interception and bare soil evaporation is calculated if there is no snow cover.  Loss to canopy interception and bare soil evaporation is a function of live, standing dead, and surface litter biomass.  The total loss of moisture to interception and bare soil evaporation is bounded to be less than or equal to 40% of reference evapotranspiration:



*   alit, biomass in surface litter = (strucc(1) + metabc(1)) * 2.5, bounded to be <= 400 for the soil water submodel
*   aliv, aboveground live biomass = aglivc * 2.5 + (0.25 * pcropc * 2.5)
*   adead, aboveground dead biomass = stdedc * 2.5
*   sd, standing biomass = aliv + adead, bounded to be <= 800 for the soil water submodel
*   aint, moisture lost to canopy interception = (0.0003 * alit + 0.0006 * sd) * fwloss(1)
*   abs, moisture lost to bare soil evaporation = 0.5 * exp((-0.002 * alit) - (0.004 * sd)) * fwloss_2
*   evap_losses, total surface evaporation = min(((abs + aint) * winputs), (0.4 * petrem))
*   add, moisture available at this step for transpiration = winputs - evl

Where



*   petrem is energy remaining for evaporation after evaporation of snow

The moisture remaining after interception and surface soil evaporation is then allocated to soil layers, where it may be further lost through transpiration by plants and direct evaporation from the top soil layer. Before moisture is passed sequentially through each layer of soil, the total potential transpiration water loss (trap, cm/month) is calculated. Total transpiration (trap) is first calculated as the remainder of reference evapotranspiration after evaporation of snow and surface evaporation.  It is then limited by temperature and by live biomass: if the average temperature is less than 2 degrees Celsius, trap is zero. When the temperature is greater than or equal to 2 degrees Celsius, trap is limited by live biomass.



*   trap = petrem - evap_losses
*   If tave < 2: trap = 0 else
*   trap = max(min(trap, petrem * 0.65 * (1 - exp(-0.02 * aliv))), 0)

The second potential loss of moisture before allocation among soil layers is through evaporation from the first soil layer (pevp, cm/day). This is calculated prior to transpiration because it is derived from potential transpiration (while actual transpiration (trap) is reduced twice (line 169, line 241, H2olos.f) according to actual water available to transpire), but is not accounted for in soil moisture summaries until moisture is removed by transpiration.



*   pevp = max(petrem - trap - evl, 0)

Before water is allocated to soil layers, transpiration losses are subtracted from water inputs to the soil.  “This is necessary for a monthly time step to give plants in wet climates adequate access to water for transpiration. -rm 6/94, Pulliam 9/94”, line 166-167, H2olos.  Simultaneously, total transpiration (trap) is restricted to be less than available water inputs to the soil at this point (add).



*   tran, evapotranspiration limit = min(trap - 0.01, add)
*   trap = trap - tran
*   add, moisture allocated to soil layers in the next step = add - tran

Before any water is actually removed by transpiration, water is allocated among soil layers.  Water moves sequentially through each layer of soil according to the field capacity of the layer; if the capacity of a layer is exceeded, the excess is passed to the next layer. The output amov_2 is calculated during this step, indicating whether water flows from the top soil layer.  Moisture that remains at the bottom of all modeled soil layers is lost as storm flow.



*   afl<layer>, the water holding capacity of this layer = adep<layer> * afiel<layer>
*   asmos<layer> = asmos<layer> + added_from_above
*   If asmos<layer> > afl:
    *   amov<layer> = asmos<layer>
    *   asmos<layer> = afl<layer>
*   Else, amov<layer> = 0
*   added_to_below = amov<layer>

Where



*   added_from_above is the water added to soil layer <layer> from precipitation or the upper adjacent layer
*   added_to_below is the water remaining after saturation that moves to the lower adjacent layer

After moisture has been distributed among soil layers according to the field capacity of each layer, transpiration water loss from each layer is calculated.  Total transpiration water loss is apportioned from each soil layer according to the fixed parameter awtl_<lyr>, the weighting factor for transpiration loss for the soil layer. This describes the density of roots inside that soil layer and determines the fraction of available water in that layer that can be extracted by roots.



*   avw<layer>, water in this layer available for transpiration = asmos<layer> - awilt<layer> * adep<layer>
*   awwt<layer>, available water weighted by transpiration depth distribution factor = avw<layer> * awtl<layer>
*   tot, total available water = sum(avw) across layers
*   tot2, total available water weighted by transpiration depth distribution factors = sum(awwt) across layers

Total transpiration is restricted to be less than or equal to total water available for transpiration:



*   trap = min(tot, trap)

Actual transpiration from each soil layer, trl<layer>, is calculated for each soil layer accessible by plant roots (i.e., for <lyr> in 1:nlaypg):



*   avinj<layer>, water in this layer available for transpiration = asmos<layer> - awilt<layer> * adep<layer>
*   trl<layer> = min((trap * awwt<layer> / tot2, avinj)
*   avinj<layer> = avinj<layer> - trl<layer>
*   asmos<layer> = asmos<layer> - trl

The relative water content of soil layer 1, rwcf_1, is used to calculate evaporative water loss from the top soil layer. It is updated after transpiration from soil layer 1 is removed:



*   rwcf_1 = (asmos_1 / adep_1 - awilt_1) / (afiel_1 - awilt_1)

After the loss of soil moisture to transpiration is calculated, additional water is removed from the top soil layer due to evaporation. The amount removed, pevp, was calculated from potential evapotranspiration before allocation of water to soil layers.  It is now removed from the top soil layer.



*   evmt = max((rwcf_1 - 0.25) / (1-0.25)), 0.01)
*   evlos, evaporative water loss from soil layer 1 = min(evmt * pevp * abs * 0.1, max(asmos_1 - awilt_1 * adep_1, 0))
*   asmos_1 = asmos_1 - evlos
*   avinj_1 = avinj_1 - evlos

Soil moisture available to plants for growth for each plant functional type (avh2o(1)_PFT) is the sum of avinj<layer> across soil layers accessible by the roots of that plant functional type, weighted by the percent cover of the plant functional type (i.e., sum(avinj<layer> for layer in 1:nlaypg, multiplied by % cover of the PFT).  Soil moisture impacting decomposition (avh2o(3)) is the sum of avinj<layer> in the top 2 layers (i.e., sum(avinj<layer> for layer in 1:2).


### **Decomposition** {#decomposition}

Decomposition, where C, N and P move from one surface or soil stock to another, is performed four times per month.  Some intermediate quantities controlling decomposition are calculated during model initialization (described under [Initialization ](https://docs.google.com/document/d/10oJo43buEdJkFTZ0wYaW00EagSzs1oM7g_lBUc8URMI/edit#heading=h.v94b5xknp5t2)above), while others are calculated once per month.

The flow of C, N and P is generally limited by the availability of N and P in the donating stock (i.e., the stock that material is leaving). Decomposition can only occur if the actual C/N and C/P ratios of the donating stock are smaller than required ratios, or if mineral N or P is available. The required ratios for decomposition from structural material (i.e., material containing lignin) are fixed throughout the simulation; the required ratios for decomposition of other stocks are recalculated at each decomposition step.

If both the C/N and C/P ratios are sufficiently small to allow decomposition, the decomposition event may be associated with some respiration, where some C is released in the form of CO<sub>2</sub> to the atmosphere (the grazing forage model does not track CO<sub>2 </sub>released to the atmosphere). Respiration includes some mineralization of N and P.  After the C lost to respiration is calculated, the C, N and P moving from the donating to the recipient stock are calculated.  The amount of N and P moving to the recipient stock is usually calculated according to the required ratios for decomposition to occur.

The following intermediate quantities influencing decomposition are calculated once per month:



*   agdefac, the aboveground decomposition factor = max(0.0, tfunc * agwfunc)
*   bgdefac, the belowground decomposition factor = max(0.0, tfunc * bgwfunc)
*   pheff_struc, the impact of pH on decomposition for structural material = 0.5 + (1.1 / pi) * arctan(pi * 0.7 * (pH - 4.)), bounded between 0 and 1
*   pheff_metab, the impact of pH on decomposition for metabolic material = 0.5 + (1.14 / numpy.pi) * arctan(numpy.pi * 0.7 * (pH - 4.8)), bounded between 0 and 1

Where tfunc, the effect of temperature on decomposition, is calculated according to an arctangent curve from stemp, estimated soil surface mean temperature:



*   tfunc = max(0.01, teff_2 + (teff(3) / PI) * atan(PI * teff(4) * (stemp - teff(1))) / temp_normalizer)
*   temp_normalizer = teff_2 + (teff(3) / PI) * atan(PI * teff(4) * (30.0 - teff(1)))

and agwfunc, the effect of soil moisture on decomposition, is calculated from the ratio of soil water in the top two soil layers (avh2o(3)) to reference evapotranspiration:



*   if rprpet > 9: agwfunc = 1. else
*   agwfunc = min(1., 1./(1. + 30.0 * exp(-8.5 * rprpet)))
*   If there is water melting from snowpack (if snowmelt > 0), rprpet, the ratio of soil moisture to reference evapotranspiration = (avh2o(3) + snowmelt) / pet
*   Else: rprpet = (avh2o(3) + precip) / pet
*   pet, reference evapotranspiration modified by fwloss parameter = monpet * fwloss(4)
*   monpet, reference evapotranspiration for this month calculated with FAO Penman-Monteith method
*   bgwfunc = agwfunc

Soil surface mean temperature is calculated from temperature inputs and modified by estimated impact of shading by biomass and surface litter, and estimated daylength:



*   If there is snowpack, stemp= 0; else
*   tmxs, maximum temperature with leaf shading = tmax + (25.4/(1 + 18 * exp(-0.2 * tmax))) * (exp(pmxtmp * bio) - 0.13)
*   tmns, minimum temperature with leaf shading = tmin + pmntmp * bio - 1.78
*   Where bio = aglivc * 2.5 + stdedc * 2.5 + elitst * (strucc(1) + metabc(1)) * 2.5
*   Estimated daylength = f(month, latitude)
*   tmns_mlt, the daylength multiplier for minimum temperature = ((12 - daylength) * 3 + 12) / 24 if daylength < 12, else tmns_mlt = ((12 - daylength) * 1.2 + 12) / 24, bounded to be between 0.05 and 0.95
*   tmxs_mlt, daylength multiplier for maximum temperature = 1 - tmns_mlt
*   stemp = tmxs_mlt * tmxs + tmns_mlt * tmns

anerb, the effect of soil anaerobic conditions on decomposition, is calculated from rprpet and the aneref(1-3) parameters describing rprpet thresholds:



*   If rprpet > aneref(1): xh2o = (rprpet - aneref(1)) * pet * (1. - drain)
*   else: anerb = 1.
*   If xh2o > 0: 
    *   newrat = aneref_1 + (xh2o / pet)
    *   slope = (1. - aneref(3)) / (aneref_1 - aneref_2)
    *   anerb = 1. + slope * (newrat - aneref_1)
*   If anerb < aneref(3): anerb = aneref(3)

Prior to decomposition, calculate N fixation for this month: monthly N fixation is calculated from annual N deposition, calculated once per year.  Monthly N fixation is calculated according to the ratio of the current month’s precipitation to annual precipitation.  Total N fixed this month, wdfxm, is added to the mineral N pool.



*   wdfxm, total N fixed this month = baseNdep * (precip / annual_precip) + epnfs_2 * min(annual_precip, 100) * (precip / annual_precip)

Where baseNdep is calculated from annual precipitation during yearly tasks.

Four times per month, calculate decomposition from each surface and soil pool.


#### **Decomposition of surface structural material** {#decomposition-of-surface-structural-material}

If there is material in surface structural material to decompose (if strucc_1 > 0.0000001), calculate tcflow, the total flow from strucc_1:



*   tcflow = min(strucc_1, strmax_1) * agdefac * dec1_1 * exp(-pligst_1 * strlig_1) * dtm * pheff_struc

Where



*   agdefac, the aboveground decomposition factor, is defined above
*   strlig_1 is the state variable representing the lignin content of surface structural residue (grams of lignin / grams biomass)
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff_struc is defined above

Test whether N and P are sufficient to allow C to decompose from strucc_1.  The C/N and C/P ratios of the decomposing stock (strucc_1) are compared to the required ratios for aboveground material decomposing into som1.  If the ratios are sufficient to allow decomposition to som1, the material will also decompose to som2.  If the ratios are insufficient, the material will not decompose at all.



*   if aminrl_<iel> < 0.0000001:
    *   if (strucc_1 / struce_1_<iel> > rnewas_<iel>_1: the material cannot decompose
*   else: the material can decompose

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

Where



*   aminrl_<iel> = mineral <iel> in the surface layer averaged across decomposition timesteps
*   rnewas_<iel>_1, the maximum required ratio for aboveground material decomposing to som1, is calculated upon initialization

If C can decompose from strucc_1, C first flows from strucc_1 into som2c_1. The proportion of total flow from strucc_1 that flows into som2c_1 is calculated according to its lignin content.



*   tosom2, the C that flows from strucc_1 into som2c_1 = tcflow * strlig_1
*   co2los_2, the loss of CO<sub>2</sub> through respiration = tosom2 * rsplig
*   strucc_1 = strucc_1 - co2los_2
*   tosom2 = tosom2 - co2los_2

The respiration associated with the decomposition event also includes some mineralization of N and P, where N and P flow from the surface pool to the mineral pool. The amount of N and P mineralized from the surface pool is calculated according to their ratios in respired material:



*   mnrflo_<iel>, the amount of <iel> moving from struce_1_<iel> to minerl_1_<iel> = co2los_2 * struce_1_<iel> / strucc_1

Gross mineralization of N (the sum only of mineralization), which is used to calculate volatilization loss of N after decomposition, is updated with this amount:



*   gromin_1 = gromin_1 + mnrflo_1

As C flows from strucc_1 into som2c_1, N and P move from the surface structural pool (struce_1_<iel> into the slow surface organic matter pool (som2e_1_<iel>.  With the flow of elements between pools, immobilization or mineralization may occur, depending on whether the C/<iel> ratio of decomposing material is more or less than the required ratios for new material (i.e., agrat_<iel>_som2 or rnewas_<iel>_2, described under initialization).



*   outofa_<iel>, the <iel> flowing out of struce_1_<iel> = struce_1_<iel> * (tosom2 / strucc_1)
*   If (tosom2 / outofa_<iel> > rnewas_<iel>_2:
    *   Immobilization occurs, if there is enough labile <iel> to supply it
    *   immflo_<iel> = tosom2 / rnewas_<iel>_2 - outofa_<iel>
    *   If (minerl_1_<iel> - immflo_<iel> < 0:
        *   mnrflo_<iel>, the mineral flow of <iel> = 0
    *   else: outofa flows from struce_1_<iel> to som2e_1_<iel> and
    *   immflo_<iel> flows from minerl_1_<iel> to som2e_1_<iel>
    *   mnrflo_<iel> = -immflo_<iel> 
*   else (the C/<iel> ratio of decomposing material is less than rnewas_<iel>_2):
    *   Mineralization occurs
    *   atob, the fraction of <iel> moving to som2e_1_<iel> = tosom2 / rnewas_<iel>_2
    *   atob flows from struce_1_<iel> to som2e_1_<iel> and
    *   mnrflo_<iel> = outofa - atob
    *   mnrflo_<iel> flows from struce_1_<iel> to minerl_1_<iel>

Where



*   minerl_1_<iel> is current mineral <iel> in surface pool, i.e. pertaining to the current four-times-per-month decomposition timestep.
*   tosom2 is the C flowing from strucc_1 to som2c_1
*   rnewas_<iel>_2 is the maximum required C/<iel> ratio for material flowing to som2c_1, calculated during initialization

Gross mineralization (gromin_<iel>, the sum only of mineralization) is updated with the calculated mineral flow:



*   If mnrflo_<iel> > 0: gromin_<iel> = gromin_<iel> + mnrflo_<iel>

The remainder of total C flow from strucc_1 flows to som1c_1, and is again associated with some loss of CO<sub>2</sub> through respiration:



*   tosom1, the C that flows from strucc_1 into som1c_1 = tcflow - tosom2 - co2los_2
*   co2los_1, additional CO2 associated with respiration to som1c_1 = tosom1 * ps1co2_1
*   strucc_1 = strucc_1 - co2los_1
*   tosom1 = tosom1 - co2los_1

Again, the respiration associated with decomposition of soil from strucc_1 into som1c_1 includes some mineralization of N and P.  Again, the amount of mineralized N and P is according to their ratios in respired material, as described above.

As C flows from strucc_1 into som1c_1, N and P move from the surface structural pool (struce_1_<iel> into the surface microbial pool (som1e_1_<iel>.  With the flow of elements between pools, immobilization or mineralization may occur, depending on whether the C/<iel> ratio of decomposing material is more or less than the required ratios for new material entering som1 (i.e., agrat_<iel>_som1, described under initialization). Importantly, flows of N and P into som2e_1_<iel> must be reconciled before proceeding with movement of N and P into som1e_1_<iel> because the supply of labile N and P determines whether immobilization or mineralization occurs during the flow into som1e_1_<iel>.


#### **Decomposition of soil structural material** {#decomposition-of-soil-structural-material}

If there is soil structural material to decompose (if strucc_2 > 0.0000001), calculate tcflow, the total potential flow from strucc_2:



*   tcflow = min(strucc_2, strmax_2) * bgdefac * dec1_2 * exp(-pligst_2 * strlig_2) * anerb * dtm * pheff_struc

Where



*   bgdefac, the belowground decomposition factor, is defined above
*   strlig_2 is the lignin content of soil structural residue (grams of lignin / grams biomass)
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff_struc is defined above
*   anerb, the effect of soil anaerobic conditions on decomposition, is defined above

Test for the maximum required C/N and C/P ratios in strucc_2 before decomposing material into som1c_2 and som2c_2:



*   if aminrl_<iel> < 0.0000001:
    *   if (strucc_2 / struce_2<iel> > rnewbs_<iel>_1: the material cannot decompose to som1 or som2
*   else: the material can decompose to som1c_2 and som2c_2

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

Where

aminrl_<iel> = mineral <iel> in the surface layer averaged across decomposition timesteps

If C can decompose from strucc_2 into som1c_2, it can also decompose into som2c_2.  Structural C first decomposes into som2c_2. The decomposition event is associated with some respiration.



*   tosom2, the C that flows from strucc_2 into som2c_2 = tcflow * strlig_2
*   co2los_2, the loss of CO2 associated with this decomposition event = tosom2 * rsplig
*   strucc_2 = strucc_2 - co2los_2
*   tosom2 = tosom2 - co2los_2

The respiration associated with the decomposition event also includes some mineralization of N and P. These calculations are identical to those performed for respiration during decomposition from surface structural pools (struce_1_<iel> described above.

N and P flow from struce_2_<iel> into som2e_2_<iel> according to according to the proportion of strucc_2 that is moving into som2c_2, if their availability in struce_2 or mineral availability is high enough to supply their movement.  This flow is identical to the movement of N and P from surface structural pools (struce_1_<iel> into the surface slow pool (som2e_1_<iel> as described above.

The C flowing from strucc_2 into som1c_2 is the remainder of what was already calculated to flow to som2c_2, and is again associated with some loss of CO<sub>2</sub> through respiration:



*   tosom1, the C that flows from strucc_2 into som1c_2 = tcflow - tosom2 - co2los_2
*   co2los_1, additional CO<sub>2</sub> associated with respiration to som1c_1 = tosom1 * ps1co2_2
*   strucc_2 = strucc_2 - co2los_1
*   tosom1 = tosom1 = co2los_1

Again, the respiration associated with decomposition of soil from strucc_2 into som1c_2 includes some mineralization of N and P.

As C flows from strucc_2 into som1c_2, N and P flow from struce_2_<iel> into som1e_2_<iel> according to the proportion of strucc_2 that is moving into som1c_2, if their availability in struce_2 or mineral availability is high enough to supply their movement. This flow is identical to the movement of N and P from surface structural pools (struce_1_<iel> into the surface slow pool (som2e_1_<iel> as described above.


#### **Decomposition of surface metabolic material** {#decomposition-of-surface-metabolic-material}

If there is material in the surface metabolic pool (metabc_1) to decompose into surface som1c, first compute the required C/N and C/P ratios for decomposition to occur:



*   if (metabc_1 * 2.5) < 0.0000000001:
    *   econt_<iel> = 0. 
    *   else: econt_<iel> = metabe_1_<iel> / (metabc_1 * 2.5)
*   if econt_<iel> > pcemic1_3_<iel>:
    *   agdrat_<iel> = pcemic1_2_<iel>
    *   else: agdrat_<iel> = pcemic1_1_<iel> + econt_<iel> * cemicb1_<iel>

Where

cemicb1 = intermediate parameter calculated upon Initialization, described above

Calculate tcflow, the total flow from metabc_1: 



*   tcflow = metabc_1 * agdefac * dec2_1 * dtm * pheff_metab, bounded to be smaller than or equal to metabc_1

Where



*   agdefac, the aboveground decomposition factor, is defined above
*   dec2_1 is an input parameter
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff_metab is defined above

Compare current C/N and C/P ratios in surface metabolic material to the maximum ratios to test whether decomposition can occur:



*   If animrl_<iel> < 0.0000001:
    *   If (metabc_1 / metabe_1_<iel> > agdrat_<iel>: the material cannot decompose
*   else: the material can decompose

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

Where



*   animrl_<iel> is the sum of positive layers of the mineral element (N or P) before uptake by plants
*   agdrat_<iel>, the required ratio for decomposition to occur, is calculated above

If decomposition can occur, the decomposition event is associated with some respiration, where some C is lost to CO<sub>2</sub>.



*   co2los, the loss of CO<sub>2</sub> during respiration = tcflow * pmco2_1
*   tosom1, the C that flows from metabc_1 into som1c_1 = tcflow - co2los

The respiration associated with the decomposition event also includes some mineralization of N and P. Again, as C flows from metabc_1 into som1c_1, N and P flow from metabe_1_<iel> into som1e_1_<iel> according to their ratios in surface metabolic material (i.e., metabe_1_<iel> * (tosom1 / metabc_1).


#### **Decomposition of soil metabolic material** {#decomposition-of-soil-metabolic-material}

If there is material in the soil metabolic pool (metabc_2) to decompose, first compute the required C/N and C/P ratios for belowground decomposition to occur:



*   If animrl_<iel>, mineral <iel> in the surface layer averaged across decomposition timesteps, < 0:
    *   bgdrat_<iel> = varat1_1_<iel>
*   else if aminrl_<iel> > varat1_3_<iel>:
    *   bgdrat_<iel> = varat1_2_<iel>
*   else bgdrat_<iel> = (1 - aminrl_<iel> / varat1_3_<iel> * (varat1_1_<iel> - varat1_2_<iel> + varat1_2_<iel>

Calculate tcflow, the total flow from metabc_2:



*   tcflow = metabc_2 * bgdefac * dec2_2 * dtm * pheff_metab * anerb, bounded to be greater than or equal to metabc_2

Where



*   bgdefac, the belowground decomposition factor, is defined above
*   dec2_2 is an input parameter
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff_metab is defined above
*   anerb, the impact of soil anaerobic conditions on decomposition, is defined above

Compare current C/N and C/P ratios in soil metabolic material to the maximum ratios to test whether decomposition can occur:



*   If animrl_<iel> < 0.0000001:
    *   If (metabc_2 / metabe_2<iel> > bgdrat_<iel>: the material cannot decompose
*   else: the material can decompose

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

Where



*   animrl_<iel> is the sum of positive layers of the mineral element (N or P) before uptake by plants
*   bgdrat_<iel>, the required ratio for belowground decomposition to occur, is calculated above

If decomposition can occur, the decomposition event is associated with some respiration, where some C is lost to CO<sub>2</sub> and some mineralization of N and P occurs.



*   co2los, the loss of CO<sub>2</sub> during respiration = tcflow * pmco2_2
*   tosom1, the C that flows from metabc_2 into som1c_2 = tcflow - co2los

If decomposition occurs, N and P move from metabolic pools (metabe_2_<iel> into active organic N or P (som1e_2_<iel> according to their ratios in soil metabolic material (i.e., metabe_2_<iel> * (tosom1 / metabc_2).


#### **Decomposition of surface organic matter** {#decomposition-of-surface-organic-matter}

If there is material in surface SOM to decompose (som1c_1 > 0.0000001), calculate the maximum C/<iel> ratios that allow decomposition to occur:



*   radds1 = rad1p_1_<iel> + rad1p_2_<iel> * ((som1c_1 / som1e_1_<iel> - pcemic1_2_<iel>
*   rceto2<iel> = som1c_1 / som1e_1_<iel> + radds1
*   rceto2<iel> is bounded to be less than rad1p_3_<iel>

Compute tcflow, the total flow from som1c_1:



*   tcflow = som1c_1 * agdefac * dec3_1 * dtm * pheff

Where



*   agdefac, the aboveground decomposition factor, is calculated prior to decomposition and described above
*   dec3_1 is a fixed parameter
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff, the effect of soil pH on decomposition = 0.5  + (1.1 / pi) * arctangent(pi * 0.7 * (pH - 4.0 )), bounded between 0 and 1

Test if C/N and C/P ratios are sufficiently small to allow decomposition:



*   if aminrl_<iel> < 0.0000001:
    *   if (som1c_1 / som1e_1_<iel> > rceto2<iel>: the material cannot decompose to som2c_1
*   else: the material can decompose into som2c_1

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

Where

aminrl_<iel> = mineral <iel> in the surface layer averaged across decomposition timesteps

If C can decompose from som1c_1 into som2c_1, there is some associated respiration where CO<sub>2</sub> is released into the atmosphere.



*   co2los, C lost to CO<sub>2</sub> = tcflow * p1co2a_1
*   tosom2, the C that flows from som1c_1 to som2c_1 = tcflow - co2los

The respiration associated with the decomposition event includes some mineralization of N and P. Again, if C flows from som1c_1 to som2c_1, N and P move from surface microbial pools (som1e_1_<iel> into surface slow organic N or P (som2e_1_<iel> according to their ratios in surface organic matter (i.e., som1e_1_<iel> * (tosom2 / som1c_1).


#### **Decomposition of soil active organic C** {#decomposition-of-soil-active-organic-c}

If there is material in soil active organic C to decompose (som1c_2 > 0.0000001), calculate the maximum C/<iel> ratios that allow decomposition to occur:



*   If animrl_<iel>, mineral <iel> in the surface layer averaged across decomposition timesteps, < 0:
    *   bgdrat_<iel> = varat22_1_<iel>
*   else if aminrl_<iel> > varat22_3_<iel>:
    *   bgdrat_<iel> = varat22_2_<iel>
*   else bgdrat_<iel> = (1 - aminrl_<iel> / varat22_3_<iel> * (varat22_1_<iel> - varat22_2_<iel> + varat22_2_<iel>

Calculate tcflow, the total flow of C from som1c_2:



*   tcflow = som1c_2 * bgdefac * dec3_2 * eftext * anerb * dtm * pheff

Where



*   bgdefac, the belowground decomposition factor, is defined above
*   dec3_2 is a fixed parameter
*   eftext, the effect of soil texture on soil microbe decomposition rate, is described in “Initialization” above
*   anerb, the impact of soil anaerobic conditions on decomposition, is defined above
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff, the effect of soil pH on decomposition of som1 = 0.5  + (1.14 / pi) * arctangent(pi * 0.7 * (pH - 4.8)), bounded between 0 and 1

Test if C/N and C/P ratios are sufficiently small to allow decomposition from som1c_2:



*   if aminrl_<iel> < 0.0000001:
    *   if (som1c_2 / som1e_2<iel> > bgdrat_<iel>: the material cannot decompose from som1c_2
*   else: the material can decompose from som1c_2

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

If C/<iel> ratios are sufficiently small to decompose from som1c_2, the flow to som3 is calculated first.  Some respiration is associated with this decomposition event:



*   co2los, the loss of C to CO<sub>2</sub> = tcflow * p1co2_2

Where p1co2_2 is computed at initialization, described above

The respiration associated with the decomposition event also includes some mineralization of N and P.

som1c_2 decomposes first into som3:



*   tosom3, the C flowing from som1c_2 to som3 = tcflow * fps1s3 * (1 + animpt * (1 - anerb))

Where



*   fps1s3, the effect of clay content on decomposition from som1c_2, is calculated in Initialization above
*   animpt is a fixed parameter
*   anerb, the effect of soil anaerobic conditions on decomposition, is defined above

If C decomposes from som1c_2 into som3, N and P flow from som1e_2_<iel> into som3e_<iel>.  The C/<iel> ratios of decomposing material are different from the maximum ratios allowing decomposition from som1c_2 to occur, and are calculated as:



*   If animrl_<iel>, mineral <iel> in the surface layer averaged across decomposition timesteps, < 0:
    *   bgdrat_<iel> = varat3_1_<iel>
*   else if aminrl_<iel> > varat3_3_<iel>:
    *   bgdrat_<iel> = varat3_2_<iel>
*   else bgdrat_<iel> = (1 - aminrl_<iel> / varat3_3_<iel> * (varat3_1_<iel> - varat3_2_<iel> + varat3_2_<iel>

If there is a positive flow of water out of the soil layer (if amov_2 > 0, calculated in soil water submodel above), organic nutrients may leach into streamflow.  The C leached into streamflow is a portion of tcflow, the total flow from som1c_2:



*   cleach, the C flowing from som1c_2 to stream(5) = tcflow * orglch * linten

Where



*   orglch is computed during initialization, described above
*   linten = min(1 - (omlech(3) - amov_2) / omlech(3), 1)
*   omlech(3) is a fixed parameter

If water flows out of the soil layer, N and P also undergo leaching. The amount of N and P leaching into streamflow is proportional to leaching of C:



*   orgflow, the <iel> leaching from som1e_2 into streamflow = cleach / rceof1

Where



*   cleach, the C leaching from som1c_2 to stream(5), is described under soil C submodel above
*   rceof1 = (som1c_2 / som1e(2, 1)) * 2
*   rceof1 = (som1c_2 / som1e(2, 2)) * 35

The C decomposing from som1c_2 into som2_2 is the remainder of total C flow from som1c_2:



*   tosom2, the C flowing from som1c_2 into som2_2 = tcflow - co2los - tosom3 - cleach

If C flows from som1c_2 into som2_2, N and P decompose from som1e_2_<iel> into som2e_2_<iel>. The C/<iel> ratios of material flowing from som1e_2 into som2e_2 are the same as the maximum ratios that allow decomposition of som1c_2 to occur, and their calculation is described above (i.e., bgdrat_<iel> calculated from varat22).


#### **Decomposition of soil slow organic material** {#decomposition-of-soil-slow-organic-material}

If there is material in the soil slow organic pool to decompose (if som2c_2 > 0.0000001), calculate the maximum C/<iel> ratios that allow decomposition to occur:



*   If animrl_<iel>, mineral <iel> in the surface layer averaged across decomposition timesteps, < 0:
    *   bgdrat_<iel> = varat1_1_<iel>
*   else if aminrl_<iel> > varat1_3_<iel>:
    *   bgdrat_<iel> = varat1_2_<iel>
*   else bgdrat_<iel> = (1 - aminrl_<iel> / varat1_3_<iel> * (varat1_1_<iel> - varat1_2_<iel> + varat1_2_<iel>

Calculate tcflow, the total flow of C from som2c_2:



*   tcflow = som2c_2 * bgdefac * dec5_2 * anerb * dtm * pheff

Where



*   bgdefac, the belowground decomposition factor, is defined above
*   dec5_2 is a fixed parameter
*   anerb, the impact of soil anaerobic conditions on decomposition, is defined above
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff, the effect of soil pH on decomposition = 0.5  + (1.14 / pi) * arctan(pi * 0.7 * (pH - 4.8)), bounded between 0 and 1

Test if C/N and C/P ratios are sufficiently small to allow decomposition from som2c_2 by comparing to the maximum ratios calculated above (i.e., bgdrat_<iel> calculated from varat1):



*   if aminrl_<iel> < 0.0000001:
    *   if (som2c_2 / som2e_2<iel> > bgdrat_<iel>: the material cannot decompose from som2c_2
*   else: the material can decompose from som2c_2

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

If C/<iel> ratios are sufficiently small to decompose from som2c_2, the flow to som3c is calculated first.  Some respiration and loss of CO<sub>2</sub> is associated with this decomposition event:



*   co2los, the loss of C to CO<sub>2</sub> = tcflow * p2co2_2

Where p2co2_2 is a fixed parameter.

The respiration associated with the decomposition event also includes some mineralization of N and P.



*   tosom3, the C flowing from som2c_2 to som3c = tcflow * fps2s3 * (1 + animpt * (1 - anerb))

Where



*   fps2s3, the effect of clay content on decomposition from som2c_2, is calculated in Initialization above
*   animpt is a fixed parameter
*   anerb, the impact of soil anaerobic conditions on decomposition, is defined above

If decomposition occurs from som2c_2 to som3c, N and P move from som2e_2_<iel> to som3e_<iel> according to the following ratios (here called “bgdrat_<iel>”):



*   If animrl_<iel>, mineral <iel> in the surface layer averaged across decomposition timesteps, < 0:
    *   bgdrat_<iel> = varat3_1_<iel>
*   else if aminrl_<iel> > varat3_3_<iel>:
    *   bgdrat_<iel> = varat3_2_<iel>
*   else bgdrat_<iel> = (1 - aminrl_<iel> / varat3_3_<iel> * (varat3_1_<iel> - varat3_2_<iel> + varat3_2_<iel>

The remainder of total flow from som2c_2 moves to som1c_2:



*   tosom1, the C flowing from som2c_2 to som1c_2 = tcflow - co2los - tosom3

N and P move from som2e_2_<iel> to som1e_2_<iel> during this decomposition event, according to the maximum C/<iel> ratios that were used to test whether decomposition from som2c_2 could occur (i.e., bgdrat_<iel> calculated with varat1).


#### **Decomposition of surface slow organic C** {#decomposition-of-surface-slow-organic-c}

If there is material in surface slow organic C to decompose (if som2c_1 > 0.0000001), calculate the maximum required C/<iel> ratios for decomposition to occur:



*   If animrl_<iel>, mineral <iel> in the surface layer averaged across decomposition timesteps, < 0:
    *   bgdrat_<iel> = varat1_1_<iel>
*   else if aminrl_<iel> > varat1_3_<iel>:
    *   bgdrat_<iel> = varat1_2_<iel>
*   else bgdrat_<iel> = (1 - aminrl_<iel> / varat1_3_<iel> * (varat1_1_<iel> - varat1_2_<iel> + varat1_2_<iel>

Calculate tcflow, the total flow of C from som2c_1:



*   tcflow = som2c_1 * agdefac * dec5_1 * dtm * pheff

Where



*   agdefac , the aboveground decomposition factor, is calculated prior to decomposition and described above
*   dec5_1 is a fixed parameter
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff, the effect of soil pH on decomposition = 0.5  + (1.1 / pi) * arctangent(pi * 0.7 * (pH - 4)), bounded between 0 and 1

Test if C/N and C/P ratios are sufficiently small to allow decomposition:



*   if aminrl_<iel> < 0.0000001:
    *   if (som2c_1 / som2e_1_<iel> > bgdrat_<iel>: the material cannot decompose
*   else: the material can decompose

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

Where



*   aminrl_<iel> = mineral <iel> in the surface layer averaged across decomposition timesteps

If the material can decompose, first calculate the loss of C to CO<sub>2 </sub>during respiration:



*   co2los, the C that flows from som2c_1 during respiration = tcflow * p2co2_1

Where p2co2_1 is a fixed parameter.

Respiration is associated with some mineralization of N and P, calculated according to their proportions in surface som2.



*   tosom1, C that flows from som2c_1 to som1c_1 = tcflow - co2los

If decomposition occurs from som2c_1 into som1c_1, N and P move from som2e_1_<iel> to som1e_1_<iel> according to the ratios calculated to test whether decomposition could occur (i.e., bgdrat calculated with varat1).


#### **Flow from passive organic C** {#flow-from-passive-organic-c}

If there is material in passive organic C to decompose (if som3c > 0.0000001), it decomposes to som1c_2 with some associated CO<sub>2 </sub>loss during respiration.  The maximum C/<iel> ratios for material flowing to som1c_2 are the same as those calculated for material flowing from metabc_2 to som1c_2 (i.e., bgdrat_<iel> calculated with varat1).



*   tcflow, the total flow of C from som3c = som3c * bgdefac * dec4 * anerb * detm * pheff

Where



*   bgdefac, the belowground decomposition factor, is defined above
*   dec4 is an input parameter
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)
*   pheff, the effect of soil pH on decomposition = 0.5  + (1.1 / pi) * arctan(pi * 0.7 * (pH - 3)), bounded between 0 and 1
*   anerb, the impact of soil anaerobic conditions on decomposition, is defined above

Compare current C/N and C/P ratios in soil metabolic material to the maximum ratios to test whether decomposition can occur:



*   If animrl_<iel> < 0.0000001:
    *   If (som3c / som3e_<iel> > bgdrat_<iel>: the material cannot decompose
*   else: the material can decompose

Both the C/N and C/P ratios must be sufficiently small to allow decomposition.

Where



*   animrl_<iel> is the sum of positive layers of the mineral element (N or P) before uptake by plants
*   bgdrat_<iel>, the required ratio for decomposition to occur, is calculated above from varat1

If decomposition can occur, the decomposition event is associated with some respiration, where some C is lost to CO<sub>2</sub>. The respiration associated with the decomposition event also includes some mineralization of N and P. 



*   co2los, the C flowing to CO<sub>2 </sub>during respiration = tcflow * p3co2 * anerb
*   tosom1, the C that flows from som3c to som1c_2 = tcflow - co2los

If decomposition occurs from som3c into som1c_2, N and P move from som3e_<iel> to som1e_2_<iel> according to the ratios calculated to test whether decomposition could occur (i.e., bgdrat calculated with varat1).


#### **Flow from surface slow organic C to soil slow organic C** {#flow-from-surface-slow-organic-c-to-soil-slow-organic-c}

If there is material in surface slow organic C (if som2c_1 > 0.0000001), some of som2c_1 flows into som2c_2 via mixing.  This mixing flow, unlike all other decomposition flows, is not limited by C/N and C/P ratios and does not imply any respiration.



*   tcflow, the C that flows from som2c_1 to som2c_2 = som2c_1 * cmix * agdefac * dtm

Where



*   cmix is a fixed parameter
*   agdefac, the aboveground decomposition factor, is defined above
*   dtm is the time step in years (i.e., because this is done 4 times per month, dtm = 0.020833)

During mixing, N and P move from som2e_1_<iel> to som2e_2_<iel> according to their current ratios in som2 (i.e., som2c_1 / som2e_1_<iel>).  Note that any mineralization of N that occurs during mixing is not added to gross mineralization of N during decomposition.


#### **Mineral P flows among parent, secondary, and occluded P** {#mineral-p-flows-among-parent-secondary-and-occluded-p}

Unlike the N submodel, which contains only one mineral pool, the P submodel contains additional pools (labile P (plabil), sorbed P, strongly sorbed P (secndy_2), parent P (parent_2), and occluded P (occlud)).  At each ¼-month decomposition timestep, after organic flows have been calculated, there is additional flow of P among these pools.

Some P may flow from parent material to the mineral compartment:



*   fparnt, P weathered from parent material and flowing to surface mineral P = pparmn_2 * parent_2 * defac * 0.020833

Some P flows from secondary P to the mineral compartment in the surface soil layer:



*   fsecnd, P flowing from secondary P to surface mineral P = psecmn_2 * secndy_2 * defac * 0.020833

Some P flows back from mineral compartment of each soil layer to secondary P:



*   fmnsec_<lyr>, the P flowing from mineral P in this soil layer to secondary P = pmnsec_2 * minerl_<lyr>_2 * (1 - fsol) * defac * 0.020833

Where



*   fsol, the amount of P in solution, is calculated from mineral P as:
*   c = sorpmx * (2 - pslsrb) / 2
*   b = sorpmx - minerl_2 + c
*   Labile = (-b + sqrt(b * b + 4. * c * minerl_1_2)) / 2
*   fsol = labile / minerl_1_2

Some P flows from the secondary pool (secndy_2) to occluded P (occlud):



*   fsecoc, flow from secondary to occluded = psecoc1 * secndy_2 * defac * 0.020833

Some P flows from occluded to secondary P:



*   focsec, flow from occluded to secondary = psecoc2 * occlud * defac * 0.020833

*** end of decomposition ***

After flows between all state variables have been calculated, pools are updated by performing the flow in the same sequence in which they were calculated.  Average mineral content of N and P is updated at each four-times-per-month decomposition timestep:



*   aminrl_<iel>, the average mineral <iel> in surface pool = (aminrl_<iel> + minerl_1_<iel>) / 2

Where



*   minerl_1_<iel> is current mineral <iel> in surface pool, i.e. pertaining to the current four-times-per-month decomposition timestep.

Volatilization loss of N is calculated according to gross mineralization of N during decomposition, and the derived parameter vlossg (calculated from the fixed parameter vlossg at initialization): 



*   volgm = vlossg * gromin_1
*   minerl_1_1 = minerl_1_1 - volgm

Although the Rangeland Production model does not track total volatized N released to the atmosphere as an output variable, this volatilization loss is calculated because it modifies the N in state variable minerl_1_1.


### **Plant Growth Submodel** {#plant-growth-submodel}

Calculate the fall of material from standing dead biomass to litter, both fsdc (C that falls from standing dead to litter), and epart_<iel> (N and P that flow from standing dead to litter):



*   fsdc = stdedc * fallrt
*   epart_<iel> = (stdede_<iel> / stdedc) * fsdc

Where



*   fallrt is a PFT-specific parameter

The material that falls from standing dead biomass to litter is partitioned into structural (strucc_1) and metabolic (metabc_1) surface pools according to current levels of mineral N and P in the surface pool, and lignin content of stdedc.  The flow of partitioned C, N and P is described below under “Partitioning of organic residue”.

Calculate rdeath, the C that flows from bglivc upon the death of roots, and epart_<iel>, the N and P that flows from bglive_<iel> upon the death of roots.  Root death only occurs if stemp, average temperature for this month, is greater than or equal to rtdtmp, the minimum temperature required for root death to occur.



*   rdeath = root_death_rate * bglivc if stemp >= rtdtmp, otherwise rdeath = 0
*   root_death_rate = rdr * (1 - avh2o_1 / (deck5 + avh2o_1)), bounded to be <= 0.95
*   epart_<iel> = (bglive_<iel> / bglivc) * rdeath

The material that flows from belowground live material is partitioned into structural and metabolic soil layers according to current mineral N and P in the soil pools, and lignin content of bglivc. The flow of partitioned C, N and P is described below under “Partitioning of organic residue”.

The death of aboveground live biomass results from senescence, which is scheduled by the user to happen in one or more specific months of the year.  In other months of the year, some shoot death may occur because of water stress or shading. Calculate sdethc, the C that flows from aglivc upon the death of shoots, and sdethe_<iel>, the <iel> that flows from aglive_<iel> during shoot death:



*   sdethc = fdeth * aglivc
*   sdethe = fdeth * aglive_<iel>

Where



*   If senescence is scheduled this month:
    *   fdeth = fsdeth_2
*   Else: fdeth = fsdeth_1 * (1 - bgwfunc)
*   If aglivc > fsdeth_4 and senescence is not scheduled this month, death due to shading is added to death due to soil water restriction:
    *   fdeth = fdeth + fsdeth_3

The material leaving aglivc due to shoot death flows to stdedc.

N and P flow from aglive_<iel> in proportion to their ratio to aglivc:



*   stdethe_<iel>, N or P flowing from aglive_<iel> = fdeth * aglive_<iel>

A portion of the N and P flowing from aglive_<iel> goes to the retranslocation storage pool, according to the fixed parameter crprtf_<iel>:



*   tostore, N or P flowing from aglive_<iel> to crpstg_<iel> = sdethe * crprtf_<iel>
*   tostdede, N or P flowing from aglive_<iel> to stdede_<iel> = stdethe_<iel> - tostore

Some N is also volatized, according to the input parameter vlossp.

The growth of new biomass is then calculated from potential production, calculated above, and nutrient limitation. Actual growth is calculated relative to pcropc, the potential production of C. Note that this is linearly related to tgprod, calculated by the potential production submodel. No growth occurs in months when senescence is scheduled to occur.  Also, no growth occurs if one of either N or P is not available (i.e., if avail<N> + snfxmx_1 = 0, or if avail<P> = 0).

Calculate the potential C production limited by each mineral nutrient, accounting for potential N fixation by the plant.  First calculate nutrients available.  The impact of root biomass on nutrient availability, rimpct, is the same as is calculated above during the calculation of potential production. As calculated above for potential production, the availability of soil available nutrients, evail_<iel>, depends partly on the site parameter favail_<iel>, rimpct, and estimated <iel> in plant storage:



*   evail_<iel> = (availm<iel> * favail_<iel> * rimpct) + crpstg_<iel>
*   evail<N> = evail<N> + maxNfix

Where



*   availm<iel> is the sum of mineral <iel> in soil layers accessible by plant roots (i.e., sum(minerl_<layer>_<iel> for layer in 1:number of layers for plant growth)
*   favail_<iel> is a PFT-specific parameter
*   crpstg_<iel> is retranslocation <iel> storage pool for the PFT
*   rimpct = 1 if (rictrl * bglivc * 2.5) > 33
*   Else rimpct = 1 - riint * exp(-rictrl * bglivc * 2.5)
*   maxNfix = snfxmx * pcropc

Where 



*   snfxmx is a PFT-specific parameter
*   pcropc is potential production calculated by potential production submodel

Calculate the demand for each nutrient from potential production and from the minimum C/<iel> ratios calculated above in the potential production submodel.



*   The original Century formulation has demand_<iel> = pcropc * maxec_<iel> on line 65, Nutrlm.f.  This is identical to the calculation of demand in CropDynC (the root:shoot ratio submodel), except that the conversion of tgprod (total biomass production) to pcropc (C production) and the conversion of cercrp_min_above-and-below to maxec_above-and-below are accomplished in different order.  In the Rangeland Production model these two calculations are replaced by a single method of calculating demand:
*   demand_<iel> = demand<sub>above_</sub><iel> + demand<sub>below</sub><iel>
*   demand<sub>above_<iel</sub>> = (agprod / 2.5) * (1 / cercrp<sub>min</sub>_<iel>_above))
*   demand<sub>below</sub><iel> = (tgprod - agprod) / 2.5) * (1 / cercrp<sub>min</sub>_<iel>_below)
*   bgprod, belowground production = tgprod * fracrc
*   agprod, aboveground production = tgprod - pgprod

Then calculate the C production limited by the availability of each mineral element: actual C production is that which is possible given the most limiting element:



*   cpbe_<iel>, the C production limited by <iel> = evail_<iel> / <iel> content of new production

Where



*   The <iel> content of new production is equal to maxec_<iel>, the maximum <iel> concentration, if evail_<iel> is greater than demand_<iel>, and is equal to an adjusted content according to the ratio of eval_<iel> to demand_<iel> and the difference between minec_<iel> and maxec_<iel>, the minimum and maximum <iel>/C ratios in new production.

Actual C production limited by nutrient availability is the C production which is possible given the most limiting element, i.e. the minimum of cpbe_<iel> across <iel> values:



*   cprodl, C production limited by nutrient availability = min(cpbe_<iel> for <iel> in N, P)
*   eprodl_<iel>, the <iel> in new production = (cprodl * cfrac<sub>above</sub> * ecfor<sub>above_</sub><iel> + (cprodl * cfrac<sub>below</sub> * ecfor<sub>below</sub><iel>
*   plantNfix, the N fixation that actually occurs = max(eprodl_<N> - evail_<N>, 0)

Where



*   cfrac is the fraction of C in above- or belowground portions
*   ecfor_<iel> is the final <iel>/C ratio in new production

The aboveground fraction of actual C production, mcprd<sub>above</sub>, is calculated from cprodl and the root:shoot ratio calculated in the potential production submodel.  This amount flows from atmospheric C to aglivc. The belowground fraction of actual C production, mcprd<sub>below</sub>, is calculated similarly; this amount flows from atmospheric C to bglivc.  

After total N and P in new production is calculated, the source from which the N and P will be taken up is calculated.  If there is sufficient <iel> in the crop storage pool (crpstg_<iel> to supply eprodl_<iel>, all uptake is taken from crop storage. Otherwise, the full amount of crpstg_<iel> is taken up, and the remainder of eprodl_<iel> is taken up from the soil. For N, the portion of eprodl_<N> satisfied by uptake from N fixation (plantNfix) is accounted before calculating uptake from the soil.

Flows of N and P from the mineral crop storage pool, soil, and N fixation to aglive_<iel> and bglive_<iel> are performed.  Allocation of uptake to above- vs belowground stocks (i.e., to aglive_<iel> vs bglive_<iel> follows eup_1_<iel> and eup_2_<iel>, the fraction of <iel> allocated to above- and below-ground stocks.  It is necessary to track these fractions explicitly, rather than simply calculating allocation according to total N or P in new production and the root:shoot ratio as was done for C, because the C/<iel> ratios of above- vs belowground stocks differ.



*   Uptake from crop storage (crpstg_<iel>) moves to aglive_<iel> and bglive_<iel>
*   Uptake from soil mineral pools in the layers of soil available for plant growth proceeds according to the proportion of total mineral <iel> represented by that soil layer
*   Uptake from N fixation moves to aglive_<N> and bglive_<N>


### **Biomass Removal by Grazing** {#biomass-removal-by-grazing}

After diet selection by grazing animals is computed, the removal of biomass by grazing and associated return of C, N and P in feces in urine is calculated. Here we follow Century naming conventions by specifying the biomass removal for each PFT in terms of the fraction live biomass removed (flgrem, 0-1), and fraction of standing dead biomass removed (fdgrem, 0-1).  The absolute C removed from live biomass by grazing, shremc, flows from aglivc, and nutrients in live biomass removed by grazing flow from aglive_<iel>:



*   shreme_<iel>, <iel> in live biomass removed by grazing = shremc * aglive_<iel> / aglivc

Sdremc, the C removed from standing dead, flows from stdedc, and nutrients in standing dead flow from stdede_<iel>:



*   sdreme_<iel> = sdremc * stdede_<iel> / stdedc

The return of C and nutrients in feces and urine is described by input parameters gfcret, the fraction of consumed C that is returned, and gret_<iel>, the fraction of consumed N and P returned.



*   cret, C returned in feces = gfcret * (shremc + sdremc)
*   eret_<iel>, <iel> return in feces and urine = gret_<iel> * shreme_<iel> + gret_<iel> * sdreme<ie>
*   feces_<iel>, <iel> returned in feces = fecf_<iel> * eret_<iel>
*   urine_<iel>, <iel> returned in urine = (1 - fecf_<iel> * eret_<iel>

Where 



*   fecf_<iel> is a fixed input parameter
*   gret_<iel> is a fixed input parameter, except for N:
    *   gret_<N> = 0.7 if clay < 0;
    *   gret_<N> = 0.85 if clay > 0.3;
    *   gret_<N> = the y-value lying on the line described by (0, 0.7) and (0.3, 0.85) corresponding to the x-value clay

The C, N and P returned in feces are partitioned into surface structural and metabolic material according to current levels of mineral N and P in the surface pool, and lignin content of the feces. The flow of partitioned C, N and P is described below under “Partitioning of organic residue”.  N and P returned in urine flow into minerl_1_<iel>.


### **Leaching** {#leaching}

At each model time step, after plant growth and any removal of biomass by grazing, saturated water flow moving between layers carries leached N and P down through soil layers. The amount of N or P leached from one layer to the next adjacent layer is calculated from the amount of water moving between layers (amov_<lyr>, calculated in soil water submodel) and the mineral content of the donating layer:



*   Amount_leached = frlech_<iel> * minerl_<lyr>_<iel> * linten

Where



*   linten, leaching intensity = 1 - (minlch - amov_<lyr> / minlch, bounded to be between 0 and 1
*   frlech, the leaching fraction for the nutrient, is calculated from soil sand content, fixed parameters, and for P, the fraction of P in solution:
*   frlech for N = (fleach_1 + fleach_2 * sand) * fleach_3
*   frlech for P = (fleach_1 + fleach_2 * sand) * fleach_4 * fsol
*   fsol, the fraction of mineral P in solution, is calculated from fixed parameters as described above under “Mineral P flows among parent, secondary, and occluded P”
*   minlch, fleach_1, fleach_2, fleach_3, fleach_4 are fixed parameters

The mineral element flowing from the current layer is subtracted from that layer’s mineral content, and added to the following adjacent layer:



*   minerl_<lyr>_<iel> = minerl_<lyr>_<iel> - amount_leached
*   minerl_<lyr>+1_<iel> = minerl_<lyr>+1_<iel> + amount_leached


### **Partitioning of organic residue** {#partitioning-of-organic-residue}

When organic residue is added to the soil, it is partitioned into structural and metabolic pools according to the ratio of lignin to N in the residue.  This organic residue may be incoming from the fall of standing dead biomass (where residue from standing dead biomass is partitioned into surface structural and metabolic pools), the death of roots (where residue from dead roots is partitioned into soil structural and metabolic pools), or the addition of organic matter from animal feces (where feces are partitioned into surface structural and metabolic pools).

As incoming material is partitioned, some N or P may be absorbed from the surface mineral N or P pool into the incoming material.  The amount transferred, dirabs_<iel>, depends on the N or P in the incoming material and is calculated in two steps.  First, dirabs_<iel> is calculated from minerl_1_<iel> and the parameters damr_<lyr>_<iel> and pabres:

dirabs_<iel> = 0   if minerl_1_<iel> < 0, else

dirabs_<iel> = damr_<lyr>_<iel> * minerl_1_<iel> * max(cpart / pabres, 1.)

where cpart is the C content of incoming material

In the second step, the C/<iel> ratio of incoming material, including direct absorption, is compared to the parameter damrmn_<iel>. If the C/<iel> ratio is too low, dirabs_<iel> is modified to to raise the C/<iel> ratio to damrmn_<iel>.

rcetot, the C/<iel> ratio if incoming material = 0 if (epart_<iel> + dirabs_<iel> <= 0, else

rcetot = cpart / (epart_<iel> + dirabs_<iel>

If rcetot < damrmn_<iel>, then dirabs_<iel> is recalculated.

dirabs_<iel>, the final amount of <iel> directly absorbed from mineral <iel> to incoming material = cpart / damrmn_<iel> - epart_<iel>, restricted to be greater than or equal to zero

where

epart_<iel> is the <iel> content of incoming material

The fraction of C flowing from organic residue into the metabolic pool (metabc_2 for the death of roots, metabc_1 for fall of standing dead and addition of organic matter from animal feces), is calculated from the parameters spl_1 and spl_2, and rlnres, the ratio of lignin to N in the incoming residue. The ratio of lignin to N in the residue is calculated after any direct absorption of N from the mineral layer is transferred to the residue.

Frmet, the fraction of C in incoming material that is transferred to the metabolic pool = spl_1 - spl_2 * rlnres

Where

rlnres, the ratio of lignin to N in incoming material = frlign / ((epart_1 + dirabs_1) / (cpart * 2.5))

Once calculated, frmet is restricted by the fraction of lignin in the incoming material, and restricted to be greater than or equal to 0.2:

If frigln > (1 - frmet): frmet = (1 - frlign)

frmet = max(frmet, 0.2)

The C flowing into metabc_<lyr> (where lyr = 1 for the fall of standing dead and the addition of organic material from animal feces, and lyr = 2 for the death of roots) is calculated according to cpart and frmet:

metabc_<lyr> = metabc_<lyr> + (cpart * frmet)

cadds = cpart * (1 - frmet)

strucc_<lyr> = strucc_<lyr> + cadds

The N and P flowing into struce_<lyr>_<iel>, eadds_<iel>, are fixed according to the parameter rcestr_<iel>:

eadds_<iel> = cadds / rcestr_<iel>

struce_<lyr>_<iel> = struce_<lyr>_<iel> + eadds_<iel>

The remainder of N and P in incoming material, including direct absorption from the mineral layer, flows into metabe_<lyr>_<iel>:

eaddm = epart_<iel> + dirabs_<iel> - eadds

metabe_<lyr>_<iel> = metabe_<lyr>_<iel> + eaddm

The fraction of lignin in incoming material added to the structural pool is calculated from the fraction of lignin in incoming material, and restricted to be less than or equal to 1.  This fraction is used to update the state variable strlig_<lyr>, lignin in structural pool in the given layer.

fligst = min((frlign / (cadds / cpart), 1.)

strlig_<lyr> = ((strlig_<lyr> * strucc_<lyr> + (fligst * cadds)) / (strucc_<lyr> + cadds)


## **Animal spatial distribution submodel** {#animal-spatial-distribution-submodel}

	The animal spatial distribution submodel uses the difference between potential and observed vegetation biomass to infer relative densities of grazing animals across areas where they occur, assuming that the difference between potential and observed biomass can be attributed to offtake by grazing animals. This allows for spatial disaggregation of grazing pressure across pixels falling inside polygons such as administrative or political boundaries, which is the scale at which livestock densities are commonly known. The disaggregation is performed at each monthly model time step.

Here, potential vegetation biomass is estimated by the plant production submodel in the absence of grazing, and observed vegetation biomass is estimated via linear regression from a remotely sensed vegetation index (_EO_) such as NDVI. While the total number of animals grazing inside polygon features of the animal grazing areas vector layer is supplied by the user as input, the spatial distribution submodel uses the distribution of the mismatch between observed and potential biomass inside those polygon features to distribute grazing animals across pixels within grazing area polygons.

Total observed vegetation biomass (grams per square m) is calculated from the remotely sensed vegetation index and the slope and intercept of a regression supplied by the user in the site parameter table (equation 1). Total potential vegetation biomass is calculated from state variables representing carbon in aboveground live and standing dead biomass from each plant functional type (i.e., aglivc and stdedc), accounting for fractional cover of the plant functional type (equation 2).  The sum of the pixel-wise difference between these quantities is calculated per feature _i_ in the animal grazing areas vector layer (equation 3).



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 				       (1)



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 						       (2)



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 for pixel _p _in feature _i_			       (3)	

The number of animals grazing on pixel _p _inside grazing area feature _i_ is the proportional difference in biomass on that pixel, multiplied by the total number of animals grazing inside the grazing area feature (equation 4), where the total number of animals grazing inside the grazing area feature is given by the user in the “num_animals” field of the grazing areas polygon vector layer.  Finally, the density of animals grazing in each pixel, in animals per ha, is the number of animals per pixel divided by the pixel area in ha (equation 5).



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  						       (4)



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 										       (5)


## **Animal diet selection and physiology submodel	** {#animal-diet-selection-and-physiology-submodel}

The animal diet selection and physiology submodel calculates the intake of forage by grazing animals from biomass and digestibility of the forage as estimated by the plant production submodel.  Given traits of the animals such as age, weight, and reproductive status, the model estimates maintenance energy requirements.  The degree to which the selected diet meets maintenance energy requirements is calculated with the metric of diet sufficiency.  Livestock physiology submodel parameters are fixed according to the animal’s type (specified by the user in the animal parameter table; table 6)  and are prefixed here by “C”, following Freer _et al. _(2012).  Table 7 contains all fixed animal physiology parameter values.

[Table 7.](https://docs.google.com/spreadsheets/d/1D9kYdbq6BhLTsQgvn81RdB6L6VpSR0GsvD4w6c6N8r4/edit?usp=sharing) Fixed parameter values for the livestock physiology submodel, adapted from Freer _et al._ (2012).


### **Diet selection** {#diet-selection}

The diet selection submodel was adopted from the GRAZPLAN model (Freer _et al_. 2012) and describes the diet selected by a ruminant animal from available forage. The diet is selected on the basis of relative ingestibility and relative availability of each feed type, until the maximum intake for that herbivore class is reached.  Maximum intake (_I<sub>max</sub>_, kg dry matter eaten per day; equation 1) is calculated primarily from the animal’s standard reference weight (_SRW_) and current size relative to _SRW_, _Z_ (equation 2).  Relative size (_Z_) is calculated from the normal weight (_N_), which is defined by the animal’s current weight (_W_) and age (_A; _equations 3, 4).  The maximum intake is also impacted by a correction factor for animals in high relative condition (_CF_; equation 5), and by a lactation factor (_LF_) for lactating females. The correction factor is calculated from body condition (_BC_; equation 6), the ratio of the animal’s current weight to its normal weight.

The lactation factor (equations 7-9) describes the increased maximum intake of a lactating female and is based on a lactation curve driven by the age of the calf (_A<sub>young</sub>_).  The factor_ LA_ is related to the animal body condition (equation 9); in the original GRAZPLAN formulation, this was related to body condition at parturition (cf. equation 10 in Freer_ et al_. 2012), but we have simplified this factor to depend on a static body condition score. It is assumed that all lactating females are suckling one calf.

<p style="text-align: right">


<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  						       (1)</p>


where

<p style="text-align: right">


<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 										  	       (2)</p>


<p style="text-align: right">


<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 								       (3)</p>


<p style="text-align: right">


<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 						       (4)

<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  		           								       (5)</p>


<p style="text-align: right">


<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 											       (6)</p>


<p style="text-align: right">


<p id="gdcalert12" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert13">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  				   		       (7)</p>


where

<p style="text-align: right">


<p id="gdcalert13" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert14">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 											       (8)</p>


<p style="text-align: right">


<p id="gdcalert14" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert15">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 									       (9)</p>


Following the calculation of maximum potential intake, the diet selection routine predicts what proportion of the potential intake is selected from each available feed type.  In a model run where one plant functional type is simulated, two feed types will always be available: the live fraction, and the standing dead fraction of that grass type.  When two or more plant functional types are simulated, the number of available feed types is equal to two times the number of grass types simulated. In the equations below, the subscript “d” indicates one feed type.

Unlike the GRAZPLAN model, which divides available forage into 6 fixed-digestibility classes (cf. Freer_ et al. _2012, p. 6), the Rangeland model calculates availability and digestibility directly from biomass and crude protein content of the live and dead fractions of each plant functional type.  Each feed type is characterized by its biomass (_B; _kg/ha), crude protein content (_P; _g * g<sup>-1</sup>), digestibility (_DMD; _0 - 1), species factor (_SF = _0 for C3 grasses, _SF = _0.16 for C4 grasses), and the proportion of available biomass that is represented by this forage type (ϕ, 0 - 1).  The proportion of total forage represented by legumes, by weight (ϕ<sub>legume</sub>, 0 - 1), influences intake of all feed types.

The diet selection and physiology submodel (adapted from GRAZPLAN) operates on biomass in units of kg of dry matter per ha, while state variables in the plant production submodel (adapted from CENTURY) are tracked in units of grams of carbon per square meter.  Before estimating intake of each feed type selected by grazing animals, biomass of each feed type (_d_)_ _and each plant functional type (_pft_)_ _is calculated in kg per ha from the carbon state variable in grams per square meter:



<p id="gdcalert15" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert16">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

								     (10)

where cstatv<sub>d</sub> is the state variable representing carbon in feed type _d_ (aglivc if _d _pertains to live biomass, stdedc if _d _pertains to standing dead biomass), and cover<sub>d</sub> is the fractional cover of the plant functional type to which feed type _d_ belongs.

The Rangeland model calculates dry matter digestibility of each feed type from its crude protein content, according to the slope and intercept of a linear regression specified in the plant functional type parameter table.  Crude protein content of each feed type is calculated from the nitrogen:carbon ratio of state variables making up that feed type:



<p id="gdcalert16" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert17">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

										     (11)

where nstatv<sub>d</sub> is the state variable representing nitrogen in feed type _d_ (aglive_<N> for live biomass, stdede_<N> for standing dead biomass), and cstatv<sub>d</sub> is the state variable representing carbon in feed type _d _(aglivc for live biomass, stdedc for standing dead biomass).

Prior to beginning diet selection, the feed types are sorted according to their digestibility; the calculation of the proportion of potential intake that is selected from each feed type (equations 12-19) is applied first to the most digestible feed type, and then to the next most digestible, etc.  At each application of equations 12-19to a feed type, the unsatisfied capacity (_UC<sub>d</sub>_) tracks the proportion of potential intake that is not yet satisfied by selection of previous, more digestible, feed types.  This simulates the preferential selection of high-digestibility feed types before feed types of lower digestibility.

For each feed type, the proportion of potential intake selected from this feed type (_R<sub>d</sub>, _equation 12) is a product of its “relative availability” and its “relative ingestibility”.  Relative availability (_F<sub>d</sub>, _equation 13) is a product of the unsatisfied capacity according to selection of more digestible feed types, the predicted rate of eating this feed type (_RR<sub>d</sub>_, equation 15) and the relative time spent eating this feed type (_RT<sub>d</sub>, _equation 19).  _RR<sub>d</sub> _and _RT<sub>d</sub>_ are impacted by the relative height of the feed type, _HR<sub>d</sub> _(equation 17)_ _which is calculated with the assumption that complete cover of one feed type corresponds to a forage height of 3 cm.  The rate of eating and time spent eating are also impacted by the size of the animal, reflected in the size factor, _ZF<sub>d</sub>_ (equation 18; see equation 2 for the calculation of the animal’s current relative size, _Z_).

<p style="text-align: right">


<p id="gdcalert17" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert18">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 						     (12)</p>


where

<p style="text-align: right">


<p id="gdcalert18" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert19">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  									     (13)</p>


<p style="text-align: right">


<p id="gdcalert19" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert20">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  									     (14)</p>


<p style="text-align: right">


<p id="gdcalert20" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert21">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

					     (15)</p>


<p style="text-align: right">


<p id="gdcalert21" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert22">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 								     (16)</p>


<p style="text-align: right">


<p id="gdcalert22" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert23">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  									     (17)</p>


<p style="text-align: right">


<p id="gdcalert23" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert24">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 if <em>Z < CR<sub>7</sub>, _else									</p>


<p style="text-align: right">


<p id="gdcalert24" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert25">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 											     (18)</p>


<p style="text-align: right">


<p id="gdcalert25" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert26">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 			     (19)</p>


The “relative ingestibility” of a feed type (_RQ<sub>d</sub>_) is calculated primarily from its digestibility (equation 18).  The species factor (_SF<sub>d</sub>_) reflects higher predicted intake of C4 grasses than C3 grasses of similar digestibility (Freer _et al. _2012).

<p id="gdcalert26" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert27">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 	     				     (20)

The actual intake of each feed type, _I<sub>d </sub> _(kg per day), is calculated from the proportion of maximum intake selected from each feed type (equation 21), and the total intake of forage is calculated as the sum across types.  The average digestibility of the diet, _DMD<sub>f</sub>_, is calculated from the digestibility of each feed type and its proportion of the diet (equation 23); similarly, the total crude protein intake of the diet, _CPI<sub>f</sub>_, is calculated from crude protein content of each feed type (equation 24).

<p style="text-align: right">


<p id="gdcalert27" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert28">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  										     (21)</p>


<p style="text-align: right">


<p id="gdcalert28" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert29">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

    											     (22)</p>


<p style="text-align: right">


<p id="gdcalert29" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert30">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  									     (23)</p>


<p style="text-align: right">


<p id="gdcalert30" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert31">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  									     (24)</p>


Once diet selection completes, if protein content of the diet is low, maximum intake is reduced and diet selection is recalculated once according to the adjusted maximum intake. The reduction factor for maximum intake is calculated from the total intake of rumen degradable protein, _RDPI_, and the requirement for rumen degradable protein, _RDPR_ (equation 28).  For cattle of _B. indicus_ breeds, this reduction factor is multiplied by 0.5; for cattle of _B. indicus _cross breeds, the reduction factor is multiplied by 0.75.

The intake of rumen degradable protein (_RDPI_; equation 26) depends on _L_, feeding level. This is calculated from the ratio of energy intake to maintenance energy requirements: see equation 34, below.

<p style="text-align: right">


<p id="gdcalert31" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert32">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 									     (25)</p>


where

<p style="text-align: right">


<p id="gdcalert32" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert33">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

				   	    (26)</p>


<p style="text-align: right">


<p id="gdcalert33" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert34">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 						     (27)</p>


<p style="text-align: right">


<p id="gdcalert34" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert35">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 			     (28)</p>


<p style="text-align: right">


<p id="gdcalert35" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert36">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

							     (29)</p>



### **Restriction of offtake by management threshold** {#restriction-of-offtake-by-management-threshold}

The intake of each feed type selected by animals is converted to demand for forage by grazing animals, and this is compared to the management threshold to determine the final fraction of biomass removed.  The maximum fraction of biomass removed is calculated according to the management threshold, or the total biomass required to be left standing after animal offtake, relative to total biomass across live and standing dead fractions of each plant functional type (equation 30).  

The final fraction of biomass removed is _flgrem _for live biomass, and _fdgrem _for standing dead biomass; these are the relevant quantities adapted from CENTURY that dictate the impact of grazing intensity on plant growth and nutrient cycling (see “Biomass Removal by Grazing” submodel description, above).

Monthly demand for forage is calculated for each feed type from daily intake of that feed type by an individual animal, assuming 30.4 days per month (equation 30).  Here the density of grazing animals (_SD_, estimated by the animal spatial distribution submodel, described above) is used to convert the intake of an individual animal to total forage demand per pixel.



<p id="gdcalert36" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert37">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 				     (30)



<p id="gdcalert37" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert38">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

						     (31)



<p id="gdcalert38" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert39">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>





<p id="gdcalert39" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert40">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 			     (32)

	If the fraction of biomass removed is restricted by the management threshold, daily intake of that feed type is recalculated according to the fraction removed.  The calculation of diet sufficiency depends on the actual intake limited by the management threshold.


### **Diet sufficiency** {#diet-sufficiency}

	After completion of a maximum of two iterations of diet selection and restriction of offtake by the management threshold, the diet sufficiency metric is calculated as the ratio of total metabolizable energy intake to maintenance energy requirements:



<p id="gdcalert40" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert41">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

									     (33)

Total metabolizable energy content of the diet, _MEI<sub>total</sub>, _is calculated from the total digestibility of forage in the diet.



<p id="gdcalert41" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert42">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

							     	     (34)

Total maintenance metabolizable energy requirement (_ME<sub>total</sub>_, equation 35) is calculated as the sum of energy requirements for maintenance, energy requirements for wool production (_NE<sub>w</sub>, _for sheep and goats), and for breeding females, maintenance requirements for pregnancy (_ME<sub>c</sub>_) or lactation (_ME<sub>l</sub>_).  The requirement of energy for maintenance is the sum of basal metabolic energy requirements and the energy requirements of grazing (equation 36).  The energy requirements of grazing include a constant estimation of the distance walked per day (_D_), which was fixed at 4 km during preliminary model testing.  The efficiency of energy use for maintenance, _k<sub>m</sub>_, is calculated from the energy content of forage in the diet (_M/D<sub>f</sub>_, equations 40-41).  For male animals, _ME<sub>m</sub>_ is multiplied by 1.15.

<p style="text-align: right">


<p id="gdcalert42" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert43">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

							     (35)</p>


<p style="text-align: right">


<p id="gdcalert43" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert44">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 							     (36)</p>


<p style="text-align: right">


<p id="gdcalert44" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert45">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  										     (37)</p>


where

<p style="text-align: right">


<p id="gdcalert45" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert46">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 					     (38)</p>


<p style="text-align: right">


<p id="gdcalert46" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert47">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 						     (39)</p>


<p style="text-align: right">


<p id="gdcalert47" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert48">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  									     (40)</p>


<p style="text-align: right">


<p id="gdcalert48" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert49">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  											     (41)</p>


<p style="text-align: right">


<p id="gdcalert49" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert50">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  									     (42)</p>


<p style="text-align: right">


<p id="gdcalert50" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert51">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>



<p id="gdcalert51" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert52">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  										     (43)</p>


Energy requirements of pregnancy are derived from the body weight of the animal for pregnancy purposes, _BW_, and the relative age of the fetus, _RA_ (equation 44).  The energy requirements of pregnancy are simplified from the implementation of Freer _et al._ (2012) in two ways: first, the body condition of the fetus (_BC<sub>foet</sub>_) is assumed to be 1; that is, the fetus is assumed to be in median condition.  Second, we also assume that each pregnant animal is pregnant with one fetus.

<p style="text-align: right">


<p id="gdcalert52" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert53">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 				     (44)</p>


where

<p style="text-align: right">


<p id="gdcalert53" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert54">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 						     (45)</p>


<p style="text-align: right">


<p id="gdcalert54" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert55">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 											     (46)</p>


	

Energy requirements of lactation (equation 47) are related to the body condition of the mother and the age of the calf; they have been simplified from Freer _et al. _(2012) in the following two ways.  All lactating animals are assumed to be suckling one calf; while maximum milk production is calculated (_MP<sub>max</sub>, _equation 48), the actual production of milk is not limited by intake of ME or by the suckling young’s ability to consume milk.

<p style="text-align: right">


<p id="gdcalert55" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert56">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 											     (47)</p>


<p style="text-align: right">


<p id="gdcalert56" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert57">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

  			     (48)</p>


<p style="text-align: right">


<p id="gdcalert57" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert58">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 										     (49)</p>


Energy requirements of wool production (_NE<sub>w</sub>_; equation 50) are calculated from predicted daily wool growth (equation 51), accounting for the effect of age (AF, equation 52), and assuming a constant daylength of 12 hours.  Daily wool growth is limited by digestible protein leaving the stomach (_DPLS_, equation 54) and by metabolizable energy available for wool, which is simply the remainder of energy available after accounting for costs of lactation and pregnancy (equation 53).



<p id="gdcalert58" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert59">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 									     (50)

where



<p id="gdcalert59" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert60">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 (49)



<p id="gdcalert60" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert61">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 					     (51)



<p id="gdcalert61" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert62">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

							     (52)

<p style="text-align: right">


<p id="gdcalert62" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert63">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 								     (53)</p>


where

<p style="text-align: right">


<p id="gdcalert63" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert64">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 						     (54)</p>


<p style="text-align: right">


<p id="gdcalert64" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert65">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 						     			     (55)</p>


<p style="text-align: right">


<p id="gdcalert65" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert66">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 								     (56)</p>



## **References** {#references}


    Bosire, Caroline K., Joseph O. Ogutu, Mohammed Y. Said, Maarten S. Krol, Jan de Leeuw, and Arjen Y. Hoekstra. “Trends and Spatial Variation in Water and Land Footprints of Meat and Milk Production Systems in Kenya.” Agriculture, Ecosystems & Environment 205 (July 1, 2015): 36–47. doi:10.1016/j.agee.2015.02.015.


    Coleman, Sam W, and John E Moore. “Feed Quality and Animal Performance.” Field Crops Research, Approaches to improve the utilization of food-feed crops, 84, no. 1–2 (October 2003): 17–29. doi:10.1016/S0378-4290(03)00138-2.


    Comerford, J. W., L. L. Benyshek, J. K. Bertrand, and M. H. Johnson. “Evaluation of Performance Characteristics in a Diallel among Simmental, Limousin, Polled Hereford and Brahman Beef Cattle. I. Growth, Hip Height and Pelvic Size.” Journal of Animal Science 66, no. 2 (1988): 293–305.


    CSIRO Subcommittee, Australian Agricultural Council Ruminants. Feeding Standards for Australian Livestock: Ruminants. 23. CSIRO Publishing, 1990.


    Esteban, L. R., and J. R. Thompson. “The Digestive System of New World Camelids-Common Digestive Diseases of Llamas.” Iowa State University Veterinarian 50, no. 2 (1988): 9.


    Foy, J. K., W. R. Teague, and J. D. Hanson. “Evaluation of the Upgraded Spur Model (SPUR 2.4).” Ecological Modelling 118, no. 2–3 (June 15, 1999): 149–65. doi:10.1016/S0304-3800(99)00016-2.


    Freer, M, A. D Moore, and J. R Donnelly. The GRAZPLAN Animal Biology Model for Sheep and Cattle and the GrazFeed Decision Support Tool. Canberra, ACT Australia: CSIRO Plant Industry, 2012.


    Grainger, C., G. D. Wilhelms, and A. A. McGowan. “Effect of Body Condition at Calving and Level of Feeding in Early Lactation on Milk Production of Dairy Cows.” Animal Production Science 22, no. 115 (1982): 9–17.


    Grimm, Volker, Uta Berger, Finn Bastiansen, Sigrunn Eliassen, Vincent Ginot, Jarl Giske, John Goss-Custard, _et al._ “A Standard Protocol for Describing Individual-Based and Agent-Based  Models.” Ecological Modelling 198, no. 1–2 (September 15, 2006): 115–26. doi:10.1016/j.ecolmodel.2006.04.023.


    Grimm, Volker, Uta Berger, Donald L. DeAngelis, J. Gary Polhill, Jarl Giske, and Steven F. Railsback. “The ODD Protocol: A Review and First Update.” Ecological Modelling 221, no. 23 (November 24, 2010): 2760–68. doi:10.1016/j.ecolmodel.2010.08.019.


    Holland, Elisabeth A., William J. Parton, James K. Detling, and D. Layne Coppock. “Physiological Responses of Plant Populations to Herbivory and Their Consequences for Ecosystem Nutrient Flow.” The American Naturalist 140, no. 4 (1992): 685–706.


    Illius, Aw, and Ij Gordon. “Modeling the Nutritional Ecology of Ungulate Herbivores - Evolution of Body Size and Competitive Interactions.” Oecologia 89, no. 3 (March 1992): 428–34.


    Illius, A. W., J. Derry, and I. J. Gordon. “Components, Processes and Dynamics of Semi-Arid Grazing Systems. A Review of Current Knowledge. NRI Internal Discussion Document,” 1995. http://r4d.dfid.gov.uk/Output/63346/Default.aspx.


    IPCC. “Vol. 4: Agriculture, Forestry and Other Land Use.” In 2006 IPCC Guidelines for  National Greenhouse Gas Inventories, edited by HS Eggleston, L Buendia, K Miwa, T Ngara, and K Tanabe. Japan: IGES, 2006.


    Johnson, I.R., D.F. Chapman, V.O. Snow, R.J. Eckard, A.J. Parsons, M.G. Lambert, and B.R. Cullen. “DairyMod and EcoMod: Biophysical Pasture-Simulation Models for Australia and New Zealand.” Australian Journal of Experimental Agriculture 48, no. 5 (2008): 621–31.


    Li, Haibin, _et al._ "The role of initial conditions and forcing uncertainties in seasonal hydrologic forecasting." Journal of Geophysical Research: Atmospheres 114.D4 (2009).


    Moore, A. D., J. R. Donnelly, and M. Freer. “GRAZPLAN: Decision Support Systems for Australian Grazing Enterprises. III. Pasture Growth and Soil Moisture Submodels, and the GrassGro DSS.” Agricultural Systems 55, no. 4 (December 1997): 535–82. doi:10.1016/S0308-521X(97)00023-1.


    Pachzelt, Adrian, Anja Rammig, Steven Higgins, and Thomas Hickler. “Coupling a Physiological Grazer Population Model with a Generalized Model for Vegetation Dynamics.” Ecological Modelling 263 (2013): 92–102.


    Parton, William J., J. WB Stewart, and C. Vernon Cole. “Dynamics of C, N, P and S in Grassland Soils: A Model.” Biogeochemistry 5, no. 1 (1988): 109–131.


    Van Saun, Robert J. “Nutrient Requirements of South American Camelids: A Factorial Approach.” Small Ruminant Research, Special Issue: South American Camelids, 61, no. 2–3 (February 2006): 165–86. doi:10.1016/j.smallrumres.2005.07.006.


    Wuliji, T, G. H Davis, K. G Dodds, P. R Turner, R. N Andrews, and G. D Bruce. “Production Performance, Repeatability and Heritability Estimates for Live Weight, Fleece Weight and Fiber Characteristics of Alpacas in New Zealand.” Small Ruminant Research 37, no. 3 (August 2000): 189–201. https://doi.org/10.1016/S0921-4488(00)00127-9.


    


# 
    Appendix 1.  Required model parameters and definitions

Table 1. Required parameters in the site parameter table, giving parameters that are characteristic of a site.  The site parameter table is linked spatially to the site spatial index raster through the integer field called “site”.


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Definition</strong>
   </td>
   <td><strong>Valid values</strong>
   </td>
  </tr>
  <tr>
   <td>site
   </td>
   <td>Site label matching value in site spatial index raster
   </td>
   <td>integer
   </td>
  </tr>
  <tr>
   <td>eo_biomass_intercept
   </td>
   <td>intercept parameter in the equation used to estimate total standing biomass in kg/ha from the remotely sensed vegetation index
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>eo_biomass_slope
   </td>
   <td>slope parameter in the equation used to estimate total standing biomass in kg/ha from the remotely sensed vegetation index
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_10
   </td>
   <td>depth of soil layer 10 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_2
   </td>
   <td>depth of soil layer 2 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_3
   </td>
   <td>depth of soil layer 3 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_4
   </td>
   <td>depth of soil layer 4 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_5
   </td>
   <td>depth of soil layer 5 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_6
   </td>
   <td>depth of soil layer 6 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_7
   </td>
   <td>depth of soil layer 7 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_8
   </td>
   <td>depth of soil layer 8 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>adep_9
   </td>
   <td>depth of soil layer 9 (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>agppa
   </td>
   <td>intercept parameter in the equation estimating potential aboveground biomass production for calculation of root/shoot ratio (g/m2/y)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>agppb
   </td>
   <td>slope parameter in the equation estimating potential above ground biomass production for calculation of root/shoot ratio (g/m2/y/cm) NOTE - agppb is multiplied by annual precipitation (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>aneref_1
   </td>
   <td>ratio of rain/potential evapotranspiration below which there is no negative impact of soil anaerobic conditions on decomposition
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>aneref_2
   </td>
   <td>ratio of rain/potential evapotranspiration above which there is maximum negative impact of soil anaerobic conditions on decomposition
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>aneref_3
   </td>
   <td>minimum value of the impact of soil anaerobic conditions on decomposition; functions as a multiplier for the maximum decomposition rate
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>animpt
   </td>
   <td>slope term used to vary the impact of soil anaerobic conditions on decomposition flows to the passive soil organic matter pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_1
   </td>
   <td>weighting factor for transpiration loss for layer 1; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_10
   </td>
   <td>weighting factor for transpiration loss for layer 10; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_2
   </td>
   <td>weighting factor for transpiration loss for layer 2; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_3
   </td>
   <td>weighting factor for transpiration loss for layer 3; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_4
   </td>
   <td>weighting factor for transpiration loss for layer 4; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_5
   </td>
   <td>weighting factor for transpiration loss for layer 5; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_6
   </td>
   <td>weighting factor for transpiration loss for layer 6; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_7
   </td>
   <td>weighting factor for transpiration loss for layer 7; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_8
   </td>
   <td>weighting factor for transpiration loss for layer 8; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>awtl_9
   </td>
   <td>weighting factor for transpiration loss for layer 9; indicates which fraction of the available water can be extracted by the roots
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>bgppa
   </td>
   <td>intercept parameter in the equation estimating potential below ground biomass production for calculation of root/shoot ratio (g/m2/y)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>bgppb
   </td>
   <td>slope parameter in the equation estimating potential below ground biomass production for calculation of root/shoot ratio (g/m2/y) NOTE - bgppb is multiplied by annual precipitation (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>damr_1_1
   </td>
   <td>fraction of surface N absorbed by residue
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>damr_1_2
   </td>
   <td>fraction of surface P absorbed by residue
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>damr_2_1
   </td>
   <td>fraction of soil N absorbed by residue
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>damr_2_2
   </td>
   <td>fraction of soil P absorbed by residue
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>damrmn_1
   </td>
   <td>minimum C/N ratio allowed in residue after direct absorption
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>damrmn_2
   </td>
   <td>minimum C/P ratio allowed in residue after direct absorption
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec1_1
   </td>
   <td>maximum surface structural decomposition rate, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec1_2
   </td>
   <td>maximum soil structural decomposition rate, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec2_1
   </td>
   <td>maximum surface metabolic decomposition rate, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec2_2
   </td>
   <td>maximum soil metabolic decomposition rate, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec3_1
   </td>
   <td>maximum decomposition rate of surface organic matter with active turnover, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec3_2
   </td>
   <td>maximum decomposition rate of soil organic matter with active turnover, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec_4
   </td>
   <td>maximum decomposition rate of soil organic matter with slow turnover, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec5_1
   </td>
   <td>maximum decomposition rate of surface organic matter with intermediate turnover, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>dec5_2
   </td>
   <td>maximum decomposition rate of soil organic matter with intermediate turnover, the fraction of the pool that turns over each year
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>deck5
   </td>
   <td>available soil water content at which shoot and root death rates are half maximum (cm)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>drain
   </td>
   <td>the fraction of excess water lost by drainage; indicates whether a soil is sensitive for anaerobiosis (drain = 0) or not (drain = 1)
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>edepth
   </td>
   <td>depth of the single soil layer where C, N, and P are calculated
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>elitst
   </td>
   <td>effect of litter on soil temperature relative to live and standing dead biomass
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>epnfa_1
   </td>
   <td>intercept value for determining the effect of annual precipitation on atmospheric N fixation (wet and dry deposition) (g/m2/y/cm precip)
   </td>
   <td>0 - 9999
   </td>
  </tr>
  <tr>
   <td>epnfa_2
   </td>
   <td>slope value for determining the effect of annual precipitation on atmospheric N fixation (wet and dry deposition) (g/m2/yr/cm precip)
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>epnfs_1
   </td>
   <td>minimum AET value used for determining the effect of annual evapotranspiration on non-symbiotic soil N fixation (cm)
   </td>
   <td>0 - 9999
   </td>
  </tr>
  <tr>
   <td>epnfs_2
   </td>
   <td>intercept value for determining the effect of annual evapotranspiration non-symbiotic soil N fixation (g/m2/yr/cm aet)
   </td>
   <td>0 - 9999
   </td>
  </tr>
  <tr>
   <td>favail_1
   </td>
   <td>fraction of N available per month to plants
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>favail_4
   </td>
   <td>minimum fraction of P available per month to plants
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>favail_5
   </td>
   <td>maximum fraction of P available per month to plants
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>favail_6
   </td>
   <td>mineral N in surface layer corresponding to maximum fraction of P available (g/m2)
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fleach_1
   </td>
   <td>intercept value for a normal month to compute the fraction of minerl N and P which will leach to the next layer there is a saturated water flow; normal leaching is a function of sand content
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>fleach_2
   </td>
   <td>slope value for a normal month to compute the fraction of minerl N and P which will leach to the next layer there is a saturated water flow; normal leaching is a function of sand content
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>fleach_3
   </td>
   <td>leaching fraction multiplier for N to compute the fraction of mineral N which will leach to the next layer when there is saturated water flow; normal leaching is a function of sand content
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fleach_4
   </td>
   <td>leaching fraction multiplier for P to compute the fraction of mineral P which will leach to the next layer when there is saturated water flow; normal leaching is a function of sand content
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fracro
   </td>
   <td>the fraction of the monthly rainfall, over PRECRO, which is lost via runoff
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fwloss_1
   </td>
   <td>scaling factor for interception and evaporation of precipitation by live and standing dead biomass
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fwloss_2
   </td>
   <td>scaling factor for bare soil evaporation of precipitation
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fwloss_3
   </td>
   <td>scaling factor for transpiration water loss
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>fwloss_4
   </td>
   <td>scaling factor for potential evapotranspiration
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>gremb
   </td>
   <td>grazing effect multiplier for grzeff types 4, 5, 6
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>minlch
   </td>
   <td>critical water flow for leaching of minerals (cm of H2O leached below 30 cm soil depth)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>nlayer
   </td>
   <td>number of soil layers in water model (maximum of 9); used only to calculate the amount of water available for survival of the plant
   </td>
   <td>1 - 9
   </td>
  </tr>
  <tr>
   <td>omlech_1
   </td>
   <td>intercept for the effect of sand on leaching of organic compounds
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>omlech_2
   </td>
   <td>slope for the effect of sand on leaching of organic compounds
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>omlech_3
   </td>
   <td>the amount of water that needs to flow out of water layer to leach organic C at the maximum rate (cm/month)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>p1co2a_1
   </td>
   <td>intercept parameter which controls flow from surface organic matter with fast turnover to CO2 (fraction of C lost to CO2 when there is no sand in the soil)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>p1co2a_2
   </td>
   <td>intercept parameter which controls flow from soil organic matter with fast turnover to CO2 (fraction of C lost to CO2 when there is no sand in the soil)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>p1co2b_1
   </td>
   <td>slope parameter which controls flow from surface organic matter with fast turnover to CO2 (slope is multiplied by the fraction sand content of the soil)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>p1co2b_2
   </td>
   <td>slope parameter which controls flow from soil organic matter with fast turnover to CO2 (slope is multiplied by the fraction sand content of the soil)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>p2co2_1
   </td>
   <td>controls flow from surface organic matter with intermediate turnover to CO2 (fraction of C lost as CO2 during decomposition)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>p2co2_2
   </td>
   <td>controls flow from soil organic matter with intermediate turnover to CO2 (fraction of C lost as CO2 during decomposition)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>p3co2
   </td>
   <td>controls flow from soil organic matter with slow turnover rate to CO2 (fraction of C lost as CO2 during decomposition)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pabres
   </td>
   <td>amount of residue which will give maximum direct absorption of N (gC/m2)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic1_1_1
   </td>
   <td>maximum C/N ratio for surface microbial pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic1_1_2
   </td>
   <td>maximum C/P ratio for surface microbial pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic1_2_1
   </td>
   <td>minimum C/N ratio for surface microbial pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic1_2_2
   </td>
   <td>minimum C/P ratio for surface microbial pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic1_3_1
   </td>
   <td>mimimum N content of decomposing aboveground material, above which the C/N ratio of the surface microbes equals pcemic1(2,*)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic1_3_2
   </td>
   <td>mimimum P content of decomposing aboveground material, above which the C/P ratio of the surface microbes equals pcemic1(2,*)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic2_1_1
   </td>
   <td>maximum C/N ratio for surface intermediate pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic2_1_2
   </td>
   <td>maximum C/P ratio for surface intermediate pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic2_2_1
   </td>
   <td>minimum C/N ratio for surface intermediate pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic2_2_2
   </td>
   <td>minimum C/P ratio for surface intermediate pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic2_3_1
   </td>
   <td>mimimum N content of decomposing aboveground material, above which the C/N ratio of the surface intermediate pool equals pcemic2(2,*)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pcemic2_3_2
   </td>
   <td>mimimum P content of decomposing aboveground material, above which the C/P ratio of the surface intermediate pool equals pcemic2(2,*)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>peftxa
   </td>
   <td>intercept parameter for regression equation to compute the effect of soil texture on the microbe decomposition rate (the effect of texture when there is no sand in the soil)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>peftxb
   </td>
   <td>slope parameter for the regression equation to compute the effect of soil texture on the microbe decomposition rate; the slope is multiplied by the sand content fraction
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pligst_1
   </td>
   <td>effect of lignin on surface structural or fine branch and large wood decomposition
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pligst_2
   </td>
   <td>effect of lignin on soil structural or coarse root decomposition
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pmco2_1
   </td>
   <td>surface; controls flow from surface metabolic to CO2 (fraction of C lost as CO2 during decomposition)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pmco2_2
   </td>
   <td>soil; controls flow from soil metabolic to CO2 (fraction of C lost as CO2 during decomposition)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pmnsec_1
   </td>
   <td>slope for N; controls the flow from mineral to secondary N (/yr)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pmnsec_2
   </td>
   <td>slope for P; controls the flow from mineral to secondary P (/yr)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pmntmp
   </td>
   <td>effect of biomass on minimum surface temperature
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pmxbio
   </td>
   <td>maximum dead biomass (standing dead + 10% litter) level for soil temperature calculation and for calculation of the potential negative effect on plant growth of physical obstruction by standing dead and litter
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pmxtmp
   </td>
   <td>effect of biomass on maximum surface temperature
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pparmn_1
   </td>
   <td>fraction of parent material that flows to mineral N
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pparmn_2
   </td>
   <td>fraction of parent material that flows to mineral P
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pprpts_1
   </td>
   <td>the minimum ratio of available water to PET which would completely limit production assuming WC = 0
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>pprpts_2
   </td>
   <td>the effect of WC on the intercept, allows the user to increase the value of the intercept and thereby increase the slope of the line
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pprpts_3
   </td>
   <td>the lowest ratio of available water to PET at which there is no restriction on production
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>precro
   </td>
   <td>the amount of monthly rainfall required in order for runoff to occur
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>ps1co2_1
   </td>
   <td>surface; controls amount of CO2 loss when structural decomposes to som1
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>ps1co2_2
   </td>
   <td>soil; controls amount of CO2 loss when structural decomposes to som1
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>ps1s3_1
   </td>
   <td>intercept for the effect of clay on the control for the flow from soil organic matter with fast turnover to som with slow turnover (fraction of C from som1c to som3c)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>ps1s3_2
   </td>
   <td>slope for the effect of clay on the control for the flow soil organic matter with fast turnover to som with slow turnover (fraction of C from som1c to som3c)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>ps2s3_1
   </td>
   <td>intercept value which controls flow from soil organic matter with intermediate turnover to soil organic matter with slow turnover (fraction of C from som2c to som3c)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>ps2s3_2
   </td>
   <td>slope value which controls flow from soil organic matter with intermediate turnover to soil organic matter with slow turnover (fraction of C from som2c to som3c)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>psecmn_1
   </td>
   <td>controls the flow from secondary to mineral N
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>psecmn_2
   </td>
   <td>controls the flow from secondary to mineral P
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>psecoc1
   </td>
   <td>controls the flow from secondary to occluded P
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>psecoc2
   </td>
   <td>controls the back flow from occluded to secondary P
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>pslsrb
   </td>
   <td>slope term which controls the fraction of mineral P that is labile
   </td>
   <td>1 - 1
   </td>
  </tr>
  <tr>
   <td>rad1p_1_1
   </td>
   <td>intercept used to calculate addition term for C/N ratio of slow SOM formed from surface active pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rad1p_1_2
   </td>
   <td>intercept used to calculate addition term for C/P ratio of slow SOM formed from surface active pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rad1p_2_1
   </td>
   <td>slope used to calculate addition term for C/N ratio of slow SOM formed from surface active pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rad1p_2_2
   </td>
   <td>slope used to calculate addition term for C/P ratio of slow SOM formed from surface active pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rad1p_3_1
   </td>
   <td>minimum allowable C/N used to calculate addition term for C/N ratio of slow SOM formed from surface active pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rad1p_3_2
   </td>
   <td>minimum allowable C/P used to calculate addition term for C/P ratio of slow SOM formed from surface active pool
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rcestr_1
   </td>
   <td>C/N ratio for structural material (fixed parameter value)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rcestr_2
   </td>
   <td>C/P ratio for structural material (fixed parameter value)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rictrl
   </td>
   <td>root impact control term; used for calculating the impact of root biomass on nutrient availability
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>riint
   </td>
   <td>root impact intercept; used for calculating the impact of root biomass on nutrient availability
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>rsplig
   </td>
   <td>fraction of lignin flow (in structural decomposition) lost as CO2
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>sorpmx
   </td>
   <td>maximum P sorption potential for a soil
   </td>
   <td>100 - 100
   </td>
  </tr>
  <tr>
   <td>spl_1
   </td>
   <td>intercept parameter for metabolic (vs. structural) split
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>spl_2
   </td>
   <td>slope parameter for metabolic split (fraction metabolic is a function of lignin to N ratio)
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>strmax_1
   </td>
   <td>maximum amount of structural material in surface layer that will decompose (gC/m2)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>strmax_2
   </td>
   <td>maximum amount of structural material belowground that will decompose (gC/m2)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>teff_1
   </td>
   <td>x location of inflection point, for determining the temperature component of DEFAC, the decomposition factor
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>teff_2
   </td>
   <td>y location of inflection point, for determining the temperature component of DEFAC, the decomposition factor
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>teff_3
   </td>
   <td>step size (distance from the maximum point to the minimum point), for determining the temperature component of DEFAC, the decomposition factor
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>teff_4
   </td>
   <td>slope of line at inflection point, for determining the temperature component of DEFAC, the decomposition factor
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>tmelt_1
   </td>
   <td>minimum temperature above which at least some snow will melt
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>tmelt_2
   </td>
   <td>ratio between degrees above the minimum and cm of snow that will melt
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat1_1_1
   </td>
   <td>maximum C/N ratio for material entering som1
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat1_1_2
   </td>
   <td>maximum C/P ratio for material entering som1
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat1_2_1
   </td>
   <td>minimum C/N ratio for material entering som1
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat1_2_2
   </td>
   <td>minimum C/P ratio for material entering som1
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat1_3_1
   </td>
   <td>amount N present when minimum ratio applies
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat1_3_2
   </td>
   <td>amount P present when minimum ratio applies
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat21_1_1
   </td>
   <td>maximum C/N ratio for material entering surface som2
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat21_1_2
   </td>
   <td>maximum C/P ratio for material entering surface som2
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat21_2_1
   </td>
   <td>minimum C/N ratio for material entering surface som2
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat21_2_2
   </td>
   <td>minimum C/P ratio for material entering surface som2
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat21_3_1
   </td>
   <td>amount N present when minimum ratio applies
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat21_3_2
   </td>
   <td>amount P present when minimum ratio applies
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat22_1_1
   </td>
   <td>maximum C/N ratio for material entering soil som2
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat22_1_2
   </td>
   <td>maximum C/P ratio for material entering soil som2
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat22_2_1
   </td>
   <td>minimum C/N ratio for material entering soil som2
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat22_2_2
   </td>
   <td>minimum C/P ratio for material entering soil som2
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat22_3_1
   </td>
   <td>amount N present when minimum ratio applies
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat22_3_2
   </td>
   <td>amount P present when minimum ratio applies
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat3_1_1
   </td>
   <td>maximum C/N ratio for material entering som3
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat3_1_2
   </td>
   <td>maximum C/P ratio for material entering som3
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat3_2_1
   </td>
   <td>minimum C/N ratio for material entering som3
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat3_2_2
   </td>
   <td>minimum C/P ratio for material entering som3
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat3_3_1
   </td>
   <td>amount N present when minimum ratio applies
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>varat3_3_2
   </td>
   <td>amount P present when minimum ratio applies
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>vlossg
   </td>
   <td>multiplier for equation to compute volatilization loss that occurs as a function of gross mineralization
   </td>
   <td>
   </td>
  </tr>
</table>




Table 2. Required parameters in the plant functional type (PFT) parameter table, giving parameters that are characteristic of a PFT.  This table must contain an integer field called “PFT” that corresponds to PFT identifiers in the filenames of PFT fractional cover rasters.


<table>
  <tr>
   <td>Parameter
   </td>
   <td>Definition
   </td>
   <td>Valid values
   </td>
  </tr>
  <tr>
   <td>PFT
   </td>
   <td>PFT label matched to filename of fractional cover raster
   </td>
   <td>integer
   </td>
  </tr>
  <tr>
   <td>species_factor
   </td>
   <td>Coefficient distinguishing C3 from C4 grasses
   </td>
   <td>0 (C3 grass), 0.16 (C4 grass)
   </td>
  </tr>
  <tr>
   <td>digestibility_slope
   </td>
   <td>Slope of linear regression predicting dry matter digestibility (%) from crude protein content (%)
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>digestibility_intercept
   </td>
   <td>Intercept of linear regression predicting dry matter digestibility (%) from crude protein content (%)
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>biok5
   </td>
   <td>level of aboveground standing dead + 10% strucc_1 C at which production is reduced to half maximum due to physical obstruction by the dead material (gC/m2)
   </td>
   <td>0 - 2000
   </td>
  </tr>
  <tr>
   <td>biomax
   </td>
   <td>biomass level above which the minimum and maximum C/<iel> ratios of the new shoot increments equal pramn_<iel>_2 and pramx_<iel>_2 respectively (g biomass/m2)
   </td>
   <td>0 - 1000
   </td>
  </tr>
  <tr>
   <td>cfrtcn_1
   </td>
   <td>maximum fraction of C allocated to roots under maximum nutrient stress
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>cfrtcn_2
   </td>
   <td>minimum fraction of C allocated to roots with no nutrient stress
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>cfrtcw_1
   </td>
   <td>maximum fraction of C allocated to roots under maximum water stress
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>cfrtcw_2
   </td>
   <td>minimum fraction of C allocated to roots with no water stress
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>claypg
   </td>
   <td>number of soil layers used to determine water and mineral N and P that are available for crop growth
   </td>
   <td>1 - 9
   </td>
  </tr>
  <tr>
   <td>cmix
   </td>
   <td>number of soil layers used to determine water and mineral N and P that are available for crop growth
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>crprtf_1
   </td>
   <td>fraction of N transferred to a vegetation storage pool from grass/crop leaves at death
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>crprtf_2
   </td>
   <td>fraction of P transferred to a vegetation storage pool from grass/crop leaves at death
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fallrt
   </td>
   <td>fall rate (fraction of standing dead which falls each month)
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fligni_1_1
   </td>
   <td>intercept for equation to predict lignin content fraction based on annual rainfall for aboveground material
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fligni_1_2
   </td>
   <td>intercept for equation to predict lignin content fraction based on annual rainfall for belowground material
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fligni_2_1
   </td>
   <td>slope for equation to predict lignin content fraction based on annual rainfall for aboveground material
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fligni_2_2
   </td>
   <td>slope for equation to predict lignin content fraction based on annual rainfall for belowground material
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>frtcindx
   </td>
   <td>plant growth type = 0 use Great Plains equation = 1 perennial plant
   </td>
   <td>0; 1; 2
   </td>
  </tr>
  <tr>
   <td>fsdeth_1
   </td>
   <td>maximum shoot death rate at very dry soil conditions (fraction/month); for getting the monthly shoot death rate, this fraction is multiplied times a reduction factor depending on the soil water status
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fsdeth_2
   </td>
   <td>fraction of shoots which die during senescence month
   </td>
   <td>0.4 - 1
   </td>
  </tr>
  <tr>
   <td>fsdeth_3
   </td>
   <td>additional fraction of shoots which die when aboveground live C is greater than fsdeth_4
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>fsdeth_4
   </td>
   <td>the level of aboveground C above which shading occurs and shoot senescence increases
   </td>
   <td>0 - 500
   </td>
  </tr>
  <tr>
   <td>nlaypg
   </td>
   <td>number of soil layers in the top level of the water model; determines avh2o_1, used for growth and root death
   </td>
   <td>1 - 10
   </td>
  </tr>
  <tr>
   <td>ppdf_1
   </td>
   <td>optimum temperature for production for parameterization of a Poisson Density Function curve to simulate temperature effect on growth
   </td>
   <td>10 - 40
   </td>
  </tr>
  <tr>
   <td>ppdf_2
   </td>
   <td>maximum temperature for production for parameterization of a Poisson Density Function curve to simulate temperature effect on growth
   </td>
   <td>20 - 50
   </td>
  </tr>
  <tr>
   <td>ppdf_3
   </td>
   <td>left curve shape for parameterization of a Poisson Density Function curve to simulate temperature effect on growth
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>ppdf_4
   </td>
   <td>right curve shape for parameterization of a Poisson Density Function curve to simulate temperature effect on growth
   </td>
   <td>0 - 10
   </td>
  </tr>
  <tr>
   <td>pramn_1_1
   </td>
   <td>minimum C/N ratio with zero biomass
   </td>
   <td>1 - 100
   </td>
  </tr>
  <tr>
   <td>pramn_1_2
   </td>
   <td>minimum C/N ratio with biomass greater than or equal to biomax
   </td>
   <td>1 - 200
   </td>
  </tr>
  <tr>
   <td>pramn_2_1
   </td>
   <td>minimum C/P ratio with zero biomass
   </td>
   <td>1 - 9999
   </td>
  </tr>
  <tr>
   <td>pramn_2_2
   </td>
   <td>minimum C/P ratio with biomass greater than or equal to biomax
   </td>
   <td>1 - 9999
   </td>
  </tr>
  <tr>
   <td>pramx_1_1
   </td>
   <td>maximum C/N ratio with zero biomass
   </td>
   <td>1 - 200
   </td>
  </tr>
  <tr>
   <td>pramx_1_2
   </td>
   <td>maximum C/N ratio with biomass greater than or equal to biomax
   </td>
   <td>1 - 400
   </td>
  </tr>
  <tr>
   <td>pramx_2_1
   </td>
   <td>maximum C/P ratio with zero biomass
   </td>
   <td>1 - 9999
   </td>
  </tr>
  <tr>
   <td>pramx_2_2
   </td>
   <td>maximum C/P ratio with biomass greater than or equal to biomax
   </td>
   <td>1 - 9999
   </td>
  </tr>
  <tr>
   <td>prbmn_1_1
   </td>
   <td>intercept parameter for computing minimum C/N ratio for below ground matter as a linear function of annual precipitation
   </td>
   <td>0 - 150
   </td>
  </tr>
  <tr>
   <td>prbmn_1_2
   </td>
   <td>slope parameter for computing minimum C/N ratio for below ground matter as a linear function of annual precipitation
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>prbmn_2_1
   </td>
   <td>intercept parameter for computing minimum C/P ratio for below ground matter as a linear function of annual precipitation
   </td>
   <td>0 - 9999
   </td>
  </tr>
  <tr>
   <td>prbmn_2_2
   </td>
   <td>slope parameter for computing minimum C/P ratio for below ground matter as a linear function of annual precipitation
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>prbmx_1_1
   </td>
   <td>intercept parameter for computing maximum C/N ratios for below ground matter as a linear function of annual precipitation
   </td>
   <td>0 - 300
   </td>
  </tr>
  <tr>
   <td>prbmx_1_2
   </td>
   <td>slope parameter for computing maximum C/N ratios for below ground matter as a linear function of annual precipitation
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>prbmx_2_1
   </td>
   <td>intercept parameter for computing maximum C/P ratios for below ground matter as a linear function of annual precipitation
   </td>
   <td>0 - 9999
   </td>
  </tr>
  <tr>
   <td>prbmx_2_2
   </td>
   <td>slope parameter for computing maximum C/P ratios for below ground matter as a linear function of annual precipitation
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>prdx_1
   </td>
   <td>coefficient for calculating potential aboveground monthly production as a function of solar radiation outside the atmosphere
   </td>
   <td>? - ?
   </td>
  </tr>
  <tr>
   <td>rdr
   </td>
   <td>maximum root death rate at very dry soil conditions (fraction/month); for getting the monthly root death rate, this fraction is multiplied times a reduction factor depending on the soil water status
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>rtdtmp
   </td>
   <td>physiological shutdown temperature for root death and change in shoot/root ratio
   </td>
   <td>-5 - 5
   </td>
  </tr>
  <tr>
   <td>snfxmx_1
   </td>
   <td>symbiotic N fixation maximum for grassland/crop (g N fixed/g C new growth)
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>vlossp
   </td>
   <td>fraction of aboveground plant N which is volatilized at senescence
   </td>
   <td>0 - 1
   </td>
  </tr>
  <tr>
   <td>senescence_month
   </td>
   <td>month in which senescence occurs
   </td>
   <td>1 - 12
   </td>
  </tr>
  <tr>
   <td>growth_months
   </td>
   <td>months in which growth occurs
   </td>
   <td>integers in [1 - 12], in the format [1, 2, 3]
   </td>
  </tr>
</table>
