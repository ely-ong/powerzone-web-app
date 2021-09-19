$(document).ready(function() {

    $('#cancel_button').click(function(){

        var transId = $(this).val();

        $.get('/cancelTransaction', {transactionId: transId}, function (result) {

            if(result){
                $('#cancel_button').parent().parent().children('#transStatus').text('Canceled');
                $('#cancel_button').parent().parent().children('#transact_edit').children('#form_edit').remove();
                $('#cancel_button').remove();
            }
        });
    });

    // variable instantiation
    var statusFilter = $('#filter_status').val();
    var dateFilter = $('#filter_date').val();
    var deliveryNoFilter = $('#filter_deliveryNo').val();
    var salesNoFilter = $('#filter_salesNo').val();
    var customerNameFilter = $('#filter_customerName').val();

    // checks if each filter is ascending or descending and updates the logo to reflect the status of the filter
    if(statusFilter != "ascending" || dateFilter != "ascending" || deliveryNoFilter != "ascending" || salesNoFilter != "ascending" ||
            customerNameFilter != "ascending"){
        if(statusFilter == "descending"){
            $('#filter_status').addClass('down_arrow');
        }
        else if(statusFilter == "ascending_"){
            $('#filter_status').addClass('up_arrow');
        }
        else if(dateFilter == "descending"){
            $('#filter_date').addClass('down_arrow');
        }
        else if(dateFilter == "ascending_"){
            $('#filter_date').addClass('up_arrow');
        }
        else if(deliveryNoFilter == "descending"){
            $('#filter_deliveryNo').addClass('down_arrow');
        }
        else if(deliveryNoFilter == "ascending_"){
            $('#filter_deliveryNo').addClass('up_arrow');
        }
        else if(salesNoFilter == "descending"){
            $('#filter_salesNo').addClass('down_arrow');
        }
        else if(salesNoFilter == "ascending_"){
            $('#filter_salesNo').addClass('up_arrow');
        }
        else if(customerNameFilter == "descending"){
            $('#filter_customerName').addClass('down_arrow');
        }
        else if(customerNameFilter == "ascending_"){
            $('#filter_customerName').addClass('up_arrow');
        }
    }
      
})