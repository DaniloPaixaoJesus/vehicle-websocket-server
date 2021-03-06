
var stompClient = null;
var maximum = 2;
var minimum = 0;
var index = 0;
var vins = ['YS2R4X20005399401', 'VLUR4X20009048066', 'YS2R4X20005388011'];

$(document).ready(function(){

    $("button").click(function(){
    	if(this.id == 'start-random'){
			document.getElementById('start-random').innerHTML = 'Sending ...';
			$('#start-random').removeClass("btn-primary"); 
			$('#start-random').addClass("btn-warning");
    		for(let i = 0; i <= 100; i++){
    			
	    		setTimeout(function () {
	    			index = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	    			sendPingOn(vins[index]);
	    		}, 5000);
    		}
    	}else{
    		vin = this.value;
        	document.getElementById(vin).innerHTML = 'sending ...';
        	sendPingOn(vin);
        	this.value = vin;
    	}
    });
});

function sendPingOn(vin){
	
	console.log('sending.. vin '+ vin);
	var VehicleTrackWSocket = {};
    VehicleTrackWSocket.vin = vin;
    VehicleTrackWSocket.status  = 'ON';
    console.log(VehicleTrackWSocket);
    
//	const url = 'http://localhost:8085/api/v1/vehicle/'+vin+'/status';
//	fetch(url, {
//	    method : "PUT",
//	    body: VehicleTrackWSocket,
//	}).then(
//	    response => response.text()
//	).then(
//	    html => console.log(html)
//	);
	
    var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:8085/api/v1/vehicle/'+vin+'/status');
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        var json = JSON.stringify(VehicleTrackWSocket);
        xhr.onload = function() {
            document.getElementById(vin).innerHTML = vin;
        };
        xhr.send(json);
    
}