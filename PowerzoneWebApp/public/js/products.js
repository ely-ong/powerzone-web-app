$(document).ready(function() {

    $('.delete_product').click(function(){
        var productRow = $(this).parent().parent();
        var productId = $(this).val();

        $.get('/getAccountRole', function(result) {
            if(result == "Administrator" || result == "Depot Supervisor") {
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
            if(result == "Administrator" || result == "Depot Supervisor") {
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
      
})