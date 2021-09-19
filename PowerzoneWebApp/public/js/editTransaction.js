$(document).ready(function() {

    checkProductInformation();

    if($('#select_editTransactStatus').val() == "Delivered Completely"){
        $('#select_editTransactStatus').prop('disabled', true);
    }

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
    
    /**hides or shows detail fields based on checked product */
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

    // Front-End Validation

    // checks if at least one product was selected in the transaction
    $('#edit_checkbox_diesel, #edit_checkbox_gasoline, #edit_checkbox_premium95, #edit_checkbox_premium97, #edit_checkbox_kerosene').change(function(){

        var checkboxDiesel = $('#edit_checkbox_diesel').is(":checked");
        var checkboxGasoline = $('#edit_checkbox_gasoline').is(":checked");
        var checkboxPremium95 = $('#edit_checkbox_premium95').is(":checked");
        var checkboxPremium97 = $('#edit_checkbox_premium97').is(":checked");
        var checkboxKerosene = $('#edit_checkbox_kerosene').is(":checked");

        if(!checkboxDiesel && !checkboxGasoline && !checkboxPremium95 && !checkboxPremium97 && !checkboxKerosene){
            disableSubmit('Select at least one product to purchase.');
        }
        else{
            var isComplete = true;

            if(checkboxDiesel){
                var quantityDiesel = $('#input_editTransactQuantityDiesel').val();
                var priceDiesel = $('#input_editTransactSellingPriceDiesel').val();

                if(quantityDiesel == '' || priceDiesel == ''){
                    isComplete = false;
                }
            }

            if(checkboxGasoline){
                var quantityGasoline = $('#input_editTransactQuantityGasoline').val();
                var priceGasoline = $('#input_editTransactSellingPriceGasoline').val();

                if(quantityGasoline == '' || priceGasoline == ''){
                    isComplete = false;
                }
            }

            if(checkboxPremium95){
                var quantityPremium95 = $('#input_editTransactQuantityPremium95').val();
                var pricePremium95 = $('#input_editTransactSellingPricePremium95').val();

                if(quantityPremium95 == '' || pricePremium95 == ''){
                    isComplete = false;
                }
            }

            if(checkboxPremium97){
                var quantityPremium97 = $('#input_editTransactQuantityPremium97').val();
                var pricePremium97 = $('#input_editTransactSellingPricePremium97').val();

                if(quantityPremium97 == '' || pricePremium97 == ''){
                    isComplete = false;
                }
            }

            if(checkboxKerosene){
                var quantityKerosene = $('#input_editTransactQuantityKerosene').val();
                var priceKerosene = $('#input_editTransactSellingPriceKerosene').val();

                if(quantityKerosene == '' || priceKerosene == ''){
                    isComplete = false;
                }
            }

            if(isComplete){
                enableSubmit();
            }
            else{
                disableSubmit('Incomplete product details above.');
            }
        }
    })

    // checks if each input for product is complete, disables button and displays error if incomplete.
    $('#input_editTransactQuantityDiesel, #input_editTransactSellingPriceDiesel, #input_editTransactQuantityGasoline, #input_editTransactSellingPriceGasoline,' + 
      '#input_editTransactQuantityPremium95, #input_editTransactSellingPricePremium95, #input_editTransactQuantityPremium97, #input_editTransactSellingPricePremium97,' +
      '#input_editTransactQuantityKerosene, #input_editTransactSellingPriceKerosene').keyup(function(){

        checkProductInformation();
    });

    function checkProductInformation() {
        var checkboxDiesel = $('#edit_checkbox_diesel').is(":checked");
        var checkboxGasoline = $('#edit_checkbox_gasoline').is(":checked");
        var checkboxPremium95 = $('#edit_checkbox_premium95').is(":checked");
        var checkboxPremium97 = $('#edit_checkbox_premium97').is(":checked");
        var checkboxKerosene = $('#edit_checkbox_kerosene').is(":checked");
        var isComplete = true;

        if(checkboxDiesel){
            var quantityDiesel = $('#input_addTransactQuantityDiesel').val();
            var priceDiesel = $('#input_addTransactSellingPriceDiesel').val();

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
                if(quantityDiesel == '' || priceDiesel == '' || isExceeding){
                    isComplete = false;
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
                if(quantityGasoline == '' || priceGasoline == '' || isExceeding){
                    isComplete = false;
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
                if(quantityPremium95 == '' || pricePremium95 == '' || isExceeding){
                    isComplete = false;
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
                if(quantityPremium97 == '' || pricePremium97 == '' || isExceeding){
                    isComplete = false;
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
                if(quantityKerosene == '' || priceKerosene == '' || isExceeding){
                    isComplete = false;
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

})