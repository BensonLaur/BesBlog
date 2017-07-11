<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//ddD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.ddd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>后台管理</title>
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/jquery.dataTables.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css" media="all"> 
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/manager.css">  
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/pop_window_style.css" media="all">
  	
    <script type="text/javascript" src="/BesBlog/js/etc/jquery-1.12.3.js"></script>
  	<script type="text/javascript" src="/BesBlog/js/etc/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/bootstrap.js"></script>
    <script type="text/javascript" src="/BesBlog/js/adminManager.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>
</head>

<%-- 没登录则跳转到登录提示界面 --%>
<c:if test="${empty sessionScope.admin}">
	或者使用  <jsp:forward page="loginTip.jsp"></jsp:forward>
	<c:redirect url="/BesBlog/jsp/adminLoginTip.jsp"></c:redirect>
</c:if>

<%
	String admin = (String)request.getSession().getAttribute("admin");
%>

<body onload="initPage()">
	<div class="navbar-inner">
		<span class="top_Blog_name">
			BesBlog
		</span>
		<div class="top_button_div">
		</div>
			<c:if test="${!empty sessionScope.admin}">
					<div style="display: normal;"> 
						<span class="float_right" style="border:1px solid rgb(194, 223, 136);border-radius:4px;margin:1px;">
							 <span style="display:inline;margin:6px 4px;" class="float_right">欢迎登录！
							 	<span class="margin5" >${sessionScope.admin}</span>.
							 	<a class="green_link margin5" href="/BesBlog/admin/logOff.action">注销</a>
							 </span>
						 </span>
					</div>
			</c:if>
			
	</div>
	
	
	<div class="main_content">
		<div class="left_guid">
			<dl class="left_dl">
				<dt class="parent_item">审核文章</dt>
					<dd data-menu="menu1" class="child_item selected_item" onclick="onSelectAllArticle()">全部待审核(<span id="CountAllArticle">0</span>)</dd>
				<dt class="parent_item">消息管理</dt>
					<dd data-menu="menu2" class="child_item" onclick="onSelectAllMessage()">所有消息(<span id="CountAllMessage">0</span>)</dd>
					<dd data-menu="menu3" class="child_item" onclick="onSelectUnreadedMessage()">未读消息(<span id="CountUnreadedMessage">0</span>)</dd>
					<dd data-menu="menu4" class="child_item" onclick="onSelectReadedMessage()">已读消息(<span id="CountReadedMessage">0</span>)</dd>
					<dd data-menu="menu5" class="child_item" onclick="onSelectCreateMessage()">创建消息</dd>
			</dl>
		</div>
		
		<div class="right_content">
			<div class="content_tab" id="tab_1">
				<div class="label">审核博文列表</div>	
				
				<div class="content_div">
					<table id="list_all_article" class="display listTable_all_article" >
					<thead >
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">标题</span></th>
							<th style="padding:0;" width="80px;"><span class="hide">用户id</span></th>
							<th style="padding:0;" width="130px;"><span class="hide">操作</span></th>
							<th style="padding:0;" width="100px;"><span class="hide">发表日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>

			<div class="content_tab" id="tab_2">
				<div class="label">全部消息</div>	
				
				<div class="content_div">
					<table id="list_all_message" class="display listTable_all_message">
					<thead>
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">内容</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">阅读状态</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">回复对象</span></th>
							<th style="padding:0;" width="100px;"><span class="hide">消息日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>
			
			<div class="content_tab" id="tab_3">
				<div class="label">未读消息</div>	
				
				<div class="content_div">
					<table id="list_unreaded_message" class="display listTable_unreaded_message">
					<thead>
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">内容</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">回复对象</span></th>
							<th style="padding:0;" width="100px;"><span class="hide">消息日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>
			
			<div class="content_tab" id="tab_4">
				<div class="label">已读消息</div>	
				
				<div class="content_div">
					<table id="list_readed_message" class="display listTable_readed_message">
					<thead>
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">内容</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">回复对象</span></th>
							<th style="padding:0;" width="100px;"><span class="hide">消息日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>
			<div class="content_tab" id="tab_5">
				<div class="label">发送消息</div>				
				<div class="content_div">
					
					
				</div>
			</div>
			
		</div>
	</div>
	
</body>
</html>