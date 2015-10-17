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
                        component_entry +=  "<td class='icon-rupee-icn'> "+result_json.components[component_no].amount+"</td>";  
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
                                            <th class="icon-rupee-icn" style="font-weight:900;"> '+ result_json.total_sale_value +'</th>\
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
                        
                        milestone_entry +=  "<td class='icon-rupee-icn'> "+result_json.milestones[payData[i][1]].amount+"</td>";  
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
                                            <th class="icon-rupee-icn" style="font-weight:900;"> '+ result_json.total_sale_value +'</th>\
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

function goToNextStep(anchor)
{
    $("#"+anchor).click();
}

function validateForm()
{
    var name = $("input[name='contact_name']").val();
    var email = $("input[name='contact_email']").val();
    var mobile = $("input[name='contact_mobile']").val();
    var err = 0;
    if(name=='')
    {
        alert('Enter Your Name');
        $("#acc-1").click();
        err++;
    }
    else if(email=='')
    {
        alert('Enter Your Email');
        $("#acc-1").click();
        err++;
    }
    else if(mobile=='')
    {
        alert('Enter Your Phone');
        $("#acc-1").click();
        err++;
    }
    else if(!$("input[name='acceptterm']").is(':checked'))
    {
        alert('Accept terms and condition to proceeed ');
        err++;
    }
 

    if(err==0)
    {
        $('form').submit();
    }

}


