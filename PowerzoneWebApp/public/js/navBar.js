$(document).ready(function() {

	// function to obtain the role of the current user logged in
    $.get('/getAccountRole', function(result){
  		// checks if user is not authorized to edit accounts
        if(result == "Depot Supervisor" || result == "Depot Cashier" || result == "Regular User"){
           $('#dropdown_accounts').hide();
        }

        // checks if user is the administrator, who cannot edit their own account
        if(result == "Administrator"){
        	$('#dropdown_edit').hide();
        }
    })  
})