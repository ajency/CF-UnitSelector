<script id="header-template" type="text/template">
       <div class="row inner-pages" id="page-header">
          <header class="cf-hdr-blk">
              <div class="top-nav-wrp">
                  <nav class="header-nav row">
                      <div class="col-md-4 col-xs-4">
                          <div class="row">
                              <ul class="header-left-content">
                                  <li>
                                      <div class="">
                                          <a title="Unit Selector" href="/" class="cf-us-logo"></a>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="col-md-8 col-xs-8">
                          <div class="row">
                              <ul class="header-right-content">
                                  <li>
                                      <div class="cf-sell-wrp">
                                          <span class="cf-btn cf-sell-btn addCft">
                                              Call us 89555444
                                          </span>
                                      </div>
                                    </li>
                                    <li>
                                      <div class="shortlist-wrp"></div>
                                    </li>
                                    <!--<li>
                                    <div class="cf-login">
                                          <a class="cf-lnk " href="javascript:void(0);">
                                            <span class="text-label" id="setUserName">Log In/Sign Up</span>
                                          </a>
                                      </div>
                                  </li>-->
                              </ul>
                          </div>
                      </div>

                  </nav>
              </div>
          </header>
      </div>
</script>

<script id="project-template" type="text/template">
        <div ui-region="top" id="topregion" class="us-header"></div>
        <div ui-region="filter" id="filterregion" class="filters-area"></div>
        <div class="container-fluid">
            <div class="row">
                <div ui-region="left" id="leftregion">
                </div>
               
                <div ui-region="center" id="centerregion">
                </div>
            </div>
        </div>
</script>

<script id="noFound-template" type="text/template">
    <div class="no-found-container">
      <div class="text-center animated fadeInDown">
        <h1>Nothing Found</h1>
      </div>
    </div>
  </script>

<script id="project-view-template" type="text/template">
    <div ui-region="top" id="topregion" class="us-header"></div>
    <div ui-region="filter" id="filterregion" class="filters-area"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-0 us-left-content mobile not-visible">
          <div ui-region="left" id="leftregion"></div>
        </div>
        <div ui-region="center" id="centerregion"></div>
      </div>
    </div>
</script>

<script id="unit-view-template" type="text/template">
      <div ui-region="top" id="topregion" class="us-header">
      </div>
      <div class="container-fluid">
        <div class="row">
          <div ui-region="left" id="leftregion">
          </div>
          <div ui-region="center" id="centerregion">
          </div>
        </div>

    </div>
</script>

<script id="main-template" type="text/template">

          <div ui-region="top" id="topregion">
            <div class="aj-imp-builder-area">
                <div class="builder-header">
                    <div class="header-sections">
                        <div class="aj-imp-browser-address-bar clearfix">
                            <h4><span>SVG</span> PROJECT MASTER</h4>
                        </div>

                        <button class="color-switch btn btn-default">
                            <i class="fa fa-eye"></i>
                            <div><small>PREVIEW</small>

                        </button>
                        <div class='pending'>

                        </div>

                        </div>
                    </div>

                    <div class="aj-imp-browser-preview">
                        <!-- browser body-->
                        <div class="zoom-controls">
                            <button id="in" class="zoom-in">in</button>
                            <button id="out" class="zoom-out">out</button>
                            <button id="save-svg-elem">save</button>
                            <input type="hidden" namaj-imp-builder-drag-drope="svg-element-id">
                        </div>

                     </div>
                  </div>
               </div>
               
            
            </div> 
          </div>

          
          <div ui-region="center" id="centerregion">
              <div>
            <div id="aj-imp-browser-body">
            <nav role='navigation' class="aj-navbar">
                  <div class="toggle">
                    <span class="container">
                     <i class="fa fa-plus"></i>
                    </span>
                  </div>
                  <div class="menu">
                    <ul class="menu-block">
                      <li><a><i class="fa fa-area-chart"></i> Polygon</a></li>
                      <li><a><i class="fa fa-map-marker"></i> Marker</a></li>
                    </ul>
                  </div>
                </nav>
                            <div id="aj-imp-builder-drag-drop" class="svg-canvas">
                               <textarea name="coords2" style="display:none" rows=3 class="area" disabled placeholder="Shape Coordinates" data-image-url="{{$svgImage}}"></textarea>

  
                            </div>
                       </div>
                       

                   
                    <div class="aj-imp-browser-footer">
                        <ul class="text-center tags list-inline">
                            <li><span class="tag-sold"></span>&nbsp;&nbsp;SOLD</li>
                            <li><span class="tag-available"></span>&nbsp;&nbsp;AVAILABLE</li>
                            <li><span class="tag-blocked"></span>&nbsp;&nbsp;BLOCKED</li>
                            <li><span class="tag-not"></span>&nbsp;&nbsp;NOT RELEASED</li>
                            <li><span class="tag-marked"></span>&nbsp;&nbsp;MARKED</li>
                        </ul>
                    </div>
                </div>
          </div>

        </script>

        