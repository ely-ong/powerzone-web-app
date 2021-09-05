$(document).ready(function() {

    /** adjusts style to highlight username field and display error message */
    function invalid_username(){

        //highlights username field line with red
        $('#input_addAccntUsername').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntUsername').text('Username must be at least 6 characters.');
        $('#errorAddAccntUsername').css('color', 'var(--errorRed)');
    }

    /** adjusts style to remove highlight of username field and remove error message */
    function valid_username(){

        //resets username field line to white
        $('#input_addAccntUsername').css('border-color', 'white');

        //removes error message
        // $('#errorUsername').css('color', 'transparent');
        $('#errorAddAccntUsername').text('');
    }

    /** adjusts style to highlight password field and display error message */
    function invalid_password(){

        //highlights username field line with red
        $('#input_addAccntPsword').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntPsword').text('Password must be at least 6 characters.');
        $('#errorAddAccntPsword').css('color', 'var(--errorRed)');
    }

    /** adjusts style to remove highlight of password field and remove error message */
    function valid_password(){

        //resets username field line to white
        $('#input_addAccntPsword').css('border-color', 'white');

        //removes error message
        // $('#errorPsword').css('color', 'transparent');
        $('#errorAddAccntPsword').text('');
    }

    /** adjusts style to highlight password field and display error message */
    function invalid_confirm(){

        //highlights username field line with red
        $('#input_addAccntConfirm').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntConfirm').text('Password must be at least 6 characters.');
        $('#errorAddAccntConfirm').css('color', 'var(--errorRed)');
    }

    /** adjusts style to remove highlight of password field and remove error message */
    function valid_confirm(){

        //resets username field line to white
        $('#input_addAccntConfirm').css('border-color', 'white');

        //removes error message
        // $('#errorPsword').css('color', 'transparent');
        $('#errorAddAccntConfirm').text('');
    }

    function different_password(){
    	//highlights username field line with red
        $('#input_addAccntConfirm').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntConfirm').text('Password is not the same.');
        $('#errorAddAccntConfirm').css('color', 'var(--errorRed)');
    }

    function same_confirm(){
    	var password = $('#input_addAccntPsword').val();
        var confirm = $('#input_addAccntConfirm').val();

        if(password.localeCompare(confirm) == 0){
        	return true;
        }
        else{
        	return false;
        }
    }

    function disable_submit(){
    	$('#btn_addAccnt').prop('disabled', true);
        $('#btn_addAccnt').css('background-color', '#808080');
        $('#btn_addAccnt').removeClass('on_hover');
    }

    function enable_submit(){
    	$('#btn_addAccnt').prop('disabled', false);
        $('#btn_addAccnt').css('background-color', '#AEDFFC');
        $('#btn_addAccnt').addClass('on_hover');
    }


    $('#input_addAccntUsername').keyup(function () {
        var username_length = $('#input_addAccntUsername').val().length;
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        if(username_length < 6){
            invalid_username();
            disable_submit();
        }
        else{
            valid_username();

            if (password_length >= 6 || password_length == 0) {
            	valid_password();
            	if(confirm_length >= 6 || password_length == 0){
            		valid_confirm();
            		if(same_confirm() == true){
            			enable_submit();
            		}
            		else{
            			disable_submit();
            			different_password();
            		}
            	}
            	else{
            		disable_submit();
                	invalid_confirm();
            	}
            }
            else {
                disable_submit();
                invalid_password();
            }
        }
    });

    $('#input_addAccntPsword').keyup(function () {
        var username_length = $('#input_addAccntUsername').val().length;
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        if(password_length < 6 || password_length == 0){
            invalid_password();
            disable_submit();
        }
        else{
            valid_password();
            if (username_length >= 6) {
            	valid_username();
            	if(confirm_length >= 6 || password_length == 0){
            		valid_confirm();
            		if(same_confirm() == true){
            			enable_submit();
            		}
            		else{
            			disable_submit();
            			different_password();
            		}
            	}
            	else{
            		disable_submit();
                	invalid_confirm();
            	}
            }
            else {
                disable_submit();
                invalid_username();
            }
        }
    });

    $('#input_addAccntConfirm').keyup(function () {
        var username_length = $('#input_addAccntUsername').val().length;
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        if(confirm_length < 6 || password_length == 0){
            invalid_confirm();
            disable_submit();
        }
        else{
            valid_confirm();

            if (password_length >= 6 || password_length == 0) {
            	valid_password();
            	if(username_length >= 6){
            		valid_username();
            		if(same_confirm() == true){
            			enable_submit();
            		}
            		else{
            			disable_submit();
            			different_password();
            		}
            	}
            	else{
            		disable_submit();
                	invalid_username();
            	}
            }
            else {
                disable_submit();
                invalid_password();
            }
        }
    });

    if (window.history.replaceState) {
      window.history.replaceState(null, null, "http://localhost:3000/");
    }
      
})