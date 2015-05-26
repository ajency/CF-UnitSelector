(function() {
  jQuery(document).ready(function($) {
    window.svgData = {
      'image': '',
      'data': [
        {
          'id': 1,
          'type': 'villa',
          'name': 'Villa 1',
          'canvas_type': 'polygon',
          'details': {
            'class': 'marked'
          },
          'points': ["359", "332", "418", "365", "345", "359"]
        }, {
          'id': 2,
          'type': 'villa',
          'name': 'Villa 2',
          'canvas_type': '',
          'details': '',
          'points': []
        }, {
          'id': 3,
          'type': 'villa',
          'name': 'Villa 3',
          'canvas_type': 'polygon',
          'details': {
            'class': 'marked'
          },
          'points': ["425", "485", "459", "501", "457", "547", "408", "550"]
        }, {
          'id': 4,
          'type': 'villa',
          'name': 'Villa 4',
          'canvas_type': 'polygon',
          'details': {
            'class': 'marked'
          },
          'points': ["629", "490", "667", "476", "704", "474", "709", "499", "706", "536", "635", "539"]
        }, {
          'id': 5,
          'type': 'villa',
          'name': 'Villa 5',
          'canvas_type': '',
          'details': '',
          'points': []
        }, {
          'id': 6,
          'type': 'building',
          'name': 'Building 1',
          'canvas_type': '',
          'details': '',
          'points': []
        }
      ],
      'supported_types': ['villa', 'building']
    };
    window.createSvg = function(svgData) {
      window.rawSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      rawSvg.setAttribute('id', 'Layer_1');
      rawSvg.setAttribute('style', 'border: 1px solid black');
      rawSvg.setAttribute('width', '100%');
      rawSvg.setAttribute('height', '100%');
      rawSvg.setAttributeNS(null, 'x', '0');
      rawSvg.setAttributeNS(null, 'y', '0');
      rawSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
      window.createImageTag();
      return $.each(svgData, function(index, value) {
        var tag;
        if (value.canvas_type === 'polygon') {
          tag = window.polygon.createPolgyonTag(value);
          if (!_.isEmpty(tag)) {
            rawSvg.appendChild(tag);
          }
        }
        if (value.type === 'marker') {
          return window.marker.createMarkerTag(value);
        }
      });
    };
    window.createImageTag = function() {
      var svgimg;
      svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      svgimg.setAttributeNS(null, 'height', '100%');
      svgimg.setAttributeNS(null, 'width', '100%');
      svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', svgImg);
      svgimg.setAttributeNS(null, 'x', '0');
      svgimg.setAttributeNS(null, 'y', '0');
      svgimg.setAttributeNS(null, 'visibility', 'visible');
      return rawSvg.appendChild(svgimg);
    };
    window.createPanel = function(data) {
      return $.each(data, function(index, value) {
        return $('.' + value).removeClass('hidden');
      });
    };
    window.makeDraggable = function(data) {
      var element;
      element = draw.polygon(data);
      return element.draggable();
    };
    window.getPendingObjects = function(svgData) {
      var collection, supportedTypes, type;
      type = [];
      collection = new Backbone.Collection(svgData.data);
      supportedTypes = svgData.supported_types;
      supportedTypes = _.uniq(supportedTypes);
      $.each(supportedTypes, function(index, value) {
        var items, marked;
        items = collection.where({
          'type': value
        });
        marked = [];
        $.each(items, function(ind, val) {
          if (!_.isEmpty(val.get('canvas_type'))) {
            return marked.push(val);
          }
        });
        return type.push({
          'name': value,
          'id': value,
          'total': items.length,
          'marked': marked.length
        });
      });
      $.each(type, function(index, value) {
        if (value.total === 0) {
          return type = _.without(type, value);
        }
      });
      return type;
    };
    return window.showPendingObjects = function(data) {
      var html;
      html = '';
      $.each(data, function(index, value) {
        return html += '<strong class="pull-right" style="line-height:70px;margin-right: 20px;  color: #FF7E00;">' + 'Marked: ' + value.marked + ' ' + value.name + '(s) | Total : ' + value.total + ' ' + value.name + '(s)</strong>';
      });
      return $('.pending').html(html);
    };
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/common.js.map