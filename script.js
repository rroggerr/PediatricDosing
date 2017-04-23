
var drugnames = ["opium", "heroine","cocaine","marijuana"];

var input = document.getElementById("drug-search");
var options=[];

var states = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // `states` is an array of state names defined in "The Basics"
  local: drugnames
});


