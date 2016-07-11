var consoleButtons = document.querySelectorAll('.consoleCheckbox, .extraFilterButton');
var searchFieldList = document.getElementsByClassName('searchFieldContainer')[0].getElementsByTagName('ul')[0];
var searchField = document.getElementsByClassName('searchFieldContainer')[0].getElementsByTagName('input')[0];
var loginLink = document.getElementsByClassName('login')[0];
var profileLink = document.getElementsByClassName('profileContainer')[0];
var chatBubble = document.getElementsByClassName('chatBubble')[0];
var chatInputDiv = document.getElementById('chatInputDiv');

function profileFunction(){
	loginLink.classList.toggle('hidden');
	profileLink.classList.toggle('hidden');
}

for(var i = 0; i < consoleButtons.length; i++){
	consoleButtons[i].onclick = function(e) {
		var element = e.target;
		if(!element.classList.contains('consoleCheckbox') && !element.classList.contains('extraFilterButton')){
			element = element.parentElement;
		}
		element.classList.toggle('checked');
	}
};


searchField.onfocus = function(e){
	searchFieldList.classList.remove('hidden');
}

searchField.onblur = function(e){
	searchFieldList.classList.add('hidden');
}

loginLink.onclick = function(e){
	
	profileFunction();
	chatBubble.classList.remove('hidden');

}

profileLink.onclick = function(){
	
	profileFunction();
	chatBubble.classList.add('hidden');

}

chatInputDiv.onpaste = function(e) {
	e.preventDefault();
	var text = e.clipboardData.getData("text/plain");
	document.execCommand("insertHTML", false, text);
}
