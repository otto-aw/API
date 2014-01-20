module.exports = function message()
{
	var textXml;
	function XMLDoc()
	{
		if (window.XMLHttpRequest)
		  {
		    xmlhttp=new XMLHttpRequest();
		  }
		else
		  {
		    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		{
	      if (xmlhttp.readyState==4 && xmlhttp.status==200)
	        {
	            textXml=xmlhttp.responseText;
	        }
		};
		xmlhttp.open("GET","http://49583.21366.autoweb-xml.com/feed?&sid=49583&auth=2Al5&subid=&q=q5&ip=127.0.0.1&ua=Mozilla/5.0%20(Windows%20NT%206.1;%20WOW64;%20rv:26.0)%20Gecko/20100101%20Firefox/26.0&ref=awebads.lan&count=4&state=&city=",true);
		xmlhttp.send();
	}    


    return "Hola mundo";
}