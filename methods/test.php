<?php

include('../methods/functions.php');
?>
<html>
	<head>
		<script type="text/javascript" src="/methods/bower_components/underscore/underscore.js"></script>
		<script type="text/javascript" src="/methods/bower_components/jquery/dist/jquery.min.js"></script>
		<script type="text/javascript" src="/methods/bower_components/backbone/backbone.js"></script>
		<script type="text/javascript" src="/methods/bower_components/Faker/build/build/faker.min.js"></script>
		<script type="text/javascript" src="/methods/project.entity.js"></script>
		<script type="text/javascript" src="/methods/building.entity.js"></script>
		<script type="text/javascript" src="/methods/unit.entity.js"></script>
		<script type="text/javascript" src="/methods/apartment.variant.entity.js"></script>
		<script type="text/javascript" src="/methods/settings.entity.js"></script>

	</head>	
	<body>

		Hello CommonFloor...................!!!!!!!!!!!!!!!!!!!
		<br/>
		<br/>
		<div class="show">1. Display Project Attributes</div>

		<br/>
		<div class="show_buildings">2. Display Buildings</div>
		<br/>
		<div class="show_rotation">3. Display 3d View of a project</div>
		<br/>
		
		<div class="div_show" style="display:none"><input type="text" name="project_id" id="project_id" value="" /><input type="button" name="show" id="show" value="Show" /></div>
		<div class="output"></div></br>
		<div class="output_buildings"></div>
		<div class="output_count"></div>


	</body>
</html>

<script type="text/javascript">
jQuery(document).ready(function($) {

	



	
	window.project  = new Project;
	window.buildingCollection  = new BuildingCollection;
	window.unitCollection  = new UnitCollection;
	window.building = new Building;
	window.apartmentVariantCollection  = new ApartmentVariantCollection;
	window.settings  = new Settings;
	
	

	$('.show').on('click' , function(x){

		
		

		$('.div_show').show();
		

		



	});

	$('#show').on('click' , function(x){

		id = $('#project_id').val();

		response = project.setProjectAttributes({},id);

	});



	project.on('sync', function() {

		    html = "<ul>";
		    $.each(project.toJSON(),function(index,value){

				html += '<li>'+index+':'+JSON.stringify(value)+'</li>';

			})
			$('.output').html(html);
		    $('.output_buildings').html("");
		    $('.output_count').html("");
		    if(jQuery.isEmptyObject(project.toJSON()))
		    	$('.output').html('Data not available');

		   
	});
	
	$('.show_buildings').on('click' , function(x){

		
		if(jQuery.isEmptyObject(project.toJSON()))
		{
			$( ".show" ).trigger( "click" );
			return false;
		}
			
		id = project.get('aj_id');
		response = buildingCollection.setBuildingAttributes({},id);
		
		
		


	});

	buildingCollection.on('sync', function() {
		
		
		html = "";
		
		
		$.each(buildingCollection.toArray(),function(index,value){

			value = value.toJSON();
			html += '<a href="#" class="tower" data-id="'+value.building_id+'">'+value.building_name+'</a><input class="show_rotation_building "type="button" data-id="'+value.building_id+'" id="rotation" value="Rotation" /><ul>';
			$.each(value,function(ind,val){

				html += '<li>'+ind+':'+JSON.stringify(val)+'</li>';

			});

			html += '</ul></br>';

		});
		var aj_id = project.get('aj_id');
		
		
		
		
		$('.output_buildings').html(html);

	});
		


	$('body').on('click','a.tower', function(e){
		e.preventDefault();
		var aj_id = project.get('aj_id');
		var id = $(e.target).attr('data-id');
		settings.setSettingsAttributes({},aj_id)
		unitCollection.setUnitAttributes({},aj_id);
		apartmentVariantCollection.setApartmentVariantAttributes({},aj_id)
		
		response = building.getUnitTypecount(id);
		html = "";
		if(response.length  != 0)
		{
			$.each(response,function(index,value){

				html += value.name+' = '+value.count+'</br>';

			}) 
		}

		units = unitCollection.where({'building_id':parseInt(id)})
		budget = []
		$.each(units,function(index,value){
			unitVariant = apartmentVariantCollection.findWhere({'variant_id' : parseInt(value.get('unit_variant')) })
			unitPrice  = unitVariant.findUnitPrice(value);
			budget.push(unitPrice);


		})
		minValue = _.min(budget);
		html += '</br>Starting Price '+minValue;

		$('.output_count').html(html);




	});

	$('.show_rotation').on('click' , function(x){
		if(jQuery.isEmptyObject(project.toJSON()))
		{
			$( ".show" ).trigger( "click" );
			return false;
		}
		id = project.get('aj_id');
		project.setProjectAttributes({},id);
		response = project.checkRotationView()
		if(response == 'yes')
			$('.output_count').html('Rotation Available');
		else
			$('.output_count').html('Rotation not Available');

		$( "#show" ).trigger( "click" );


	})

	$('body').on('click','.show_rotation_building', function(e){
		if(buildingCollection.length == 0)
		{
			$( ".show_buildings" ).trigger( "click" );
			return false;
		}
		id = $(e.target).attr('data-id');
		response = building.checkRotationView(id);
		if(response == 'yes')
			$('.output_count').html('Rotation Available');
		else
			$('.output_count').html('Rotation not Available');

		$( "#show" ).trigger( "click" );


	})

	
	
});
</script>