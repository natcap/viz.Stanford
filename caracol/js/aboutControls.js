   
   //Layer Checks

   function aboutPanelCheck(){
      aboutCheck = document.getElementById("AboutPanel");
      if (aboutCheck.className == "AboutPanel"){
         aboutCheck.className = "close";
      }
   }
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

   //About Panel
    function aboutPanelClose(){
      x = document.getElementById("AboutPanel");
      x.className="close";
      y=document.getElementById("aboutPanelButton");
      y.className="button";
   }

   function aboutPanelOpen(){
         LULC1Check();
         LULC2Check();
         LULC3Check();
      x = document.getElementById("AboutPanel");
      x.className="AboutPanel";
      y = document.getElementById("aboutPanelButton");
      y.className="buttonPressed";
   }

document.getElementById("aboutPanelButton").addEventListener("click", function(){ 
   x = document.getElementById("AboutPanel");
   if (x.className == "AboutPanel"){
      aboutPanelClose(); 
   }else{
      aboutPanelOpen();
   }
});

function restartTutorialAbout(){
   aboutPanelCheck();
   y=document.getElementById("aboutPanelButton");
   y.className="button";
   x = document.getElementById("introPanel1");
   x.className = "introPanel";
   z = document.getElementById("tutorialArrow1");
   z.className = "tutorialArrow";
}


