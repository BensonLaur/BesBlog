//自定的，多个文件公用的全局变量
//document.writeln("<script src='/BesBlog/js/etc/global.js' type='text/javascript'></script>");

function initAllArticlePage(uid)
{	
	//加载文章
	loadTableAllArticle(uid);
	
	//加载博客和个人基本信息
	loadBlogerInfo(uid);
}

/* DataTable 加载数据 */
function loadTableAllArticle(uid)
{
	lang.sEmptyTable = "没有创建的文章";
	table = $('.listTable_all_article').dataTable({
		"dom":'tr<ip>' ,
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
		"sAjaxSource" : "/BesBlog/article/getUserArticle.action?uid="+uid,
		"aoColumns":[
		 {"mDataProp":"title"		},
		 {"mDataProp":"ccomment"	},
		 {"mDataProp":"cread"		},
		 {"mDataProp":"stringEstablishTime" }
		 ],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) { 
			
			var titleColumn ="<a class=\"green_link\" href=\"/BesBlog/jsp/oneArticle.jsp?uid="+uid+"&aid="+aaData.aid+"\" target=\"_blank\">"+ aaData.title + "</a>";
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


function loadBlogerInfo(uid)
{
	//异步请求用户的数据，填充文章页面
    $.post("/BesBlog/getData/userInfo2.action?uid="+uid,function(data,status){
    	if(status=="success")
    	{
    		$("#bloger_top_name").html(data.nickname);
    		$("#blog_info_top").html(data.blogInfo);

    		$("#info_name").html(data.nickname);
    		$("#info_pic").attr("src","/BesBlog/photo/"+data.photo);
    		$("#profile_content").html(data.personInfo);
    		
    	}
    	else
    		alert("请求用户数据异常");
    },"json");
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
