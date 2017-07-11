//自定的，多个文件公用的全局变量 ，和方法
//document.writeln("<script src='/BesBlog/js/etc/global.js' type='text/javascript'></script>");


//为提示框添加自动隐藏功能
$(document).ready(function(){
	$("button.close").click(function(){
		$(this).parent().hide();
	});
});

//全局变量，用于指示当前页面文章的状态与信息
var alterType = "";
var aid = "";
var articleStatus="";

//根据当前状态修改界面布局
function initEditorPage(_alterType,_aid,_articleStatus)
{
	alterType = _alterType;
	aid = _aid;
	articleStatus= _articleStatus;
	
	//默认情况下界面布局为新建文章的布局，所以当为 modify模式时需要修改布局
	if(alterType=="modify")
	{
		var labelUpdate ="更新文章";
		if(articleStatus=="2")//为草稿
			labelUpdate="更新草稿";
		
		//更新按钮为修改文章下的显示状态
		$("#btn_update").html(labelUpdate);
		$("#btn_publish").hide();
		$("#btn_update").show();
		
		if(articleStatus=="2")
		{
			$("#btn_saveDraft").hide();
			$("#btn_toPublish").show();
		}
		
		//异步请求文章的数据，填充编辑器
	    $.post("/BesBlog/article/getArticleContent.action?aid="+aid,function(data,status){
	    	if(status=="success")
	    	{
	    		$("#input_title").val(data.title);
	    		UE.getEditor('ArticleEditor').setContent(data.content, false);
	    	}
	    	else
	    		alert("请求文章数据异常");
	    },"json");
		
	}
}


/** 页面编辑器总共6个操作按钮：①②③④⑤⑥ 
 * 编辑器的按钮分布有三种状态变化：(一)、新建文章  ，按钮有：“发表文章 ①” “转收为草稿 ③” “预览 ⑤” “关闭 ⑥”
 * 					    (二)、修改文章  ，按钮有：“更新文章 ②” “转收为草稿 ③” “预览 ⑤” “关闭 ⑥”
 * 					    (三)、修改草稿  ，按钮有：“更新草稿 ②” “公开为文章 ④” “预览 ⑤” “关闭 ⑥”
 * */

//使用当前的文本内容 创建一篇新的文章
function publishArticle()
{
	//获取文章的标题和内容
	var title = $("#input_title").val();
	var content = UE.getEditor('ArticleEditor').getContent();
	var planTxt = UE.getEditor('ArticleEditor').getContentTxt();
	$.trim(title);
	
	if(title=="")
	{
		$("#green_tip_content").text("标题不能为空");
		$("#green_tip_article").show();
	}
	else
	{
		//使用ajax保存文章
		 $.ajax(
				{	url:"/BesBlog/article/createArticle.action"
					,success:function(result)
					{
						if(result.resultType=="success")
						{	
							$("#green_tip_content").text("成功保存文章");
							
							//由状态（一）变为状态（二）
							
							//更换按钮的状态
							$("#btn_publish").hide();
							$("#btn_update").show();
							
							//修改相应的全局变量
							
							alterType="modify";
							articleStatus = "1";
							aid = result.aid;//获得保存文章后得到aid
						}
						else if(result.resultType=="fail")
						{
							$("#green_tip_content").text(result.error);
						}
						//显示提示板块
						$("#green_tip_article").show();
					}
					,error:function(xhr,status,error)
					{
						$("#green_tip_content").text("请求出错，保存失败了");
						$("#green_tip_article").show();
					}
					,beforeSend:function(xhr)
					{}
					,complete:function(xhr,status)
					{}
					,data:{"title":title,"content":content,"targetStatus":"1","planTxt":planTxt}
					,dataType:"json"
					,type:"POST"
				});
	}
	
}

//更新文章的状态（发布的文章或者草稿，操作一致）
function updateArticle()
{
	//获取文章的标题和内容
	var title = $("#input_title").val();
	var content = UE.getEditor('ArticleEditor').getContent();
	var planTxt = UE.getEditor('ArticleEditor').getContentTxt();
	
	$.trim(title);
	
	if(title=="")
	{
		$("#green_tip_content").text("标题不能为空");
		$("#green_tip_article").show();
	}
	else
	{
		//使用ajax更新文章
		 $.ajax(
				{	url:"/BesBlog/article/updateArticleContent.action"
					,success:function(result)
					{
						if(result.resultType=="success")
						{	
							$("#green_tip_content").text("成功更新");
							//保持状态（二）或 状态（三）
						}
						else if(result.resultType=="fail")
						{
							$("#green_tip_content").text(result.error);
						}
						//显示提示板块
						$("#green_tip_article").show();
					}
					,error:function(xhr,status,error)
					{
						$("#green_tip_content").text("请求出错，保存失败了");
						$("#green_tip_article").show();
					}
					,beforeSend:function(xhr)
					{}
					,complete:function(xhr,status)
					{}
					,data:{"title":title,"content":content,"aid":aid,"planTxt":planTxt}
					,dataType:"json"
					,type:"POST"
				});
	}
	
}

//保存为草稿
//该按钮需要响应两种情况，一：页面为创建文章页面，此时需要插入一条文章数据
//				      二：页面为修改“发布的文章”，此时需要更改更新文章的内容，并且更改文章的状态
function saveAsDraft()
{
	//获取文章的标题和内容
	var title = $("#input_title").val();
	var content = UE.getEditor('ArticleEditor').getContent();
	var planTxt = UE.getEditor('ArticleEditor').getContentTxt();
	$.trim(title);
	
	if(title=="")
	{
		$("#green_tip_content").text("标题不能为空");
		$("#green_tip_article").show();
	}
	else
	{
		//根据 情况请求链接
		if(alterType=="create")
		{
			//使用ajax保存文章
			 $.ajax(
					{	url:"/BesBlog/article/createArticle.action"
						,success:function(result)
						{
							if(result.resultType=="success")
							{	
								$("#green_tip_content").text("成功保存为草稿");

								//由状态（一）变为状态（三）
								
								articleStatus="2";
								//更换按钮的状态
								$("#btn_update").text("更新草稿");
								$("#btn_publish").hide();
								$("#btn_update").show();
								
								//修改相应的全局变量
								alterType="modify";
								aid = result.aid;//获得保存文章后得到aid
							}
							else if(result.resultType=="fail")
							{
								$("#green_tip_content").text(result.error);
							}
							//显示提示板块
							$("#green_tip_article").show();
						}
						,error:function(xhr,status,error)
						{
							$("#green_tip_content").text("请求出错，保存失败了");
							$("#green_tip_article").show();
						}
						,beforeSend:function(xhr)
						{}
						,complete:function(xhr,status)
						{}
						,data:{"title":title,"content":content,"targetStatus":"2","planTxt":planTxt}
						,dataType:"json"
						,type:"POST"
					});
		}
		else if(alterType=="modify")
		{
			//使用保存文章 并且修改状态为 草稿
			 $.ajax(
					{	url:"/BesBlog/article/saveArticleAndChangeStatus.action"
						,success:function(result)
						{
							if(result.resultType=="success")
							{	
								$("#green_tip_content").text("成功保存为草稿");

								//由状态（二）变为状态（三）
								
								articleStatus="2";
								//更换按钮的状态
								$("#btn_update").text("更新草稿");
								$("#btn_saveDraft").hide();
								$("#btn_toPublish").show();
								
							}
							else if(result.resultType=="fail")
							{
								$("#green_tip_content").text(result.error);
							}
							//显示提示板块
							$("#green_tip_article").show();
						}
						,error:function(xhr,status,error)
						{
							$("#green_tip_content").text("请求出错，保存失败了");
							$("#green_tip_article").show();
						}
						,beforeSend:function(xhr)
						{}
						,complete:function(xhr,status)
						{}
						,data:{"title":title,"content":content,"aid":aid,"targetStatus":"2"}
						,dataType:"json"
						,type:"POST"
					});
		}
		
	}

}

//更新保存为发布的文章，在修改草稿的状态下才会出现该按钮的调用
function saveAsPublishedArticle()
{
	//获取文章的标题和内容
	var title = $("#input_title").val();
	var content = UE.getEditor('ArticleEditor').getContent();
	var planTxt = UE.getEditor('ArticleEditor').getContentTxt();
	$.trim(title);
	
	if(title=="")
	{
		$("#green_tip_content").text("标题不能为空");
		$("#green_tip_article").show();
	}
	else
	{
		//使用保存文章 并且修改状态为 已发布的文章
		 $.ajax(
				{	url:"/BesBlog/article/saveArticleAndChangeStatus.action"
					,success:function(result)
					{
						if(result.resultType=="success")
						{	
							$("#green_tip_content").text("成功保存为已发布的文章");

							//由状态（二）变为状态（三）
							
							articleStatus="1";
							//更换按钮的状态
							$("#btn_update").text("更新文章");
							$("#btn_toPublish").hide();
							$("#btn_saveDraft").show();
							
						}
						else if(result.resultType=="fail")
						{
							$("#green_tip_content").text(result.error);
						}
						//显示提示板块
						$("#green_tip_article").show();
					}
					,error:function(xhr,status,error)
					{
						$("#green_tip_content").text("请求出错，保存失败了");
						$("#green_tip_article").show();
					}
					,beforeSend:function(xhr)
					{}
					,complete:function(xhr,status)
					{}
					,data:{"title":title,"content":content,"aid":aid,"targetStatus":"1","planTxt":planTxt}
					,dataType:"json"
					,type:"POST"
				});
	}
}

function getContent() {
    var arr = [];
    arr.push("使用editor.getContent()方法可以获得编辑器的内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('ArticleEditor').getContent());
    alert(arr.join("\n"));
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
	
	//AJAX 异步请求文章数据
	var xmlhttp= getAjaxWithCallback(dealAjaxSubscriptinoData);
	xmlhttp.open("GET","/BesBlog/subscription/getArticles.action?requestObjectUid="+requestObjectUid,true);
	xmlhttp.send();
}

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
			articleTr+="<div class=\"article_block\" id=\""+tableData[i].articleId+"\">";
			articleTr+=		"<div><a href=\"#\">"+tableData[i].title+"</a></div>";
			articleTr+=		"<div class=\"margin_top5 margin_bottom5\">";
			articleTr+=			"<span>发布者:<a href=\"#\">"+tableData[i].nickname+"</a></span>";
			articleTr+=			"<span class=\"margin_left20\">最后编辑时间:<span>"+tableData[i].stringPubTime+"</span></span>";
			articleTr+=		"</div>";
			articleTr+=		"<p>"+tableData[i].contentBrief+"<a href=\"#\">更多</a></p>";
			articleTr+="</div>" ;
		
			contentShown+=articleTr;
		}
	}
	document.getElementById("list_body_subscription_article").innerHTML=contentShown;
}
