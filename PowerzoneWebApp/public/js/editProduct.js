$(document).ready(function() {
    var pageURL = window.location.href;

    var parameters = [];

    var parameters = pageURL.split('prodId=').join('=')
        .split('&date=').join('=').split('&quantity=').join('=')
        .split('&product=').join('=').split('&price=').join('=')
        .split('&supplier=').join('=').split('&location=').join('=')
        .split('=');

    $('#btn_edit').val(parameters[1]);
    $('#input_editDate').val(parameters[2]);
    $('#input_editQuantity').val(parameters[3]);
    $('#select_editProductType').val(parameters[4].split('%20').join(' '));
    $('#input_editPriceLiter').val(parameters[5]);
    $('#input_editSupplier').val(parameters[6].split('%20').join(' '));
    $('#input_editLocation').val(parameters[7].split('%20').join(' '));
      
})