window.onload = init();
var drugnames;

function init() {
	drugnames = ["opium", "heroine"];

	function() {$("#drug-search").autocomplete({
    	source: drugnames
    })}
    
}

