//自定的，多个文件公用的全局变量 ，和方法
document.writeln("<script src='/BesBlog/js/etc/global.js' type='text/javascript'></script>");

//为提示框添加自动隐藏功能
$(document).ready(function(){
	$("button.close").click(function(){
		$(this).parent().hide();
	});
});

var uid="";
/*页面加载*/
function initPage(_uid)
{
	
	uid = _uid;
	//填充页面中文章和评论数
	loadCountOfArticleAndComment();
	
	//根据当前窗口指向 的 #页面目标，选择模拟显示哪一个页面
	if(location.hash==null||location.location==""||location.location=="#tab_1")
		onSelectAllArticle();
	else if(location.hash=="#tab_2")
		onSelectPublishedArticle();
	else if(location.hash=="#tab_3")
		onSelectDraftArticle();
	else if(location.hash=="#tab_4")
		onSelectNormalComment();
	else if(location.hash=="#tab_5")
		onSelectTrashComment();
	else if(location.hash=="#tab_6")
		onSelectSubscription();
	else if(location.hash=="#tab_7")
		onSelectInfomation();
	else if(location.hash=="#tab_8")
		onSelectPassword();
	else
		onSelectAllArticle();
}

//主页“管理文章”按钮
function onManagerArticle()
{
	//填充页面中文章和评论数
	loadCountOfArticleAndComment();

	onSelectAllArticle();
}

//填充页面中文章和评论数
function loadCountOfArticleAndComment()
{
	//使用AJAX获取 响应的XML数据
	var xmlhttp= getAjaxWithCallback(FillCountSpanWithXMLData);
	xmlhttp.open("GET","/BesBlog/getData/countOfArticleAndComment.action",true);
	xmlhttp.send();
}

function FillCountSpanWithXMLData(xmlhttpObject)
{
	var xmlDoc = xmlhttpObject.responseXML;
	var CountAllArticle = xmlDoc.getElementsByTagName("CountAllArticle")[0].childNodes[0].nodeValue;
	var CountPublishedArticle = xmlDoc.getElementsByTagName("CountPublishedArticle")[0].childNodes[0].nodeValue;
	var CountDraftArticle = xmlDoc.getElementsByTagName("CountDraftArticle")[0].childNodes[0].nodeValue;
	var CountNormalComment = xmlDoc.getElementsByTagName("CountNormalComment")[0].childNodes[0].nodeValue;
	var CountTrashComment = xmlDoc.getElementsByTagName("CountTrashComment")[0].childNodes[0].nodeValue;

	document.getElementById("countTotalArticle").innerHTML =  CountAllArticle;
	document.getElementById("countPublishArticle").innerHTML =  CountPublishedArticle;
	document.getElementById("countDraftArticle").innerHTML =  CountDraftArticle;
	document.getElementById("countNormalCommnet").innerHTML =  CountNormalComment;
	document.getElementById("countTrashCommnet").innerHTML =  CountTrashComment;
}

/*左侧菜单响应函数*/
function onSelectAllArticle()
{
	loadTableAllArticle();
	window.location.href = webAddress+"/BesBlog/jsp/manager.jsp#tab_1";

	resumeMenuSelectStatus();
	$("[data-menu ='menu1']").addClass("selected_item");
}

function onSelectPublishedArticle()
{
	loadTablePublishedArticle();
	window.location.href = webAddress+"/BesBlog/jsp/manager.jsp#tab_2";

	resumeMenuSelectStatus();
	$("[data-menu ='menu2']").addClass("selected_item");
}

function onSelectDraftArticle()
{
	loadTableDraftArticle();
	window.location.href = webAddress+"/BesBlog/jsp/manager.jsp#tab_3";

	resumeMenuSelectStatus();
	$("[data-menu ='menu3']").addClass("selected_item");
}

function onSelectNormalComment()
{
	loadTableNormalComment();
	window.location.href = webAddress+"/BesBlog/jsp/manager.jsp#tab_4";

	resumeMenuSelectStatus();
	$("[data-menu ='menu4']").addClass("selected_item");
}

function onSelectTrashComment()
{
	loadTableTrashComment();
	window.location.href = webAddress+"/BesBlog/jsp/manager.jsp#tab_5";

	resumeMenuSelectStatus();
	$("[data-menu ='menu5']").addClass("selected_item");
}

function onSelectSubscription()
{
	loadTableSubscription();
	window.location.href = webAddress+"/BesBlog/jsp/manager.jsp#tab_6";

	resumeMenuSelectStatus();
	$("[data-menu ='menu6']").addClass("selected_item");
}

function onSelectInfomation()
{
	loadTableInfomation();
	window.location.href = webAddress+"/BesBlog/jsp/manager.jsp#tab_7";

	resumeMenuSelectStatus();
	$("[data-menu ='menu7']").addClass("selected_item");
}

function onSelectPassword()
{
	loadTablePassword();
	window.location.href = webAddress+"/BesBlog/jsp/manager.jsp#tab_8";
	
	resumeMenuSelectStatus();
	$("[data-menu ='menu8']").addClass("selected_item");
}

//恢复所有菜单的选择选择状态为未选中
function resumeMenuSelectStatus()
{
	var menus = document.querySelectorAll ( '[data-menu]' ) ;
	
	for (var i = 0; i < menus.length; ++i) 
	{
		$(menus[i]).removeClass("selected_item");//去掉类 selected_item
	}
}


/* DataTable 加载数据 */
function loadTableAllArticle()
{
	lang.sEmptyTable = "没有创建的文章";
	table = $('.listTable_all_article').dataTable({
		"dom":'<f>tr<ip>' ,
		"oLanguage":lang, //提示信息 
		//"bFilter" : true, 
		"sPaginationType": "full_numbers",
		"bProcessing" : false,			//是否显示正在处理的状态。
		"bServerSide" : false,			//是否开启Datatables服务器模式
		"bDestroy":true,
		"bJQueryUI": true,				//是否应用jQuery UI ThemeRoller的标签和CSS类。
		"ordering": false,				//不排序
		"autoWidth": false,				//不进行自适应宽度
		"aLengthMenu": [8, 25, 50, -1],

		"fnServerParams": function ( aoData ) {} ,
		"fnServerData": retrieveData,
		"sAjaxSource" : "/BesBlog/article/getAllArticle.action",
		"aoColumns":[
		 {"mDataProp":"title"		},
		 {"mDataProp":"status"		},
		 {"mDataProp":"ccomment"	},
		 {"mDataProp":"cread"		},
		 {"mDataProp":"stringEstablishTime" }
		 ],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) { 
			
			var draftTip = "";
			if(aaData.status=="2")draftTip = "草稿";
			var titleColumn ="<a class=\"green_link\" href=\"/BesBlog/jsp/oneArticle.jsp?uid="+uid+"&aid="+aaData.aid+"\" target=\"_blank\">"+ aaData.title + "</a>"+"<br/>"
			+"<span style=\"padding-left:500px;\" class=\"show_only_hover\">" +
			"<a href=\"/BesBlog/article/alter.action?alterType=modify&aid="+aaData.aid+"\">修改</a>" +
			"<a href=\"/BesBlog/article/deleteArticle.action?aid="+ aaData.aid +"&tab_page=tab_1\">删除</a></span>";
			
			$('td:eq(0)', nRow).html("<span>"+titleColumn+"</span>");
			$('td:eq(1)', nRow).html("<span style=\"color:green;font-style:italic;\">"+draftTip+"</span>");
			$('td:eq(2)', nRow).html("<span style=\"width:50px;\">评论数："+aaData.ccomment+"</span>");
			$('td:eq(3)', nRow).html("<span>阅读数："+aaData.cread+"</span>");
         },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
			
		}
	});
}
function loadTablePublishedArticle()
{
	lang.sEmptyTable = "还没有没有发布的文章";
	table = $('.listTable_all_published').dataTable({
		"dom":'<f>tr<ip>' ,
		"oLanguage":lang, //提示信息 
		"sPaginationType": "full_numbers",
		"bProcessing" : false,			//是否显示正在处理的状态。
		"bServerSide" : false,			//是否开启Datatables服务器模式
		"bDestroy":true,
		"bJQueryUI": true,				//是否应用jQuery UI ThemeRoller的标签和CSS类。
		"ordering": false,				//不排序
		"autoWidth": false,				//不进行自适应宽度
		"aLengthMenu": [8, 25, 50, -1],

		"fnServerParams": function ( aoData ) {} ,
		"fnServerData": retrieveData,
		"sAjaxSource" : "/BesBlog/article/getPublishedArticle.action",
		"aoColumns":[
		 {"mDataProp":"title"		},
		 {"mDataProp":"ccomment"	},
		 {"mDataProp":"cread"		},
		 {"mDataProp":"stringEstablishTime" }
		 ],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) { 
			
			var draftTip = "";
			if(aaData.status=="2")draftTip = "草稿";
			var titleColumn ="<a class=\"green_link\" href=\"/BesBlog/jsp/oneArticle.jsp?uid="+uid+"&aid="+aaData.aid+"\" target=\"_blank\">"+ aaData.title + "</a>"+"<br/>"
			+"<span  style=\"padding-left:500px;\" class=\"show_only_hover\">" +
			"<a href=\"/BesBlog/article/changeArticleStatus.action?aid="+ aaData.aid +"&target_status=2&tab_page=tab_2\">转为草稿</a>" +
			"<a href=\"/BesBlog/article/alter.action?alterType=modify&aid="+aaData.aid+"\">修改</a>" +
			"<a href=\"/BesBlog/article/deleteArticle.action?aid="+ aaData.aid +"&tab_page=tab_2\">删除</a>" +
			"</span>";
			
			$('td:eq(0)', nRow).html("<span>"+titleColumn+"</span>");
			$('td:eq(1)', nRow).html("<span style=\"width:50px;\">评论数："+aaData.ccomment+"</span>");
			$('td:eq(2)', nRow).html("<span>阅读数："+aaData.cread+"</span>");
         },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
			
		}
	});
}
function loadTableDraftArticle()
{
	lang.sEmptyTable = "没有草稿";
	table = $('.listTable_all_draft').dataTable({
		"dom":'<f>tr<ip>' ,
		"oLanguage":lang, //提示信息 
		"sPaginationType": "full_numbers",
		"bProcessing" : false,			//是否显示正在处理的状态。
		"bServerSide" : false,			//是否开启Datatables服务器模式
		"bDestroy":true,
		"bJQueryUI": true,				//是否应用jQuery UI ThemeRoller的标签和CSS类。
		"ordering": false,				//不排序
		"autoWidth": false,				//不进行自适应宽度
		"aLengthMenu": [8, 25, 50, -1],

		"fnServerParams": function ( aoData ) {} ,
		"fnServerData": retrieveData,
		"sAjaxSource" : "/BesBlog/article/getDraftArticle.action",
		"aoColumns":[
		 {"mDataProp":"title"		},
		 {"mDataProp":"ccomment"	},
		 {"mDataProp":"cread"		},
		 {"mDataProp":"stringEstablishTime" }
		 ],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) { 
			
			var draftTip = "";
			if(aaData.status=="2")draftTip = "草稿";
			var titleColumn ="<a class=\"green_link\" href=\"/BesBlog/jsp/oneArticle.jsp?uid="+uid+"&aid="+aaData.aid+"\" target=\"_blank\">"+ aaData.title + "</a>"+"<br/>"
			+"<span style=\"padding-left:500px;\" class=\"show_only_hover\">" +
			"<a href=\"/BesBlog/article/changeArticleStatus.action?aid="+ aaData.aid +"&target_status=1&tab_page=tab_3\">发布文章</a>" +
			"<a href=\"/BesBlog/article/alter.action?alterType=modify&aid="+aaData.aid+"\">修改</a>" +
			"<a href=\"/BesBlog/article/deleteArticle.action?aid="+ aaData.aid +"&tab_page=tab_3\">删除</a>" +
			
			"</span>";
			
			$('td:eq(0)', nRow).html("<span>"+titleColumn+"</span>");
			$('td:eq(1)', nRow).html("<span style=\"width:50px;\">评论数："+aaData.ccomment+"</span>");
			$('td:eq(2)', nRow).html("<span>阅读数："+aaData.cread+"</span>");
         },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
			
		}
	});

}

//dataTable 没有传送数据    时可使用的数据获取函数
function retrieveData( sSource, aoData, fnCallback ) {
	$.ajax( {
	"type": "post",
	"url": sSource,
	"dataType": "json",
	"data": {}, 
	"success": fnCallback,
	});
}

function loadTableNormalComment()
{
	lang.sEmptyTable = "还没有评论";
	table = $('.listTable_comment').dataTable({
		"dom":'<f>tr<ip>' ,
		"oLanguage":lang, //提示信息 
		"sPaginationType": "full_numbers",
		"bProcessing" : false,			//是否显示正在处理的状态。
		"bServerSide" : false,			//是否开启Datatables服务器模式
		"bDestroy":true,
		"bJQueryUI": true,				//是否应用jQuery UI ThemeRoller的标签和CSS类。
		"ordering": false,				//不排序
		"autoWidth": false,				//不进行自适应宽度
		"aLengthMenu": [8, 25, 50, -1],

		"fnServerParams": function ( aoData ) {} ,
		"fnServerData": retrieveData,
		"sAjaxSource" : "/BesBlog/comment/getNormalComment.action",
		"aoColumns":[
		 {"mDataProp":"content"		},
		 {"mDataProp":"cid"	},
		 {"mDataProp":"user.nickname"	},
		 {"mDataProp":"stringTime" }
		 ],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) { 
			var commentFor ="";
			if(aaData.type=="1")
				commentFor = "针对的文章："+aaData.article.title;
			else if(aaData.type=="2")
				commentFor = "回复的评论："+ aaData.objectcid;
			
			var contentColumn ="<a class=\"green_link\" href=\"#\">"+ aaData.content + "</a>"+"<br/>" +			
			"<span class=\"show_only_hover\">"+ commentFor + "</span>";
			var operateColumn =  "<span class=\"show_only_hover\">" +
			"<a href=\"/BesBlog/comment/changeCommentStatus.action?cid="+ aaData.cid +"&target_status=2&tab_page=tab_4\">归为垃圾</a>" +
			"<a href=\"/BesBlog/comment/deleteComment.action?cid="+ aaData.cid +"&tab_page=tab_4\">删除</a>" +
			"</span>";

			$('td:eq(0)', nRow).html("<span>"+contentColumn+"</span>");
			$('td:eq(1)', nRow).html("<span>"+operateColumn+"</span>");
			$('td:eq(2)', nRow).html("<span style=\"width:50px;\">评论者："+aaData.user.nickname+"</span>");
         },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
			
		}
	});


}
function loadTableTrashComment()
{
	lang.sEmptyTable = "没有垃圾评论";
	table = $('.listTable_trash').dataTable({
		"dom":'<f>tr<ip>' ,
		"oLanguage":lang, //提示信息 
		"sPaginationType": "full_numbers",
		"bProcessing" : false,			//是否显示正在处理的状态。
		"bServerSide" : false,			//是否开启Datatables服务器模式
		"bDestroy":true,
		"bJQueryUI": true,				//是否应用jQuery UI ThemeRoller的标签和CSS类。
		"ordering": false,				//不排序
		"autoWidth": false,				//不进行自适应宽度
		"aLengthMenu": [8, 25, 50, -1],

		"fnServerParams": function ( aoData ) {} ,
		"fnServerData": retrieveData,
		"sAjaxSource" : "/BesBlog/comment/getTrashComment.action",
		"aoColumns":[
		 {"mDataProp":"content"		},
		 {"mDataProp":"cid"	},
		 {"mDataProp":"user.nickname"	},
		 {"mDataProp":"stringTime" }
		 ],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) { 
			var commentFor ="";
			if(aaData.type=="1")
				commentFor = "针对的文章："+aaData.article.title;
			else if(aaData.type=="2")
				commentFor = "回复的评论："+ aaData.objectcid;
			
			var contentColumn ="<a class=\"green_link\" href=\"#\">"+ aaData.content + "</a>"+"<br/>" +			
			"<span class=\"show_only_hover\">"+ commentFor + "</span>";
			var operateColumn =  "<span class=\"show_only_hover\">" +
			"<a href=\"/BesBlog/comment/changeCommentStatus.action?cid="+ aaData.cid +"&target_status=1&tab_page=tab_5\">这不是垃圾评论</a>" +
			"<a href=\"/BesBlog/comment/deleteComment.action?cid="+ aaData.cid +"&tab_page=tab_4\">删除</a>" +
			"</span>";

			$('td:eq(0)', nRow).html("<span>"+contentColumn+"</span>");
			$('td:eq(1)', nRow).html("<span>"+operateColumn+"</span>");
			$('td:eq(2)', nRow).html("<span style=\"width:50px;\">评论者："+aaData.user.nickname+"</span>");
         },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
			
		}
	});


}
function loadTableSubscription()
{
	lang.sEmptyTable = "没有订阅的对象";
	table = $('.listTable_subscription').dataTable({
		"dom":'tr<ip>' ,
		"oLanguage":lang, //提示信息 
		"sPaginationType": "full_numbers",
		"bProcessing" : false,			//是否显示正在处理的状态。
		"bServerSide" : false,			//是否开启Datatables服务器模式
		"bDestroy":true,
		"bJQueryUI": true,				//是否应用jQuery UI ThemeRoller的标签和CSS类。
		"ordering": false,				//不排序
		"autoWidth": false,				//不进行自适应宽度
		"aLengthMenu": [12, 25, 50, -1],

		"fnServerParams": function ( aoData ) {} ,
		"fnServerData": retrieveData,
		"sAjaxSource" : "/BesBlog/subscription/getUserList.action",
		"aoColumns":[
		 {"mDataProp":"nickname"		},
		 {"mDataProp":"email"	},
		 {"mDataProp":"uid"	}
		 ],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) {
			var cancelSubLink = "/BesBlog/subscription/cancel.action?objectUid="+aaData.uid;
			$('td:eq(2)', nRow).html("<span style=\"width:50px;\"><a href=\""+cancelSubLink+"\">取消订阅</a></span>");
         },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
			
		}
	});
}

//订阅菜单中 “添加” 按钮
function addSubscription()
{
	//跳转到订阅页面
	onSelectSubscription();
	
	//隐藏提示条（如果需要的话）
	$("#green_tip_subscription").hide();
	
	//显示订阅入口
	$("#subscription_block").show();
	
}

function checkSubscription()
{
	var targetName = $("#subscribeTargetName").val();
	$.trim(targetName);
	if(targetName=="")
	{
		$("#green_tip_content_subscription").text("输入为空");
		$("#green_tip_subscription").show();
	}
	else
	{
		//异步请求用户的数据，填充文章页面
	    $.post("/BesBlog/subscription/addSubscription.action",
	    		{"targetName":targetName},
	    	function(data,status){
	    	if(status=="success")
	    	{
	    		if(data.resultType=="success")
				{	
		    		$("#green_tip_content_subscription").text("成功添加订阅！");
		    		$("#green_tip_subscription").show();
		    		loadTableSubscription();
				}
				else if(data.resultType=="fail")
				{	    		
					$("#green_tip_content_subscription").text(data.error);
	    			$("#green_tip_subscription").show();
				}
	    	}
	    	else
	    		alert("请求用户数据异常");
	    },"json");
	}
}


//信息表相关操作
function loadTableInfomation()
{
	//使用AJAX获取 响应的XML数据
	var xmlhttp= getAjaxWithCallback(fillInfoWithXMLData);
	xmlhttp.open("GET","/BesBlog/getData/userInfo.action",true);
	xmlhttp.send();
}
function fillInfoWithXMLData(xmlHttp)
{
	var xmlDoc = xmlHttp.responseXML;
	var uid = xmlDoc.getElementsByTagName("uid")[0].childNodes[0].nodeValue;
	var email = xmlDoc.getElementsByTagName("email")[0].childNodes[0].nodeValue;
	var nickname = xmlDoc.getElementsByTagName("nickname")[0].childNodes[0].nodeValue;
	var photo = xmlDoc.getElementsByTagName("photo")[0].childNodes[0].nodeValue;
	var personInfo = xmlDoc.getElementsByTagName("personInfo")[0].childNodes[0].nodeValue;
	var blogInfo = xmlDoc.getElementsByTagName("blogInfo")[0].childNodes[0].nodeValue;

	if(personInfo==null||personInfo=="null")personInfo="";
	if(blogInfo==null||blogInfo=="null")blogInfo="";
	
	$("#info_email").html(email);
	$("#info_nickname").html(nickname);
	$("#info_photo").attr('src',"/BesBlog/photo/"+photo); 
	$("#info_personinfo").html(personInfo);
	$("#info_bloginfo").html(blogInfo);
	
}

var userNameForFailModification="";
function onModifyInfo(flag)
{
	//获取原来的文本值
	var info_id = "info_"+flag;
	var originText = $("#"+info_id).text();
	
	//填充隐藏的输入控件
	var input_id="input_"+flag;
	$("#"+input_id).attr("value",originText);
	//$("#"+input_id).html(originText);
	
	//隐藏用于显示信息的元素
	//var board_info_id = "board_info_"+flag;
	//$("#"+board_info_id).addClass("hide");
	
	//显示修改信息的元素
	var board_modify_id ="board_modify_"+flag;
	$("#"+board_modify_id).removeClass("hide");
	
	//关闭提示（如果需要的话）
	$("#board_info_panel_tip").addClass("hide");
}

function onSaveInfo(flag)
{
	//保存前先在 place_to_hold_tip 中 添加提示提示元素
	var tipHtml="";
	tipHtml +='<div class="hide alert margin_top10" id="board_info_panel_tip">';
	tipHtml +='  <button type="button" class="close" data-dismiss="alert">×</button>';
	tipHtml +='  <strong id="info_panel_tip">这里将提供用户友好的信息</strong>';
	tipHtml +='</div>';
	$("#place_to_hold_tip").empty();   
	$("#place_to_hold_tip").html(tipHtml);
	
	//获取当前输入的数据
	var input_id="input_"+flag;
	textCurrent = $("#"+input_id).val();
	
	//使用AJAX获取 响应的XML数据
	var xmlhttp= getAjaxWithCallback(showTip);
	xmlhttp.open("POST","/BesBlog/account/saveUserInfo.action",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("flag="+flag+"&newData="+textCurrent);
	
	//请求结束之后更新页面上的显示数据
	var info_id = "info_"+flag;
	if(flag=="nickname")//暂存数据
		userNameForFailModification=$("#"+info_id).text();
	
	$("#"+info_id).text(textCurrent);
	
	//借用取消函数里的两个操作实现元素切换
	onCancelModify(flag);
}

function showTip(xmlHttp)
{
	var xmlDoc = xmlHttp.responseXML;
	var tip = xmlDoc.getElementsByTagName("tip")[0].childNodes[0].nodeValue;
	var nicknameFlag = xmlDoc.getElementsByTagName("nicknameFlag")[0].childNodes[0].nodeValue;
	$("#info_panel_tip").html(tip);
	$("#board_info_panel_tip").removeClass("hide");
	
	if(nicknameFlag=="false")//只有当nicknameFlag 为false，才认为昵称修改失败
		$("#info_nickname").text(userNameForFailModification);//恢复为之前的值
}

function onCancelModify(flag)
{	
	//显示用于显示信息的元素
	var board_info_id = "board_info_"+flag;
	$("#"+board_info_id).removeClass("hide");
	
	//隐藏修改信息的元素
	var board_modify_id ="board_modify_"+flag;
	$("#"+board_modify_id).addClass("hide");
	
}


function loadTablePassword()
{
	//NoTable
}

function onModifyPasswd()
{
	var password0 = $("#password0").val();
	var password1 = $("#password1").val();
	var password2 = $("#password2").val();
	
	if(password0==""||password1==""||password2=="")
	{	
		$("#green_tip_content_password").text("密码不能留空");
		$("#green_tip_password").show();
	}
	else
	{
		if(password1!=password2)
		{
			$("#green_tip_content_password").text("两次重置的密码不一致");
			$("#green_tip_password").show();
		}
		else
		{
			//异步请求修改密码
		    $.post("/BesBlog/account/modifyPassword.action",
		    		{"oldPasswd":password0,"newPasswd":password1},
		    	function(data,status){
		    	if(status=="success")
		    	{
		    		if(data.resultType=="success")
					{	
			    		$("#green_tip_content_password").text("成功修改密码！");
			    		$("#green_tip_password").show();
			    		
			    		//清密码空
			    		$("#password0").val("");
			    		$("#password1").val("");
			    		$("#password2").val("");
					}
					else if(data.resultType=="fail")
					{	    		
						$("#green_tip_content_password").text(data.error);
		    			$("#green_tip_password").show();
					}
		    	}
		    	else
		    		alert("请求用户数据异常");
		    },"json");
			
		}
	}
}


/*全局变量定义*/
//dataTable提示信息
var lang = {
"sProcessing": "处理中...",
"sLengthMenu": "每页 _MENU_ 项",
"sZeroRecords": "没有匹配结果",
"sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
"sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
"sInfoPostFix": "",
"sSearch": "搜索:",
"sUrl": "",
"sEmptyTable": "表中数据为空",
"sLoadingRecords": "载入中...",
"sInfoThousands": ",",
"oPaginate": {
"sFirst": "首页",
"sPrevious": "上页",
"sNext": "下页",
"sLast": "末页",
"sJump": "跳转"
},
"oAria": {
"sSortAscending": ": 以升序排列此列",
"sSortDescending": ": 以降序排列此列"
}
};
