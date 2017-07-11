<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>访问需要登录</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common_center_board.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css">

    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>
</head>
<body>
<div class=" main ">
	    <!-- 网页页头：包含主菜单 和 路径导航 -->
		<div class="header">
			<div class="main_menu">
				<ul class="main_left_selected_item">
					<li>入口：</li>
					<li><a href="/BesBlog/jsp/adminLogin.jsp">管理员登录</a></li>
				</ul>
				<span>
					<span class="top_Blog_name" id="center_Blog_name" >BesBlog</span>
				</span>

					
			</div>
			
		</div>

		<div class="container">
			
			<div class="data_list user">
				<div class="data_list_title green_shadow">
					无法访问页面！
				</div>
				<form method="post" id="user">
					<div class="margin_top10">
						页面需要登录！前往  <a href="/BesBlog/jsp/adminLogin.jsp">登录</a>
					</div>
				</form>
				<br clear="all">
			</div>
		
		</div>

	</div>
	
</body>
</html>
