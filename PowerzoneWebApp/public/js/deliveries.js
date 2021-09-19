$(document).ready(function() {
    // variable instantiation
    var statusFilter = $('#filter_status').val();
    var dateFilter = $('#filter_date').val();

    // checks if each filter is ascending or descending and updates the logo to reflect the status of the filter
    if(statusFilter != "ascending" || dateFilter != "ascending"){
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
    }
      
})