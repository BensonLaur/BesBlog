<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>BesLyric 登录</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common_center_board.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css">

    <script type="text/javascript" src="/BesBlog/js/etc/jquery-1.12.3.js"></script>
    <script type="text/javascript" src="/BesBlog/js/BesLyric.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>

</head>

<body>
<div class="main">
	    <!-- 网页页头：包含主菜单 和 路径导航 -->
		<div class="header">
			<div class="main_menu">
				<ul class="main_left_selected_item">
<!-- 					<li class="padding10">管理员登录</li>
					<li><a href="/BesBlog/jsp/login.jsp"></a></li> -->
				</ul>

				<span>
					<span class="top_Blog_name" id="center_Blog_name" >BesLyric</span>
				</span>

			</div>
			
		</div>

		<div class="content container">
			<table id="list_all_login" class="display listTable_all_login">
					<thead>
						<tr>
							<th  style="padding:0;" width="70px;"><span class="hide">记录id</span></th>
							<th  style="padding:0;" width="200px;"><span class="hide">ip</span></th>
							<th  style="padding:0;" width="100px;"><span class="hide">登录时间</span></th>
						</tr>
					</thead>
					<tbody></tbody>
			</table>
			
		
		</div>

	</div>
	
</body>
</html>
