$(document).ready(function(){
	var storage = chrome.storage.sync;
	var data;
	var action = 'add';
	var index;

	$("#saveButton").hide();
	$("#removeButton").hide();
	$("#addButton").show();

	storage.get(["mysmartfren"], function(items){
		if(items.mysmartfren){
			data = items.mysmartfren;
		    $.each(data, function (i, data) {
			    $('#configurationList').append($('<option>', { 
			        value: i,
			        text : data.title 
			    }));
			});
		}
	});

	$("#configurationList").change(function(){
		if(this.value === ""){
			$("#title").val('');
			$("#imsi").val('');
			$("#token").val('');
			action = 'add';
			$("#saveButton").hide();
			$("#removeButton").hide();
			$("#addButton").show();
			return false;
		}
		$("#saveButton").show();
		$("#removeButton").show();
		$("#addButton").hide();

		action = 'edit';
		index = this.value;
		var value = data[this.value];
		$("#title").val(value.title);
		$("#imsi").val(value.imsi);
		$("#token").val(value.token);
	});

	$("#saveButton").click(function(){
		var title = $("#title").val();
		var imsi = $("#imsi").val();
		var token = $("#token").val();
		if(imsi === "" || token === ""){
			$("#message").html("Please fill all fields.");
		}
		else{
			var params = {
				'title' : $("#title").val(),
				'imsi' : $("#imsi").val(),
				'token' : $("#token").val(),
			}
			storage.set({'mysmartfren': [params]}, function() {
				$("#message").html("Success save your configuration.");
			});
		}
	});
});