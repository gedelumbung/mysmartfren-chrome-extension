$(document).ready(function(){
    $("#smartfren").submit( function () {    
      $.post(
       'https://my.smartfren.com/api/device/profile.php',
        $(this).serialize(),
        function(data){
          var $result = $(data).find('div > center > table');
          console.log($result)
          $("#results").html($result[2].innerHTML)
        }
      );
      return false;   
    });
    $("#smartfren").submit();
});