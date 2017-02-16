
var chart;
var min;
var max;
$(function () {

    //BEGINING OF GRAPH SCRIPT
    Highcharts.setOptions({
      global: {
          useUTC: false
      }
    });

    // Create the chart
    chart = Highcharts.stockChart('container', {
        chart: {
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                      //$('#container').show(); 
                      //if ($('#temp_select:checked').length>0) {
                        var x = (new Date()).getTime(), // current time
                            y = Math.round(Math.random() * 100);
                        series.addPoint([x, y], true, true);
                      //} else {
                      //  $('#container').hide(); 
                      //}
                    }, 1000);
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title: {
            text: 'Soil '
        },

        exporting: {
            enabled: false
        },

        series: [{
            data: []
        }]
    });

    $('#temp_select').click(function () {
        chart.setTitle({ text: 'Temperature (C°)' });
        chart.series[0].setData(function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                    time + i * 1000,
                    Math.round(Math.random() * 100)
                ]);
            }
            return data;
        }());
    });

    $('#moist_select').click(function () {
        chart.setTitle({ text: 'Moisture (%)' });
        chart.series[0].setData(   function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                    time + i * 1000,
                    Math.round(Math.random() * 100)
                ]);
            }
            return data;
        }());
    });

    $('#close_select').click(function () {
        chart.setTitle({ text: '' });
        chart.series[0].setData([]);
    });
	
	// function for updating the First General Pod Status Box when a different tab is selected
	$(".nav-tabs a").click(function(){
        $(this).tab('show');
		document.getElementById("maxEx").textContent = "max: " + chart.yAxis[0].dataMax; //get the max value of the graph and stick in in the correct element
		document.getElementById("minEx").textContent = "min: " + chart.yAxis[0].dataMin; //get the min and update the value 
    });
});