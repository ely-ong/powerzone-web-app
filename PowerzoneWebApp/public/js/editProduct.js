$(document).ready(function() {
    var pageURL = window.location.search.substring(1);
    console.log(pageURL);

    var parameters = [];

    var urlVariables = pageURL.split('&');
    for (var i = 0; i < urlVariables.length; i++)
    {
        var parameterName = urlVariables[i].split('=');
        parameters[i] = parameterName[1];
        console.log(parameters[i]);

        parameters[i] = decodeURI(parameters[i]);
    }

    $('#input_editDate').val(parameters[0]);
    $('#input_editSupplier').val(parameters[1]);
    $('#input_editQuantity').val(parameters[2]);
    $('#input_editProductType').val(parameters[3]);
    $('#input_editPriceLiter').val(parameters[4]);
    $('#input_editLocation').val(parameters[5]);
    $('#btn_edit').val(parameters[6]);
      
})