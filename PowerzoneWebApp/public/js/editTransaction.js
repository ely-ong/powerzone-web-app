$(document).ready(function() {

    // initialize the variables holding the account role, original status, original delivery number, and original sales number
    var accountRole = $('#label_editTransact').attr('value');
    var originalStatus = $('#select_editTransactStatus').val();
    var originalDeliveryNo = $('#input_editTransactDeliveryNo').val();
    var originalSalesNo = $('#input_editTransactSalesNo').val();

    // function to check if previously inputted values for product amounts can still be accommodated by inventory balance
    checkProductInformation();

    // function to disable unit price fields based on the role of the user
    disableExistingUnitPrice();

    // disables the input for the transaction status if current transaction has already been delivered completely
    if($('#select_editTransactStatus').val() == "Delivered Completely"){
        $('#select_editTransactStatus').prop('disabled', true);
    }

    // toggles the input fields if a certain checkbox is checked
    if($('#edit_checkbox_diesel').is(":checked")){
        $('#editDieselDetails_box').toggle();
    }

    if($('#edit_checkbox_gasoline').is(":checked")){
        $('#editGasolineDetails_box').toggle();
    }

    if($('#edit_checkbox_premium95').is(":checked")){
        $('#editPremium95Details_box').toggle();
    }

    if($('#edit_checkbox_premium97').is(":checked")){
        $('#editPremium97Details_box').toggle();
    }

    if($('#edit_checkbox_kerosene').is(":checked")){
        $('#editKeroseneDetails_box').toggle();
    }
    
    // hides or shows detail fields based on checked product
    $('#edit_checkbox_diesel').click(function(){
        $('#editDieselDetails_box').toggle();

        if(!$('#edit_checkbox_diesel').is(":checked"))
            $('#edit_checkbox_diesel').removeAttr('checked');
        else
            $('#edit_checkbox_diesel').attr('checked', 'checked');
        
    })

    $('#edit_checkbox_gasoline').click(function(){
        $('#editGasolineDetails_box').toggle();

        if(!$('#edit_checkbox_gasoline').is(":checked"))
            $('#edit_checkbox_gasoline').removeAttr('checked');
        else
            $('#edit_checkbox_gasoline').attr('checked', 'checked');
    })

    $('#edit_checkbox_premium95').click(function(){
        $('#editPremium95Details_box').toggle();

        if(!$('#edit_checkbox_premium95').is(":checked"))
            $('#edit_checkbox_premium95').removeAttr('checked');
        else
            $('#edit_checkbox_premium95').attr('checked', 'checked');
    })

    $('#edit_checkbox_premium97').click(function(){
        $('#editPremium97Details_box').toggle();

        if(!$('#edit_checkbox_premium97').is(":checked"))
            $('#edit_checkbox_premium97').removeAttr('checked');
        else
            $('#edit_checkbox_premium97').attr('checked', 'checked');
    })

    $('#edit_checkbox_kerosene').click(function(){
        $('#editKeroseneDetails_box').toggle();

        if(!$('#edit_checkbox_kerosene').is(":checked"))
            $('#edit_checkbox_kerosene').removeAttr('checked');
        else
            $('#edit_checkbox_kerosene').attr('checked', 'checked');
    })

    // shows an alert box when the status is changed to 'Delivered Completely'
    $('#select_editTransactStatus').change(function(){
        console.log($('#select_editTransactStatus').val());
        if($('#select_editTransactStatus').val() == "Delivered Completely"){
            alert("Kindly note that editing a transaction's status to 'Delievered Completely' is irreversible once submitted");
        }
    })

    // converts number fields to two decimal places on blur
    $('#input_editTransactQuantityDiesel').on("blur", function() {
        var qty = $('#input_editTransactQuantityDiesel').val();
        console.log(qty);
        $('#input_editTransactQuantityDiesel').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactSellingPriceDiesel').on("blur", function() {
        var qty = $('#input_editTransactSellingPriceDiesel').val();
        console.log(qty);
        $('#input_editTransactSellingPriceDiesel').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactQuantityGasoline').on("blur", function() {
        var qty = $('#input_editTransactQuantityGasoline').val();
        console.log(qty);
        $('#input_editTransactQuantityGasoline').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactSellingPriceGasoline').on("blur", function() {
        var qty = $('#input_editTransactSellingPriceGasoline').val();
        console.log(qty);
        $('#input_editTransactSellingPriceGasoline').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactQuantityPremium95').on("blur", function() {
        var qty = $('#input_editTransactQuantityPremium95').val();
        console.log(qty);
        $('#input_editTransactQuantityPremium95').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactSellingPricePremium95').on("blur", function() {
        var qty = $('#input_editTransactSellingPricePremium95').val();
        console.log(qty);
        $('#input_editTransactSellingPricePremium95').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactQuantityPremium97').on("blur", function() {
        var qty = $('#input_editTransactQuantityPremium97').val();
        console.log(qty);
        $('#input_editTransactQuantityPremium97').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactSellingPricePremium97').on("blur", function() {
        var qty = $('#input_editTransactSellingPricePremium97').val();
        console.log(qty);
        $('#input_editTransactSellingPricePremium97').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactQuantityKerosene').on("blur", function() {
        var qty = $('#input_editTransactQuantityKerosene').val();
        console.log(qty);
        $('#input_editTransactQuantityKerosene').val(parseFloat(qty).toFixed(2));
    })

    $('#input_editTransactSellingPriceKerosene').on("blur", function() {
        var qty = $('#input_editTransactSellingPriceKerosene').val();
        console.log(qty);
        $('#input_editTransactSellingPriceKerosene').val(parseFloat(qty).toFixed(2));
    })

    // Helper Functions

    // helper function that disables submit button and adds error message
    function disableSubmit(error) {
        console.log("disable" + error);
        $('#btn_editTransact').prop('disabled', true);
        $('#errorBottom').text(error);
        $('#errorBottom').css('color', '#ab4642');
    }

    // helper function that enables submit button and removes error message
    function enableSubmit() {
        $('#btn_editTransact').prop('disabled', false);
        $('#errorBottom').text('');
        $('#errorBottom').css('color', 'transparent');
    }

    // helper function that disables the unit price fields if the user is a Depot Supervisor only
    function disableExistingUnitPrice(){
        var checkboxDiesel = $('#edit_checkbox_diesel').is(":checked");
        var checkboxGasoline = $('#edit_checkbox_gasoline').is(":checked");
        var checkboxPremium95 = $('#edit_checkbox_premium95').is(":checked");
        var checkboxPremium97 = $('#edit_checkbox_premium97').is(":checked");
        var checkboxKerosene = $('#edit_checkbox_kerosene').is(":checked");

        var enableStatusChange = true;
        var isComplete = true;

        if(accountRole == "Depot Supervisor"){
            if(checkboxDiesel){
                $('#input_editTransactSellingPriceDiesel').prop('readonly', true);
                $('#input_editTransactSellingPriceDiesel').css('background-color', '#808080');
                
                if($('#input_editTransactQuantityDiesel').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPriceDiesel').val() == '')
                    enableStatusChange = false;

            }

            if(checkboxGasoline){
                $('#input_editTransactSellingPriceGasoline').prop('readonly', true);
                $('#input_editTransactSellingPriceGasoline').css('background-color', '#808080');

                if($('#input_editTransactQuantityGasoline').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPriceGasoline').val() == '')
                    enableStatusChange = false;
            }

            if(checkboxPremium95){
                $('#input_editTransactSellingPricePremium95').prop('readonly', true);
                $('#input_editTransactSellingPricePremium95').css('background-color', '#808080');

                if($('#input_editTransactQuantityPremium95').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPricePremium95').val() == '')
                    enableStatusChange = false;
            }

            if(checkboxPremium97){
                $('#input_editTransactSellingPricePremium97').prop('readonly', true);
                $('#input_editTransactSellingPricePremium97').css('background-color', '#808080');

                if($('#input_editTransactQuantityPremium97').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPricePremium97').val() == '')
                    enableStatusChange = false;
            }

            if(checkboxKerosene){
                $('#input_editTransactSellingPriceKerosene').prop('readonly', true);
                $('#input_editTransactSellingPriceKerosene').css('background-color', '#808080');

                if($('#input_editTransactQuantityKerosene').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPriceKerosene').val() == '')
                    enableStatusChange = false;
            }

            if(!enableStatusChange)
                $('#select_editTransactStatus').prop('disabled', true);

            if(isComplete)
                enableSubmit();
            else
                disableSubmit('Incomplete product details above.');
        }
        else{
            if(checkboxDiesel){
                if($('#input_editTransactQuantityDiesel').val() == '' || $('#input_editTransactSellingPriceDiesel').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPriceDiesel').val() == '')
                    enableStatusChange = false;

            }

            if(checkboxGasoline){
                if($('#input_editTransactQuantityGasoline').val() == '' || $('#input_editTransactSellingPriceGasoline').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPriceGasoline').val() == '')
                    enableStatusChange = false;
            }

            if(checkboxPremium95){
                if($('#input_editTransactQuantityPremium95').val() == '' || $('#input_editTransactSellingPricePremium95').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPricePremium95').val() == '')
                    enableStatusChange = false;
            }

            if(checkboxPremium97){
                if($('#input_editTransactQuantityPremium97').val() == '' || $('#input_editTransactSellingPricePremium97').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPricePremium97').val() == '')
                    enableStatusChange = false;
            }

            if(checkboxKerosene){
                if($('#input_editTransactQuantityKerosene').val() == '' || $('#input_editTransactSellingPriceKerosene').val() == '')
                    isComplete == false;

                if($('#input_editTransactSellingPriceKerosene').val() == '')
                    enableStatusChange = false;
            }

            if(!enableStatusChange)
                $('#select_editTransactStatus').prop('disabled', true);

            if(isComplete)
                enableSubmit();
            else
                disableSubmit('Incomplete product details above.');
        }
    }

    // Front-End Validation

    // checks if at least one product was selected in the transaction
    $('#edit_checkbox_diesel, #edit_checkbox_gasoline, #edit_checkbox_premium95, #edit_checkbox_premium97, #edit_checkbox_kerosene').change(function(){

        var checkboxDiesel = $('#edit_checkbox_diesel').is(":checked");
        var checkboxGasoline = $('#edit_checkbox_gasoline').is(":checked");
        var checkboxPremium95 = $('#edit_checkbox_premium95').is(":checked");
        var checkboxPremium97 = $('#edit_checkbox_premium97').is(":checked");
        var checkboxKerosene = $('#edit_checkbox_kerosene').is(":checked");

        var allowStatusChange = true;
        if(!checkboxDiesel && !checkboxGasoline && !checkboxPremium95 && !checkboxPremium97 && !checkboxKerosene){
            disableSubmit('Select at least one product to purchase.');
            allowStatusChange = false;
        }
        else{
            var isComplete = true;
            
            // if checkboxes are selected, checks the values of each input field and ensures they are not empty; displays necessery error messages
            if(checkboxDiesel){
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                    var quantityDiesel = $('#input_editTransactQuantityDiesel').val();
                    var priceDiesel = $('#input_editTransactSellingPriceDiesel').val();

                    if(quantityDiesel == '' || priceDiesel == '')
                        isComplete = false;
                }
                else if(accountRole == "Depot Supervisor"){
                    var quantityDiesel = $('#input_editTransactQuantityDiesel').val();
                    var priceDiesel = $('#input_editTransactSellingPriceDiesel').val();
                    $('#input_editTransactSellingPriceDiesel').prop('readonly', true);
                    $('#input_editTransactSellingPriceDiesel').css('background-color', '#808080');

                    if(quantityDiesel == '')
                        isComplete = false;

                    if(priceDiesel == '')
                        allowStatusChange = false;
                }
            }

            if(checkboxGasoline){
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                    var quantityGasoline = $('#input_editTransactQuantityGasoline').val();
                    var priceGasoline = $('#input_editTransactSellingPriceGasoline').val();

                    if(quantityGasoline == '' || priceGasoline == '')
                        isComplete = false;
                }
                else if(accountRole == "Depot Supervisor"){
                    var quantityGasoline = $('#input_editTransactQuantityGasoline').val();
                    var priceGasoline = $('#input_editTransactQuantityGasoline').val();
                    $('#input_editTransactSellingPriceGasoline').prop('readonly', true);
                    $('#input_editTransactSellingPriceGasoline').css('background-color', '#808080');

                    if(quantityGasoline == '')
                        isComplete = false;

                    if(priceGasoline == '')
                        allowStatusChange = false;
                }
            }

            if(checkboxPremium95){
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                    var quantityPremium95 = $('#input_editTransactQuantityPremium95').val();
                    var pricePremium95 = $('#input_editTransactSellingPricePremium95').val();

                    if(quantityPremium95 == '' || pricePremium95 == '')
                        isComplete = false;
                }
                else if(accountRole == "Depot Supervisor"){
                    var quantityPremium95 = $('#input_editTransactQuantityPremium95').val();
                    var pricePremium95 = $('#input_editTransactSellingPricePremium95').val();
                    $('#input_editTransactSellingPricePremium95').prop('readonly', true);
                    $('#input_editTransactSellingPricePremium95').css('background-color', '#808080');

                    if(quantityPremium95 == '')
                        isComplete = false;

                    if(pricePremium95 == '')
                        allowStatusChange = false;
                }
            }

            if(checkboxPremium97){
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                    var quantityPremium97 = $('#input_editTransactQuantityPremium97').val();
                    var pricePremium97 = $('#input_editTransactSellingPricePremium97').val();

                    if(quantityPremium97 == '' || pricePremium97 == '')
                        isComplete = false;
                }
                else if(accountRole == "Depot Supervisor"){
                    var quantityPremium97 = $('#input_editTransactQuantityPremium97').val();
                    var pricePremium97 = $('#input_editTransactSellingPricePremium97').val();
                    $('#input_editTransactSellingPricePremium97').prop('readonly', true);
                    $('#input_editTransactSellingPricePremium97').css('background-color', '#808080');

                    if(quantityPremium97 == '')
                        isComplete = false;

                    if(pricePremium97 == '')
                        allowStatusChange = false;
                }
            }

            if(checkboxKerosene){
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                    var quantityKerosene = $('#input_editTransactQuantityKerosene').val();
                    var priceKerosene = $('#input_editTransactSellingPriceKerosene').val();

                    if(quantityKerosene == '' || priceKerosene == '')
                        isComplete = false;
                }
                else if(accountRole == "Depot Supervisor"){
                    var quantityKerosene = $('#input_editTransactQuantityKerosene').val();
                    var priceKerosene = $('#input_editTransactSellingPriceKerosene').val();
                    $('#input_editTransactSellingPriceKerosene').prop('readonly', true);
                    $('#input_editTransactSellingPriceKerosene').css('background-color', '#808080');

                    if(quantityKerosene == '')
                        isComplete = false;

                    if(priceKerosene == '')
                        allowStatusChange = false;
                }
            }

            if(isComplete){
                enableSubmit();
            }
            else{
                disableSubmit('Incomplete product details above.');
            }
        }

        // disables changing of status input field if true
        if(allowStatusChange){
            $('#select_editTransactStatus').val(originalStatus);
            $('#select_editTransactStatus').prop('disabled', false);
        }
        else{
            $('#select_editTransactStatus').val(originalStatus);
            $('#select_editTransactStatus').prop('disabled', true);
        }
    })

    // checks if each input for product is complete, disables button and displays error if incomplete.
    $('#input_editTransactQuantityDiesel, #input_editTransactSellingPriceDiesel, #input_editTransactQuantityGasoline, #input_editTransactSellingPriceGasoline,' + 
      '#input_editTransactQuantityPremium95, #input_editTransactSellingPricePremium95, #input_editTransactQuantityPremium97, #input_editTransactSellingPricePremium97,' +
      '#input_editTransactQuantityKerosene, #input_editTransactSellingPriceKerosene').keyup(function(){

        checkProductInformation();
    });

    // helper function that checks if each input field is complete
    function checkProductInformation() {
        var checkboxDiesel = $('#edit_checkbox_diesel').is(":checked");
        var checkboxGasoline = $('#edit_checkbox_gasoline').is(":checked");
        var checkboxPremium95 = $('#edit_checkbox_premium95').is(":checked");
        var checkboxPremium97 = $('#edit_checkbox_premium97').is(":checked");
        var checkboxKerosene = $('#edit_checkbox_kerosene').is(":checked");
        var isComplete = true;

        if(checkboxDiesel){
            var quantityDiesel = $('#input_editTransactQuantityDiesel').val();
            var priceDiesel = $('#input_editTransactSellingPriceDiesel').val();

            // checks if diesel quantity is more than the available diesel in inventory
            $.get('/getTotalInventory', {quantity: quantityDiesel, product: 'Diesel'}, function (result) {

                if(result){
                    var isExceeding = true;
                    $('#errorEditTransactQuantityDiesel').text('Inputted amount exceeds total inventory amount!');
                    $('#errorEditTransactQuantityDiesel').css('color', '#ab4642');
                }   
                else{
                    $('#errorEditTransactQuantityDiesel').text('');
                    $('#errorEditTransactQuantityDiesel').css('color', 'transparent');
                }
                  
                // checks if all info is complete and valid
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                   if(quantityDiesel == '' || priceDiesel == '' || isExceeding){
                        isComplete = false;
                    }  
                }
                else if(accountRole == "Depot Supervisor"){
                    if(quantityDiesel == '' || isExceeding){
                        isComplete = false;
                    }  
                }         
                   

                if(isComplete){
                    enableSubmit();
                }
                else{
                    disableSubmit('Incomplete product details above.');
                }
            });  
        }

        if(checkboxGasoline){
            var quantityGasoline = $('#input_editTransactQuantityGasoline').val();
            var priceGasoline = $('#input_editTransactSellingPriceGasoline').val();

            // checks if gasoline quantity is more than the available gasoline in inventory
            $.get('/getTotalInventory', {quantity: quantityGasoline, product: 'Gasoline'}, function (result) {

                if(result){
                    var isExceeding = true;
                    $('#errorEditTransactQuantityGasoline').text('Inputted amount exceeds total inventory amount!');
                    $('#errorEditTransactQuantityGasoline').css('color', '#ab4642');
                }   
                else{
                    $('#errorEditTransactQuantityGasoline').text('');
                    $('#errorEditTransactQuantityGasoline').css('color', 'transparent');
                }
                
                // checks if all info is complete and valid      
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                   if(quantityGasoline == '' || priceGasoline == '' || isExceeding){
                        isComplete = false;
                    }  
                }
                else if(accountRole == "Depot Supervisor"){
                    if(quantityGasoline == '' || isExceeding){
                        isComplete = false;
                    }  
                }         
                   

                if(isComplete){
                    enableSubmit();
                }
                else{
                    disableSubmit('Incomplete product details above.');
                }
            });
        }

        if(checkboxPremium95){
            var quantityPremium95 = $('#input_editTransactQuantityPremium95').val();
            var pricePremium95 = $('#input_editTransactSellingPricePremium95').val();

            // checks if premium 95 gasoline quantity is more than the available premium 95 gasoline in inventory
            $.get('/getTotalInventory', {quantity: quantityPremium95, product: 'Premium Gasoline 95'}, function (result) {

                if(result){
                    var isExceeding = true;
                    $('#errorEditTransactQuantityPremium95').text('Inputted amount exceeds total inventory amount!');
                    $('#errorEditTransactQuantityPremium95').css('color', '#ab4642');
                }   
                else{
                    $('#errorEditTransactQuantityPremium95').text('');
                    $('#errorEditTransactQuantityPremium95').css('color', 'transparent');
                }
                
                // checks if all info is complete and valid            
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                   if(quantityPremium95 == '' || pricePremium95 == '' || isExceeding){
                        isComplete = false;
                    }  
                }
                else if(accountRole == "Depot Supervisor"){
                    if(quantityPremium95 == '' || isExceeding){
                        isComplete = false;
                    }  
                }         
                      

                if(isComplete){
                    enableSubmit();
                }
                else{
                    disableSubmit('Incomplete product details above.');
                }
            });
        }

        if(checkboxPremium97){
            var quantityPremium97 = $('#input_editTransactQuantityPremium97').val();
            var pricePremium97 = $('#input_editTransactSellingPricePremium97').val();

            // checks if premium gasoline 97 quantity is more than the available premium gasoline 97 in inventory
            $.get('/getTotalInventory', {quantity: quantityPremium97, product: 'Premium Gasoline 97'}, function (result) {

                if(result){
                    var isExceeding = true;
                    $('#errorEditTransactQuantityPremium97').text('Inputted amount exceeds total inventory amount!');
                    $('#errorEditTransactQuantityPremium97').css('color', '#ab4642');
                }   
                else{
                    $('#errorEditTransactQuantityPremium97').text('');
                    $('#errorEditTransactQuantityPremium97').css('color', 'transparent');
                }
                
                // checks if all info is complete and valid            
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                   if(quantityPremium97 == '' || pricePremium97 == '' || isExceeding){
                        isComplete = false;
                    }  
                }
                else if(accountRole == "Depot Supervisor"){
                    if(quantityPremium97 == '' || isExceeding){
                        isComplete = false;
                    }  
                }         
                     

                if(isComplete){
                    enableSubmit();
                }
                else{
                    disableSubmit('Incomplete product details above.');
                }
            });
        }

        if(checkboxKerosene){
            var quantityKerosene = $('#input_editTransactQuantityKerosene').val();
            var priceKerosene = $('#input_editTransactSellingPriceKerosene').val();

            // checks if kerosene quantity is more than the available kerosene in inventory
            $.get('/getTotalInventory', {quantity: quantityKerosene, product: 'Kerosene'}, function (result) {

                if(result){
                    var isExceeding = true;
                    $('#errorEditTransactQuantityKerosene').text('Inputted amount exceeds total inventory amount!');
                    $('#errorEditTransactQuantityKerosene').css('color', '#ab4642');
                }   
                else{
                    $('#errorEditTransactQuantityKerosene').text('');
                    $('#errorEditTransactQuantityKerosene').css('color', 'transparent');
                }
                
                // checks if all info is complete and valid            
                if(accountRole == "Depot General Manager" || accountRole == "Administrator"){
                   if(quantityKerosene == '' || priceKerosene == '' || isExceeding){
                        isComplete = false;
                    }  
                }
                else if(accountRole == "Depot Supervisor"){
                    if(quantityKerosene == '' || isExceeding){
                        isComplete = false;
                    }  
                }         
                   

                if(isComplete){
                    enableSubmit();
                }
                else{
                    disableSubmit('Incomplete product details above.');
                }
            });
        }
    }

    // keyup function on delivery receipt number field to check if current text in the field is valid or invalid
    $('#input_editTransactDeliveryNo').keyup(function () {
        var deliveryNumber = $('#input_editTransactDeliveryNo').val();
        var invoiceNumber = $('#input_editTransactSalesNo').val();
        
        // checks if username exists in the database already
        $.get('/checkTransactDeliveryNo', {deliveryNumber: deliveryNumber}, function (result) {
            if(result.deliveryNumber == deliveryNumber && result.deliveryNumber != originalDeliveryNo){
                $('#errorEditTransactDeliveryNo').text('Inputted delivery number is already taken');
                $('#errorEditTransactDeliveryNo').css('color', '#ab4642');
                disableSubmit('Delivery number already exists');
            }
            else{
                enableSubmit();
                $('#errorEditTransactDeliveryNo').css('color', 'transparent');
                $.get('/checkTransactSalesNo', {invoiceNumber: invoiceNumber}, function (result) {
                    if(result.invoiceNumber == invoiceNumber && result.invoiceNumber != originalSalesNo){
                        $('#errorEditTransactSalesNo').text('Inputted invoice number is already taken');
                        $('#errorEditTransactSalesNo').css('color', '#ab4642');
                        disableSubmit('Invoice number already exists');
                    }
                    else{
                        enableSubmit();
                        $('#errorEditTransactSalesNo').css('color', 'transparent');
                        checkBoxes();
                    }
                }); 
            }
        });         
        
    });

    // keyup function on invoice sales number field to check if current text in the field is valid or invalid
    $('#input_editTransactSalesNo').keyup(function () {
        var invoiceNumber = $('#input_editTransactSalesNo').val();
        var deliveryNumber = $('#input_editTransactDeliveryNo').val();
        
        // checks if username exists in the database already
        $.get('/checkTransactSalesNo', {invoiceNumber: invoiceNumber}, function (result) {
            if(result.invoiceNumber == invoiceNumber && result.invoiceNumber != originalSalesNo){
                $('#errorEditTransactSalesNo').text('Inputted invoice number is already taken');
                $('#errorEditTransactSalesNo').css('color', '#ab4642');
                disableSubmit('Invoice number already exists');
            }
            else{
                enableSubmit();
                $('#errorEditTransactSalesNo').css('color', 'transparent');
                $.get('/checkTransactDeliveryNo', {deliveryNumber: deliveryNumber}, function (result) {
                    if(result.deliveryNumber == deliveryNumber && result.deliveryNumber != originalDeliveryNo){
                        $('#errorEditTransactDeliveryNo').text('Inputted delivery number is already taken');
                        $('#errorEditTransactDeliveryNo').css('color', '#ab4642');
                        disableSubmit('Delivery number already exists');
                    }
                    else{
                        enableSubmit();
                        $('#errorEditTransactDeliveryNo').css('color', 'transparent');
                        checkBoxes();
                    }
                });
            }
        });         
        
    });

    // helper function that checks if at least one checkbox is checked; status input field will be disabled if not
    function checkBoxes(){
        var checkboxDiesel = $('#edit_checkbox_diesel').is(":checked");
        var checkboxGasoline = $('#edit_checkbox_gasoline').is(":checked");
        var checkboxPremium95 = $('#edit_checkbox_premium95').is(":checked");
        var checkboxPremium97 = $('#edit_checkbox_premium97').is(":checked");
        var checkboxKerosene = $('#edit_checkbox_kerosene').is(":checked");

        if(!checkboxDiesel && !checkboxGasoline && !checkboxPremium95 && !checkboxPremium97 && !checkboxKerosene){
            disableSubmit('Select at least one product to purchase.');
            $('#select_editTransactStatus').val(originalStatus);
            $('#select_editTransactStatus').prop('disabled', true);
        }
    }

})