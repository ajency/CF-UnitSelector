var React = require('react');
var CardView = require('../project-master/cardview');
var NavBar = require('../project-master/navbar');

var SideBar = React.createClass({
  render: function () {
  	isFilterApplied = false;
  	buildings = [
	  {
	    "id": 2,
	    "building_name": "A1",
	    "phase_id": 1,
	    "no_of_floors": 6,
	    "floors": [],
	    "building_master": [],
	    "created_at": "2015-10-10 11:44:47",
	    "updated_at": "2015-10-10 11:44:47",
	    "breakpoints": [],
	    "abbrevation": "",
	    "has_master": "no",
	    "floor_rise": 123456,
	    "primary_breakpoint": 1,
	    "minStartPrice": 6,
	    "unitData": [
	      {
	        "id": 3,
	        "unit_name": "FC1",
	        "unit_variant_id": 2,
	        "position": 6,
	        "floor": 5,
	        "building_id": 2,
	        "created_at": "2015-10-10 11:52:45",
	        "updated_at": "2015-10-10 11:52:45",
	        "phase_id": 0,
	        "views": [
	          "Garden",
	          "Gym"
	        ],
	        "direction": "South",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 9,
	        "selling_amount": 14,
	        "unit_price": 14,
	        "unit_price_component": [],
	        "availability": "available"
	      },
	      {
	        "id": 4,
	        "unit_name": "FC2",
	        "unit_variant_id": 2,
	        "position": 3,
	        "floor": 4,
	        "building_id": 2,
	        "created_at": "2015-10-10 11:53:57",
	        "updated_at": "2015-10-10 11:54:53",
	        "phase_id": 0,
	        "views": [],
	        "direction": "South",
	        "agent_id": 0,
	        "booked_at": "2015-10-10 11:54:53",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 13,
	        "selling_amount": 6,
	        "unit_price": 10,
	        "unit_price_component": [],
	        "availability": "available"
	      },
	      {
	        "id": 11,
	        "unit_name": "FC10",
	        "unit_variant_id": 7,
	        "position": 6,
	        "floor": 4,
	        "building_id": 2,
	        "created_at": "2015-10-10 12:02:52",
	        "updated_at": "2015-10-10 12:02:52",
	        "phase_id": 0,
	        "views": [],
	        "direction": "Noth-East",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 6,
	        "selling_amount": 7,
	        "unit_price": 15,
	        "unit_price_component": [],
	        "availability": "available"
	      },
	      {
	        "id": 16,
	        "unit_name": "FC11",
	        "unit_variant_id": 7,
	        "position": 5,
	        "floor": 3,
	        "building_id": 2,
	        "created_at": "2015-10-12 07:51:27",
	        "updated_at": "2015-10-12 07:51:27",
	        "phase_id": 0,
	        "views": [],
	        "direction": "North",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 11,
	        "selling_amount": 13,
	        "unit_price": 6,
	        "unit_price_component": [],
	        "availability": "sold"
	      }
	    ],
	    "availableUnitData": [
	      {
	        "id": 3,
	        "unit_name": "FC1",
	        "unit_variant_id": 2,
	        "position": 6,
	        "floor": 5,
	        "building_id": 2,
	        "created_at": "2015-10-10 11:52:45",
	        "updated_at": "2015-10-10 11:52:45",
	        "phase_id": 0,
	        "views": [
	          "Garden",
	          "Gym"
	        ],
	        "direction": "South",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 9,
	        "selling_amount": 14,
	        "unit_price": 14,
	        "unit_price_component": [],
	        "availability": "available"
	      },
	      {
	        "id": 4,
	        "unit_name": "FC2",
	        "unit_variant_id": 2,
	        "position": 3,
	        "floor": 4,
	        "building_id": 2,
	        "created_at": "2015-10-10 11:53:57",
	        "updated_at": "2015-10-10 11:54:53",
	        "phase_id": 0,
	        "views": [],
	        "direction": "South",
	        "agent_id": 0,
	        "booked_at": "2015-10-10 11:54:53",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 13,
	        "selling_amount": 6,
	        "unit_price": 10,
	        "unit_price_component": [],
	        "availability": "available"
	      },
	      {
	        "id": 11,
	        "unit_name": "FC10",
	        "unit_variant_id": 7,
	        "position": 6,
	        "floor": 4,
	        "building_id": 2,
	        "created_at": "2015-10-10 12:02:52",
	        "updated_at": "2015-10-10 12:02:52",
	        "phase_id": 0,
	        "views": [],
	        "direction": "Noth-East",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 6,
	        "selling_amount": 7,
	        "unit_price": 15,
	        "unit_price_component": [],
	        "availability": "available"
	      }
	    ],
	    "filteredUnitData": [],
	    "supportedUnitTypes": [
	      "2BHK"
	    ]
	  },
	  {
	    "id": 3,
	    "building_name": "A2",
	    "phase_id": 1,
	    "no_of_floors": 8,
	    "floors": [],
	    "building_master": [],
	    "created_at": "2015-10-10 11:45:17",
	    "updated_at": "2015-10-10 11:45:17",
	    "breakpoints": [],
	    "abbrevation": "",
	    "has_master": "no",
	    "floor_rise": 332244,
	    "primary_breakpoint": 14,
	    "minStartPrice": 5,
	    "unitData": [
	      {
	        "id": 13,
	        "unit_name": "FC14",
	        "unit_variant_id": 5,
	        "position": 19,
	        "floor": 2,
	        "building_id": 3,
	        "created_at": "2015-10-10 12:04:20",
	        "updated_at": "2015-10-10 12:04:20",
	        "phase_id": 0,
	        "views": [],
	        "direction": "Noth-East",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 15,
	        "selling_amount": 5,
	        "unit_price": 5,
	        "unit_price_component": [],
	        "availability": "available"
	      },
	      {
	        "id": 17,
	        "unit_name": "FC15",
	        "unit_variant_id": 3,
	        "position": 5,
	        "floor": 6,
	        "building_id": 3,
	        "created_at": "2015-10-12 07:53:06",
	        "updated_at": "2015-10-12 07:53:45",
	        "phase_id": 0,
	        "views": [],
	        "direction": "South-West",
	        "agent_id": 0,
	        "booked_at": "2015-10-12 07:53:45",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 15,
	        "selling_amount": 9,
	        "unit_price": 15,
	        "unit_price_component": [],
	        "availability": "sold"
	      },
	      {
	        "id": 18,
	        "unit_name": "FC16",
	        "unit_variant_id": 2,
	        "position": 7,
	        "floor": 5,
	        "building_id": 3,
	        "created_at": "2015-10-12 07:55:05",
	        "updated_at": "2015-10-12 07:55:05",
	        "phase_id": 0,
	        "views": [],
	        "direction": "South",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 12,
	        "selling_amount": 7,
	        "unit_price": 12,
	        "unit_price_component": [],
	        "availability": "blocked"
	      },
	      {
	        "id": 19,
	        "unit_name": "FC17",
	        "unit_variant_id": 3,
	        "position": 4,
	        "floor": 4,
	        "building_id": 3,
	        "created_at": "2015-10-12 07:55:45",
	        "updated_at": "2015-10-12 07:55:45",
	        "phase_id": 0,
	        "views": [],
	        "direction": "North-West",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 7,
	        "selling_amount": 9,
	        "unit_price": 9,
	        "unit_price_component": [],
	        "availability": "available"
	      }
	    ],
	    "availableUnitData": [
	      {
	        "id": 13,
	        "unit_name": "FC14",
	        "unit_variant_id": 5,
	        "position": 19,
	        "floor": 2,
	        "building_id": 3,
	        "created_at": "2015-10-10 12:04:20",
	        "updated_at": "2015-10-10 12:04:20",
	        "phase_id": 0,
	        "views": [],
	        "direction": "Noth-East",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 15,
	        "selling_amount": 5,
	        "unit_price": 5,
	        "unit_price_component": [],
	        "availability": "available"
	      },
	      {
	        "id": 19,
	        "unit_name": "FC17",
	        "unit_variant_id": 3,
	        "position": 4,
	        "floor": 4,
	        "building_id": 3,
	        "created_at": "2015-10-12 07:55:45",
	        "updated_at": "2015-10-12 07:55:45",
	        "phase_id": 0,
	        "views": [],
	        "direction": "North-West",
	        "agent_id": 0,
	        "booked_at": "0000-00-00 00:00:00",
	        "property_type_group_id": 0,
	        "breakpoint": "",
	        "booking_amount": 7,
	        "selling_amount": 9,
	        "unit_price": 9,
	        "unit_price_component": [],
	        "availability": "available"
	      }
	    ],
	    "filteredUnitData": [],
	    "supportedUnitTypes": [
	      "2BHK",
	      "3BHK"
	    ]
	  }]
    buildingNodes = buildings.map(function(building,i){
                return(
                    <div key={i}>
                    <CardView  
                      building={building}
                      isFilterApplied={isFilterApplied}
                    /> 
                    </div>
                ); 
                     
            });

    return (
             <div id="sidebar-wrapper">
                <NavBar />
                <div id="content-1" className="content" >
                    <ul className="sidebar-nav">
                    	{buildingNodes}
                    </ul>
                </div>

            </div>
    )
  }
});

module.exports = SideBar;