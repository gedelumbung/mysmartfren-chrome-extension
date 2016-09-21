$(document).ready(function(){
    $("#loading").show();
    $("#content").hide();
    $("#configError").hide();
    var storage = chrome.storage.sync;
    var data;
    var index;

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
                    if(value.default === 'true'){
                        $("#imsi").val(value.imsi);
                        $("#token").val(value.token);
                        $("#smartfren").submit();
                    }

                    $('#configurationList').append($('<option>', { 
                        value: i,
                        text : value.title 
                    }));
                });
            }
            else{
                $("#configError").show();
                $("#loading").hide();
            }
        });
    }

    $("#smartfren").submit(function(){
        $("#configError").hide();
        $("#content").hide();
        $("#loading").show();
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

    $("#configurationList").change(function(){
        if(this.value === ""){
            return false;
        }

        index = this.value;
        var value = data[this.value];
        $("#imsi").val(value.imsi);
        $("#token").val(value.token);
        $("#smartfren").submit();
    });

    load();
});