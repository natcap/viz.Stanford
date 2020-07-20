   
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


   //LULC Panel
   function LULCPanelClose1(){ //can probably do a get element by class for all panels for this later
      x = document.getElementById("LULCPanel1");
      x.className="LULCclose";
   }

   function LULCPanelClose2(){
      x = document.getElementById("LULCPanel2");
      x.className="LULCclose";
   }

   function LULCPanelClose3(){
      x = document.getElementById("LULCPanel3");
      x.className="LULCclose";
   }

   function LULCPanelClose(){
      LULCPanelClose1();
      LULCPanelClose2();
      LULCPanelClose3();
      w=document.getElementById("LULCScenarioButton");
      w.className="button";
   }

   

   function LULCPanelOpen(){
      aboutPanelCheck();
         x =document.getElementById("LULCPanel1");
         x.className="LULCpanel";
         //y =document.getElementById("LULCPanel2");
         //y.className="LULCpanel";
         z =document.getElementById("LULCPanel3");
         z.className="LULCpanel";
         w=document.getElementById("LULCScenarioButton");
         w.className="buttonPressed";
   }

   function expandFigureOpen(){
      y = document.getElementById("LULCPanel2");
      y.className="LULCPanel";
   }

function downloadFigure(){
   window.open('data/dataInfoDocuments/renewablesOnePager.pdf');
}


document.getElementById("LULCScenarioButton").addEventListener("click", function(){ 
   x = document.getElementById("LULCPanel1");
   if (x.className == "LULCpanel"){
      LULCPanelClose(); 
   }else{
      LULCPanelOpen();
   }
});

document.getElementById("expandFigureButton").addEventListener("click", function(){
  x = document.getElementById("LULCPanel2");
  x.className = "LULCPanel";
});

document.getElementById('downloadFigureButton').addEventListener("click", function(){
   window.open('scripts/staticFigureBelize.png');
});






