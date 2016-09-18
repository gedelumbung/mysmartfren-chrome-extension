$(document).ready(function(){
	var storage = chrome.storage.sync;

	storage.get(["mysmartfren"], function(items){
		if(items.mysmartfren){
			var data = items.mysmartfren;
			$("#imsi").val(data.imsi);
			$("#token").val(data.token);
		}
	});

	$("#button").click(function(){
		var imsi = $("#imsi").val();
		var token = $("#token").val();
		if(imsi === "" || token === ""){
			$("#message").html("Please fill all fields.");
		}
		else{
			var params = {
				'imsi' : $("#imsi").val(),
				'token' : $("#token").val(),
			}
			storage.set({'mysmartfren': params}, function() {
				$("#message").html("Success save your configuration.");
			});
		}
	});
});