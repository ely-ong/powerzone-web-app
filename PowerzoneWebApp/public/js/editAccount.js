$(document).ready(function() {

    var og_username = $('#input_editAccntUsername').val();

    // adjusts style to highlight username field and display error message
    function invalid_username(){

        //highlights username field line with red
        $('#input_editAccntUsername').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntUsername').text('Username must be at least 6 characters.');
        $('#errorAddAccntUsername').css('color', 'var(--errorRed)');
    }

    // adjusts style to highlight username field and display error message */
    function existing_username(){

        //highlights username field line with red
        $('#input_addAccntUsername').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntUsername').text('Username already taken');
        $('#errorAddAccntUsername').css('color', 'var(--errorRed)');
    }

    // adjusts style to remove highlight of username field and remove error message
    function valid_username(){

        //resets username field line to white
        $('#input_editAccntUsername').css('border-color', 'white');

        //removes error message
        // $('#errorUsername').css('color', 'transparent');
        $('#errorAddAccntUsername').text('');
    }

    // adjusts style to highlight password field and display error message 
    function invalid_password(){

        //highlights password field line with red
        $('#input_editAccntPsword').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntPsword').text('Password must be at least 6 characters.');
        $('#errorAddAccntPsword').css('color', 'var(--errorRed)');
    }

    // adjusts style to remove highlight of password field and remove error message 
    function valid_password(){

        //resets password field line to white
        $('#input_editAccntPsword').css('border-color', 'white');

        //removes error message
        // $('#errorPsword').css('color', 'transparent');
        $('#errorAddAccntPsword').text('');
    }

    // adjusts style to highlight password confirm field and display error message 
    function invalid_confirm(){

        //highlights password confirm field line with red
        $('#input_editAccntConfirm').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntConfirm').text('Password must be at least 6 characters.');
        $('#errorAddAccntConfirm').css('color', 'var(--errorRed)');
    }

    // adjusts style to remove highlight of password confirm field and remove error message
    function valid_confirm(){

        //resets password confirm field line to white
        $('#input_editAccntConfirm').css('border-color', 'white');

        //removes error message
        $('#errorAddAccntConfirm').text('');
    }

    // adjusts style to highlight password confirm field and add error message
    function different_password(){
    	//highlights username field line with red
        $('#input_editAccntConfirm').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntConfirm').text('Password is not the same.');
        $('#errorAddAccntConfirm').css('color', 'var(--errorRed)');
    }

    // checks if password and password confirm fields are equal
    function same_confirm(){
    	var password = $('#input_editAccntPsword').val();
        var confirm = $('#input_editAccntConfirm').val();

        if(password.localeCompare(confirm) == 0){
        	return true;
        }
        else{
        	return false;
        }
    }

    // adjusts style of submit button to disable it
    function disable_submit(){
    	$('#btn_editAccnt').prop('disabled', true);
        $('#btn_editAccnt').css('background-color', '#808080');
        $('#btn_editAccnt').removeClass('on_hover');
    }

    // adjust style of submit button to enable it
    function enable_submit(){
    	$('#btn_editAccnt').prop('disabled', false);
        $('#btn_editAccnt').css('background-color', '#AEDFFC');
        $('#btn_editAccnt').addClass('on_hover');
    }


    // keyup function to check if username field is valid
    $('#input_editAccntUsername').keyup(function () {
        var username_length = $('#input_editAccntUsername').val().length;
        var username = $('#input_editAccntUsername').val();
        var password_length = $('#input_editAccntPsword').val().length;
        var confirm_length = $('#input_editAccntConfirm').val().length;
        
        // checks if username has at least 6 characters
        if(username_length < 6){
            invalid_username();
            disable_submit();
        }
        else{
            valid_username();
            // checks if username exists in the database
            $.get('/checkUsername', {username: username}, function (result) {
                // takes note of current username in the database in case user reinputs their current username
                $.get('/getEditUsername', {og_username: og_username}, function(account_username) {

                    // checks if username exists in the database
                    if(result.username == username){
                        // checks if inputted new username is the same as the old username
                        if(result.username != account_username){
                            existing_username();
                            disable_submit();
                        }
                        else{
                            enable_submit();
                        }
                    }
                    else{
                        // checks if password if at least 6 letters or empty
                        if(password_length >= 6 || password_length == 0) {
                            valid_password();
                            // checks if password confirm is at least 6 letters or empty
                            if(confirm_length >= 6 || password_length == 0){
                                valid_confirm();
                                if(same_confirm()){
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
                })
            });  
        }
    });

    // keyup function to check if password field is valid
    $('#input_editAccntPsword').keyup(function () {
        var username_length = $('#input_editAccntUsername').val().length;
        var username = $('#input_editAccntUsername').val();
        var password_length = $('#input_editAccntPsword').val().length;
        var confirm_length = $('#input_editAccntConfirm').val().length;
        
        // checks if password is at least 6 characters or empty
        if(password_length < 6 || password_length == 0){
            invalid_password();
            disable_submit();
        }
        else{
            valid_password();
            // checks if username is at least 6 characters
            if (username_length >= 6) {
                // checks if password confirm is at least 6 characters
            	if(confirm_length >= 6 || password_length == 0){
            		valid_confirm();
            		if(same_confirm()){
            			$.get('/checkUsername', {username: username}, function (result) {
                            $.get('/getEditUsername', {og_username: og_username}, function(account_username) {
                                if(result.username == username){
                                    if(result.username != account_username){
                                        disable_submit();
                                    }
                                    else{
                                        enable_submit();
                                    }
                                }
                                else{
                                    enable_submit();
                                }
                            })
                        });
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

        // checks if password confirm field and password field is empty
        if(confirm_length == 0 && password_length == 0){
            // checks if username exists in the database
            $.get('/checkUsername', {username: username}, function (result) {
                // checks if inputted username is the same as the current username in the database
                $.get('/getEditUsername', {og_username: og_username}, function(account_username) {
                    if(result.username == username){
                        if(result.username != account_username){
                            disable_submit();
                        }
                        else{
                            enable_submit();
                            valid_password();
                            valid_confirm();
                        }
                    }
                    else{
                        enable_submit();
                        valid_password();
                        valid_confirm();
                    }
                })
            });
        }
    });

    // keyup function to check if password confirm is valid
    $('#input_editAccntConfirm').keyup(function () {
        var username_length = $('#input_editAccntUsername').val().length;
        var username = $('#input_editAccntUsername').val();
        var password_length = $('#input_editAccntPsword').val().length;
        var confirm_length = $('#input_editAccntConfirm').val().length;
        
        // checks if password confirm is at least 6 characters
        if(confirm_length < 6){
            invalid_confirm();
            disable_submit();
        }
        else{
            valid_confirm();

            // checks if password is at least 6 characters or empty
            if (password_length >= 6 || password_length == 0) {
            	valid_password();
                // checks if username is at least 6 characters
            	if(username_length >= 6){
            		if(same_confirm()){
                        // checks if username exists in the database
                        $.get('/checkUsername', {username: username}, function (result) {
                            // checks if inputted username is the same as the current username
                            $.get('/getEditUsername', {og_username: og_username}, function(account_username) {
                                if(result.username == username){
                                    if(result.username != account_username){
                                        disable_submit();
                                    }
                                    else{
                                        enable_submit();
                                    }
                                }
                                else{
                                    enable_submit();
                                }
                            })
                        });
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

        // checks if password and password confirm is emptyy
        if(confirm_length == 0 && password_length == 0){
            // checks if username exists in the database
            $.get('/checkUsername', {username: username}, function (result) {
                // checks if inputted username is the current username
                $.get('/getEditUsername', {og_username: og_username}, function(account_username) {
                    if(result.username == username){
                        if(result.username != account_username){
                            disable_submit();
                        }
                        else{
                            enable_submit();
                            valid_password();
                            valid_confirm();
                        }
                    }
                    else{
                        enable_submit();
                        valid_password();
                        valid_confirm();
                    }
                })
            });
        }
    });

    // goes back to the previous page upon clicking cancel
    $('#btn_editAccntCancel').click(function(){
        window.history.back();
    });
      
})