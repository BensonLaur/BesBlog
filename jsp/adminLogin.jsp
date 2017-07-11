<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>管理员登录</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common_center_board.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css">

    <script type="text/javascript" src="/BesBlog/js/etc/jquery-1.12.3.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>

</head>

<c:if test="${!empty admin}">
	<%-- 或者使用  <jsp:forward page="loginTip.jsp"></jsp:forward> --%>
	<c:redirect url="/jsp/adminManager.jsp"></c:redirect>
</c:if>

<body>
<div class="main">
	    <!-- 网页页头：包含主菜单 和 路径导航 -->
		<div class="header">
			<div class="main_menu">
				<ul class="main_left_selected_item">
					<li class="padding10">管理员登录</li>
					<li><a href="/BesBlog/jsp/login.jsp"></a></li>
				</ul>

				<span>
					<span class="top_Blog_name" id="center_Blog_name" >BesBlog</span>
				</span>

			</div>
			
		</div>
		<%-- 获取request中的信息显示 --%>
		<%  
			String account = (String)request.getAttribute("account");
			String error = (String)request.getAttribute("error");
			if(account==null)account="";
			if(error==null)error="";
		%>
		<div class="content container">
			
			<div class="data_list user">
				<div class="data_list_title green_shadow">
					欢迎登录BesBlog 后台系统
				</div>
				<form method="post" action="/BesBlog/admin/doAdminLogin.action">
					<div class="margin_top10">
						<span class="error"><%=error %></span>
					</div>
					<div class="margin_top10">
						<label class="control-label" for="account">账户:</label><input type="text" name="account" id="account" data_name="账户" placeholder="账户" value="<%=account %>">
					</div>
					<div class="margin_top10">
						<label class="control-label" for="password">密码:</label><input type="password" name="password" id="password" data_name="密码" placeholder="密码">
					</div>
					<div class="margin_top10 post" id="create">
						<input class="btn span2" type="submit" value="登录"/>
					</div>
				</form>
				<br clear="all">
			</div>
		
		</div>

	</div>
	
</body>
</html>
