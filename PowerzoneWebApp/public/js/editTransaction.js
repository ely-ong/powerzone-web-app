$(document).ready(function() {
    
    /**hides or shows detail fields based on checked product */
    $('#edit_checkbox_diesel').click(function(){
        $('#editDieselDetails_box').toggle();
    })

    $('#edit_checkbox_gasoline').click(function(){
        $('#editGasolineDetails_box').toggle();
    })

    $('#edit_checkbox_premium95').click(function(){
        $('#editPremium95Details_box').toggle();
    })

    $('#edit_checkbox_premium97').click(function(){
        $('#editPremium97Details_box').toggle();
    })

    $('#edit_checkbox_kerosene').click(function(){
        $('#editKeroseneDetails_box').toggle();
    })

})