/*
 * https://github.com/vasyabigi/angular-slick
 */
(function () {
'use strict';

angular.module('slick', [])
.directive('slick', [
  '$timeout', '$rootScope',
  function ($timeout, $rootScope) {

  function link (scope, elem, attrs) {
    var isInitialized;
    var initTimeout = null;

    function destroySlick () {
      $timeout(function () {
        elem.slick('unslick');
        elem.find('.slick-list').remove();
      });
    };

    function fullCleanup () {
      if (initTimeout) $timeout.cancel(initTimeout);
      initTimeout = null;
      elem.off('init afterChange');
      destroySlick();
      isInitialized = false;
    };

    function initializeSlick () {
      initTimeout = $timeout(function () {
        var currentIndex;

        if (scope.currentIndex != null) {
          currentIndex = scope.currentIndex;
        }

        var customPaging = function (slick, index) {
          return scope.customPaging({
            slick: slick,
            index: index
          });
        };

        elem.slick({
          accessibility: scope.accessibility !== 'false',
          adaptiveHeight: scope.adaptiveHeight === 'true',
          arrows: scope.arrows !== 'false',
          asNavFor: scope.asNavFor ? scope.asNavFor : void 0,
          appendArrows: scope.appendArrows ? $(scope.appendArrows) : elem,
          appendDots: scope.appendDots ? $(scope.appendDots) : elem,
          autoplay: scope.autoplay === 'true',
          autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
          centerMode: scope.centerMode === 'true',
          centerPadding: scope.centerPadding || '50px',
          cssEase: scope.cssEase || 'ease',
          customPaging: attrs.customPaging ? customPaging : void 0,
          dots: scope.dots === 'true',
          draggable: scope.draggable !== 'false',
          easing: scope.easing || 'linear',
          fade: scope.fade === 'true',
          focusOnSelect: scope.focusOnSelect === 'true',
          infinite: scope.infinite !== 'false',
          initialSlide: parseInt(scope.initialSlide) || 0,
          lazyLoad: scope.lazyLoad || 'ondemand',
          beforeChange: attrs.onBeforeChange ? scope.onBeforeChange : void 0,
          onReInit: attrs.onReInit ? scope.onReInit : void 0,
          onSetPosition: attrs.onSetPosition ? scope.onSetPosition : void 0,
          pauseOnHover: scope.pauseOnHover !== 'false',
          responsive: scope.responsive || void 0,
          respondTo: scope.respondTo || 'window',
          rtl: scope.rtl === 'true',
          slide: scope.slide || 'div',
          slidesToShow: scope.slidesToShow != null ? parseInt(scope.slidesToShow, 10) : 1,
          slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
          speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
          swipe: scope.swipe !== 'false',
          swipeToSlide: scope.swipeToSlide === 'true',
          touchMove: scope.touchMove !== 'false',
          touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
          useCSS: scope.useCSS !== 'false',
          variableWidth: scope.variableWidth === 'true',
          vertical: scope.vertical === 'true',
          prevArrow: scope.prevArrow ? $(scope.prevArrow) : void 0,
          nextArrow: scope.nextArrow ? $(scope.nextArrow) : void 0
        });

        if (!isInitialized) {
          elem.on('init', function (e, sl) {
            scope.$applyAsync(function () {
              if (attrs.onInit) {
                scope.onInit();
              }

              if (currentIndex != null) {
                sl.slideHandler(currentIndex);
              }
            });
          });

          elem.on('afterChange', function (event, slick, currentSlide, nextSlide) {
            scope.$applyAsync(function () {
              if (scope.onAfterChange) {
                scope.onAfterChange({
                  $current: currentSlide,
                  $next: nextSlide,
                });
              }
              if (currentIndex != null) {
                currentIndex = currentSlide;
                scope.currentIndex = currentSlide;
              }
            });
          });

          scope.$on('$destroy', $rootScope.$on('slick.remove', function (e, index) {
            elem.slick('slickRemove', index);
          }));

          scope.$on('$destroy', function () {
            fullCleanup();
          });

          scope.$watch('currentIndex', function (newVal) {
            if (newVal == null || newVal == currentIndex) return;

            elem.slick('slickGoTo', newVal);
            currentIndex = newVal;
          });

          isInitialized = true;
        }

        initTimeout = null;
      });
    };
    
    // initialize
    (function () {
      if (scope.initOnload) {
        isInitialized = false;

        scope.$watch('data', function (newVal) {
          if (newVal == null || initTimeout) return;

          if (isInitialized) {
            destroySlick();
          }

          initializeSlick();
        });
      } else {
        initializeSlick();
      }
    })();
  };

  return {
    restrict: 'EA',
    scope: {
      slickId: '@',
      initOnload: '@',
      data: '=',
      currentIndex: '=',
      accessibility: '@',
      adaptiveHeight: '@',
      arrows: '@',
      asNavFor: '@',
      appendArrows: '@',
      appendDots: '@',
      autoplay: '@',
      autoplaySpeed: '@',
      centerMode: '@',
      centerPadding: '@',
      cssEase: '@',
      customPaging: '&',
      dots: '@',
      draggable: '@',
      easing: '@',
      fade: '@',
      focusOnSelect: '@',
      infinite: '@',
      initialSlide: '@',
      lazyLoad: '@',
      onBeforeChange: '&',
      onAfterChange: '&',
      onInit: '&',
      onReInit: '&',
      onSetPosition: '&',
      pauseOnHover: '@',
      pauseOnDotsHover: '@',
      responsive: '=',
      respondTo: '@',
      rtl: '@',
      slide: '@',
      slidesToShow: '@',
      slidesToScroll: '@',
      speed: '@',
      swipe: '@',
      swipeToSlide: '@',
      touchMove: '@',
      touchThreshold: '@',
      useCSS: '@',
      variableWidth: '@',
      vertical: '@',
      prevArrow: '@',
      nextArrow: '@'
    },
    link: link,
  };
}]);

})();
