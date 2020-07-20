// Instance the tour
var tour = new Tour({
    steps: [
    {
        element: "#selectedTab",
        title: "Welcome - You are here",
        content: "Welcome to the IPBES data viewer, in this tab you can see where people are most at risk today",
        placement: "bottom"
    },
    {
        element: "#futureTab",
        title: "Investigate data by country ",
        content: "See in which countries people are most at risk",
        placement: "bottom"
    },
    {
        element: "#servicesTab",
        title: "High resolution data",
        content: "Investigate the high resolution data for each ecosystem service",
        placement: "bottom"
    },
    {
        element: "#aboutTab",
        title: "About",
        content: "Learn more about the visualization and its contributors ",
        placement: "bottom"
    },
    {
        element: "#ecosystemServices",
        title: "Ecosystem services",
        content: "Here you can choose which ecosystem service you want to visualize"
    },
    {
        element: "#infoButton",
        title: "Information button",
        content: "Here you find more information about what is displayed on the map. Here you also find a link back to this guide.",
        placement: "left",
    },

      
  ]});
  
  
  
  // Start the tour
 