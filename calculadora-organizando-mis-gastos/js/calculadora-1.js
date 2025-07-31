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
    series: [44, 55, 41, 17, 15],
    labels: ['Titulo 1', 'Titulo 2', 'Titulo 3', 'Titulo 4', 'Titulo 6'],
    dataLabels: {
        style: {
            colors: ['#000']
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
