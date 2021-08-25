$(document).ready(function() {
    
    $('#input_addQuantity').on("blur", function() {
        var qty = $('#input_addQuantity').val();
        console.log(qty);
        $('#input_addQuantity').val(parseFloat(qty).toFixed(2));
    })

    $('#input_addPriceLiter').on("blur", function() {
        var qty = $('#input_addPriceLiter').val();
        console.log(qty);
        $('#input_addPriceLiter').val(parseFloat(qty).toFixed(2));
    })

})