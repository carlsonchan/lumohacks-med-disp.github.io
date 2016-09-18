var DOSAGEPUTURL = "https://lumohacks-med-disp.firebaseio.com/patients/jeffrey_leung/dosage.json";
var ALERTPUT = "https://lumohacks-med-disp.firebaseio.com/patients/jeffrey_leung/alert.json";

var PATIENTSURL = "https://lumohacks-med-disp.firebaseio.com/patients.json"



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
	$.get({
		url: PATIENTSURL
	}).done(function (data) {
		console.log("Data: ", data);
		var patientRow = $('#dummy-patient-row').clone();
		var hiddenRow = $('#dummy-hidden-row').clone();

		for (i in data){

			hiddenRow.data('patient-data',data[i]);
			var patientRow = $('#dummy-patient-row').clone();
			var hiddenRow = $('#dummy-hidden-row').clone();
			patientRow.attr('href',"#".concat(i));
			patientRow.attr('aria-controls',i);
			patientRow.find('.patient-id').text(i)
			patientRow.find('.patient-name').text(data[i].name)
			patientRow.find('.patient-nMedication').text(data[i].dosage)

			var correspondingCollapse = hiddenRow.find('.collapse');
			correspondingCollapse.attr("id", i);

			patientRow.attr('id',"");
			hiddenRow.attr('id',"");
			$('#patient_data > tbody').append(patientRow)
			$('#patient_data > tbody').append(hiddenRow)

		}

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
});
