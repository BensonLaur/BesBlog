<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>BesBlog 注册</title>
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
					<li><a href="/BesBlog/jsp/login.jsp">登录</a></li>
					<li><a href="/BesBlog/jsp/createAccount.jsp">注册</a></li>
				</ul>
				<span>
					<span class="top_Blog_name" id="center_Blog_name" >BesBlog</span>
				</span>
				<ul class="main_right_selected_item">
<!-- 				<li><a href="/resume/jsp/common/enterprise_logon.jsp">登录</a></li>
					<li><a href="/resume/jsp/common/enterprise_signin.jsp">注册</a></li>
					<li>企业主页</li> -->
				</ul>
					
			</div>
			
			<c:if test="${!empty sessionScope.uid}">
					<div class="e_logon_tip" style="display: normal;"> 
						<span class="float_right" style="border:1px solid;border-radius:4px;margin:1px;">
							 <span style="display:inline;margin:6px 4px;" class="float_right">欢迎登录！
							 	<a class="green_link margin5" href="/BesBlog/jsp/manager.jsp">${sessionScope.nickname}</a>.
							 	<a class="green_link margin5" onclick="onLogOff()">注销</a>
							 </span>
						 </span>
					</div>
			</c:if>
		</div>
		<%-- 获取request中的信息显示 --%>
		<%  
			String email = (String)request.getAttribute("email");
			if(email==null)email="";
			String tempLink =(String)request.getAttribute("tempLink");
		%>
		<div class="container">
			
			<div class="data_list user">
				<div class="data_list_title green_shadow">
					欢迎加入BesBlog
				</div>
				<form method="post" id="user">
					<div class="control-group">
						激活邮件已发送至 <%=email %>, 请前往邮箱激活账户！
					</div>
					<div>
						<a style="cursor:pointer" onclick='jumpToLink("<%=tempLink %>")'>临时激活链接</a>					
					</div>
				</form>
				<br clear="all">
			</div>
		
		</div>

	</div>
	
</body>
</html>
