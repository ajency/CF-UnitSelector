function startTimer(duration, display){
	var timer = duration, minutes, seconds;

	var timerId=setInterval(function () {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.text(minutes + ":" + seconds);

		if (--timer < 0) {
			clearInterval(timerId);
			if(redirectPropertyUrl ==""){
				window.location.href= "/";
			}else{
				window.location.href =redirectPropertyUrl;
			}
		}
	}, 1000);

}



$( ".basic_info" ).change(function() {
 
    str = $("input[name='contact_first_name']").val()+' '+$("input[name='contact_last_name']").val()+'<br>';
    str += $("input[name='contact_email']").val()+'<br>';
    str += $("input[name='contact_mobile']").val()+'<br>';
    str +=$("input[name='contact_pancard']").val()+'<br><br>';
    str += '<b>Address</b><br>';
    str += $("input[name='contact_address']").val()+' <br>';
    str += ($("input[name='contact_city']").val()!='') ? $("input[name='contact_city']").val()+', <br>' :'';
    str += $("input[name='contact_state']").val()+' '+$("input[name='contact_country']").val();
    str += ($("input[name='contact_zipcode']").val()!='') ? ' - '+ $("input[name='contact_zipcode']").val()+'<br> ' :'';
    $(".userInfo").html(str);
    $(".userInfo").removeClass('hidden');
});

function copyBillingInfo(obj){
    if($(obj).is(':checked'))
    {
        $("input[name='billing_first_name']").val($("input[name='contact_first_name']").val());
        $("input[name='billing_last_name']").val($("input[name='contact_last_name']").val());
        $("input[name='billing_email']").val($("input[name='contact_email']").val());
        $("input[name='billing_mobile']").val($("input[name='contact_mobile']").val());
        $("input[name='billing_pancard']").val($("input[name='contact_pancard']").val());
        $("input[name='billing_city']").val($("input[name='contact_city']").val());
        $("input[name='billing_address']").val($("input[name='contact_address']").val());
        $("input[name='billing_zipcode']").val($("input[name='contact_zipcode']").val());
        $("select[name='billing_buyer_type']").val($("select[name='buyer_type']").val());
        $("input[name='billing_state']").val($("input[name='contact_state']").val());
        $("input[name='billing_country']").val($("input[name='contact_country']").val());
        $('form').submit();
    }
    else
    {
        $("input[name='billing_first_name']").val('');
        $("input[name='billing_last_name']").val('');
        $("input[name='billing_email']").val('');
        $("input[name='billing_mobile']").val('');
        $("input[name='billing_pancard']").val('');
        $("input[name='billing_city']").val('');
        $("input[name='billing_address']").val('');
        $("input[name='billing_zipcode']").val('');
        $("select[name='billing_buyer_type']").val('');
        $("input[name='billing_state']").val('');
        $("input[name='billing_country']").val('');
    }
    

}

function getPriceSheet(id,is_booked,apartment_name,project_id,url){
	// $('#myModalViewFullPriceSheet').click(function(){
            // $('#myModalFullPriceSheet').modal('show');
            //unit_id=unit_id.toString();
            ////is_booked=false;
            if(is_booked==true){
                var data={
                    "is_booked":true,
                    "booking_id":id,
                    "planType":"price"
                };
            }else{
                var data={
                    "is_booked":false,
                    "unit_id":id,
                    "project_id":project_id,
                    "planType":"price"
                };
            };
            $.ajax({
                url: url, 
                type:'POST',
                dataType: "text",
                data:data,
                success: function(result){
                    result=result.trim();
                    if(typeof result !="object" ){
                        result_json = JSON.parse(result);
                    }
                    $('#myModalFullPriceSheet').modal('show');
                      
                    var component_entry = "";
                    for(component_no in result_json.components){
                        component_entry += "<tr>";
                        component_entry +=  "<td>"+result_json.components[component_no].component_price_type+"</td>"; 
                        component_entry +=  "<td>"+ result_json.components[component_no].component_price_sub_type +"</td>"; 
                        component_entry +=  "<td class='icon-rupee-icn'> "+convertToINR(result_json.components[component_no].amount)+"</td>";  
                        component_entry += "</tr>";         
                    };
                    var html ='<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                            <h3 align="center" class="headingModal">\
                            Full Price sheet: '+apartment_name+'\
                            </h3>\
                            <div class="table-responsive" style="border-radius: 12px;border: 2px solid;">\
                                <table class="table table-striped table-bordered table-hover price-structure" style="margin-bottom: -1px;">\
                                    <thead>\
                                        <tr>\
                                            <th>Component</th>\
                                            <th>Sub Component</th>\
                                            <th>Amount</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>'+ 
                                    component_entry
                                    +'</tbody>\
                                    <tfoot>\
                                        <tr>\
                                            <th> </th>\
                                            <th>Total Sale Value</th>\
                                            <th class="icon-rupee-icn" style="font-weight:900;"> '+ convertToINR(result_json.total_sale_value) +'</th>\
                                        </tr>\
                                    </tfoot>\
                                </table>\
                            </div>\
                            ';
                    $('.modal-body').html(html);
                    
                },
                error:function(result, error){
                    console.log(result);
                    console.log(error);
                    alert("No Data Found");
                }
            })
}

function getPaymentPlan(id,is_booked,apartment_name,project_id,url){ 
            if(is_booked==true){
                var data={
                    "is_booked":true,
                    "booking_id":id,
                    "planType":"payment"
                };
            }else{
                var data={
                    "is_booked":false,
                    "unit_id":id,
                    "project_id":project_id,
                    "planType":"payment"
                };
            }
           // unit_id=id.toString();
            $.ajax({
                url: url, 
                type:'POST',
                dataType: "text",
                data:data,
                success: function(result){
                    
                    $('#myModalViewFullPaymentPlan').modal('show');
                    result_json = JSON.parse(result);
                    var milestone_entry = "";
                    var payData=new Array();
                    var i=0;
                    for(var key in result_json.milestones){ 
                        payData[i]=new Array();
                        payData[i][0]=result_json.milestones[key].milestone_date;
                        payData[i][1]=key;
                        i++;
                    }
                    payData.sort(-1);
                    for(i=0;i<payData.length;i++){
                        milestone_entry += "<tr>";
                        milestone_entry +=  "<td>"+payData[i][0]+"</td>"; 
                        milestone_entry +=  "<td>"+ result_json.milestones[payData[i][1]].milestone +"</td>"; 
                        
                        milestone_entry +=  "<td class='icon-rupee-icn'> "+ convertToINR(result_json.milestones[payData[i][1]].amount)+"</td>";  
                        milestone_entry += "</tr>"; 
                    }

                    // for(milestone_no in result_json.milestones){
                        
                    //     milestone_entry += "<tr>";
                    //     milestone_entry +=  "<td>"+result_json.milestones[milestone_no].milestone_date+"</td>"; 
                    //     milestone_entry +=  "<td>"+ result_json.milestones[milestone_no].milestone +"</td>"; 
                        
                    //     milestone_entry +=  "<td class='icon-rupee-icn'> "+result_json.milestones[milestone_no].amount+"</td>";  
                    //     milestone_entry += "</tr>";         
                    // };
                    var html ='<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                            <h3 align="center" class="headingModal">\
                            Full Payment Plan: '+apartment_name+'\
                            </h3>\
                            <div class="table-responsive" style="border-radius: 12px;border: 2px solid;">\
                                <table class="table table-striped table-bordered table-hover price-structure" style="margin-bottom: -1px;">\
                                    <thead>\
                                        <tr>\
                                            <th>Due Date</th>\
                                            <th>Milestone</th>\
                                            <th>Amount</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>'+ 
                                    milestone_entry
                                    +'</tbody>\
                                    <tfoot>\
                                        <tr>\
                                            <th> </th>\
                                            <th>Total Sale Value</th>\
                                            <th class="icon-rupee-icn" style="font-weight:900;"> '+ convertToINR(result_json.total_sale_value) +'</th>\
                                        </tr>\
                                    </tfoot>\
                                </table>\
                            </div>\
                            ';
                    $('.modal-body').html(html);
                },
                error:function(result){
                    alert(result);

                }
            })
}

function refundAmount(id,url){ 
     if (confirm('Are you sure you want to cancel booking? ') === false) {
        return;
    }
   
    $.ajax({
        url: url,
        method:'POST',
        //type:'GET',
        //contentType: "text/plain",
        data:{
            "unit_id":id
        },

        success: function(data){ 
            console.log(data);
            if(data !=1){
                alert("Issue while cancelling the book. Please contact Administrator for further process"); 
            }else{
                //location.reload(); /////------------load the page
                window.location= "canclebooking.php";
            }
        },
        error: function(transport){
            alert('Could not connect to CommonFloor Server for this request');
        },
        complete:function(){
        }
    });
}

function goToNextStep(anchor ,divClass)
{   

    var flag =true;
    $('form').submit();
   
   if(divClass!='buyerDetails' &&  $( ".buyerDetails li.parsley-required").length){
    
       $("#acc-1").click();
    }
    else
    {
       $('.'+divClass).find('input, select').each(function(index) {
            if($(this).val()=='' || $(this).hasClass("parsley-error")){
               flag =false;
            }
        });

       if(divClass == 'unitDetails' && flag)
        {
             $('#acceptterm').attr('data-parsley-required', 'true');
        }

        $("input[name='makePayment']").val('0');
        if(flag)
            $("#"+anchor).click(); 
    }

    
}

function addValidation(anchor ,divClass)
{   
    $('#acceptterm').attr('data-parsley-required', 'true');
}

function makeUnitPayment()
{ 
    if($('#acc-1').attr('aria-expanded')=='false' &&  $( ".buyerDetails li.parsley-required").length){
       $("#acc-1").click();
    }

     if($("input[name='makePayment']").val()==0)
        return false;
}

function updateTextValue()
{
    if(!$( ".buyerDetails li.parsley-required").length){
     $("input[name='makePayment']").val('1');
    }
}

 
function convertToINR(val)
{
    var x=val.toString();
    var afterPoint = '';
    if(x.indexOf('.') > 0)
       afterPoint = x.substring(x.indexOf('.'),x.length);
    x = Math.floor(x);
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;

    return res;
}

