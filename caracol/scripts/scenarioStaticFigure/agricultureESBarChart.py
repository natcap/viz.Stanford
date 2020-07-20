#Agricultrue Scenario Plot

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



fig, baseflow = plt.subplots()
fig.subplots_adjust(right=0.75)
#section subtitle
#plt.title('Change in Ecosystem Services',size=22)


#data for all scenarios
totalFlow = {'agriclture': 13861312008, 'mining': 12399680445, 'tourism': 12452638350, 'timber': 13594656482 }
sedimentLoad = {'agriclture': 85968342.1, 'mining': 80521997.16, 'tourism': 44063126.36, 'timber': 41737293.88 }
nutrientLoad = {'agriclture': 13218078.88, 'mining': 13011048.31, 'tourism': 13034430.17, 'timber': 13108934.29 }
#change in ecosystem service data values
changeTotalFlow = [1665705752, 204074189.1, 257032094.4, 1399050226]
changeSedimentLoad = [45107156.98, 39660812.04, 3201941.235, 876108.7563]
changeSedimentRetention = [-45107156.98, -39660812.04, -3201941.235, -876108.7563]
changeNutrientLoad = [201996.5952, -5033.973084, 18347.88057, 92852.0018]
changeNutrientRetention = [-201996.5952, 5033.973084, -18347.88057, -92852.0018]


#connect the y-axis together on the graph
sediment = baseflow.twinx()
nutrient = baseflow.twinx()
totalflow = baseflow.twinx()


# Offset the right spine of par2.  The ticks and label have already been
# placed on the right by twinx above.
nutrient.spines["right"].set_position(("axes", 1))
sediment.spines["right"].set_position(("axes", 1))
totalflow.spines["right"].set_position(("axes", 0))

# Having been created by twinx, par2 has its frame off, so the line of its
# detached spine is invisible.  First, activate the frame but make the patch
# and spines invisible.
make_patch_spines_invisible(nutrient)
make_patch_spines_invisible(sediment)
make_patch_spines_invisible(totalflow)

# Second, show the right spine.
nutrient.spines["right"].set_visible(True)
sediment.spines["right"].set_visible(True)
totalflow.spines["left"].set_visible(True)

#bar graph figureName.bar(x,y,barWidth, color, label)
#change in total flow
p1, = baseflow.bar(0.5, changeTotalFlow[0], 0.3, color="#0042d1", label="Change in Total Flow | m^3/year")
#change in sediment transport
p2, = sediment.bar(1, changeSedimentRetention[0], 0.3, color="#8b0000", label="Change in Sediment Transport | tons/year")
#change in nutrient transport
p3, = nutrient.bar(1.5, changeNutrientRetention[0], 0.3, color= "#855b00",label="Change in Nutrient Transport | tons/year")
#change in total flow
p4, = totalflow.bar(0.5, changeTotalFlow[0], 0.3, color="#0042d1", label="Change in Total Flow | m^3/year")


#set the scale of the axis, min and max posiitons
baseflow.set_xlim(0, 2)
#totalflow.set_ylim(-240000000, 3000000000)
totalflow.set_ylim(-3000000000, 3000000000)
#baseflow.set_ylim(-240000000, 3000000000)
baseflow.set_ylim(-3000000000, 3000000000)

#sediment.set_ylim(-5600000, 55000000)
sediment.set_ylim(-55000000, 55000000)


#nutrient.set_ylim(-24000, 200000) 
#nutrient.set_ylim(-56000, 550000) #this one makes the scale the same for the tons/year
nutrient.set_ylim(-550000, 550000) #this one makes the scale the same for the tons/year




#set's up axis label, color, and size
baseflow.set_xlabel("Agriculture")
#baseflow.set_ylabel("m3/year", size=18, )
#sediment.yaxis.set_major_locator(MultipleLocator(10000)

#sediment.set_ylabel("tons/year", size=18, color="#8b0000" )
#nutrient.set_ylabel("tons/year", size=18, color="#855b00")
#totalflow.set_ylabel("m$^3$/year", size=18, color="#0042d1")



tkw = dict(size=4, width=1.5)
#baseflow.tick_params(axis='y', labelcolor="#0042d1")

#makes the frame and inside of graph dissapear
baseflow.set_visible(False)

#major and minor ticks for sediment flow
major_ticks = np.arange(-3000000000, 3000000001, 1000000000)
minor_ticks = np.arange(-3000000000, 3000000000, 500000000)


#tick and tick label settings
#sediment.tick_params(axis='y', labelcolor="#8b0000", labelsize = 20, color="#8b0000", size=10, width= 2)
sediment.tick_params(axis='y', labelsize = 20, color="#8b0000", size=20, width= 2)
totalflow.tick_params(axis='y', which='major', labelcolor="#0042d1", labelsize = 28, color="#0042d1", size=10, width= 2)
totalflow.tick_params(axis='y', which='minor', labelcolor="#0042d1", labelsize = 0, color="#0042d1", size=10, width= 2)
nutrient.tick_params(axis='y', labelcolor="#855b00", labelsize = 20, color="#855b00", size=10, width= 2)
baseflow.tick_params(axis='x', **tkw)

totalflow.set_yticks(major_ticks)
totalflow.set_yticks(minor_ticks, minor=True)




#baseflow.axes.get_xaxis().set_visible(False)
#nutrient.axes.get_yaxis().set_visible(False)
#sediment.axes.get_yaxis().set_visible(False)

#controls labels on ticks for the y axis, hides them
nutrient.yaxis.set_ticklabels([])
sediment.yaxis.set_ticklabels([])



#line through x-axis
lines = [p1, p2, p3]
nutrient.axhline(0, color='black', lw=2)

#makes the x-axis the same for the different data ploted
align_yaxis(baseflow, 0, sediment, 0)
align_yaxis(baseflow, 0, nutrient, 0)
align_yaxis(baseflow, 0, totalflow, 0)

#baseflow.legend(lines, [l.get_label() for l in lines])

plt.show()