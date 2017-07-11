//自定的，多个文件公用的全局变量 ，和方法
document.writeln("<script src='/BesBlog/js/etc/global.js' type='text/javascript'></script>");

//为提示框添加自动隐藏功能
$(document).ready(function(){
	$("button.close").click(function(){
		$(this).parent().hide();
	});
});

/*页面加载*/
function initPage()
{
	//填充页面中文章和评论数
	loadCountOfArticleAndMessage();
	
	//根据当前窗口指向 的 #页面目标，选择模拟显示哪一个页面
	if(location.hash==null||location.location==""||location.location=="#tab_1")
		onSelectAllArticle();
	else if(location.hash=="#tab_2")
		onSelectAllMessage();
	else if(location.hash=="#tab_3")
		onSelectUnreadedMessage();
	else if(location.hash=="#tab_4")
		onSelectReadedMessage();
	else if(location.hash=="#tab_5")
		onSelectCreateMessage();
	else
		onSelectAllArticle();
}


function onSelectAllArticle()
{
	loadTableAllArticle();
	window.location.href = webAddress+"/BesBlog/jsp/adminManager.jsp#tab_1";
	
	resumeMenuSelectStatus();
	$("[data-menu ='menu1']").addClass("selected_item");
}

function onSelectAllMessage()
{
	window.location.href = webAddress+"/BesBlog/jsp/adminManager.jsp#tab_2";
	
	resumeMenuSelectStatus();
	$("[data-menu ='menu2']").addClass("selected_item");
}

function onSelectUnreadedMessage()
{
	window.location.href = webAddress+"/BesBlog/jsp/adminManager.jsp#tab_3";
	
	resumeMenuSelectStatus();
	$("[data-menu ='menu3']").addClass("selected_item");
}

function onSelectReadedMessage()
{
	window.location.href = webAddress+"/BesBlog/jsp/adminManager.jsp#tab_4";
	
	resumeMenuSelectStatus();
	$("[data-menu ='menu4']").addClass("selected_item");
}

function onSelectCreateMessage()
{
	window.location.href = webAddress+"/BesBlog/jsp/adminManager.jsp#tab_5";
	
	resumeMenuSelectStatus();
	$("[data-menu ='menu5']").addClass("selected_item");
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

//填充页面中文章和消息数量
function loadCountOfArticleAndMessage()
{
	//使用AJAX获取 响应的XML数据
	var xmlhttp= getAjaxWithCallback(FillCountSpanWithXMLData);
	xmlhttp.open("GET","/BesBlog/getData/countOfArticleAndMessage.action",true);
	xmlhttp.send();
}

function FillCountSpanWithXMLData(xmlhttpObject)
{
	var xmlDoc = xmlhttpObject.responseXML;
	var CountAllArticle = xmlDoc.getElementsByTagName("CountAllArticle")[0].childNodes[0].nodeValue;
	var CountAllMessage = xmlDoc.getElementsByTagName("CountAllMessage")[0].childNodes[0].nodeValue;
	var CountUnreadedMessage = xmlDoc.getElementsByTagName("CountUnreadedMessage")[0].childNodes[0].nodeValue;
	var CountReadedMessage = xmlDoc.getElementsByTagName("CountReadedMessage")[0].childNodes[0].nodeValue;

	document.getElementById("CountAllArticle").innerHTML =  CountAllArticle;
	document.getElementById("CountAllMessage").innerHTML =  CountAllMessage;
	document.getElementById("CountUnreadedMessage").innerHTML =  CountUnreadedMessage;
	document.getElementById("CountReadedMessage").innerHTML =  CountReadedMessage;
}


/* DataTable 加载数据 */
function loadTableAllArticle()
{
	lang.sEmptyTable = "没有待审核的文章";
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
		"aLengthMenu": [12, 25, 50, -1],

		"fnServerParams": function ( aoData ) {} ,
		"fnServerData": retrieveData,
		"sAjaxSource" : "/BesBlog/admin/getAllArticle.action",
		"aoColumns":[
		 {"mDataProp":"title"		},
		 {"mDataProp":"uid"		},
		 {"mDataProp":"aid"		},
		 {"mDataProp":"stringEstablishTime" }
		 ],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) { 
			
			var titleColumn ="<a class=\"green_link\" href=\"/BesBlog/jsp/oneArticle.jsp?uid="+aaData.uid+"&aid="+aaData.aid+"\" target=\"_blank\">"+ aaData.title + "</a>"+"<br/>";
			var operationColumn=""+
			"<a class=\"green_link padding10\" href=\"/BesBlog/admin/checkArticleToApproved.action?aid="+aaData.aid+"&tab_page=tab_1\">通过</a>"+
			"<a class=\"green_link padding10\" onclick=\'checkArticleToFail(\""+aaData.title+"\",\""+aaData.uid+"\",\""+aaData.aid+"\")\' >不通过</a>"
			;
			var idColumn =""+
			"<a class=\"green_link padding10\" href=\"/BesBlog/jsp/allArticle.jsp?uid="+aaData.uid+"\" target=\"_blank\">"+aaData.uid+"</a>"
			;

			$('td:eq(0)', nRow).html("<span>"+titleColumn+"</span>");
			$('td:eq(1)', nRow).html("<span>"+idColumn+"</span>");
			$('td:eq(2)', nRow).html("<span style=\"color:green;font-style:italic;\">"+operationColumn+"</span>");
         },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
			
		}
	});
}

var uMessageUid="";
var ArticleTitle="";
var ArticleId="";

//准备并弹出窗口
function checkArticleToFail(title, uid, aid)
{	
	uMessageUid = uid;
	ArticleTitle = title;
	ArticleId = aid;
	
	messContent = ""+
	[
	 '    	<div>',
	 '    		针对文章：<span id="article_title">'+title+'</span>',
	 '    	</div>',
	 '    	<div id="MessageContent">',
	 '    		<textarea style="width: 95%;" id="input_message_content" rows="4" cols="40"></textarea>',
	 '    	</div>',
	 '    	<div>',
	 '    		<span class="btn pull-right margin5" onclick="CheckFailAndSendMessage()">发送消息</span>',
	 '    		<span class="btn pull-right margin5" onclick="closeWindow()">取消</span>',
	 '    	</div>'].join("");
	
	
	showMessageBox('审核不通过',messContent, 200, 50);
}

//获取消息内容，发送消息，并审核不通过
function CheckFailAndSendMessage()
{
	var content = $("#input_message_content").val();
	
	//异步请求
    $.post("/BesBlog/message/sendCheckFailMessage.action",
    		{"uid":uMessageUid,"title":ArticleTitle,"content":content,"aid":ArticleId},
    	function(data,status){
    	if(status=="success")
    		window.location.reload();
    	else
    		alert("请求用户数据异常");
    },"json");
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


/*
 * 功能：弹出窗口相关的函数
 */

var isIe = (document.all) ? true : false;
// 设置select的可见状态
function setSelectState(state) {
	var objl = document.getElementsByTagName('select');
	for (var i = 0; i < objl.length; i++) {
		objl[i].style.visibility = state;
	}
}
function mousePosition(ev) {
	if (ev.pageX || ev.pageY) {
		return {
			x : ev.pageX,
			y : ev.pageY
		};
	}
	return {
		x : ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y : ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}
// 弹出方法
function showMessageBox(wTitle, content,  to_top, width_percentage) {
	closeWindow();
	var bWidth = parseInt(document.body.scrollWidth);
	var bHeight = parseInt(document.body.scrollHeight);

	var back = document.createElement("div");
	back.id = "back";
	var styleStr = "top:0px;left:0px;position:absolute;background:#666;width:"
			+ bWidth + "px;height:" + 2.5*bHeight + "px;";
	styleStr += (isIe) ? "filter:alpha(opacity=0);" : "opacity:0;";
	back.style.cssText = styleStr;
	document.body.appendChild(back);
	showBackground(back, 50);
	var mesW = document.createElement("div");
	mesW.id = "mesWindow";
	mesW.className = "mesWindow";
	mesW.innerHTML = "<div class='mesWindowTop'>"
			+ "<table width='100%' height='100%' style='margin-bottom:3px;'><tr><td>"
			+ wTitle
			+ "</td><td style='width:1px;'><input class='normal_button' type='button' onclick='closeWindow();' title='关闭窗口' value='关闭' /></td></tr></table></div>"
			+ "<div class='mesWindowContent' id='mesWindowContent'>" + content
			+ "</div><div class='mesWindowBottom'></div>";
	
	styleStr = "top:"+to_top+"px;left:"
			+ (document.body.clientWidth / 2 - mesW.clientWidth / 2)
			+ "px;position:absolute;width:"+width_percentage+"%;margin-left:-"+width_percentage/2+"%;left:50%;z-index:9999;";
	mesW.style.cssText = styleStr;
	document.body.appendChild(mesW);
}

// 让背景渐渐变暗
function showBackground(obj, endInt) {
	if (isIe) {
		obj.filters.alpha.opacity += 5;
		if (obj.filters.alpha.opacity < endInt) {
			setTimeout(function() {
				showBackground(obj, endInt)
			}, 5);
		}
	} else {
		var al = parseFloat(obj.style.opacity);
		al += 0.02;
		obj.style.opacity = al;
		if (al < (endInt / 100)) {
			setTimeout(function() {
				showBackground(obj, endInt)
			}, 5);
		}
	}
}
// 关闭窗口
function closeWindow() {
	if (document.getElementById('back') != null) {
		document.getElementById('back').parentNode.removeChild(document
				.getElementById('back'));
	}
	if (document.getElementById('mesWindow') != null) {
		document.getElementById('mesWindow').parentNode.removeChild(document
				.getElementById('mesWindow'));
	}
	if (isIe) {
		setSelectState('');
	}
}
// 测试弹出
function testMessageBox(ev) {
	var objPos = mousePosition(ev);
	messContent = document.getElementById('message_pop_window').innerHTML;
	showMessageBox('审核不通过', messContent, objPos, 900);
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
