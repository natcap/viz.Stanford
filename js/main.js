var btn = document.createElement("BUTTON");   // Create a <button> element
btn.innerHTML = "CLICK ME";                   // Insert text
document.body.appendChild(btn);               // Append <button> to <body>

var node = document.getElementById('theDiv');

var div = document.createElement('div');
div.setAttribute('class', 'w3-third w3-container w3-margin-bottom filterDiv art webmaps');

var link = document.createElement('a');
link.setAttribute('href', 'https://arcg.is/0XGrDO');
link.setAttribute('target', '_blank');


var img = document.createElement('img');
img.setAttribute('src', 'images/nomadic.png');
img.setAttribute('alt', 'image');
img.setAttribute('style', 'width:100%');
img.setAttribute('class', 'w3-hover-opacity');

link.appendChild(img)

var text = document.createElement('div');



  /*<div class="w3-container w3-white">
        <p><b>Making Pastoralists Count</b></p>
        <p>This beautiful ArcGIS-based storymap presents Geospatial methods for the health surveillance of nomadic populations, with a very rich multi-media approach.
        <span class="light"> By Stace Maples & Hannah Binzen Wild</span>
        </p>
      </div>)*/

div.appendChild(link)
div.appendChild(text)
node.appendChild(div)
/*var newNode = document.createElement('p');
newNode.appendChild(document.createTextNode('some dynamic html'));
node.appendChild(newNode);
*/

/*<div class="w3-third w3-container w3-margin-bottom filterDiv art webmaps">
      <a href='https://arcg.is/0XGrDO' target='_blank'>
      <img src="images/nomadic.png"
      alt="Image" style="width:100%" class="w3-hover-opacity">
      </a>
      <div class="w3-container w3-white">
        <p><b>Making Pastoralists Count</b></p>
        <p>This beautiful ArcGIS-based storymap presents Geospatial methods for the health surveillance of nomadic populations, with a very rich multi-media approach.
        <span class="light"> By Stace Maples & Hannah Binzen Wild</span>
        </p>
      </div>
</div>*/