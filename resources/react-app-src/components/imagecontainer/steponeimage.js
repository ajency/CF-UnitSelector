var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var SvgContainer = require('../project-master/svgcontainer');
var Loader = require('../common/loader');
var immutabilityHelpers = require('react-addons-update');
var Router = require('react-router-component');

var PROJECTID = window.projectId;
var BASEURL = window.baseUrl;


var svgData = {
    svgClasses: {
      'svg-area': true,
       'hide': false
    },
    hideSoloImage: false,
    isRotate: false
};

var svgKeyType = "breakpoint";

var SteponeImage = React.createClass({

    mixins: [Router.NavigatableMixin],

    getInitialState: function() {
        return svgData;
    },

    getImageFrames: function(){
        var frames;
        var imageType = this.props.imageType;

        var digitsInName = 2;

        path = this.getMasterImagePath(imageType);
        imagePath = path["imagePath"];

        var projectMasterImgUrl = imagePath;

        if(!_.isEmpty(imagePath)){
            frames = SpriteSpin.sourceArray(projectMasterImgUrl, {
             frame: [0, 35],
             digits: digitsInName
            });
        }

        return frames;
    },

    panToZoomedGroup: function(){
        var $imageContainerDom = $(this.refs.imageContainer);

        // get rectangle to select
        cardListForId = this.props.cardListForId
        selectorClass = ".floor_group"+cardListForId;

        rect = $(selectorClass)[0].getBoundingClientRect();

        // panTo = 0-rect.top;
        panTo = 0-rect.top;

        $imageContainerDom.panzoom("pan", 0, panTo, {
                      relative: false,
                      animate: true
                  });

        // $imageContainerDom.panzoom("resetPan", {
        //   animate: false,
        //   silent: true
        // })
        // $imageContainerDom.panzoom("pan", 0, panTo);
    },

    navigateOntap: function(targettedId){
        var imageType = this.props.imageType;
        var notLiveBuildings = this.props.notlive_buildings;
        var notLiveBuildingsIdsToMark = [];

        // if(notLiveBuildings.length > 0){

        //     notLiveBuildingsIdsToMark = _.pluck(notLiveBuildings,'id');
        // }

        var availableBuildingIds = [];

        var buildings = this.props.buildings;

        _.each(buildings,function(building){
            availableUnits = building.availableUnitData;

            if(availableUnits.length>0){
                availableBuildingIds.push(building.id);
            }

        });

        id = parseInt(targettedId);

        // is clickable in case of master step one only if not present in not live buildings
        if((imageType === 'master')&&(_.indexOf(availableBuildingIds,id)>-1)){
           this.navigate('/buildings/'+id);
        }
        else if((imageType === 'buildingFloorGrps')&&(_.indexOf(availableBuildingIds,id)>-1)){
            this.navigate('/buildings/'+this.props.cardListForId+'/group/'+id);
        }
        else if(imageType === 'singleFloorGroup'&&(_.indexOf(availableBuildingIds,id)>-1)){
            this.navigate('/units/'+id);
        }

    },

    applyPanzoom: function(){
        var $imageContainerDom = $(this.refs.imageContainer);
        var imageType = this.props.imageType;
        var panZoomSettings;
        var cardListFor = this.props.cardListFor;
        var cardListForId = this.props.cardListForId;
        var selectorClass, panTo;


        // if not step 3
        if(cardListFor==="project"){
            if(!window.isMobile){
                panZoomSettings = {
                     startTransform: 'scale(1.0)',
                     contain: 'invert',
                     minScale: 1,
                     disablePan: false,
                     disableZoom: false
                };

                $imageContainerDom.panzoom(panZoomSettings);

                $imageContainerDom.on('panzoomend', function(e, panzoom, matrix, changed) {
                    if (changed) {
                        // deal with drags or touch moves

                        // show correct tooltip
                        this.displayHighlightedTooltip();

                    } else {
                        // deal with clicks or taps
                        // show correct tooltip
                        this.navigateOntap(e.target.id);

                    }
                }.bind(this));
            }
        }
        else if(cardListFor==="building"){

            panZoomSettings = {
                 startTransform: 'scale(1.0)',
                 contain: 'invert',
                 minScale: 1,
                 disablePan: false,
                 disableZoom: false
            };

            $imageContainerDom.panzoom(panZoomSettings);

            if(window.isMobile){
              $imageContainerDom.panzoom("setMatrix", [1.1, 0, 0, 1.1, -285, 9]);
            }

            $imageContainerDom.on('panzoomend', function(e, panzoom, matrix, changed) {
                if (changed) {
                    // deal with drags or touch moves

                    // show correct tooltip
                    this.displayHighlightedTooltip();

                } else {
                    // deal with clicks or taps
                    // show correct tooltip
                    this.navigateOntap(e.target.id);

                }
            }.bind(this));
        }
        else if(cardListFor==="group"){

            if(window.isMobile){
                panZoomSettings = {
                     startTransform: 'scale(1.0)',
                     contain: 'invert',
                     minScale: 1,
                     disablePan: false,
                     disableZoom: false
                };

                $imageContainerDom.panzoom(panZoomSettings);
                $imageContainerDom.panzoom("setMatrix", [1.1, 0, 0, 1.1, -350, 9]);
            }
            else{
                panZoomSettings = {
                        minScale : 0,
                        contain: "invert",
                        startTransform: 'scale(1.5)'
                        }

                $imageContainerDom.panzoom(panZoomSettings);
            }

            $imageContainerDom.on('panzoomend', function(e, panzoom, matrix, changed) {
                if (changed) {
                    // deal with drags or touch moves

                    // show correct tooltip
                    this.displayHighlightedTooltip();

                } else {
                    // deal with clicks or taps
                    // show correct tooltip
                    this.navigateOntap(e.target.id);

                }
            }.bind(this));

        }


    },

    applySpriteSpin: function(){

        frames = this.getImageFrames();

        var spin = $('#spritespin');

        spin.spritespin({
            source: frames,
            width: 1920,
            sense: -1,
            height: 1080,
            animate: false,
            onLoad: function(){
                // hide solo image
                oldState = this.state;
                newState = oldState;
                newState = immutabilityHelpers( oldState, {hideSoloImage: {$set: true} });

                if(this.isMounted()){
                    this.setState(newState);
                }

                // show spritespin
            }.bind(this),
            onFrame: function(e, data){
                // destroy existing tooltips;
                this.props.destroyTooltip();

                if(data.frame !== data.stopFrame){

                    oldState = this.state;
                    newState = oldState;
                    newState = immutabilityHelpers( oldState, {svgClasses:
                                                                {hide: {$set: true}
                                                              }
                                });

                    if(this.isMounted()){
                        this.setState(newState);
                    }
                }
            }.bind(this)
        });

        spin.bind("onAnimationStop", function(){
            // update image state data
            var that = this;

            oldState = this.state;
            newState = oldState;
            newState = immutabilityHelpers( oldState, {svgClasses:
                                                        {hide: {$set: false}
                                                      }
                        });
            newState = immutabilityHelpers( newState,{isRotate: {$set: false} });

            if(that.isMounted()){
                that.setState(newState);
            }

            buildingToHighlight = this.props.buildingToHighlight;

            if(!_.isUndefined(buildingToHighlight)){
                this.displayHighlightedTooltip();
            }

            // check if shadow image was selected previously and set state accordingly
            if(window.prevShadowState){
                this.props.updateRotateShadow(window.prevShadowState);
                window.prevShadowState = false;
            }

        }.bind(this));


        api = spin.spritespin("api");

        chosenBreakPoint = this.props.chosenBreakpoint;
        api.playTo(chosenBreakPoint);

    },

    displayHighlightedTooltip: function(){
        var baseSelector , imageType;
        var buildingToHighlight = this.props.buildingToHighlight;

        if(_.isUndefined(buildingToHighlight)){
            return;
        }

        imageType = this.props.imageType;

        if(imageType === "master"){
          baseSelector = '.building';
        }
        else if(imageType === "buildingFloorGrps"){
          baseSelector = '.floor_group';
        }
        else{
          baseSelector = '.apartment';
        }

        highlightedBuildingSelector = baseSelector+buildingToHighlight.id;
        highlightedBuildingName = buildingToHighlight.building_name;

        this.props.showTooltip(highlightedBuildingName,highlightedBuildingSelector,false);
    },


    componentDidMount: function() {

        var breakpoints = this.props.breakpoints;
        var imageType = this.props.imageType;

        this.applyPanzoom();

        // decide whether or not to initialise spritespin, if breakpoints length is 1 the no need of spritespin
        if(breakpoints.length>1){
            this.applySpriteSpin();
        }

    },

    componentDidUpdate: function(prevProps, prevState) {
        spin = $("#spritespin");
        data = spin.spritespin("data");

        breakpoints = this.props.breakpoints;

        if(_.isUndefined(data)&&(breakpoints.length>1)){
            this.applySpriteSpin();
        }
    },

    getMasterImagePath: function(imageType){
        var imagePath="";
        var baseImagePath="";
        var masterImagePrefix = "master-";

        if(imageType==="master"){
          baseImagePath = BASEURL+'/projects/'+window.projectId+'/'+imageType+'/';
          imagePath = baseImagePath+masterImagePrefix+'{frame}.jpg';
        }
        else{
          buildingId = this.props.buildingId;

          baseImagePath = BASEURL+'/projects/'+window.projectId+'/buildings/'+buildingId+'/';

          imagePath = baseImagePath+masterImagePrefix+'{frame}.jpg';

        }

        return {"imagePath":imagePath,"baseImagePath":baseImagePath};

    },

    rotateSpriteSpin: function(){
        var breakpoints = [];
        var spin, nextbreakpoint, oldState, newState;
        var stateDataChanges = [];

        // update image state data
        oldState = this.state;
        newState = immutabilityHelpers( oldState, {isRotate: {$set: true} });
        this.setState(newState);

        // destroy existing tooltips;
        this.props.destroyTooltip();

        prevShowShadow = this.props.showShadow;

        // store previous shadow state, to later use it to update main shadow state
        window.prevShadowState = prevShowShadow;

        if( this.props.showShadow ){

            dataToSet = {
                property: "showShadow",
                value: false
            }
            stateDataChanges.push(dataToSet);

            // this.props.updateRotateShadow(false);
        }

        breakpoints = this.props.breakpoints;
        currentBreakpoint = parseInt(this.props.chosenBreakpoint);

        // find index of current breakpoint in the array of breakpoints and play sprite spin to the next breakpoint
        indexOfCurrent = _.indexOf(breakpoints, currentBreakpoint);

        if(indexOfCurrent === breakpoints.length-1){
            nextbreakpoint = breakpoints[0];
        }else{
            nextbreakpoint = breakpoints[indexOfCurrent+1];
        }

        spin = $('#spritespin');
        api = spin.spritespin("api");
        api.playTo(nextbreakpoint);

        // update chosen breakpoint in the state data
        dataToSet = {
            property: "chosenBreakpoint",
            value: nextbreakpoint
        };
        stateDataChanges.push(dataToSet);
        this.props.updateStateData(stateDataChanges);

        // this.props.updateChosenBreakPoint(nextbreakpoint);
    },

    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    componentWillReceiveProps: function(nextProps) {
        prevBreakPoint = this.props.chosenBreakpoint;
        newBreakPoint = nextProps.chosenBreakpoint;

        applyFiltersSvgCheck = nextProps.applyFiltersSvgCheck;

        if((prevBreakPoint===newBreakPoint)&&(applyFiltersSvgCheck)){
            svgKeyType = "random";
        }
        else{
            svgKeyType = "breakpoint" ;
        }
    },

    render: function(){

        var domToDisplay;
        var windowHeight = window.innerHeight ;
        var svgKey;
        var isRotate;

        var imageContainerStyle;
        var imageContainStyle;

        isRotate = this.state.isRotate;


        var  parentContainerStyle ={
          "height" : windowHeight,
          "minWidth" : windowHeight * 1.78
        };

        var rotateClasses = classNames({
          'rotate': true,
          'hide': !this.state.hideSoloImage
        });

        if((this.props.cardListFor === "project")&&(window.isMobile)){
            imageContainStyle = {
                "height": "auto",
                "top": "inherit",
                "bottom": "152px"
            };
            imageContainerStyle = {
              "height": "auto"
            };
        }else{
            imageContainerStyle = {
              "height": windowHeight,
              "minWidth": windowHeight * 1.78
            };

            imageContainStyle = {
              "height": windowHeight
            };
        }





        showShadow = this.props.showShadow;

        var shadowImageClasses = classNames({
          'img-responsive': true,
          'fit': true,
          'no-shadow': true,
          'hide-shadow': showShadow,
          'hide': !this.state.hideSoloImage
        });

        var shadowClasses = classNames({
          'img-responsive': true,
          'shadow': true,
          'fit' : true,
          'disabled-shadow' : isRotate,
          'enabled-shadow' : !isRotate
        });

        var soloImageClasses = classNames({
            'img-responsive': true,
            'fadeInCls': true,
            'fit': true,
            'no-shadow': true,
            'hide-shadow': showShadow,
            'fadeInCls': true,
            'hide': this.state.hideSoloImage
        });

        var soloImgUrl = "#";
        var soloImgUrl = "#";

        var shadowImages = this.props.shadowImages;
        var shadowImgUrl = "#";
        shadowIndex = this.props.chosenBreakpoint;

        if(shadowImages.length>0){
            shadowImgUrl = shadowImages[shadowIndex];
        }

        var buildings = this.props.buildings;

        var buildingToHighlight = this.props.buildingToHighlight;
        if(_.isEmpty(buildingToHighlight)){
          if(buildings.length>0)
            buildingToHighlight = buildings[0];
          else
            buildingToHighlight = {}

        }


        path = this.getMasterImagePath(this.props.imageType);
        svgBaseUrl = path["baseImagePath"];

        frames = this.getImageFrames();
        soloImageUrl = frames[shadowIndex];


        if(svgKeyType==="random"){
            svgkey = parseInt(this.getRandomArbitrary(1,100));
        }
        else{
            svgkey = this.props.chosenBreakpoint;
        }

        cardListFor = this.props.cardListFor;
        cardListForId = this.props.cardListForId;

        faqUrl = window.baseUrl+"/html/TermsPrivacyFaq/faq.html";
        privacyUrl = window.baseUrl+"/html/TermsPrivacyFaq/privacy.html"

        imageContainClass = classNames({
            "loader-container": !this.state.hideSoloImage,
            "step3loader": this.props.cardListFor === "group",
            "image-contain": true
        })

        if(window.isMobile){

            if(this.props.cardListFor === "project"){
                imageContainerClass = classNames({
                  "image": true,
                  "step1MobileCls": true
                });
            }else{
                imageContainerClass = classNames({
                  "image": true,
                  "step1MobileCls": false
                });
            }
            domToDisplay = (

                <div className="us-right-content">
                    <div className={imageContainClass} style={imageContainStyle}>
                        <div ref="imageContainer" className={imageContainerClass} style={imageContainerStyle}>

                            <SvgContainer
                                ref="svgContainer"
                                key={svgkey}
                                svgData={this.state}
                                chosenBreakpoint={this.props.chosenBreakpoint}
                                buildings={ buildings}
                                notlive_buildings =  {this.props.notlive_buildings}
                                buildingToHighlight={buildingToHighlight}
                                imageType = {this.props.imageType}
                                svgBaseUrl = {svgBaseUrl}
                                showTooltip={ this.props.showTooltip}
                                updateUnitIndexToHighlight= {this.props.updateUnitIndexToHighlight}
                                applyFiltersSvgCheck = {this.props.applyFiltersSvgCheck}
                                updatefiltersSvgCheck = {this.props.updatefiltersSvgCheck}
                                cardListFor = {cardListFor}
                                cardListForId = {cardListForId}
                                panToZoomedGroup = {this.panToZoomedGroup}
                            />

                            <div ref="spritespin" id="spritespin" className={shadowImageClasses}></div>
                            <Loader hide={this.state.hideSoloImage}/>
                            <img
                                key={svgkey+1}
                                src={soloImageUrl}
                                className={soloImageClasses}
                            />
                            <img
                                src={shadowImgUrl}
                                key={svgkey+2}
                                className={shadowClasses}
                            />

                        </div>
                    </div>

                    <div ref="next" className={rotateClasses} onClick={this.rotateSpriteSpin}>

                    </div>
                </div>

            );
        }
        else{
            domToDisplay = (

                <div className="us-right-content" style={parentContainerStyle}>
                    <div className="footer">
                        <span className="poweredBy"> Powered By</span>

                        <span className="footerLogo"><img src="../images/cflogo.png"/><br/>commonfloor.com</span>
                        <br/>
                        <a href={faqUrl} target="_blank">FAQ  </a> | <a href={privacyUrl} target="_blank"> Privacy Policy</a>
                    </div>

                    <div className={rotateClasses}>
                        <i id="next" className="i-icon i-icon-rotate" onClick={this.rotateSpriteSpin}></i> Press To Rotate
                    </div>

                    <div ref="imageContain" className={imageContainClass} style={imageContainStyle}>
                        <div ref="imageContainer" className="image" style={imageContainerStyle}>

                            <SvgContainer
                                ref="svgContainer"
                                key={svgkey}
                                svgData={this.state}
                                chosenBreakpoint={this.props.chosenBreakpoint}
                                buildings={ buildings}
                                notlive_buildings =  {this.props.notlive_buildings}
                                buildingToHighlight={buildingToHighlight}
                                imageType = {this.props.imageType}
                                svgBaseUrl = {svgBaseUrl}
                                showTooltip={ this.props.showTooltip}
                                updateUnitIndexToHighlight= {this.props.updateUnitIndexToHighlight}
                                isFilterApplied = {this.props.isFilterApplied}
                                applyFiltersSvgCheck = {this.props.applyFiltersSvgCheck}
                                updatefiltersSvgCheck = {this.props.updatefiltersSvgCheck}
                                cardListFor = {cardListFor}
                                cardListForId = {cardListForId}
                                panToZoomedGroup = {this.panToZoomedGroup}
                                destroyTooltip = {this.props.destroyTooltip}
                            />

                            <div ref="spritespin" id='spritespin' className={shadowImageClasses}></div>
                            <Loader hide={this.state.hideSoloImage}/>
                            <img
                                key={svgkey+1}
                                src={soloImageUrl}
                                className={soloImageClasses}
                            />
                            <img
                                src={shadowImgUrl}
                                key={svgkey+2}
                                className={shadowClasses}
                            />

                        </div>
                    </div>
                </div>

            );
        }


        return domToDisplay;
    }
});

module.exports = SteponeImage;
