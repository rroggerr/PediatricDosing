window.onload = init();
var drugnames;

function init() {
	drugnames = ["opium", "heroine"];

	$("#drug-search").autocomplete({
    	source: drugnames
    });
    
}

