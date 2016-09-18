
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
		var params = {
			'imsi' : $("#imsi").val(),
			'token' : $("#token").val(),
		}
	    storage.set({'mysmartfren': params}, function() {
	      console.log('Settings saved');
	    });

	});
});