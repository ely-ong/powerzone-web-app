$(document).ready(function() {
    // variable instantiation
    var pageURL = window.location.href;
    var parameters = [];
    var parameters = pageURL.split('prodId=').join('=')
        .split('&date=').join('=').split('&quantity=').join('=')
        .split('&product=').join('=').split('&price=').join('=')
        .split('&supplier=').join('=').split('&location=').join('=')
        .split('=');

    // obtaining parameters of each entry
    $('#btn_edit').val(parameters[1]);
    $('#input_editDate').val(parameters[2]);
    $('#input_editQuantity').val(parameters[3]);
    $('#select_editProductType').val(parameters[4].split('%20').join(' '));
    $('#input_editPriceLiter').val(parameters[5]);
    $('#select_editSupplier').val(parameters[6].split('%20').join(' '));
    $('#input_editLocation').val(parameters[7].split('%20').join(' '));
    
    $(document).ready(function() {
        
        // rounds off value of quantity field to two decimal places when it is not selected
        $('#input_editQuantity').on("blur", function() {
            var qty = $('#input_editQuantity').val();
            console.log(qty);
            $('#input_editQuantity').val(parseFloat(qty).toFixed(2));
        })

        // rounds off value of price/liter to two decimal places when it is not selected
        $('#input_editPriceLiter').on("blur", function() {
            var qty = $('#input_editPriceLiter').val();
            console.log(qty);
            $('#input_editPriceLiter').val(parseFloat(qty).toFixed(2));
        })

    })
})