/*instead of toggle show/hide, 
make it so the div slides down into display:none 
to maximize screen space
*/

$(document).ready(function(){
    $("#mymanualswitch").click(function(){
        $(".manual-control").toggle();
    });

});
