if (bowser.name == 'Internet Explorer') {
	var element = document.getElementById('msgOldBrowser');
	element.style.display = 'block';
}

function CloseMsgOldBrowser() {
	var element = document.getElementById('msgOldBrowser');
	element.style.display = 'none';
}

var chart;
var qrySelector;
var options = {
    chart: {
        type: 'donut',
    },
    series: [44, 55],
    labels: ['Titulo 1', 'Titulo 2'],
    colors: ['#950055', '#ffa300'],
    yaxis: {
        labels: {
            formatter: function (value) {
                return value + '%';
            }
        }
    },
    dataLabels: {
        formatter: function (value, opts) {
            return value.toFixed(0) + '%';
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: '100%'
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
}
