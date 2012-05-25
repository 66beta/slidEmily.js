(function($) {
    $.fn.slidEmily = function(options) {
        var defaults = {
            speed: 1000,
            pause: 5000,
            controlId: '',
            numberCtl: false,
            vertical: true,
            arrowCtl: false,
            showArrowCtl: false,
            hoverCtl: false
        };
        options = $.extend(defaults, options);
        this.each(function() {
            var obj = $(this);
            if (options.controlId == '') {
                options.controlId = $(this).id + "_ctl";
            }
            var slide_objs = $("li", obj).length;
            var slide_width = $("li", obj).width();
            var slide_height = $("li", obj).height();
            if (!options.vertical) {
                $("ul", obj).css("width", slide_width * slide_objs);
                $("li", obj).css("float", "left");
            }
            if (options.numberCtl) {
                var number_ctrl = '<ol id="' + options.controlId + '"></ol>';
                $(obj).append(number_ctrl);
                for (var i = 1; i <= slide_objs; i++) {
                    $("<li></li>").attr('id', options.controlId + "_" + i).html('<a href=\"javascript:void(0);\">' + i + '</a>').appendTo($("#" + options.controlId));
                }
            }
            var ctl = $("#" + options.controlId);
            var ctl_objs = $("li", ctl).length;
            $("li", ctl).each(function() {
                $(this).click(function() {
                    var slide_ctl_id = options.controlId + "_";
                    clearTimeout(timeout);
                    options.speed = options.speed / 3;
                    animate($(this).attr('id').substr(slide_ctl_id.length) - 1);
                    options.speed = options.speed * 3;
                });
            });
            function setCtl(ctl_now) {
                var ctl_no = parseInt(ctl_now);
                $("li", ctl).removeClass("current");
                $("li:nth-child(" + ctl_no + ")", ctl).addClass("current");
            }
            if (options.arrowCtl) {
                var arrow_ctrl = '<ol id="' + options.controlId + '"></ol>';
                $(obj).after(arrow_ctrl);
                var arr_prev = '<li id=\"' + options.controlId + '_prev\"><a href=\"javascript:void(0);\"> </a></li>';
                var arr_next = '<li id=\"' + options.controlId + '_next\"><a href=\"javascript:void(0);\"> </a></li>';
                $("#" + options.controlId).append(arr_prev, arr_next);
                $("#" + options.controlId + "_prev").click(function() {
                    slide_now--;
                    slide_now = (slide_now == 0) ? slide_objs: slide_now;
                    options.speed = options.speed / 3;
                    animate(slide_now - 1);
                    options.speed = options.speed * 3;
                });
                $("#" + options.controlId + "_next").click(function() {
                    slide_now++;
                    slide_now = (slide_now > slide_objs) ? 1 : slide_now;
                    options.speed = options.speed / 3;
                    animate(slide_now - 1);
                    options.speed = options.speed * 3;
                });
                if (!options.showArrowCtl) {
                    $("#" + options.controlId).hide();
                    $(obj).hover(function() {
                        $("#" + options.controlId).show();
                    },
                    function() {
                        $("#" + options.controlId).hide();
                    });
                    $("#" + options.controlId).hover(function() {
                        $("#" + options.controlId).show();
                    },
                    function() {
                        $("#" + options.controlId).hide();
                    });
                }
            }
            if (options.hoverCtl && (!options.arrowCtl)) {
                $("li", ctl).each(function() {
                    $(this).hover(function() {
                        clearTimeout(timeout);
                        options.speed = options.speed / 3;
                        animate($(this).attr('id').substr($(this).attr('id').indexOf('_') + 1) - 1);
                    },
                    function() {
                        clearTimeout(timeout);
                        options.speed = options.speed * 3;
                        timeout = setTimeout(function() {
                            animate(slide_now);
                        },
                        options.pause * 1);
                    });
                });
            }
            function animate(slide_no) {
                slide_now = parseInt(slide_no) + 1;
                slide_now = (slide_now > slide_objs) ? 1 : slide_now;
                setCtl(slide_now);
                var position;
                if (options.vertical) {
                    position = ((slide_now - 1) * slide_height * -1);
                    $("ul", obj).animate({
                        marginTop: position
                    },
                    {
                        queue: false,
                        duration: options.speed
                    });
                } else {
                    position = ((slide_now - 1) * slide_width * -1);
                    $("ul", obj).animate({
                        marginLeft: position
                    },
                    {
                        queue: false,
                        duration: options.speed
                    });
                }
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    animate(slide_now);
                },
                options.speed + options.pause);
            }
            var slide_now = 1;
            setCtl(slide_now);
            var timeout = setTimeout(function() {
                animate(slide_now);
            },
            options.pause);
        });
    };
})(jQuery);
