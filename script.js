window.onload = init();
var drugnameslist;

function init() {
	drugnameslist = ["opium", "heroine", "cocaine"];

}

// new typeahead



$("#drug-search").typeahead({
	source:drugnameslist,
	fitToElement:true
});

