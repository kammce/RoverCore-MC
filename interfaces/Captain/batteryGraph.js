
'use strict'

$(() => {
            Highcharts.chart('batteryGraph', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = currentTemp;
                            series.addPoint([x, y], true, true);
                        }, 1500);
                    }
                }
            },
            title: {
				text: null
            },
			
			credits: {
            enabled: false
			},
			
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Battery Temperatures',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
					
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: currentTemp
                        });
                    }
					
                    return data;
                }())
            }]
        });
    })
