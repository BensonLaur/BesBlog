//自定的，多个文件公用的全局变量
//document.writeln("<script src='/BesBlog/js/etc/global.js' type='text/javascript'></script>");

function select_all_subscription_article()
{
	loadSubscrptionArticle("all");
}

function loadSubscrptionArticle(userId)
{
	//去掉所有项的类属性 selected_item
	var items = document.querySelectorAll ( '[data-user-id]' ) ;
	for (var i = 0; i < items.length; ++i) 
	{
		$(items[i]).removeClass("selected_item");//去掉类 selected_item
	}
	$("#id_all_subscription_article").removeClass("selected_item");
	
	var requestObjectUid;
	//根据选择添加属性
	if(userId=="all")
	{
		//设置添加 id_all_subscription_article 属性为 selected_item
		$("#id_all_subscription_article").addClass("selected_item");
		requestObjectUid = "all";
	}
	else
	{	
		//设置添加 要选择的data-user-id 类属性为 selected_item
		$("[data-user-id='"+userId+"']").addClass("selected_item");
		requestObjectUid = userId;
	}

	//因为传送内容和xml不兼容，已废弃
	//AJAX 异步请求文章数据
	//var xmlhttp= getAjaxWithCallback(dealAjaxSubscriptinoData);
	//xmlhttp.open("GET","/BesBlog/subscription/getArticles.action?requestObjectUid="+requestObjectUid,true);
	//xmlhttp.send();
	
	//使用json形式传回数据
	$.post("/BesBlog/subscription/getArticles.action?requestObjectUid="+requestObjectUid,
    		//{"":},
    	function(data,status){
    	if(status=="success")
    	{
    		if(data.resultType=="success")
			{	
    			initSubArticleTable(data.articles);
			}
			else if(data.resultType=="fail")
			{	    		
				alert(data.error);
			}
    	}
    	else
    		alert("请求用户数据异常");
    },"json");
}

//因为传送内容和xml不兼容，已废弃
function dealAjaxSubscriptinoData(xmlHttp)
{
	var xmlDoc = xmlHttp.responseXML;
	var articles = xmlDoc.getElementsByTagName("article");
	var dataArray = new Array();
	for(var i=0; i<articles.length;i++)
	{
		var articleId = articles[i].getElementsByTagName("articleId")[0].childNodes[0].nodeValue;
		var title = articles[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
		var userId = articles[i].getElementsByTagName("userId")[0].childNodes[0].nodeValue;
		var nickname = articles[i].getElementsByTagName("nickname")[0].childNodes[0].nodeValue;
		var stringPubTime = articles[i].getElementsByTagName("stringPubTime")[0].childNodes[0].nodeValue;
		var content = articles[i].getElementsByTagName("content")[0].childNodes[0].nodeValue;
		var contentBrief = articles[i].getElementsByTagName("contentBrief")[0].childNodes[0].nodeValue;
		var article = new Object();  
		article.articleId = articleId;
		article.title = title;
		article.userId = userId;
		article.nickname = nickname;
		article.stringPubTime = stringPubTime;
		article.content = content;
		article.contentBrief = contentBrief;
		dataArray[i]=article;
	}
	initSubArticleTable(dataArray);
}


//因为传送内容和xml不兼容，已废弃
function initSubArticleTable(tableData)
{
	//清空 list_body_subscription_article 里的内容
	document.getElementById("list_body_subscription_article").innerHTML="";
	
	var contentShown="";
	if(tableData.length==0)
	{	
		contentShown+="<div class=\"article_block\">";
		contentShown+=		"<div style=\"text-align:center;\" class=\"margin_top5 margin_bottom5\">";
		contentShown+=			"没有查询到文章！";
		contentShown+=		"</div>";
		contentShown+="</div>" ;
	}
	else
	{
		for(var i=0;i<tableData.length;i++)
		{
			var articleTr = "";
			articleTr+="<div class=\"article_block\" id=\""+tableData[i].aid+"\">";
			articleTr+=		"<div><a href=\"/BesBlog/jsp/oneArticle.jsp?uid="+tableData[i].uid+"&aid="+tableData[i].aid+"\"  target=\"_blank\">"+tableData[i].title+"</a></div>";
			articleTr+=		"<div class=\"margin_top5 margin_bottom5\">";
			articleTr+=			"<span>发布者:<a href=\"/BesBlog/jsp/allArticle.jsp?uid="+tableData[i].uid+"\"  target=\"_blank\">"+tableData[i].user.nickname+"</a></span>";
			articleTr+=			"<span class=\"margin_left20\">最后编辑时间:<span>"+tableData[i].lastEditTime+"</span></span>";
			articleTr+=		"</div>";
			articleTr+=		"<p>"+tableData[i].contentBrief+"<a href=\"/BesBlog/jsp/oneArticle.jsp?uid="+tableData[i].uid+"&aid="+tableData[i].aid+"\" target=\"_blank\">更多</a></p>";
			articleTr+="</div>" ;
		
			contentShown+=articleTr;
		}
	}
	document.getElementById("list_body_subscription_article").innerHTML=contentShown;
}
