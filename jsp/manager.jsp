<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//ddD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.ddd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>博客管理</title>
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/jquery.dataTables.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css" media="all"> 
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/manager.css">  
  	
    <script type="text/javascript" src="/BesBlog/js/etc/jquery-1.12.3.js"></script>
  	<script type="text/javascript" src="/BesBlog/js/etc/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/bootstrap.js"></script>
    <script type="text/javascript" src="/BesBlog/js/manager.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>
</head>

<%-- 没登录则跳转到登录提示界面 --%>
<c:if test="${empty uid}">
	<%-- 或者使用  <jsp:forward page="loginTip.jsp"></jsp:forward> --%>
	<c:redirect url="loginTip.jsp"></c:redirect>
</c:if>

<%
	String uid = (String)request.getSession().getAttribute("uid");
%>

<body onload='initPage("<%=uid %>")'>
	<div class="navbar-inner">
		<span class="top_Blog_name">
			BesBlog
		</span>
		<div class="top_button_div">
			<a class="span1 btn" onclick="onManagerArticle()" id="btn_manager_article">管理博文</a>
			<a class="span1 btn" href="/BesBlog/article/alter.action?alterType=create&aid=any" id="btn_add_article">添加新文</a>
			<a class="span1 btn" href="/BesBlog/jsp/allArticle.jsp?uid=<%=uid %>" id="btn_view_blog">查看博客</a>
		</div>
			<c:if test="${!empty sessionScope.uid}">
					<div style="display: normal;"> 
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
		<div class="left_guid">
			<dl class="left_dl">
				<dt class="parent_item">博文列表</dt>
					<dd data-menu="menu1" class="child_item selected_item" onclick="onSelectAllArticle()">全部(<span id="countTotalArticle">0</span>)</dd>
					<dd data-menu="menu2" class="child_item" onclick="onSelectPublishedArticle()">已发布(<span id="countPublishArticle">0</span>)</dd>
					<dd data-menu="menu3" class="child_item" onclick="onSelectDraftArticle()">草稿(<span id="countDraftArticle">0</span>)</dd>
				
				<dt class="parent_item">评论列表</dt>
					<dd data-menu="menu4" class="child_item" onclick="onSelectNormalComment()">评论区留言(<span id="countNormalCommnet">0</span>)</dd>
					<dd data-menu="menu5" class="child_item" onclick="onSelectTrashComment()">垃圾留言(<span id="countTrashCommnet">0</span>)</dd>
				
				<dt class="parent_item">订阅列表</dt>
					<dd data-menu="menu6" class="child_item" onclick="onSelectSubscription()"> 查看订阅列表</dd>
					<dd class="child_item"> 
						<div style="margin:0 auto;width:130px;text-align: center;"><a class="btn" onclick="addSubscription()" id="btn_view_blog">添加订阅</a></div></dd>
				<dt class="parent_item">基本信息</dt>
					<dd data-menu="menu7" class="child_item" onclick="onSelectInfomation()">信息面板</dd>
					<dd data-menu="menu8" class="child_item" onclick="onSelectPassword()">密码修改</dd>
			</dl>
		</div>
		
		<div class="right_content">
			<div class="content_tab" id="tab_1">
				<div class="label">全部博文列表</div>	
				
				<div class="content_div">
					<table id="list_all_article" class="display listTable_all_article" >
					<thead >
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">标题</span></th>
							<th style="padding:0;" width="30px;"><span class="hide">草稿</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">评论数</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">阅读数</span></th>
							<th style="padding:0;" width="100px;"><span class="hide">发表日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>

			<div class="content_tab" id="tab_2">
				<div class="label">已发布</div>	
				
				<div class="content_div">
					<table id="list_published_article" class="display listTable_all_published">
					<thead>
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">标题</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">评论数</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">阅读数</span></th>
							<th style="padding:0;" width="100px;"><span class="hide">发表日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>
			
			<div class="content_tab" id="tab_3">
				<div class="label">草稿</div>				
				<div class="content_div">
					<table id="list_draft_article" class="display listTable_all_draft">
					<thead>
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">标题</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">评论数</span></th>
							<th style="padding:0;" width="40px;"><span class="hide">阅读数</span></th>
							<th style="padding:0;" width="100px;"><span class="hide">发表日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>
			
			<div class="content_tab" id="tab_4">
				<div class="label">评论区留言</div>	
				
				<div class="content_div">
					<table id="list_comment" class="display listTable_comment">
					<thead>
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">评论内容</span></th>
							<th style="padding:0;" width="90px;"><span class="hide">操作</span></th>
							<th style="padding:0;" width="70px;"><span class="hide">评论者</span></th>
							<th style="padding:0;" width="100px;"><span class="hide"> 发表日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>

			<div class="content_tab" id="tab_5">
				<div class="label">垃圾留言</div>	
				
				<div class="content_div">
					<table id="list_trash" class="display listTable_trash">
					<thead>
						<tr>
							<th style="padding:0;" width="400px;"><span class="hide">评论内容</span></th>
							<th style="padding:0;" width="90px;"><span class="hide">操作</span></th>
							<th style="padding:0;" width="70px;"><span class="hide">评论者</span></th>
							<th style="padding:0;" width="100px;"><span class="hide"> 发表日期</span></th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>

			<div class="content_tab" id="tab_6">	
				
				<div class="content_top_div" >
					<div class="pull-left greenTip hide" id="subscription_block">
						<label  for="subscribeTargetName" class="green_shadow" style="display: inline-block;">请输入订阅对象的昵称:</label>
						<input class="margin_top5" id="subscribeTargetName" type="text"/>
						<span class="btn margin_bottom5" onclick="checkSubscription()">订阅</span>
					    <button type="button" class="close" data-hide="subscription_block">×</button>
					</div>
					<a class="green_link pull-right"  href="/BesBlog/subscription/showSubscription.action">查看所有订阅文章</a>
				</div>
				<div class="greenTip margin_top5 hide" id="green_tip_subscription">
					<button type="button" class="close" data-hide="greenTip">×</button>
					<strong id="green_tip_content_subscription" style="padding-left:50px;">这里提供用户友好的提示</strong>
				</div>
				<div class="clear"></div>
				<div class="label pull-left">订阅列表</div>
				<div class="content_div">
					<table id="list_subscription" class="display listTable_subscription">
					<thead>
						<tr>
							<th width="200px;">订阅博主<br></th>
							<th width="400px;">对方注册邮箱地址</th>
							<th width="100px;">操作</th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
				</div>
			</div>

			<div class="content_tab" id="tab_7">
				<div class="label">信息面板</div>	
				<div id="place_to_hold_tip">

				</div>
				<div class="content_div">
					<table class="table-striped" id="info_table" style="margin-left:10px;">
						<tr>
							<th style="width:90px;">邮箱：</th>
							<td id="info_email" style="padding:5px;"></td>
						</tr>
						<tr>
							<th>昵称：</th>
							<td style="padding:5px;">
								<div  id="board_info_nickname">
									<span  id="info_nickname"></span>
									<span id="modify_nickname">
										<span class="green_link margin_left10" onclick='onModifyInfo("nickname")'>修改</span>
									</span>
								</div>
								<div class="hide" id="board_modify_nickname">
									<span>
										<input type="text" id="input_nickname"/>
									</span>
									<span id="modify_nickname">
										<span class="green_link margin_left10" onclick='onSaveInfo("nickname")' >保存</span>
										<span class="green_link margin_left10" onclick='onCancelModify("nickname")'>取消</span>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>博客头像：</th>
							<td ><span>
								<img  id="info_photo" alt="no image" src="/BesBlog/photo/default.png" style="width:100px;height:100px;"></span>
								<span id="modify_photo">
									<input class="green_link margin_left20 btn" type="file" id="file" name="file" style="width:450" accept=".jpg,.png, .gif"/> 
									<input class="green_link margin_left10 btn" type="submit" value="上传文件"/>
								</span>
							</td>
						</tr>
						<tr>
							<th>个人简介：</th>
							<td style="padding:5px;">
								<div id="board_info_personinfo">
									<span class="pull-left" style="display:block;max-width:400px;" id="info_personinfo"></span>
									<span id="modify_personinfo">
										<span class="green_link margin_left10" onclick='onModifyInfo("personinfo")'>修改</span>
									</span>
								</div>
								<div class="hide" id="board_modify_personinfo">
									<span>
										<textarea style="width: 400px;" id="input_personinfo" rows="2" cols="40"></textarea>
									</span>
									<span id="modify_personinfo">
										<span class="green_link margin_left10" onclick='onSaveInfo("personinfo")' >保存</span>
										<span class="green_link margin_left10" onclick='onCancelModify("personinfo")'>取消</span>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>博客简言：</th>
							<td style="padding:5px;">
								<div id="board_info_bloginfo" data-info-show-board="bloginfo">
									<span class="pull-left" style="display:block;max-width:400px;" id="info_bloginfo"></span>
									<span id="modify_bloginfo">
										<span class="green_link margin_left10" onclick='onModifyInfo("bloginfo")'>修改</span>
									</span>
								</div>
								<div class="hide" id="board_modify_bloginfo" data-info-modify-board="bloginfo">
									<span>
										<textarea style="width: 400px;" id="input_bloginfo" rows="2" cols="40"></textarea>
									</span>									
									<span id="modify_bloginfo">
										<span class="green_link margin_left10" onclick='onSaveInfo("bloginfo")' >保存</span>
										<span class="green_link margin_left10" onclick='onCancelModify("bloginfo")'>取消</span>
									</span>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>

			<div class="content_tab" id="tab_8">
				<div class="greenTip margin_top5 hide" id="green_tip_password">
					<button type="button" class="close" data-hide="greenTip">×</button>
					<strong id="green_tip_content_password" style="padding-left:50px;">这里提供用户友好的提示</strong>
				</div>
				
				<div class="label">密码修改</div>	
				
				<div class="content_div">
				 <table style="width:100%;height:60%;text-align:center;margin-top:10px;margin-left:30px;" >
					<tr>
						<td style="width:70px">原先密码</td>
						<td style="width:260px"><input type="password" id="password0"><span id="password0_tip"></span></td>
					</tr>
					<tr>
						<td >新的密码</td>
						<td><input  type="password" id="password1"></td>
						<td><span id="password1_tip"></span></td>
					</tr>
					<tr>
						<td >确认密码</td>
						<td><input  type="password" id="password2"></td>
						<td><span id="password2_tip"></span></td>
					</tr>
					<tr>
						<td></td>
						<td><div><span class="span1 btn"  id="passwd_modify_conform" onclick="onModifyPasswd()">确认修改</span></div></td>
						<td></td>
					</tr>
				</table>
				</div>
			</div>
			
		</div>
	</div>
	
	

</body>
</html>