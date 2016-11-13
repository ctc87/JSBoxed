
window.jSBoxed = (function () {
    function JSBoxed (els) {
    }
     
    var jSBoxed = {
        clock: function (selector) {
             this.atributeRepresentation = "jsb_clk";
             this.context = $("*["+ this.atributeRepresentation +"]");
             this.clockId = this.context.attr(this.atributeRepresentation);
            
             function clk() {
                
                var frame = $('<div />', {
                    "class": 'frame'
                });
                
                var clock = $('<div />', {
                    "class": 'clock'
                });
                frame.append(clock);
                
                var hand_mechanism = $('<div />', {
                    "class": 'hand_mechanism'
                });
                clock.append(hand_mechanism);
                
                var center = $('<div />', {
                    "class": 'center'
                });
                hand_mechanism.append(center);
                
                var huor_hand = $('<div />', {
                    "class": 'hand huor_hand'
                });
                hand_mechanism.append(huor_hand);
                
                var minute_hand = $('<div />', {
                    "class": 'hand minute_hand'
                });
                hand_mechanism.append(minute_hand);
                
                var second_hand = $('<div />', {
                    "class": 'hand second_hand'
                });
                hand_mechanism.append(second_hand);
                 
               
                for(var i = 0; i < 12 ; i++) {
                    var div = $('<div />');
                    var hour = $('<div />', {
                        "class": 'hour hour' + (i + 1)
                    });
                    hour.append(div);
                    hand_mechanism.append(hour);
                }
                 
                return frame;
             }
             this.context.append(clk());
             
            function getRotationDegrees(obj) {
                var matrix = obj.css("-webkit-transform") ||
                obj.css("-moz-transform")    ||
                obj.css("-ms-transform")     ||
                obj.css("-o-transform")      ||
                obj.css("transform");
                if(matrix !== 'none') {
                    var values = matrix.split('(')[1].split(')')[0].split(',');
                    var a = values[0];
                    var b = values[1];
                    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
                } else { var angle = 0; }
                return (angle < 0) ? angle + 360 : angle;
            }
            
            function rotateHourSticks() {
                var degrees = 0;
                for(var i = 0; i < 12; i++) {
                    if((i) % 3 == 0)
                        $(".hour" + (i + 1) + " div").addClass("fat_hour_stick");
                    else
                        $(".hour" + (i + 1) + " div").addClass("thin_hour_stick");
                    console.log(".hour" + (i + 1))
                    $(".hour" + (i + 1)).css({ WebkitTransform: 'rotate('  + degrees + 'deg)'});
                    $(".hour" + (i + 1)).css({ '-moz-transform': 'rotate('  + degrees + 'deg)'}); 
                    degrees += 30;
                }
            }
            
            function formatTimeOfDay(millisSinceEpoch) {
              var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
              var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
              var seconds = secondsInDay % 60;
              var minutes = ((secondsInDay / 60) | 0) % 60;
              var hours = (secondsInDay / 3600) | 0;
              return {
                  hours:hours,
                  minutes:minutes,
                  seconds:seconds
                  };
            }
            
            function initialize() {
                var time = formatTimeOfDay($.now());
                var stepSeconds = 0;
                var stepHour = 0;
                var stepMinute = 0;
                var initialRotatin = 180;
                var initialSecond = time.seconds * 6 + initialRotatin;
                var initialHour = time.hours * 30 + initialRotatin;
                var initialMinute = time.minutes * 6 + initialRotatin;
                $(".second_hand").css({ WebkitTransform: 'rotate('  + initialSecond + 'deg)'});
                $(".second_hand").css({ '-moz-transform': 'rotate('  + initialSecond + 'deg)'});
                $(".minute_hand").css({ WebkitTransform: 'rotate('  + initialMinute + 'deg)'});
                $(".minute_hand").css({ '-moz-transform': 'rotate('  + initialMinute + 'deg)'});
                $(".huor_hand").css({ WebkitTransform: 'rotate('  + initialHour + 'deg)'});
                $(".huor_hand").css({ '-moz-transform': 'rotate('  + initialHour + 'deg)'});
                rotateHourSticks();
                $(".frame").show();
                 setInterval(function(){ 
                       stepSeconds += 6;
                       var rotateSeconds = (initialSecond + stepSeconds) % 360;  
                       $(".second_hand").css({ WebkitTransform: 'rotate('  + rotateSeconds + 'deg)'});
                       $(".second_hand").css({ '-moz-transform': 'rotate('  + rotateSeconds + 'deg)'});
                       if(rotateSeconds == 180) {
                            stepMinute += 6;
                            var rotateMinute = (initialMinute + stepMinute) % 360;   
                            $(".minute_hand").css({ WebkitTransform: 'rotate('  + rotateMinute + 'deg)'});
                            $(".minute_hand").css({ '-moz-transform': 'rotate('  + rotateMinute + 'deg)'});  
                            if(rotateMinute == 180) {
                                stepHour += 30;
                                var rotateHour = (initialHour + stepHour) % 360;   
                                $(".huor_hand").css({ WebkitTransform: 'rotate('  + rotateHour + 'deg)'});
                                $(".huor_hand").css({ '-moz-transform': 'rotate('  + rotateHour + 'deg)'}); 
                            }
                       }
              }, 1000)
            }
            
            initialize();             
        }   
    };
     
    return jSBoxed;
}());

jSBoxed.clock();