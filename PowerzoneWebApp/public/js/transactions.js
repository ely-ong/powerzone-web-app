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
    })
      
})