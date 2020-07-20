#Mining BZD Plot

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.ticker import (MultipleLocator, FormatStrFormatter,
                               AutoMinorLocator)

#plt.title("Scenarios")


def make_patch_spines_invisible(ax):
    ax.set_frame_on(True)
    ax.patch.set_visible(False)
    for sp in ax.spines.values():
        sp.set_visible(False)

def align_yaxis(ax1, v1, ax2, v2):
    """adjust ax2 ylimit so that v2 in ax2 is aligned to v1 in ax1"""
    _, y1 = ax1.transData.transform((0, v1))
    _, y2 = ax2.transData.transform((0, v2))
    inv = ax2.transData.inverted()
    _, dy = inv.transform((0, 0)) - inv.transform((0, y1-y2))
    miny, maxy = ax2.get_ylim()
    ax2.set_ylim(miny+dy, maxy+dy)

fig, revenue = plt.subplots()
fig.subplots_adjust(right=0.75)

#Data for the figure

#Change in value of energy generated (BZD)
changeEnergyValue = [17000000, 0, 600000, 520000]
#Crop production revenue (BZD)
changeCropRevenue = [341500000, 0, 48200000, 0]
#Change Carbon stock value (BZD) 
carbonStockValue = [-345600000, -85200000, -44300000, -256600000]
#Water treatment cost (BZD) --> missing
waterTreatmentCost = [0,0,0,0]
#Timber revenue (BZD)
timberRevenue = [-280000, -150000, -890000, 0]

#Data from new report, order is environmental impact macal river, change in revenue, social impact, more conservative, less conservative
#environmental impact macal river, % change in units
#Increasing summer flows (% change)
increaseSummerFlow = [-9.1,-13.7]
#Lessening high flows (% change) 
lessHighFlow =[-8, 20.4]
#Sediment load (% change) 
sedimentLoadChange =[-42.6, 50]
#Nutrient load (% change) 
nutrientLoadChange =[-17.2, 2]

#change in revenue (M BZD)
#Tourism revenue - local (M BZD) 
tourismRevLocal =[52.2, 54.4]
#Tourism revenue - rest of Cayo (M BZD) 
tourismRevCayo =[39.1, 117.4]
#Crop value (M BZD)
cropValue =[ -69.5, 92.2]
#Timber revenue (M BZD) 
timberRev =[1.3, 1.3]
#Hydropower revenue (M BZD) 
hydroPowerRev =[-5.4, -4.6]
#Carbon value (M BZD) 
carbonValue =[158, 4.2]

#social , %change
#Water availability, communities (baseflow, % change)
waterAvailability=[ -7, -5]
#Water quality, communities (sediment, % change) 
waterQualitySediment=[-34.5, 16.5]
#Water quality, communities (nitrogen, % change)
waterQualityNutrient =[-7.6, 0.7]



#connect y-axis together on graph
energy = revenue.twinx()
cropRev = revenue.twinx()
carbonStock = revenue.twinx()
waterTreatment = revenue.twinx()
timberRev = revenue.twinx()

# Offset the right spine of par2.  The ticks and label have already been
# placed on the right by twinx above.
#energy.spines["right"].set_position(("axes", 0))
cropRev.spines["right"].set_position(("axes", 0))
carbonStock.spines["right"].set_position(("axes", 0))
waterTreatment.spines["right"].set_position(("axes", 0.05))
#timberRev.spines["right"].set_position(("axes", 1))

# Having been created by twinx, par2 has its frame off, so the line of its
# detached spine is invisible.  First, activate the frame but make the patch
# and spines invisible.
make_patch_spines_invisible(energy)
make_patch_spines_invisible(cropRev)
make_patch_spines_invisible(carbonStock)
make_patch_spines_invisible(waterTreatment)
make_patch_spines_invisible(timberRev)

# Second, show the right spine.
#energy.spines["right"].set_visible(True)
cropRev.spines["left"].set_visible(True)
carbonStock.spines["left"].set_visible(True)
waterTreatment.spines["left"].set_visible(True)
#timberRev.spines["right"].set_visible(True)

#bar graph figureName.bar(x,y,barWidth, color, label)
#change in total flow
p1, = revenue.bar(0.8, waterAvailability[1], 0.3, color="#a4c2f4", label="BZD/year")
#change in sediment transport
p2, = cropRev.bar(1.4, waterQualitySediment[1], 0.3, color="#0080ff", label="BZD/year")
#change in nutrient transport
p3, = carbonStock.bar(1.1, waterQualityNutrient[1], 0.3, color= "#ffff00",label="BZD/year")
#change in total flow
p4, = energy.bar(0.8, waterAvailability[1], 0.3, color="#ff0000", label="BZD/year")
#change in water demand
p5, = waterTreatment.bar(0.8, waterAvailability[1], 0.3, color="#ff0000", label="BZD/year")
#change in crop production
#p6, = timberRev.bar(1.7, hydroPowerRev[1], 0.3, color="#006400", label="BZD/year")
#change in crop production
#p7, = timberRev.bar(2.0, carbonValue[1], 0.3, color="#9370db", label="BZD/year")

#set scale of the axis
revenue.set_xlim(0, 2.6)

revenue.set_ylim(-50, 50)
#energy.set_ylim(-350000000, 350000000)
energy.set_ylim(-50, 50)
carbonStock.set_ylim()

cropRev.set_ylim(-50, 50)
carbonStock.set_ylim(-50, 50)
waterTreatment.set_ylim(-50, 50)
#timberRev.set_ylim(-350000000, 350000000)
timberRev.set_ylim(-50, 50)



revenue.set_xlabel("Agriculture")
tkw = dict(size=4, width=1.5)
revenue.set_visible(False)


timberRev.tick_params(axis='y', labelsize = 28, size=20, width= 2)
waterTreatment.tick_params(axis='y', labelsize = 28, size=20, width= 2, labelleft=True, labelright=False)



#hides labels on y axis
energy.yaxis.set_ticklabels([])
cropRev.yaxis.set_ticklabels([])
carbonStock.yaxis.set_ticklabels([])
waterTreatment.yaxis.set_ticklabels([])
timberRev.yaxis.set_ticklabels([])


#line through x axis
lines = [p1, p2, p3]
energy.axhline(0, color='black', lw=2)


#aligns y axis
align_yaxis(revenue, 0, energy, 0)
align_yaxis(revenue, 0, cropRev, 0)
align_yaxis(revenue, 0, carbonStock, 0)
align_yaxis(revenue, 0, waterTreatment, 0)
align_yaxis(revenue, 0, timberRev, 0)


plt.show()