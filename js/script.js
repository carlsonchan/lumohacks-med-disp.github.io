$(document).ready(function() {
	function updateCurrentDosage(){
    	document.getElementById('msg').innerText = document.getElementById('dosageInput').value;
	}
    $('expand tr').each(function(){
        $(this).click(function(){
            $(this).siblings('tr').slideToggle(300);            
        });        
    });  
});

