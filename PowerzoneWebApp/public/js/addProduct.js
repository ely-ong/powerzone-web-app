$(document).ready(function() {
    
    // converts the value of quantity field to two decimal places once the field is no longer selected
    $('#input_addQuantity').on("blur", function() {
        var qty = $('#input_addQuantity').val();
        console.log(qty);
        $('#input_addQuantity').val(parseFloat(qty).toFixed(2));
    })

    // converts the value of price/liter field to two decimal places once the field is no longer selected
    $('#input_addPriceLiter').on("blur", function() {
        var qty = $('#input_addPriceLiter').val();
        console.log(qty);
        $('#input_addPriceLiter').val(parseFloat(qty).toFixed(2));
    })

})