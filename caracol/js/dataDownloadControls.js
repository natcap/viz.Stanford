

//Data Download Toggle
      $(document).ready(function(){
         $("#dataDownloadButton").click(function(){
            $("a.dataLinkClose").toggleClass("dataLink");
         });
      });


//Data Download Button Change
	$(document).ready(function(){
		$("#dataDownloadButton").click(function(){
			$("#dataDownloadButton").toggleClass("buttonPressed");
		});
	});

// function dataDownloadAlert() {
// 	alert("The dataset links are preliminary. Please contact Adrian Vogl, Project Lead (avogl@stanford.edu), for access to the data used in this study.");
// }
