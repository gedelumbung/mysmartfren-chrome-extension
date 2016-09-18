$(document).ready(function(){
    $("#loading").show();
    $("#content").hide();
    $("#smartfren").submit( function () {    
        $.post(
            'https://my.smartfren.com/api/device/profile.php',
            $(this).serialize(),
            function(data){
                var $result = $(data).find('div > center > table');

                $("#packageInfo").html($result[0].innerHTML);

                $("#mainQuota").html($result[1].innerHTML);
                //remove button, to prevent user click
                $("#mainQuota tr").eq(2).remove();

                $("#bonus").html($result[2].innerHTML);
                $("#loading").hide();
                $("#content").show();
            }
        );
        return false;   
    });
    $("#smartfren").submit();
});