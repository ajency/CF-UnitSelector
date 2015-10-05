$('.makeBooking').click(function (event) { 
    var project_id = $("#unitId").val();
    var unit_id = $("#projectId").val();
    $.ajax({
        url: "/project/" + project_id + "/makebooking/" + unit_id,
        type: "POST", 
        headers: {
        'X-CSRF-TOKEN': $('input[name="_token"]').val()
        },
        data: {
            buyerData: $("#frmaddBuyer").serialize()
        },
        success: function (response) { 
           bookinRes = JSON.parse(response);
           $("input[name='booking_id']").val(bookinRes.booking_id) ; 
           $("input[name='buyer_id']").val(bookinRes.buyer_id) ;
           $("#buyer_name").val(bookinRes.buyer_name) ;
           $("#buyer_email").val(bookinRes.buyer_email) ;
           $("#buyer_phone").val(bookinRes.buyer_mobile) ;
           
        }
    });

});

$('.makePayment').click(function (event) { 
    var buyer_id = $("input[name='buyer_id']").val();
    var booking_id = $("input[name='booking_id']").val();

    if(buyer_id=='' && booking_id=='')
    {
        alert('please enter basic information')
    }
    else
     $("#frmUnitbooking").submit(); 

});

