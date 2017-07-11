<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html PUBLIC "-//W3C//ddD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.ddd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>所有文章</title>
  	
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/jquery.dataTables.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/blogview.css">
  	
    <script type="text/javascript" src="/BesBlog/js/etc/jquery-1.12.3.js"></script>
  	<script type="text/javascript" src="/BesBlog/js/etc/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/BesBlog/js/allArticle.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>
</head>
<%
	String uid = (String)request.getParameter("uid");
%>
<body onload='initAllArticlePage("<%=uid %>")'>
	<div class="navbar-inner">
		<div class="top_left_blogger_title">
			<div id="bloger_top_name" style="font-size: 2em;margin:20px 0px">
				没有博客名字数据
			</div>	
			<div class="green_shadow" style="margin:10px 0px" id="blog_info_top">
				没有博客简介数据
			</div>
		</div>
		
		<div class="top_right_blog_name">
			<span > <img style="width:100px;height:100px;" alt="no image" src="/BesBlog/photo/BesBlog.png" ></span>
			<span class="top_Blog_name">
				BesBlog
			</span>
		</div>
			<c:if test="${!empty sessionScope.uid}">
					<div style="display: normal;" > 
						<span class="pull-right" style="border:1px solid rgb(194, 223, 136);border-radius:4px;margin-top:62px;">
							 <span style="display:inline;margin:6px 4px;" class="float_right">欢迎登录！
							 	<a class="green_link margin5" href="/BesBlog/jsp/manager.jsp">${sessionScope.nickname}</a>.
							 	<a class="green_link margin5" onclick="onLogOff()">注销</a>
							 </span>
						 </span>
					</div>
			</c:if>
			<c:if test="${empty sessionScope.uid}">
				<div style="display: normal;" > 
						<span class="pull-right" style="border:1px solid rgb(194, 223, 136);border-radius:4px;margin-top:70px;">
							 	<a class="green_link margin5" href="/BesBlog/jsp/login.jsp" target="_blank">登录</a>
						 </span>
					</div>
			</c:if>
	</div>
	<div class="clear"></div>
	
	<div class="main_content">
		
		
		<div class="left_info pull-left">

				<div class="info_block" style="width:200px;height:200px;margin:10px;" >
					<div>
						<span class="thumbnail" style="width:100px;height:100px;">
							<img id="info_pic" class="img-polaroid"  style="width:90%;height:90%;" alt="头像" /><br/>
						</span>
						<span id="info_name">BensonLaur</span>
					</div>
					<div>
						<span id="profile_tip">个人简介：</span><br/>
						<span id="profile_content" style="width:98%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;">没有简介内容数据</span>
					</div>
				</div>
				
				<div class="info_block hide" style="width:200px;height:200px;margin:10px;">
					<div >博文归档</div>
					<div>
						<ul>
							<li>
								<a href="#">article1</a>
							</li>
							<li>
								<a href="#">article2</a>
							</li>
							<li>
								<a href="#">article3</a>
							</li>
							<li>
								<a href="#">article4</a>
							</li>
						</ul>
					</div>
				</div>

		</div>
		
		<div class="right_article" >
			<span class="float_right label margin_top10 margin_right10">所有文章</span>
			<div class="clear"></div>
			<hr style="margin:5px;"/>
			<table id="list_all_article" class="display listTable_all_article">
					<thead>
						<tr>
							<th  style="padding:0;" width="300px;"><span class="hide">标题</span></th>
							<th  style="padding:0;" width="70px;"><span class="hide">评论数</span></th>
							<th  style="padding:0;" width="70px;"><span class="hide">阅读数</span></th>
							<th  style="padding:0;" width="100px;"><span class="hide">发表日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
			</table>
		</div>
		
	</div>
	
	

</body>
</html>