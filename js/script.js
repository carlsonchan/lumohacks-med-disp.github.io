$(document).ready(function() {
	function updateCurrentDosage(){
    	document.getElementById('msg').innerText = document.getElementById('dosageInput').value;
	}
	$('#dosageInput').click(function(){

		updateCurrentDosage();
	})
    $('expand tr').each(function(){
        $(this).click(function(){
            $(this).siblings('tr').slideToggle(300);            
        });        
    });  
});

