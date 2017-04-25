
var input = document.getElementById("drug-search");
var PNames=[];
var states;
var unparsed;
var parsed_json;

// Load in CSV into JSON Object Here

Papa.parse("https://rawgit.com/rroggerr/PharmaRef/master/PD.csv", {
	download: true,
	header: true,
	complete: function(results) {
        parsed_json = results.data;
        console.log("parsed");
        processData(parsed_json);
        init_TA();
      },
    error: function() {
    	console.log("Papaparse Error");
    }

})

function processData(p_json){
	for (var i = 1; i < p_json.length; i++){
		var tmp = p_json[i].PName;
	    PNames.push(tmp);
	}
}

function init_TA(){
	// Bloodhound Autosuggest engine config

	states = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.whitespace,
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  // `states` is an array of state names defined in "The Basics"
	  local: PNames
	});

	$('.typeahead').typeahead({
			  hint: false,
			  highlight: true,
			  minLength: 1
			},
			{
			  name: 'states',
			  source: states
			});
	document.getElementById("drug-search").placeholder="Type in drug name";
}






function clicksearch(){
	var textval = $(".typeahead").typeahead("val");
	document.getElementById("selected-drug-name").innerHTML=textval;
	var dosagebox =document.getElementById("selected-drug-dosage");
	for (var i = 0; i < parsed_json.length; i++) {
		if (parsed_json[i].PName === textval){
			var altdose = parsed_json[i].AltDosage;
			if (altdose==""){
				dosagebox.innerHTML = parsed_json[i].DosageChildren;
			}
			else {
				dosagebox.innerHTML = altdose;
			}
			break;
		}
	};

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

