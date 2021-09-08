$(document).ready(function() {

    /** adjusts style to highlight username field and display error message */
    function invalid_username(){

        //highlights username field line with red
        $('#input_addAccntUsername').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntUsername').text('Username must be at least 6 characters.');
        $('#errorAddAccntUsername').css('color', 'var(--errorRed)');
    }

    /** adjusts style to highlight username field and display error message */
    function existing_username(){

        //highlights username field line with red
        $('#input_addAccntUsername').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorAddAccntUsername').text('Username already taken');
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

        if(password == confirm){
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
        var username = $('#input_addAccntUsername').val();
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        //  disables button if username length is less than 6
        if(username_length < 6){
            invalid_username();
            disable_submit();
        }
        //  performs additional checks if requried username length is satisfied
        else{
            $.get('/checkUsername', {username: username}, function (result) {
                if(result.username == username){
                    existing_username();
                    disable_submit();
                }
                else{
                    valid_username();
                    if (password_length >= 6){
                        if(confirm_length >= 6){
                            if(same_confirm() == true){
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

    $('#input_addAccntPsword').keyup(function () {
        var username_length = $('#input_addAccntUsername').val().length;
        var username = $('#input_addAccntUsername').val();
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        if(password_length < 6 || password_length == 0){
            invalid_password();
            disable_submit();
        }
        else{
            valid_password();
        	if(confirm_length >= 1){
        		if(same_confirm() == true){
                    valid_confirm();
                    if(username_length >= 6){
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

    $('#input_addAccntConfirm').keyup(function () {
        var username_length = $('#input_addAccntUsername').val().length;
        var username = $('#input_addAccntUsername').val();
        var password_length = $('#input_addAccntPsword').val().length;
        var confirm_length = $('#input_addAccntConfirm').val().length;
        
        if(confirm_length < 6 || confirm_length == 0){
            invalid_confirm();
            disable_submit();
        }
        else{
            valid_confirm();
    		if(same_confirm() == true){
    			if(username_length >= 6){
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
      
    $('#btn_addAccntCancel').click(function(){
        window.history.back();
    });
})