$(document).ready(function() {

    // adjusts style to highlight username field and display error message
    function invalid_username(){

        // highlights username field line with red
        $('#input_addAccntUsername').css('border-color', 'var(--errorRed)');

        // displays error message
        $('#errorAddAccntUsername').text('Username must be at least 6 characters.');
        $('#errorAddAccntUsername').css('color', 'var(--errorRed)');
    }

    // adjusts style to highlight username field and display error message
    function existing_username(){

        // highlights username field line with red
        $('#input_addAccntUsername').css('border-color', 'var(--errorRed)');

        // displays error message
        $('#errorAddAccntUsername').text('Username already taken');
        $('#errorAddAccntUsername').css('color', 'var(--errorRed)');
    }

    // adjusts style to remove highlight of username field and remove error message
    function valid_username(){

        // resets username field line to white
        $('#input_addAccntUsername').css('border-color', 'white');

        // removes error message
        $('#errorAddAccntUsername').text('');
    }

    // adjusts style to highlight password field and display error message
    function invalid_password(){

        // highlights password field line with red
        $('#input_addAccntPsword').css('border-color', 'var(--errorRed)');

        // displays error message
        $('#errorAddAccntPsword').text('Password must be at least 6 characters.');
        $('#errorAddAccntPsword').css('color', 'var(--errorRed)');
    }

    // adjusts style to remove highlight of password field and remove error message
    function valid_password(){

        // resets password field line to white
        $('#input_addAccntPsword').css('border-color', 'white');

        // removes error message
        $('#errorAddAccntPsword').text('');
    }

    // adjusts style to highlight password confirm field and display error message
    function invalid_confirm(){

        // highlights password confirm field line with red
        $('#input_addAccntConfirm').css('border-color', 'var(--errorRed)');

        // displays error message
        $('#errorAddAccntConfirm').text('Password must be at least 6 characters.');
        $('#errorAddAccntConfirm').css('color', 'var(--errorRed)');
    }

    // adjusts style to remove highlight of password confirm field and remove error message
    function valid_confirm(){

        // resets password confirm field line to white
        $('#input_addAccntConfirm').css('border-color', 'white');

        // removes error message
        $('#errorAddAccntConfirm').text('');
    }

    // adjusts style to remove highlight of password field and remove error message
    function different_password(){
    	// highlights password field line with red
        $('#input_addAccntConfirm').css('border-color', 'var(--errorRed)');

        // displays error message
        $('#errorAddAccntConfirm').text('Password is not the same.');
        $('#errorAddAccntConfirm').css('color', 'var(--errorRed)');
    }

    /* 
     * checks whether password and confirm password fields are the same 
     *
     * @return true if the password and confirm fields are the same, false otherwise
     */
    function same_confirm(){
    	var password = $('#input_addAccntPsword').val();
        var confirm = $('#input_addAccntConfirm').val();

        if(password == confirm){
        	return true;
        }
        else{
        	return false;
        }
    }

    // adjusts style to disable the submit button
    function disable_submit(){
    	$('#btn_addAccnt').prop('disabled', true);
        $('#btn_addAccnt').css('background-color', '#808080');
        $('#btn_addAccnt').removeClass('on_hover');
    }

    // adjusts style to enable the submit button
    function enable_submit(){
    	$('#btn_addAccnt').prop('disabled', false);
        $('#btn_addAccnt').css('background-color', '#AEDFFC');
        $('#btn_addAccnt').addClass('on_hover');
    }

    // keyup function on username field to check if current text in the field is valid or invalid
    $('#input_addAccntUsername').keyup(function () {
        var username_length = $('#input_addAccntUsername').val().length;
        var username = $('#input_addAccntUsername').val();
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        //  disables button and displays error message if username length is less than 6
        if(username_length < 6){
            invalid_username();
            disable_submit();
        }
        //  performs additional checks if requried username length is satisfied
        else{

            // checks if username exists in the database already
            $.get('/checkUsername', {username: username}, function (result) {
                if(result.username == username){
                    existing_username();
                    disable_submit();
                }
                else{
                    valid_username();
                    // checks if password field is at least 6 letters, disables submit button if not
                    if (password_length >= 6){
                        // checks if password confirm field is at least 6 letters, disables submit button if not
                        if(confirm_length >= 6){
                            if(same_confirm()){
                                enable_submit();
                            }
                            else{
                                disable_submit();
                            }
                        }
                        else{
                            disable_submit();
                        }
                    }
                    else {
                        disable_submit();
                    }
                }
            });         
        }
    });

    // keyup function on password field to check if current text in the field is valid or invalid
    $('#input_addAccntPsword').keyup(function () {
        var username_length = $('#input_addAccntUsername').val().length;
        var username = $('#input_addAccntUsername').val();
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        // checks if password length is either empty or is at least 6 letters
        if(password_length < 6 || password_length == 0){
            invalid_password();
            disable_submit();
        }
        else{
            valid_password();

            // checks if confirm password has an input
        	if(confirm_length >= 1){
                // checks if password and confirm password fields are the same
        		if(same_confirm()){
                    valid_confirm();
                    // checks if username length is more than or equal to 6 letters
                    if(username_length >= 6){
                        // checks if username exists in the database
                        $.get('/checkUsername', {username: username}, function (result) {
                            if(result.username == username){
                                disable_submit();
                            }
                            else{
                                enable_submit();
                            }
                        });  
                        
                    }
        			else{
                        disable_submit();
                    }
        		}
        		else{
        			disable_submit();
                    different_password();
        		}
        	}
        	else{
        		disable_submit();
        	}
        }
    });

    // keyup function on password confirm field to check if current text in the field is valid or invalid
    $('#input_addAccntConfirm').keyup(function () {
        var username_length = $('#input_addAccntUsername').val().length;
        var username = $('#input_addAccntUsername').val();
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        // checks if password confirm is either empty or at least 6 letters
        if(confirm_length < 6 || confirm_length == 0){
            invalid_confirm();
            disable_submit();
        }
        else{
            valid_confirm();
            // checks if password and password confirms fields are equal
    		if(same_confirm()){
                // checks if username is at least 6 letters
    			if(username_length >= 6){
                    // checks if username is in the database
                    $.get('/checkUsername', {username: username}, function (result) {
                        if(result.username == username){
                            disable_submit();
                        }
                        else{
                            enable_submit();
                        }
                    });  
                    
                }
                else{
                    disable_submit();
                }
    		}
    		else{
    			disable_submit();
    			different_password();
    		}
        }
    });
      
    // function to return to the previous page after clicking cancel button  
    $('#btn_addAccntCancel').click(function(){
        window.history.back();
    });
})