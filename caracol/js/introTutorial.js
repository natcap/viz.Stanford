//layer checks
   function LULC1Check(){
      lulc1Check = document.getElementById("LULCPanel1");
      if (lulc1Check.className == "LULCpanel"){
         lulc1Check.className="close";
      }
   }
   function LULC2Check(){
      lulc2Check = document.getElementById("LULCPanel2");
      if (lulc2Check.className == "LULCpanel"){
         lulc2Check.className="close";
      }
   }
   function LULC3Check(){
      lulc3Check = document.getElementById("LULCPanel3");
      if (lulc3Check.className == "LULCpanel"){
         lulc3Check.className="close";
      }
   }
   function aboutPanelCheck(){
      aboutCheck = document.getElementById("AboutPanel");
      if (aboutCheck.className == "AboutPanel"){
         aboutCheck.className = "close";
      }
   }

//introTutorial Functions
// document.getElementById("aboutTutorialButton").addEventListener("click", function(){
// 	x = document.getElementById("introPanel1");
// 	x.className = "introPanel";
// });

document.getElementById("skipTutorialButton").addEventListener("click", function(){
  x = document.getElementById("introPanel1");
  x.className = "close";
  y = document.getElementById("tutorialArrow1");
  y.className = "close";
});

document.getElementById("next1Button").addEventListener("click", function(){
	x = document.getElementById("introPanel1");
	x.className = "close";
  z = document.getElementById("tutorialArrow1");
  z.className = "close";
	y = document.getElementById("introPanel2");
	y.className = "introPanel";
  w = document.getElementById("aboutPanelButton");
  w.className = "tutorialBorder";
  a = document.getElementById("LULCScenarioButton");
  a.className = "tutorialBorder";
  b = document.getElementById("dataDownloadButton");
  b.className = "tutorialBorder";
});

document.getElementById("close2TutorialButton").addEventListener("click", function(){
  x = document.getElementById("introPanel2");
  x.className = "close";
  w = document.getElementById("aboutPanelButton");
  w.className = "button";
  a = document.getElementById("LULCScenarioButton");
  a.className = "button";
  b = document.getElementById("dataDownloadButton");
  b.className = "button";
});

// document.getElementById("next2Button").addEventListener("click", function(){
// 	x = document.getElementById("introPanel2");
// 	x.className = "close";
// 	y = document.getElementById("introPanel3");
// 	y.className = "introPanel";
//   w = document.getElementById("aboutPanelButton");
//   w.className = "button";
//   a = document.getElementById("LULCScenarioButton");
//   a.className = "tutorialBorder";
// });

document.getElementById("prev2Button").addEventListener("click", function(){
	x = document.getElementById("introPanel2");
	x.className = "close";
  z = document.getElementById("tutorialArrow1");
  z.className = "tutorialArrow";
	y = document.getElementById("introPanel1");
	y.className = "introPanel";
  w = document.getElementById("aboutPanelButton");
  w.className = "button";
  a = document.getElementById("LULCScenarioButton");
  a.className = "button";
  b = document.getElementById("dataDownloadButton");
  b.className = "button";
});

// document.getElementById("prev3Button").addEventListener("click", function(){
// 	x = document.getElementById("introPanel3");
// 	x.className = "close";
// 	y = document.getElementById("introPanel2");
// 	y.className = "introPanel";
//   w = document.getElementById("aboutPanelButton");
//   w.className = "tutorialBorder";
//   a = document.getElementById("LULCScenarioButton");
//   a.className = "button";
// });

document.getElementById("finishTutorialButton").addEventListener("click", function(){
  x = document.getElementById("introPanel3");
  x.className = "close";
  a = document.getElementById("LULCScenarioButton");
  a.className = "button";
  c = document.getElementById("aboutPanelButton");
  c.className = "button";
  b = document.getElementById("dataDownloadButton");
  b.className = "button";
});

document.getElementById("next2Button").addEventListener("click", function(){
  x = document.getElementById("introPanel2");
  x.className = "close";
  a = document.getElementById("LULCScenarioButton");
  a.className = "button";
  c = document.getElementById("aboutPanelButton");
  c.className = "button";
  b = document.getElementById("dataDownloadButton");
  b.className = "button";
});