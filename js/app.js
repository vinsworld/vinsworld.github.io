angular.module('VinsProfile',[]).controller('profileCtrl',function($scope) {

    $scope.loaderOptions = ['spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'];
    $scope.colors = ['blue', 'red', 'lightGreen'];
    $scope.colorCodeMapping = {
        'blue': '#0683c9',
        'red': '#ed5565',
        'lightGreen': '#73D077'
    };
    //#00aced,#ef553a,#81c04d,#9358ac
    $scope.randomInt = function(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    $scope.activeColor = $scope.colors[$scope.randomInt(0, 2)];
    $scope.color = $scope.colorCodeMapping[$scope.activeColor];
    $scope.intro = "Hi, I'm Vinay. I Design & Builds";

    $scope.scrollToTop = function() {
        verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
        element = $('body');
        offset = element.offset();
        offsetTop = offset.top;
        $('html, body').animate({
            scrollTop: offsetTop
        }, 500, 'linear');
    }

    var height = jQuery('.parallax').css('height');
    $scope.picHeight = height.substring(0, height.length - 2);
    jQuery(window).bind('resize', function() {
        var height = jQuery('.parallax').css('height');
        $scope.picHeight = height.substring(0, height.length - 2);
        console.log(jQuery('.parallax').css('width'))
    })

    $scope.scroll = function(href, info) {
        var fromTop;
        if (info == 'angle') {
            fromTop = -180;
        } else {
            fromTop = -30;
        }

        if (href.indexOf("#") == 0) {
            var $target = $(href);
            if ($target.length) {
                $('html, body').animate({
                    scrollTop: $target.offset().top + fromTop
                });
                if (history && "pushState" in history) {
                    history.pushState({}, document.title, window.location.pathname + href);
                    return false;
                }
            }
        }
    }

    $scope.init = function() {
        window.addEventListener('scroll', function(e) {
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 650,
                header = document.querySelector(".header");
            if (distanceY > $scope.picHeight) {
                classie.add(header, "fixHeader");
            } else {
                if (classie.has(header, "fixHeader")) {
                    classie.remove(header, "fixHeader");
                }
            }
        });

        $("#js-load").fakeLoader({
            timeToHide: 900,
            zIndex: "1000",
            spinner: $scope.loaderOptions[$scope.randomInt(1, 7)],
            bgColor: $scope.color
                //  imagePath:"yourPath/customizedImage.gif" //If you want can you insert your custom image
        });

        $(function() {

            AOS.init({
                easing: 'ease-in-out-sine'
            });

            $(document).on('scroll', function() {
                if ($(window).scrollTop() > 100) {
                    $('.scroll-top-wrapper').addClass('show');
                } else {
                    $('.scroll-top-wrapper').removeClass('show');
                }
            });

            function reset() {}

            function callback() {}

            $("#js-DynamicText").typed({
                stringsElement: $('#typed-strings'),
                typeSpeed: 40,
                backDelay: 500,
                loop: true,
                contentType: 'html',
                loopCount: false,
                callback: function() {
                    callback();
                },
                resetCallback: function() {
                    reset();
                }
            });

            $(".reset").click(function() {
                $("#js-DynamicText").typed('reset');
            });

        })
    }
    window.onload = $scope.init()
});
