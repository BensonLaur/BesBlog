<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="java.util.*" %>
<%@ page import="com.besblog.pojo.*" %>
<!DOCTYPE html PUBLIC "-//W3C//ddD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.ddd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>订阅文章</title>
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/manager.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css" media="all">
  	
    <script type="text/javascript" src="/BesBlog/js/etc/jquery-1.12.3.js"></script>
  	<script type="text/javascript" src="/BesBlog/js/etc/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/BesBlog/js/manager.js"></script>
    <script type="text/javascript" src="/BesBlog/js/subscription.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>
</head>

<%-- 没登录则跳转到登录提示界面 --%>
<c:if test="${empty uid}">
	<c:redirect url="loginTip.jsp"></c:redirect>
</c:if>
<%
	String uid = (String)request.getSession().getAttribute("uid");
%>

<body onload="select_all_subscription_article()">
	<div class="navbar-inner">
		<span class="top_Blog_name">
			BesBlog
		</span>
		<div class="top_button_div">
			<a class="span1 btn" onclick="onManagerArticle()" id="btn_manager_article">管理博文</a>
			<a class="span1 btn hide" href="/BesBlog/article/alter.action?alterType=create&aid=any" id="btn_add_article">添加新文</a>
			<a class="span1 btn" href="/BesBlog/jsp/allArticle.jsp?uid=<%=uid %>" id="btn_view_blog">查看博客</a>
		</div>
			<c:if test="${!empty sessionScope.uid}">
					<div  style="display: normal;"> 
						<span class="float_right" style="border:1px solid rgb(194, 223, 136);border-radius:4px;margin:1px;">
							 <span style="display:inline;margin:6px 4px;" class="float_right">欢迎登录！
							 	<a class="green_link margin5" href="/BesBlog/jsp/manager.jsp">${sessionScope.nickname}</a>.
							 	<a class="green_link margin5" onclick="onLogOff()">注销</a>
							 </span>
						 </span>
					</div>
			</c:if>
	</div>
	<div class="main_content">
		<div class="left_guid" style="text-align: center;">
			<div class="left_dl">
				<span id="id_all_subscription_article"  class="child_item" onclick='loadSubscrptionArticle("all")'>所有订阅</span>
				<hr style="margin:5px;"/>
				<div class="subscription_names_scrollable">
					<table id="list_subscription_name" class="listTable_all_subscription">
						<tbody>
							<c:forEach items="${requestScope.ObjectUsers}" var="user">
								<tr><td data-user-id="${user.uid}" class="child_item" onclick='loadSubscrptionArticle("${user.uid}")'>${user.nickname}</td></tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		
		<div class="right_content">
			<div class="content_tab" style="display: block">
				<div class="subscribe_article_content">

					<div class="content_top_div" >
						<a class="green_link pull-right" href="/BesBlog/jsp/manager.jsp#tab_6">返回订阅博主列表</a>
					</div>
					<div class="clear"></div>
					<div class="content_div">
						<div id="list_body_subscription_article">
							<div class="article_block">
								<div style="text-align:center;" class="margin_top5 margin_bottom5">
								没有查询到文章！
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	

</body>
</html>