var DOSAGEPUTURL = "https://lumohacks-med-disp.firebaseio.com/patients/jeffrey_leung/dosage.json";
var ALERTPUT = "https://lumohacks-med-disp.firebaseio.com/patients/jeffrey_leung/alert.json";

var PATIENTSURL = "https://lumohacks-med-disp.firebaseio.com/patients.json"



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
		for (i in data){
			var patientRow = $('#dummy-patient-row').clone();
			var hiddenRow = $('#dummy-hidden-row').clone();
			hiddenRow.data('patient-data',data[i]);
			patientRow.attr('href',"#".concat(i));
			patientRow.attr('aria-controls',i);
			patientRow.find('.patient-id').text(i)
			patientRow.find('.patient-name').text(data[i].name)
			patientRow.find('.patient-nMedication').text(data[i].dosage)

			hiddenRow.find('.n-dosage').text(data[i].dosage)
			hiddenRow.find('.dosageInput').val(data[i].dosage)
			hiddenRow.find('.collapse').attr("id", i);

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
});
