var x =document.getElementById("ltnlong");                                                                                              
var LATTIUDE,LONGITUDE;  

function getLocation()
{                                                                                                                
	if (navigator.geolocation) 
	{                                                                                                            
		navigator.geolocation.getCurrentPosition(showPosition);                                                                                 
	} 
	else 
	{                                                                                                                                
		x.innerHTML = "Geolocation is not supported by this browser.";                                                                          
	}                                                                                                                                       
}                                                                                                                                       
                                                                                                                                        
function showPosition(position) 
{                                                                                                       
	LATITUDE=position.coords.latitude;                                                                                                      
	LONGITUDE=position.coords.longitude;                                                                                                    
}

function getAQILevel(aqi)
{
	if(aqi<=50)
	{
		return "Good";
	}
	else if(aqi>50 && aqi<=100)
	{
		return "Moderate";
	}
	else if(aqi>100 && aqi<=150)
	{
		return "Unhealthy For Sensitive Groups";
	}
	else if(aqi>150 && aqi<=200)
	{
		return "Unhealthy";
	}
	else if(aqi>200 && aqi<=300)
	{
		return "very Unhealthy";
	}
	else
	{
		return "Hazardous";
	}
	
}

function DisplayAQILevel(aqi)
{
	document.getElementById("AQILevel").innerHTML=getAQILevel(aqi);
}                                                                                                                                       
                                                                                                                                        
function loadDoc() 
{                                                                                                                    
	getLocation();                                                                                                                          
	var xhttp = new XMLHttpRequest();
	var aqicn;                                                                                                       
	xhttp.onreadystatechange = function() 
	{                                                                                                 
		if (this.readyState == 4 && this.status == 200) 
		{                                                                                       
 			obj = JSON.parse(this.responseText);
 			aqicn=obj.data.current.pollution.aqicn;                                                                                                  
 			document.getElementById("AQIValue").innerHTML ="City:"+obj.data.city+"<br>"+                                                            
 			"AQI:"+aqicn;
 			DisplayAQILevel(aqicn);                                                                                               
		}                                                                                                                                       
		else                                                                                                                                    
		{                                                                                                                                       
			document.getElementById("ltnlong").innerHTML=this.status;                                                                             
		}                                                                                                                                       
	}                                                                                                                                    
xhttp.open("GET", "http://api.airvisual.com/v2/nearest_city?lat=LATITUDE&lon=LONGITUDE&key=4039606c-602f-4c8e-9e09-881fc581929d", true);
xhttp.send();                                                                                                                           
}   





                                                                                                                                                                                                                                                              