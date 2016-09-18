var dosagePutURL = "https://lumohacks-med-disp.firebaseio.com/patients/jeffrey_leung/dosage.json";
// var xhr = new XMLHttpRequest();
// xhr.open("PUT", url, true);
// xhr.send(22);

var alertPut = "https://lumohacks-med-disp.firebaseio.com/patients/jeffrey_leung/alert.json";
// var xhr = new XMLHttpRequest();
// xhr.open("PUT", url, true);
// xhr.send(true);



$(document).ready(function() {
	function updateCurrentDosage(){
    	document.getElementById('msg').innerText = document.getElementById('dosageInput').value;
	}
	$('#dosageInput').click(function(){
		updateCurrentDosage();
	})

	$('.dosageDispense').click(function(){
		$.put({
			url: dosagePutURL,
			data: $('#dosageInput').value
		}).done(function(data){
			$.put({
				url: alertPut,
				data: "true"
			}).done(function(data){
				console.log('Dosage Dispended');
			})
		})
	})
    $('expand tr').each(function(){
        $(this).click(function(){
            $(this).siblings('tr').slideToggle(300);
        });
    });
});
