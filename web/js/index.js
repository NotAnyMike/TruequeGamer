var consoleButtons = document.querySelectorAll('.consoleCheckbox, .extraFilterButton');

for(var i = 0; i < consoleButtons.length; i++){
	consoleButtons[i].onclick = function(e) {
		var element = e.target;
		if(!element.classList.contains('consoleCheckbox') && !element.classList.contains('extraFilterButton')){
			element = element.parentElement;
		}
		element.classList.toggle('checked');
	}
};
