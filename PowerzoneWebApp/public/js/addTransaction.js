$(document).ready(function() {
    
    /**hides or shows detail fields based on checked product */
    $('#add_checkbox_diesel').click(function(){
        $('#addDieselDetails_box').toggle();
    })

    $('#add_checkbox_gasoline').click(function(){
        $('#addGasolineDetails_box').toggle();
    })

    $('#add_checkbox_premium95').click(function(){
        $('#addPremium95Details_box').toggle();
    })

    $('#add_checkbox_premium97').click(function(){
        $('#addPremium97Details_box').toggle();
    })

    $('#add_checkbox_kerosene').click(function(){
        $('#addKeroseneDetails_box').toggle();
    })

})