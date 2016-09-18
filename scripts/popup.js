$(document).ready(function(){
    $("#loading").show();
    $("#content").hide();
    $("#configError").hide();
    var storage = chrome.storage.sync;

    storage.get(["mysmartfren"], function(items){
        if(items.mysmartfren){
            var data = items.mysmartfren;
            $("#imsi").val(data.imsi);
            $("#token").val(data.token);
            $("#smartfren").submit();
        }
        else{
            $("#configError").show();
            $("#loading").hide();
        }
    });

    $("#smartfren").submit( function () {    
        $.post(
            'https://my.smartfren.com/api/device/profile.php',
            $(this).serialize(),
            function(data){
                if(data.indexOf('Token not JSON Valid') < 0){
                    var $result = $(data).find('div > center > table');

                    $("#packageInfo").html($result[0].innerHTML);

                    $("#mainQuota").html($result[1].innerHTML);
                    //remove button, to prevent user click stop package
                    $("#mainQuota tr").eq(2).remove();

                    $("#bonus").html($result[2].innerHTML);
                    $("#loading").hide();
                    $("#content").show();
                }
                else{
                    $("#loading").hide();
                    $("#content").hide();
                    $("#configError").show();
                }
            }
        )
        .fail(function(){
            $("#configError").show();
            $("#loading").hide();
        });
        return false;   
    });
});