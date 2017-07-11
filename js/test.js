/**
 * 鍔熻兘锛氫富椤甸潰鎼滅储鑱屼綅鍔熻兘
 */
function loadTestTable(){

	table = $('.acelistTable').dataTable({
		"oLanguage":lang, //提示信息 
		"sPaginationType": "full_numbers",
		"sAjaxSource" : "/BesBlog/position/getPositionForSearch.action",
		"fnServerData": retrieveData,
		"bServerSide" : false,
		"bDestroy":true,
		"bJQueryUI": false,
		"aoColumns":[{
			"mDataProp":"name"
		},{
			"mDataProp":"password"
		}],
		"fnRowCallback" : function(nRow, aaData, iDisplayIndex, iDisplayIndexFull) { 

         },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
			
		}
	});
}
/**
 * @功能 dataDable 获取数据的方法
 * @param sSource 访问的url，其值为定义DataTable时 所用的 “sAjaxSource”属性
 * @param aoData 传递给指定url的数据，在DataTable的 “fnServerParams”属性中定义
 * @param fnCallback 
 */
function retrieveData( sSource, aoData, fnCallback ) {
	$.ajax( {
	"type": "post",
	"url": sSource,
	"dataType": "json",
	"data": "", 
	"success": fnCallback,
	});
}


//DataTable所使用的变量
var table=null;
//提示信息
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
