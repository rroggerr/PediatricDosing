
var PNames=[];
var Ingredients =[];
var pnames, ings; //Bloodhound for prod_names, ingredients
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
    	document.getElementById("error-wrapper").innerHTML='<div id="error"></div>';
    }
})

function processData(p_json){
	for (var i = 1; i < p_json.length; i++){
		var tmp = p_json[i].PName;
		var tmp_ing = p_json[i].Ingredients;
	    PNames.push(tmp);
	    Ingredients.push(tmp_ing);
	}
}

// Initialize to be called

function init_TA(){
	// Bloodhound Autosuggest engine config

	pnames = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.whitespace,
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  local: PNames
	});

	ings = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.whitespace,
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  local: Ingredients
	});

	$('.typeahead').typeahead({
			  hint: false,
			  highlight: true,
			  minLength: 1
			},
			{
			  name: 'pnames',
			  source: pnames,
			  templates: {
						    header: '<h5 class="hname">&nbsp;&nbsp;Product Names: </h5>'
						  }
			},
			{
			  name: 'ings',
			  source: ings,
			  templates: {
						    header: '<h5 class="hname">&nbsp;&nbsp;Ingredients: </h5>'
						  }
			}
			);
	document.getElementById("drug-search").placeholder="Type in drug name";
	pdselect();
}

function clicksearch(){
	var textval = $(".typeahead").typeahead("val");
	// Make sure not empty
	if (textval ===""){
	}
	else {
		var dosagebox =document.getElementById("selected-drug-dosage");
		for (var i = 0; i < parsed_json.length; i++) {
			if (parsed_json[i].PName === textval || parsed_json[i].Ingredients === textval){
				document.getElementById("drug-brand").innerHTML=parsed_json[i].Brand;
				document.getElementById("drug-pname").innerHTML=parsed_json[i].PName;
				document.getElementById("drug-gname").innerHTML=parsed_json[i].Ingredients;
				var altdose = parsed_json[i].AltDosage;
				// Altdose --> DosageChild
				if (altdose==""){
					dosagebox.innerHTML = parsed_json[i].DosageChildren;
				}
				else {
					dosagebox.innerHTML = altdose;
				}
				break;
			}
		}
	}

	
}

function pdselect(){
	var pdbtn =document.getElementById("PDselector");
	var ivbtn =document.getElementById("IVselector");
	pdbtn.classList.add("active");
	ivbtn.classList.remove("active");
	//document.getElementById("titletext").innerHTML="Pediatric Dosing";
}


function ivselect(){
	var pdbtn =document.getElementById("PDselector");
	var ivbtn =document.getElementById("IVselector");
	ivbtn.classList.add("active");
	pdbtn.classList.remove("active");
	//document.getElementById("titletext").innerHTML="IV Reconstitution";
}

