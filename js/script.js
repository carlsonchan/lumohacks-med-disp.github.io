var DOSAGEPUTURL = "https://lumohacks-med-disp.firebaseio.com/patients/197214/dosage.json";
var ALERTPUT = "https://lumohacks-med-disp.firebaseio.com/patients/197214/alert.json";

var PATIENTSURL = "https://lumohacks-med-disp.firebaseio.com/patients.json"
var NEXTDISPENSEURL = "https://lumohacks-med-disp.firebaseio.com/patients/197214/nextDispense.json"



$(document).ready(function() {
  $('expand tr').each(function(){
      $(this).click(function(){
          $(this).siblings('tr').slideToggle(300);
      });
  });
	$.get({
		url: PATIENTSURL
	}).done(function (data) {
		console.log("Data: ", data);
	 	var js = 1
		for (i in data){
			console.log("js: " + js)
			console.log("js%2: " + js%2)
			console.log("js%2===0: " , (js%2)===0)
			// if(js%2===0){
				// var patientRow = $('#dummy-patient-row2').clone();
			// }else{
				var patientRow = $('#dummy-patient-row').clone();
			// }
			js++
			var hiddenRow = $('#dummy-hidden-row').clone();
			hiddenRow.data('patient-data',data[i]);
			patientRow.attr('href',"#".concat(i));
			patientRow.attr('aria-controls',i);
			patientRow.find('.patient-id').text(i)
			patientRow.find('.patient-name').text(data[i].name)
			patientRow.find('.patient-nMedication').text(data[i].dosage)
			if(js%2===1){
				patientRow.css('background-color','#FFFFFF')

			}

			hiddenRow.find('.n-dosage').text(data[i].dosage)
			hiddenRow.find('.dosageInput').val(data[i].dosage)
			hiddenRow.find('.collapse').attr("id", i);
			var nextDosageSecs = Math.round(data[i].nextDispense - (Date.now()/1000));
			hiddenRow.find('.next-dosage').text(nextDosageSecs < 0 ? 0 : nextDosageSecs);

			patientRow.attr('id',"");
			hiddenRow.attr('id',"");
			$('#patient_data > tbody').append(patientRow)
			$('#patient_data > tbody').append(hiddenRow)

		}
		// Input onchange
		$('.dosageInput').change( function(e){
			e.preventDefault();
			$(this).parents('.patient-subdata').find('.n-dosage').text($(this).val())
			// $('msg').innerText = document.getElementById('dosageInput').value;
		})
		// Done appending; attach click functions
		$('.dosageDispense').on('click', function(e){
			e.preventDefault();
			$.ajax({
				method: "PUT",
				url: DOSAGEPUTURL,
				data: $(this).prevAll('input').val()
			}).done(function(data){
				$.ajax({
					method: "PUT",
					url: ALERTPUT,
					data: "true"
				}).done(function(data){
					alert("Dosage Dispensed");
				})
			})
		})

	})
	$.get({
		url:NEXTDISPENSEURL
	}).done(function(data){
		console.log("Dispense Data: ", data);
		console.log("Current time ", Date.now());
		var timeDifference = (Date.now()/1000) - data;
		// Next dispense time
		console.log("Time difference ", timeDifference);


	})
});
