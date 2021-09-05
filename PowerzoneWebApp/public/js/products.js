$(document).ready(function() {

    $('.delete_product').click(function(){
        var productRow = $(this).parent().parent();
        var productId = $(this).val();

        $.get('/getAccountRole', function(result) {
            if(result == "Administrator") {
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

    $('#link_add').click(function(){
        console.log("TEST CLICK");

        $.get('/getAccountRole', function(result) {
            console.log(result);
            if(result == "Administrator") {
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

    $('.edit_product').click(function(){
        var productId = $(this).val();
        $.get('/getAccountRole', function(result) {
            if(result == "Administrator") {
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

    var dateFilter = $('#filter_date').val();
    var supplierFilter = $('#filter_supplier').val();
    var quantityFilter = $('#filter_quantity').val();
    var productFilter = $('#filter_product').val();
    var buyPriceFilter = $('#filter_price').val();
    var amountFilter = $('#filter_amount').val();
    var locationFilter = $('#filter_location').val();

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