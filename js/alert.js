<!DOCTYPE html>
<html>
<body>

<div id="id01"></div>

<script>
var url = "https://lumohacks-med-disp.firebaseio.com/patients/jeffrey_leung/alert.json";
var xhr = new XMLHttpRequest();
xhr.open("PUT", url, true);


xhr.send(true);
</script>

</body>
</html>