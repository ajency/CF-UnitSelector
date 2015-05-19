(function() {
  $.fn.ajTooltip = function() {
    var reposition;
    return reposition = function() {
      var areaBottom, areaGreatestX, areaGreatestY, areaLeft, areaMeasurements, areaNumber, areaRight, areaShape, areaSmallestX, areaSmallestY, areaTop, areaWidth, areaXs, areaYs, arrayAlternate, arrowBorder, arrowBorderColor, arrowBorderSize, arrowClass, arrowColor, arrowConstruct, arrowReposition, borderWidth, dontGoOffScreenX, dontGoOffScreenY, i, leftDifference, map, mapName, mapOffsetLeft, mapOffsetTop, myLeft, myLeftMirror, myTop, newWidth, offsetX, offsetY, practicalPosition, proxy, self, tooltipBorderColor, tooltipBorderWidth, tooltipHeight, tooltipInnerWidth, tooltipWidth, topDifference, windowWidth;
      self = this;
      dontGoOffScreenX = function() {
        var arrowReposition, myLeft, windowLeft;
        windowLeft = $(window).scrollLeft();
        if (myLeft - windowLeft < 0) {
          arrowReposition = myLeft - windowLeft;
          myLeft = windowLeft;
        }
        if (myLeft + tooltipWidth - windowLeft > windowWidth) {
          arrowReposition = myLeft - (windowWidth + windowLeft - tooltipWidth);
          myLeft = windowWidth + windowLeft - tooltipWidth;
        }
      };
      dontGoOffScreenY = function(switchTo, switchFrom) {
        var tooltipBorderColor;
        var tooltipBorderWidth;
        var tooltipBorderColor;
        var tooltipBorderWidth;
        var tooltipBorderColor;
        var tooltipBorderWidth;
        var tooltipBorderColor;
        var tooltipBorderWidth;
        var arrowColor;
        var newWidth;
        var borderWidth;
        var topDifference;
        var leftDifference;
        var areaTop;
        var areaLeft;
        var myTop, practicalPosition;
        if (proxy.offset.top - $(window).scrollTop() - tooltipHeight - offsetY - 12 < 0 && switchFrom.indexOf('top') > -1) {
          practicalPosition = switchTo;
        }
        if (proxy.offset.top + proxy.dimension.height + tooltipHeight + 12 + offsetY > $(window).scrollTop() + $(window).height() && switchFrom.indexOf('bottom') > -1) {
          practicalPosition = switchTo;
          myTop = proxy.offset.top - tooltipHeight - offsetY - 12;
        }
      };
      if ($('body').find(self.$tooltip).length !== 0) {
        self.$tooltip.css('width', '');
        self.elProxyPosition = self._repositionInfo(self.$elProxy);
        arrowReposition = null;
        windowWidth = $(window).width();
        proxy = self.elProxyPosition;
        tooltipWidth = self.$tooltip.outerWidth(false);
        tooltipInnerWidth = self.$tooltip.innerWidth() + 1;
        tooltipHeight = self.$tooltip.outerHeight(false);
        if (self.$elProxy.is('area')) {
          areaShape = self.$elProxy.attr('shape');
          mapName = self.$elProxy.parent().attr('name');
          map = $('img[usemap="#' + mapName + '"]');
          mapOffsetLeft = map.offset().left;
          mapOffsetTop = map.offset().top;
          areaMeasurements = self.$elProxy.attr('coords') !== void 0 ? self.$elProxy.attr('coords').split(',') : void 0;
          if (areaShape === 'circle') {
            areaLeft = parseInt(areaMeasurements[0]);
            areaTop = parseInt(areaMeasurements[1]);
            areaWidth = parseInt(areaMeasurements[2]);
            proxy.dimension.height = areaWidth * 2;
            proxy.dimension.width = areaWidth * 2;
            proxy.offset.top = mapOffsetTop + areaTop - areaWidth;
            proxy.offset.left = mapOffsetLeft + areaLeft - areaWidth;
          } else if (areaShape === 'rect') {
            areaLeft = parseInt(areaMeasurements[0]);
            areaTop = parseInt(areaMeasurements[1]);
            areaRight = parseInt(areaMeasurements[2]);
            areaBottom = parseInt(areaMeasurements[3]);
            proxy.dimension.height = areaBottom - areaTop;
            proxy.dimension.width = areaRight - areaLeft;
            proxy.offset.top = mapOffsetTop + areaTop;
            proxy.offset.left = mapOffsetLeft + areaLeft;
          } else if (areaShape === 'poly') {
            areaXs = [];
            areaYs = [];
            areaSmallestX = 0;
            areaSmallestY = 0;
            areaGreatestX = 0;
            areaGreatestY = 0;
            arrayAlternate = 'even';
            i = 0;
            while (i < areaMeasurements.length) {
              areaNumber = parseInt(areaMeasurements[i]);
              if (arrayAlternate === 'even') {
                if (areaNumber > areaGreatestX) {
                  areaGreatestX = areaNumber;
                  if (i === 0) {
                    areaSmallestX = areaGreatestX;
                  }
                }
                if (areaNumber < areaSmallestX) {
                  areaSmallestX = areaNumber;
                }
                arrayAlternate = 'odd';
              } else {
                if (areaNumber > areaGreatestY) {
                  areaGreatestY = areaNumber;
                  if (i === 1) {
                    areaSmallestY = areaGreatestY;
                  }
                }
                if (areaNumber < areaSmallestY) {
                  areaSmallestY = areaNumber;
                }
                arrayAlternate = 'even';
              }
              i++;
            }
            proxy.dimension.height = areaGreatestY - areaSmallestY;
            proxy.dimension.width = areaGreatestX - areaSmallestX;
            proxy.offset.top = mapOffsetTop + areaSmallestY;
            proxy.offset.left = mapOffsetLeft + areaSmallestX;
          } else {
            proxy.dimension.height = map.outerHeight(false);
            proxy.dimension.width = map.outerWidth(false);
            proxy.offset.top = mapOffsetTop;
            proxy.offset.left = mapOffsetLeft;
          }
        }
        myLeft = 0;
        myLeftMirror = 0;
        myTop = 0;
        offsetY = parseInt(self.options.offsetY);
        offsetX = parseInt(self.options.offsetX);
        practicalPosition = self.options.position;
        if (practicalPosition === 'top') {
          leftDifference = proxy.offset.left + tooltipWidth - (proxy.offset.left + proxy.dimension.width);
          myLeft = proxy.offset.left + offsetX - (leftDifference / 2);
          myTop = proxy.offset.top - tooltipHeight - offsetY - 12;
          dontGoOffScreenX();
          dontGoOffScreenY('bottom', 'top');
        }
        if (practicalPosition === 'top-left') {
          myLeft = proxy.offset.left + offsetX;
          myTop = proxy.offset.top - tooltipHeight - offsetY - 12;
          dontGoOffScreenX();
          dontGoOffScreenY('bottom-left', 'top-left');
        }
        if (practicalPosition === 'top-right') {
          myLeft = proxy.offset.left + proxy.dimension.width + offsetX - tooltipWidth;
          myTop = proxy.offset.top - tooltipHeight - offsetY - 12;
          dontGoOffScreenX();
          dontGoOffScreenY('bottom-right', 'top-right');
        }
        if (practicalPosition === 'bottom') {
          leftDifference = proxy.offset.left + tooltipWidth - (proxy.offset.left + proxy.dimension.width);
          myLeft = proxy.offset.left - (leftDifference / 2) + offsetX;
          myTop = proxy.offset.top + proxy.dimension.height + offsetY + 12;
          dontGoOffScreenX();
          dontGoOffScreenY('top', 'bottom');
        }
        if (practicalPosition === 'bottom-left') {
          myLeft = proxy.offset.left + offsetX;
          myTop = proxy.offset.top + proxy.dimension.height + offsetY + 12;
          dontGoOffScreenX();
          dontGoOffScreenY('top-left', 'bottom-left');
        }
        if (practicalPosition === 'bottom-right') {
          myLeft = proxy.offset.left + proxy.dimension.width + offsetX - tooltipWidth;
          myTop = proxy.offset.top + proxy.dimension.height + offsetY + 12;
          dontGoOffScreenX();
          dontGoOffScreenY('top-right', 'bottom-right');
        }
        if (practicalPosition === 'left') {
          myLeft = proxy.offset.left - offsetX - tooltipWidth - 12;
          myLeftMirror = proxy.offset.left + offsetX + proxy.dimension.width + 12;
          topDifference = proxy.offset.top + tooltipHeight - (proxy.offset.top + proxy.dimension.height);
          myTop = proxy.offset.top - (topDifference / 2) - offsetY;
          if (myLeft < 0 && myLeftMirror + tooltipWidth > windowWidth) {
            borderWidth = parseFloat(self.$tooltip.css('border-width')) * 2;
            newWidth = tooltipWidth + myLeft - borderWidth;
            self.$tooltip.css('width', newWidth + 'px');
            tooltipHeight = self.$tooltip.outerHeight(false);
            myLeft = proxy.offset.left - offsetX - newWidth - 12 - borderWidth;
            topDifference = proxy.offset.top + tooltipHeight - (proxy.offset.top + proxy.dimension.height);
            myTop = proxy.offset.top - (topDifference / 2) - offsetY;
          } else if (myLeft < 0) {
            myLeft = proxy.offset.left + offsetX + proxy.dimension.width + 12;
            arrowReposition = 'left';
          }
        }
        if (practicalPosition === 'right') {
          myLeft = proxy.offset.left + offsetX + proxy.dimension.width + 12;
          myLeftMirror = proxy.offset.left - offsetX - tooltipWidth - 12;
          topDifference = proxy.offset.top + tooltipHeight - (proxy.offset.top + proxy.dimension.height);
          myTop = proxy.offset.top - (topDifference / 2) - offsetY;
          if (myLeft + tooltipWidth > windowWidth && myLeftMirror < 0) {
            borderWidth = parseFloat(self.$tooltip.css('border-width')) * 2;
            newWidth = windowWidth - myLeft - borderWidth;
            self.$tooltip.css('width', newWidth + 'px');
            tooltipHeight = self.$tooltip.outerHeight(false);
            topDifference = proxy.offset.top + tooltipHeight - (proxy.offset.top + proxy.dimension.height);
            myTop = proxy.offset.top - (topDifference / 2) - offsetY;
          } else if (myLeft + tooltipWidth > windowWidth) {
            myLeft = proxy.offset.left - offsetX - tooltipWidth - 12;
            arrowReposition = 'right';
          }
        }
        if (self.options.arrow) {
          arrowClass = 'tooltipster-arrow-' + practicalPosition;
          if (self.options.arrowColor.length < 1) {
            arrowColor = self.$tooltip.css('background-color');
          } else {
            arrowColor = self.options.arrowColor;
          }
          if (!arrowReposition) {
            arrowReposition = '';
          } else if (arrowReposition === 'left') {
            arrowClass = 'tooltipster-arrow-right';
            arrowReposition = '';
          } else if (arrowReposition === 'right') {
            arrowClass = 'tooltipster-arrow-left';
            arrowReposition = '';
          } else {
            arrowReposition = 'left:' + Math.round(arrowReposition) + 'px;';
          }
          if (practicalPosition === 'top' || practicalPosition === 'top-left' || practicalPosition === 'top-right') {
            tooltipBorderWidth = parseFloat(self.$tooltip.css('border-bottom-width'));
            tooltipBorderColor = self.$tooltip.css('border-bottom-color');
          } else if (practicalPosition === 'bottom' || practicalPosition === 'bottom-left' || practicalPosition === 'bottom-right') {
            tooltipBorderWidth = parseFloat(self.$tooltip.css('border-top-width'));
            tooltipBorderColor = self.$tooltip.css('border-top-color');
          } else if (practicalPosition === 'left') {
            tooltipBorderWidth = parseFloat(self.$tooltip.css('border-right-width'));
            tooltipBorderColor = self.$tooltip.css('border-right-color');
          } else if (practicalPosition === 'right') {
            tooltipBorderWidth = parseFloat(self.$tooltip.css('border-left-width'));
            tooltipBorderColor = self.$tooltip.css('border-left-color');
          } else {
            tooltipBorderWidth = parseFloat(self.$tooltip.css('border-bottom-width'));
            tooltipBorderColor = self.$tooltip.css('border-bottom-color');
          }
          if (tooltipBorderWidth > 1) {
            tooltipBorderWidth++;
          }
          arrowBorder = '';
          if (tooltipBorderWidth !== 0) {
            arrowBorderSize = '';
            arrowBorderColor = 'border-color: ' + tooltipBorderColor + ';';
            if (arrowClass.indexOf('bottom') !== -1) {
              arrowBorderSize = 'margin-top: -' + Math.round(tooltipBorderWidth) + 'px;';
            } else if (arrowClass.indexOf('top') !== -1) {
              arrowBorderSize = 'margin-bottom: -' + Math.round(tooltipBorderWidth) + 'px;';
            } else if (arrowClass.indexOf('left') !== -1) {
              arrowBorderSize = 'margin-right: -' + Math.round(tooltipBorderWidth) + 'px;';
            } else if (arrowClass.indexOf('right') !== -1) {
              arrowBorderSize = 'margin-left: -' + Math.round(tooltipBorderWidth) + 'px;';
            }
            arrowBorder = '<span class="tooltipster-arrow-border" style="' + arrowBorderSize + ' ' + arrowBorderColor + ';"></span>';
          }
          self.$tooltip.find('.tooltipster-arrow').remove();
          arrowConstruct = '<div class="' + arrowClass + ' tooltipster-arrow" style="' + arrowReposition + '">' + arrowBorder + '<span style="border-color:' + arrowColor + ';"></span></div>';
          self.$tooltip.append(arrowConstruct);
        }
        self.$tooltip.css({
          'top': Math.round(myTop) + 'px',
          'left': Math.round(myLeft) + 'px'
        });
      }
      return self;
    };
  };

}).call(this);

//# sourceMappingURL=../../frontend/common/ajTooltip.js.map