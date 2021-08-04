$(document).ready(function() {

    /** adjusts style to highlight username field and display error message */
    function invalid_username(){

        //highlights username field line with red
        $('#input_username').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorUsername').text('Username not found.');
        $('#errorUsername').css('color', 'var(--errorRed)');
    }

    /** adjusts style to remove highlight of username field and remove error message */
    function valid_username(){

        //resets username field line to white
        $('#input_username').css('border-color', 'white');

        //removes error message
        $('#errorUsername').css('color', 'transparent');
    }

    /** adjusts style to highlight password field and display error message */
    function invalid_password(){

        //highlights username field line with red
        $('#input_password').css('border-color', 'var(--errorRed)');

        //displays error message
        $('#errorPsword').text('Invalid password.');
        $('#errorPsword').css('color', 'var(--errorRed)');
    }

    /** adjusts style to remove highlight of password field and remove error message */
    function valid_password(){

        //resets username field line to white
        $('#input_password').css('border-color', 'white');

        //removes error message
        $('#errorPsword').css('color', 'transparent');
    }


})