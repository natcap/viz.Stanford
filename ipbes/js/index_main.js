whenDocumentLoaded(() => {
  addMenu(5);
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