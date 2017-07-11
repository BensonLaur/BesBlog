var webAddress = getWebAddress();
function getWebAddress()
{
	return "http://"+window.location.host;
}

function jumpToLink(link)
{
	window.location.href = webAddress + link;
}

//使用callback回调函数 初始化 ajax xmlhttp对象，并返回xmlhttp
// callback 需要一个参数，用于接收 xmlhttp 对象
function getAjaxWithCallback(callback)
{
	//使用AJAX获取 响应的XML数据
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			callback(xmlhttp);
		}
	}
	
	return xmlhttp;
}


function onLogOff()
{
	$.get("/BesBlog/account/logOff.action");
	window.location.reload(true);
}
