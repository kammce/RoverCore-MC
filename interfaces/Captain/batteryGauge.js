
'use strict'
var currentTemp = 0;
$(() => {
    Highcharts.chart('batteryGauge', {
        chart: {
            type: 'gauge',
			backgroundColor: 'transparent',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
			
        },

		navigation: {
            buttonOptions: {
                enabled: false
            }
        },
		
		credits: {
            enabled: false
        },
		
        title: {
            text: null
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'volts'
            },
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B' // green
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D' // yellow
            }, {
                from: 160,
                to: 200,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Battery Current',
            data: [80],
            tooltip: {
                valueSuffix: ' volts'
            }
        }]
    },
    // Add some life
    (chart) => {
        if (!chart.renderer.forExport) {
            setInterval(() => {
                const point = chart.series[0].points[0]
                let newVal
                const inc = Math.round((Math.random() - 0.5) * 20)

                newVal = point.y + inc

                if (newVal < 0 || newVal > 200) {
                    newVal = point.y - inc
                }
				document.getElementById("currentTemp").innerHTML = newVal
				currentTemp = newVal
                point.update(newVal)
            }, 1500)
        }
    })
})