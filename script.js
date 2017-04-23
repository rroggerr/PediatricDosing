var drugnameslist;

function init() {
	drugnameslist = ["opium", "heroine", "cocaine", "marijuana"];
	}


$("#drug-search").typeahead({
	source:drugnameslist,
	fitToElement:true
	});
