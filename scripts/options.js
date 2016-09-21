$(document).ready(function(){
	var storage = chrome.storage.sync;
	var data;
	var action = 'add';
	var index;

	$("#saveButton").hide();
	$("#removeButton").hide();
	$("#addButton").show();

	load();

	function load(){
		storage.get(["mysmartfren"], function(items){
			if(items.mysmartfren){
				data = items.mysmartfren;
				$('#configurationList').html('');
				$('#configurationList').append($('<option>', { 
			        value: '',
			        text : '- Select Configuration -'
			    }));

			    $.each(data, function (i, value) {
				    $('#configurationList').append($('<option>', { 
				        value: i,
				        text : value.title 
				    }));
				});
			}
		});
	}

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
		$("#default").val(value.default);
	});

	$("#addButton").click(saveData('add'));
	$("#saveButton").click(saveData('edit'));

	function saveData(action){
		return function(){
			var title = $("#title").val();
			var imsi = $("#imsi").val();
			var token = $("#token").val();
			if(title === "" || imsi === "" || token === ""){
				$("#message").html("Please fill all fields.");
			}
			else{
				if(action === 'add'){
					var params = {
						'title' : $("#title").val(),
						'imsi' : $("#imsi").val(),
						'token' : $("#token").val(),
						'default' : $("#default").val(),
					};
					data.push(params);
				}
				else if(action === 'edit'){
					data[index] = {
						'title' : $("#title").val(),
						'imsi' : $("#imsi").val(),
						'token' : $("#token").val(),
						'default' : $("#default").val(),
					};
				}

				storage.set({'mysmartfren': data}, function() {
					$("#message").html("Success save your configuration.");
					load();
					reset();
				});
			}
		}
	}

	$("#removeButton").click(function(){
		data.splice(index, 1);
		storage.set({'mysmartfren': data}, function() {
			$("#message").html("Success delete your configuration.");
			load();
			reset();
		});
	});

	function reset(){
		$("#title").val('');
		$("#imsi").val('');
		$("#token").val('');
		$("#default").val('false');

		$("#saveButton").hide();
		$("#removeButton").hide();
		$("#addButton").show();
		action = 'add';
	}
});