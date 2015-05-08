<html> 
<body>

        <canvas id="c" width="600" height="500" style="border:1px solid #ccc"></canvas>

<textarea name="coords2" rows=3 class="area" disabled 
        placeholder="Shape Coordinates"
       >299,84,297,92,285,98,275,109,271,123,273,141,287,156,311,162,333,156,345,142,346,126,340,107,321,92,314,89,309,81</textarea>
       <!--  <input type="hidden"  class="area" value="208,221,208,202,198,199,201,191,218,176,229,155,221,132,196,117,169,131,157,158,163,172,177,164,173,180,190,185,192,199,187,201,185,222">
 -->

<script type="text/javascript">
	
	svgImg = '{{$svgImage}}';

</script>

<script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
<script src="{{ asset('bower_components/fabric/dist/fabric.min.js' )}}"></script>
<!-- <script src="{{ asset('js/jquery.canvasAreaDraw.min.js' )}}"></script> -->
<script src="{{ asset('js/authoring-tool/master/svg.authoring.controller.js' )}}"></script>
</body>
</html>