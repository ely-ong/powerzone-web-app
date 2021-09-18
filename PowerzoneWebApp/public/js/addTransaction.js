$(document).ready(function() {
    
    // hides or shows detail fields based on checked product
    $('#add_checkbox_diesel').click(function(){
        $('#addDieselDetails_box').toggle();
    })

    $('#add_checkbox_gasoline').click(function(){
        $('#addGasolineDetails_box').toggle();
    })

    $('#add_checkbox_premium95').click(function(){
        $('#addPremium95Details_box').toggle();
    })

    $('#add_checkbox_premium97').click(function(){
        $('#addPremium97Details_box').toggle();
    })

    $('#add_checkbox_kerosene').click(function(){
        $('#addKeroseneDetails_box').toggle();
    })

    // converts number fields to two decimal places on blur
    $('#input_addTransactQuantityDiesel').on("blur", function() {
        var qty = $('#input_addTransactQuantityDiesel').val();
        console.log(qty);
        $('#input_addTransactQuantityDiesel').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactSellingPriceDiesel').on("blur", function() {
        var qty = $('#input_addTransactSellingPriceDiesel').val();
        console.log(qty);
        $('#input_addTransactSellingPriceDiesel').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactQuantityGasoline').on("blur", function() {
        var qty = $('#input_addTransactQuantityGasoline').val();
        console.log(qty);
        $('#input_addTransactQuantityGasoline').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactSellingPriceGasoline').on("blur", function() {
        var qty = $('#input_addTransactSellingPriceGasoline').val();
        console.log(qty);
        $('#input_addTransactSellingPriceGasoline').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactQuantityPremium95').on("blur", function() {
        var qty = $('#input_addTransactQuantityPremium95').val();
        console.log(qty);
        $('#input_addTransactQuantityPremium95').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactSellingPricePremium95').on("blur", function() {
        var qty = $('#input_addTransactSellingPricePremium95').val();
        console.log(qty);
        $('#input_addTransactSellingPricePremium95').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactQuantityPremium97').on("blur", function() {
        var qty = $('#input_addTransactQuantityPremium97').val();
        console.log(qty);
        $('#input_addTransactQuantityPremium97').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactSellingPricePremium97').on("blur", function() {
        var qty = $('#input_addTransactSellingPricePremium97').val();
        console.log(qty);
        $('#input_addTransactSellingPricePremium97').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactQuantityKerosene').on("blur", function() {
        var qty = $('#input_addTransactQuantityKerosene').val();
        console.log(qty);
        $('#input_addTransactQuantityKerosene').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addTransactSellingPriceKerosene').on("blur", function() {
        var qty = $('#input_addTransactSellingPriceKerosene').val();
        console.log(qty);
        $('#input_addTransactSellingPriceKerosene').val(parseFloat(qty).toFixed(2));
    })

    // Helper Functions

    // helper function that disables submit button and adds error message
    function disableSubmit(error) {
        console.log("disable" + error);
        $('#btn_addTransact').prop('disabled', true);
        $('#errorBottom').text(error);
        $('#errorBottom').css('color', '#ab4642');
    }

    // helper function that enables submit button and removes error message
    function enableSubmit() {
        $('#btn_addTransact').prop('disabled', false);
        $('#errorBottom').text('');
        $('#errorBottom').css('color', 'transparent');
    }

    // Front-End Validation

    // checks if at least one product was selected in the transaction
    $('#add_checkbox_diesel, #add_checkbox_gasoline, #add_checkbox_premium95, #add_checkbox_premium97, #add_checkbox_kerosene').change(function(){

        var checkboxDiesel = $('#add_checkbox_diesel').is(":checked");
        var checkboxGasoline = $('#add_checkbox_gasoline').is(":checked");
        var checkboxPremium95 = $('#add_checkbox_premium95').is(":checked");
        var checkboxPremium97 = $('#add_checkbox_premium97').is(":checked");
        var checkboxKerosene = $('#add_checkbox_kerosene').is(":checked");

        if(!checkboxDiesel && !checkboxGasoline && !checkboxPremium95 && !checkboxPremium97 && !checkboxKerosene){
            disableSubmit('Select at least one product to purchase.');
        }
        else{
            var isComplete = true;

            if(checkboxDiesel){
                var quantityDiesel = $('#input_addTransactQuantityDiesel').val();
                var priceDiesel = $('#input_addTransactSellingPriceDiesel').val();

                if(quantityDiesel == '' || priceDiesel == ''){
                    isComplete = false;
                }
            }

            if(checkboxGasoline){
                var quantityGasoline = $('#input_addTransactQuantityGasoline').val();
                var priceGasoline = $('#input_addTransactSellingPriceGasoline').val();

                if(quantityGasoline == '' || priceGasoline == ''){
                    isComplete = false;
                }
            }

            if(checkboxPremium95){
                var quantityPremium95 = $('#input_addTransactQuantityPremium95').val();
                var pricePremium95 = $('#input_addTransactSellingPricePremium95').val();

                if(quantityPremium95 == '' || pricePremium95 == ''){
                    isComplete = false;
                }
            }

            if(checkboxPremium97){
                var quantityPremium97 = $('#input_addTransactQuantityPremium97').val();
                var pricePremium97 = $('#input_addTransactSellingPricePremium97').val();

                if(quantityPremium97 == '' || pricePremium97 == ''){
                    isComplete = false;
                }
            }

            if(checkboxKerosene){
                var quantityKerosene = $('#input_addTransactQuantityKerosene').val();
                var priceKerosene = $('#input_addTransactSellingPriceKerosene').val();

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

    $('#input_addTransactQuantityDiesel, #input_addTransactSellingPriceDiesel, #input_addTransactQuantityGasoline, #input_addTransactSellingPriceGasoline,' + 
      '#input_addTransactQuantityPremium95, #input_addTransactSellingPricePremium95, #input_addTransactQuantityPremium97, #input_addTransactSellingPricePremium97,' +
      '#input_addTransactQuantityKerosene, #input_addTransactSellingPriceKerosene').keyup(function(){

        var checkboxDiesel = $('#add_checkbox_diesel').is(":checked");
        var checkboxGasoline = $('#add_checkbox_gasoline').is(":checked");
        var checkboxPremium95 = $('#add_checkbox_premium95').is(":checked");
        var checkboxPremium97 = $('#add_checkbox_premium97').is(":checked");
        var checkboxKerosene = $('#add_checkbox_kerosene').is(":checked");
        var isComplete = true;

        if(checkboxDiesel){
            var quantityDiesel = $('#input_addTransactQuantityDiesel').val();
            var priceDiesel = $('#input_addTransactSellingPriceDiesel').val();

            if(quantityDiesel == '' || priceDiesel == ''){
                isComplete = false;
            }
        }

        if(checkboxGasoline){
            var quantityGasoline = $('#input_addTransactQuantityGasoline').val();
            var priceGasoline = $('#input_addTransactSellingPriceGasoline').val();

            if(quantityGasoline == '' || priceGasoline == ''){
                isComplete = false;
            }
        }

        if(checkboxPremium95){
            var quantityPremium95 = $('#input_addTransactQuantityPremium95').val();
            var pricePremium95 = $('#input_addTransactSellingPricePremium95').val();

            if(quantityPremium95 == '' || pricePremium95 == ''){
                isComplete = false;
            }
        }

        if(checkboxPremium97){
            var quantityPremium97 = $('#input_addTransactQuantityPremium97').val();
            var pricePremium97 = $('#input_addTransactSellingPricePremium97').val();

            if(quantityPremium97 == '' || pricePremium97 == ''){
                isComplete = false;
            }
        }

        if(checkboxKerosene){
            var quantityKerosene = $('#input_addTransactQuantityKerosene').val();
            var priceKerosene = $('#input_addTransactSellingPriceKerosene').val();

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
    });
})