
var drugnames = ["Opium", "Heroine","Cocaine","Marijuana", "Acid"];
var csv_readin;
var parsed_json;

// Load in CSV into JSON Object Here

Papa.parse("http://rawgit.com/rroggerr/PharmaRef/master/PD.csv", {
	download: true,
	header: true,
	complete: function(results) {
        parsed_json = results.data;
        console.log("parsed");
      }
})

var input = document.getElementById("drug-search");
var options=[];

var states = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // `states` is an array of state names defined in "The Basics"
  local: drugnames
});

function clicksearch(){
	var textval = $(".typeahead").typeahead("val");
	document.getElementById("selected-drug-name").innerHTML=textval;
}

function pdselect(){
	var pdbtn =document.getElementById("PDselector");
	var ivbtn =document.getElementById("IVselector");
	pdbtn.classList.add("active");
	ivbtn.classList.remove("active");
	document.getElementById("titletext").innerHTML="Pediatric Dosing";
}


function ivselect(){
	var pdbtn =document.getElementById("PDselector");
	var ivbtn =document.getElementById("IVselector");
	ivbtn.classList.add("active");
	pdbtn.classList.remove("active");
	document.getElementById("titletext").innerHTML="IV Reconstitution";
}

