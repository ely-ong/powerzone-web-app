$(document).ready(function() {

    // function to delete product upon clicking its delete button
    $('.delete_product').click(function(){
        var productRow = $(this).parent().parent();
        var productId = $(this).val();

        // checks if the current logged in account is authorized to delete the product
        $.get('/getAccountRole', function(result) {
            if(result == "Administrator" || result == "Depot General Manager") {
                if(confirm("Are you sure you want to delete this product?")){
                    productRow.remove();
                    $.get(`/deleteProduct`, {productId: productId}, function(result){
                        window.open("/products", "_self");
                    });
                }
            }
            else if (result == null){
                alert('Error with session kindly log in once again.');
            }
            else{
                alert(`Account is unauthorized to perform this action.`);
            }
        })
    });

    // opens add product page upon clicking add product button
    $('#link_add').click(function(){

        // checks if currently logged in user is authorized to add new products
        $.get('/getAccountRole', function(result) {
            console.log(result);
            if(result == "Administrator" || result == "Depot General Manager") {
                window.open("/addProduct", "_self");
            }
            else if (result == null){
                alert('Error with session kindly log in once again.');
            }
            else{
                alert(`Account is unauthorized to perform this action.`);
            }
        })
    });

    // opens edit product page upon clicking edit product button of a certain product
    $('.edit_product').click(function(){
        var productId = $(this).val();
        $.get('/getAccountRole', function(result) {
            // checks if user is authorized to edit products
            if(result == "Administrator" || result == "Depot General Manager") {
                if(confirm("Are you sure you want to edit this product?")){
                    $.get(`/getEditProduct`, {productId: productId}, function(result){
                        window.open("/editProduct" + "?prodId=" + result.productId + 
                            "&date=" + result.dateString + "&quantity=" + result.quantity +
                            "&product=" + result.product + "&price=" + result.price +
                            "&supplier=" + result.supplier + "&location=" + result.location, 
                            "_self");
                        console.log("TEST");
                    });
                }
            }
            else if (result == null){
                alert('Error with session kindly log in once again.');
            }
            else{
                alert(`Account is unauthorized to perform this action.`);
            }
        })
    });

    // variable instantiation
    var dateFilter = $('#filter_date').val();
    var supplierFilter = $('#filter_supplier').val();
    var quantityFilter = $('#filter_quantity').val();
    var productFilter = $('#filter_product').val();
    var buyPriceFilter = $('#filter_price').val();
    var amountFilter = $('#filter_amount').val();
    var locationFilter = $('#filter_location').val();

    // checks if each filter is ascending or descending and updates the logo to reflect the status of the filter
    if(dateFilter != "ascending" || supplierFilter != "ascending" || quantityFilter != "ascending" || productFilter != "ascending" ||
            buyPriceFilter != "ascending" || amountFilter != "ascending" || locationFilter != "ascending"){
        if(dateFilter == "descending"){
            $('#filter_date').addClass('up_arrow');
        }
        else if(dateFilter == "ascending_"){
            $('#filter_date').addClass('down_arrow');
        }
        else if(supplierFilter == "descending"){
            $('#filter_supplier').addClass('up_arrow');
        }
        else if(supplierFilter == "ascending_"){
            $('#filter_supplier').addClass('down_arrow');
        }
        else if(quantityFilter == "descending"){
            $('#filter_quantity').addClass('up_arrow');
        }
        else if(quantityFilter == "ascending_"){
            $('#filter_quantity').addClass('down_arrow');
        }
        else if(productFilter == "descending"){
            $('#filter_product').addClass('up_arrow');
        }
        else if(productFilter == "ascending_"){
            $('#filter_product').addClass('down_arrow');
        }
        else if(buyPriceFilter == "descending"){
            $('#filter_price').addClass('up_arrow');
        }
        else if(buyPriceFilter == "ascending_"){
            $('#filter_price').addClass('down_arrow');
        }
        else if(amountFilter == "descending"){
            $('#filter_amount').addClass('up_arrow');
        }
        else if(amountFilter == "ascending_"){
            $('#filter_amount').addClass('down_arrow');
        }
        else if(locationFilter == "descending"){
            $('#filter_location').addClass('up_arrow');
        }
        else if(locationFilter == "ascending_"){
            $('#filter_location').addClass('down_arrow');
        }
    }
      
})