$(document).ready(function() {

    $.get('/getAccountRole', function(result){

        console.log("ROLE = " + result);

        if(result == "Depot Supervisor" || result == "Depot Cashier" || result == "Regular User"){
           $('#dropdown_accounts').hide();
        }
    })  
})