#View and Controller for a plot
#Function to show the details of a plot if marked
#event handler functions

class AuthoringTool.AmenityView extends Marionette.ItemView

    template : Handlebars.compile('<form id="add-form">
                    <div class="form-group">
                            <label for="markerTitle">Title</label>
                            <input type="text" class="form-control" id="amenity-title">
                    </div>
                    <div class="form-group">
                        <label for="Description">Description</label>
                        <textarea class="form-control" rows="3" id="amenity-description"></textarea>
                    </div>
                </form>')

class AuthoringTool.AmenityCtrl extends Marionette.RegionController

    initialize :(opts)->
        @show new AuthoringTool.AmenityView