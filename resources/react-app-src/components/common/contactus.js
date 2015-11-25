var React = require('react');
var forms = require('newforms');
var request = require('superagent');
var classNames = require('classnames');

var SignupForm = forms.Form.extend({
	name: forms.CharField({
			widget: forms.TextInput({attrs: {placeholder: 'Name'}}),
			errorMessages: {required: 'Please enter your name.'}
		}),
  	email: forms.EmailField({
			widget: forms.TextInput({attrs: {placeholder: 'Email ID'}}),
			errorMessages: {required: 'Please enter your email ID.'}
  		}),
  	phone: forms.CharField({
  			required: false,
  			widget: forms.TextInput({attrs: {placeholder: 'Mobile'}})
  	})
});

var ContactUs = React.createClass({

	getInitialState: function() {
		return {
			"successfulSubmission": false, 
			"formSubmit":false
		};
	},

	_onSubmit: function(e){
		e.preventDefault();

	    var form = this.refs.signupForm.getForm();
	    var isValid = form.validate();
	    
	    if (isValid) {
	    	this.submitContactData(form.cleanedData);

	    }
	},

	submitContactData: function(data){

		var dataToSubmit = {
		    "toemail": window.builder_email,
		    "toname": window.project_title,
		    "name": data["name"],
		    "email": data["email"],
		    "phone": "",
		    "pan_card": "",
		    "buyer_type": "",
		    "address1": "",
		    "address2": "",
		    "city": "",
		    "state": "",
		    "country": "",
		    "pincode": ""
		}
		
		if(data.hasOwnProperty("phone")){
			dataToSubmit["phone"] = data["phone"];
		}

	  	var apiUrl = '/api/v2/';
	  	var url = window.baseUrl + apiUrl + 'addlead';
	  	var success =  request
	   					.post(url)
	   					.send(dataToSubmit)
	   					.set('X-Authorization', window.unitSelectorAuthKey)
	   					.set('Accept', 'application/json')
	   					.end(function(err, res){
						     if(res.ok) {
						        this.setState({"successfulSubmission": true, "formSubmit":true});
						        this.props.hideContactModal();

						     }
						     else {
						       this.setState({"successfulSubmission": false, "formSubmit":true})
						     }
	   					}.bind(this));
			
	},	
  	
  	render: function() {

  		var errorClass = classNames({
  			"successMsg" : (this.state.formSubmit)&&(this.state.successfulSubmission),
  			"errorMsg":(this.state.formSubmit)&&(!this.state.successfulSubmission),
  			"hidden": (!this.state.formSubmit)&&(!this.state.successfulSubmission)
  		})

  		var message = "";

  		if((this.state.formSubmit)&&(this.state.successfulSubmission)){
  			message = "Successfully submitted";
  		}else{
  			message = "Not Successfully submitted";	
  		}
		return (
			<form onSubmit={this._onSubmit} >
		  		<forms.RenderForm 
		  			form={SignupForm} 
		  			ref="signupForm"
		  			className = "p-0 col-lg-12 inputOuter"
		  		/>
		  		<div className="p-0 col-lg-12 proceedBtn text-center">
		  			<button className="btn btn-default btn-primary text-uppercase">Submit</button>
		  		</div>
		  		<div className={errorClass}>{message}</div>
			</form>

		);
	}
});

module.exports = ContactUs;
  