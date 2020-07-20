import matplotlib
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import matplotlib.cbook as cbook
import matplotlib.cm as cm
import matplotlib.gridspec as gridspec

import numpy as np

from matplotlib.collections import LineCollection
from matplotlib.ticker import MultipleLocator
from matplotlib.ticker import MaxNLocator
from collections import namedtuple


fig = plt.figure("Scenarios")
#plt.title("Scenarios", fontdict=fontTitle)
plt.axis('off')

#load the data
#imgAg = mpimg.imread('belizeAgriculture.png')
#print(imgAg)

imgMining = mpimg.imread('belizeMining.png')
print(imgMining)

imgTourism = mpimg.imread('belizeTourism.png')
print(imgTourism)

imgTimber = mpimg.imread('belizeTimber.png')
print(imgTimber)

imgPlaceholder = mpimg.imread('placeholderSmall.png')
print(imgPlaceholder)

imgBarChartLegend = mpimg.imread('barCharLegend.png')
print(imgBarChartLegend)

imgLULCLegend = mpimg.imread('figureMapsLegend.png')
print(imgLULCLegend)



labels = [1, 2, 3, 4, 5]


totalFlow = {'agriclture': 13861312008, 'mining': 12399680445, 'tourism': 12452638350, 'timber': 13594656482 }
sedimentLoad = {'agriclture': 85968342.1, 'mining': 80521997.16, 'tourism': 44063126.36, 'timber': 41737293.88 }
nutrientLoad = {'agriclture': 13218078.88, 'mining': 13011048.31, 'tourism': 13034430.17, 'timber': 13108934.29 }

totalFlow1 = [13861312008, 12399680445, 12452638350, 13594656482]
changeTotalFlow = [1665705752, 204074189.1, 257032094.4, 1399050226]
sedimentLoad1 = [85968342.1, 80521997.16, 44063126.36, 41737293.88]
changeSedimentLoad = [45107156.98, 39660812.04, 3201941.235, 876108.7563]
nutrientLoad1 = [13218078.88, 13011048.31, 13034430.17, 13108934.29]
changeNutrientLoad = [201996.5952, -5033.973084, 18347.88057, 92852.0018]


x = np.arange(len(labels))  # the label locations
width = 0.4  # the width of the bars

font = {'color':  'darkred',
        'weight': 'normal',
        'size': 14,
        }

fontTitle = {'color':  'darkred',
        'weight': 'normal',
        'size': 24,
        }

plt.title("Scenarios", fontdict=fontTitle)


#imgplot = plt.imshow(img)

data = {'apple': 10, 'orange': 15, 'lemon': 5, 'lime': 20}
names = list(data.keys()) #x axis
values = list(data.values()) #y axis

#Plot LULC Images
ax0 = fig.add_subplot(3, 4, 1)
ax0.set_title('Agriculture', fontdict=font)
ax0.imshow(imgAg)
ax0.axis('off')

ax1 = fig.add_subplot(3, 4, 2)
ax1.set_title('Mining')
ax1.imshow(imgMining)
ax1.axis('off')

ax1 = fig.add_subplot(3, 4, 3)
ax1.set_title('Tourism')
ax1.imshow(imgTourism)
ax1.axis('off')


ax1 = fig.add_subplot(3, 4, 4)
ax1.set_title('Timber')
ax1.imshow(imgTimber)
ax1.axis('off')

#fig, (ax2, ax3, ax4, ax5) = plt.subplots(3, 4, sharey=True)

#bar graphs

#Agriculture
ax2 = fig.add_subplot(3,4,5)
ax2.set_title("Ecosystem Services")
ax12 = ax2.twinx()
ax22 = ax2.twinx()
#new_fixed_axis = ax22.get_grid_heloer().new_fixed_axis
#ax22.axis["right"] = new_fixed_axis(loc="right", axes=ax2, offset=(offset, 0))
ax12.bar(labels[0], changeTotalFlow[0], width, color="#ff4500", label= 'Total Flow | m3/year')
ax2.bar(labels[1], changeSedimentLoad[0], width, color="#ffbf58", label='Sediment Tansport | tons/year')
ax22.bar(labels[2], changeNutrientLoad[0], width, color="#444444", label='Nutrient Transport | tons/year')
ax2.axhline(0, color='black', lw=2)

ax2.set_ylim(-10000, 300000)
ax2.set_xlim(0, 4)
#ax12.tick_params(axis='y', labelcolor="#ff4500")
ax2.set_ylabel('tons/year')
#ax12.set_ylabel('m3/year', color="#ff4500")
#ax2.set_title("Change in Ecosystem Services")
ax22.axes.get_yaxis().set_visible(False)
ax2.axes.get_xaxis().set_visible(False)








#Mining
ax3 = fig.add_subplot(3,4,6)
ax13 = ax3.twinx()
ax13.bar(labels[0], changeTotalFlow[1], width, color="#ff4500", label= 'Change in Total Flow | m3/year')
ax3.bar(labels[1], changeSedimentLoad[1], width, color="#ffbf58", label='Change in Sediment Tansport | tons/year')
ax3.bar(labels[2], changeNutrientLoad[1], width, color="#444444", label='Change in Nutrient Transport | tons/year')
ax3.set_ylim(-10000, 300000)
ax3.set_xlim(0, 4)
ax13.tick_params(axis='y', labelcolor="#ff4500")
ax3.set_ylabel('tons/year')
ax13.set_ylabel('m3/year', color="#ff4500")
ax3.axes.get_yaxis().set_visible(False)
ax13.axes.get_yaxis().set_visible(False)
ax3.axes.get_xaxis().set_visible(False)


#Tourism
ax4 = fig.add_subplot(3,4,7)
ax14 = ax4.twinx()
ax14.bar(labels[0], changeTotalFlow[2], width, color="#ff4500", label= 'Total Flow | m3/year')
ax4.bar(labels[1], changeSedimentLoad[2], width, color="#ffbf58", label='Sediment Tansport | tons/year')
ax4.bar(labels[2], changeNutrientLoad[2], width, color="#444444", label='Nutrient Transport | tons/year')
ax4.set_ylim(-10000, 300000)
ax4.set_xlim(0, 4)
ax14.tick_params(axis='y', labelcolor="#ff4500")
ax4.set_ylabel('tons/year')
ax14.set_ylabel('m3/year', color="#ff4500")
ax4.axes.get_yaxis().set_visible(False)
ax14.axes.get_yaxis().set_visible(False)
ax4.axes.get_xaxis().set_visible(False)





#Timber
ax5 = fig.add_subplot(3,4,8)
ax15 = ax5.twinx()
ax15.bar(labels[0], changeTotalFlow[3], width, color="#ff4500", label= 'Total Flow | m3/year')
ax5.bar(labels[1], changeSedimentLoad[3], width, color="#ffbf58", label='Sediment Tansport | tons/year')
ax5.bar(labels[2], changeNutrientLoad[3], width, color="#444444", label='Nutrient Transport | tons/year')
#ax5.set_ylim(-10000, 300000)
ax5.set_xlim(0, 4)
ax15.tick_params(axis='y', labelcolor="#ff4500")
#ax5.set_ylabel('tons/year')
ax15.set_ylabel('m3/year', color="#ff4500")
#ax5.set_xticks(labels=None)
ax5.axes.get_xaxis().set_visible(False)
ax5.axes.get_yaxis().set_visible(False)



#Last Row - Info not yet available
ax6 = fig.add_subplot(3,4,9)
ax6.imshow(imgPlaceholder)
ax6.set_title("Change in BZD")
ax6.axes.get_xaxis().set_visible(False)



ax7 = fig.add_subplot(3,4,10)
ax7.imshow(imgPlaceholder)
ax7.set_title("Change in BZD")
ax7.axes.get_xaxis().set_visible(False)


ax8 = fig.add_subplot(3,4,11)
ax8.imshow(imgBarChartLegend)
ax8.set_title("Legend")
ax8.axes.get_xaxis().set_visible(False)
ax8.axes.get_yaxis().set_visible(False)




ax9 = fig.add_subplot(3,4,12)
ax9.imshow(imgLULCLegend)
ax9.set_title("Legend")
ax9.axes.get_xaxis().set_visible(False)
ax9.axes.get_yaxis().set_visible(False)





#fig.tight_layout()

plt.show()