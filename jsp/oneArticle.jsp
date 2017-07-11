<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//ddD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.ddd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>单篇文章</title>
  	
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/jquery.dataTables.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/blogview.css">
  	
    <script type="text/javascript" src="/BesBlog/js/etc/jquery-1.12.3.js"></script>
  	<script type="text/javascript" src="/BesBlog/js/etc/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/BesBlog/js/oneArticle.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>
    
        
   	<!-- 使用ueditor -->
    <script type="text/javascript" charset="utf-8" src="/BesBlog/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/BesBlog/ueditor/ueditor.all.min.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="/BesBlog/ueditor/lang/zh-cn/zh-cn.js"></script>
</head>
<%
String loginUid = (String)request.getSession().getAttribute("uid");
String uid = (String)request.getParameter("uid");
String aid = (String)request.getParameter("aid");
%>
<body onload='initOneArticlePage("<%=loginUid %>","<%=uid %>","<%=aid %>")'>
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
							 	<a class="green_link margin5" href="/BesBlog/jsp/login.jsp"  target="_blank">登录</a>
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
							<img id="info_pic" class="img-polaroid" style="width:90%;height:90%;" alt="头像" /><br/>
						</span>
						<a id="info_name" class="green_link margin20" href="/BesBlog/jsp/allArticle.jsp?uid=<%=uid %>">BensonLaur</a>
					</div>
					<div>
						<span id="profile_tip">个人简介：</span><br/>
						<span id="profile_content" style="width:98%;word-break:normal;display:block;white-space:pre-wrap;overflow:hidden;">没有简介内容数据</span>
					</div>
				</div>
				<div class="info_block " style="width:200px;height:200px;margin:10px;">
					<a id="info_name" class="green_link margin20" href="/BesBlog/jsp/allArticle.jsp?uid=<%=uid %>">查看所有文章</a>
					
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
			<div class="article_block">
				<span class="float_left article_title green_shadow" style="font-size: medium;" id="article_title">没有标题数据</span>
				<div class="clear"></div>
				<hr style="margin:5px;"/>
				<div class="article_content article_block" style="background-color: #ffffff" id="article_content">
					没有文章数据
				</div>
			</div>
			
			<div class="article_foot" id="article_foot">
				<div class="foot_top" style="width:99%;" id="foot_top">
					<div class="float_left">
						上一篇：<span id="previous_article"><a>上一篇</a></span>
						<br/>
						下一篇：<span id="next_article"><a>下一篇</a></span>
					</div>
					<div class="float_right">
					    <span ><span class="margin5">评论数:</span><span class="margin5" id="ccomment">0</span></span>
					    <span ><span class="margin5">阅读数:</span><span class="margin5" id="cread">0</span></span>
					    <span class="hide"><span>推荐数:</span><span id="crecomend">0</span></span>
					</div>
				</div>
				<div class="clear"></div>
				<hr style="margin:5px;"/>
				<div  class="foot_bottom" style="width:99%;" id="foot_bottom">
					
					<div class="float_right">
					    <span  class="margin5">最后编辑时间:</span><span id="last_edit_time"  class="margin5">2017-03-27 15:30</span>
					    <span  class="margin5">建立时间:</span><span id="published_time"  class="margin5">2017-03-27 15:30</span>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			
			<div class="comment_div article_block margin_top20 margin_bottom20" id="comment_div">
			
			</div>
			
			<div class="commit_comment_div article_block margin_top20 margin_bottom20" id="commit_comment_div">
				<div class="greenTip margin_top10 hide" id="green_tip_article">
					<button type="button" class="close" data-hide="greenTip">×</button>
					<strong id="green_tip_content">这里提供用户友好的提示</strong>
				</div>
				<script id="commentEditor" type="text/plain" style="width:600px;height:300px;"></script>
				<div style="width:600px;height:50px;">
					<div class="pull-left">
						<span class="label margin10">评论对象：</span>
						<span class="margin10 green_shadow" id="span_comment_target">博文</span>
						<span class="btn margin10 hide" id="reset_comment_target" onclick="reset_comment_target()">重置评论对象为博文</span>
					</div>
					<div class="pull-right"><span class="btn margin10" id="commit_comment" onclick='onCommitComment("<%=loginUid%>")'>发表评论</span></div>
				</div>
			</div>
		</div>
		

	</div>
	
<script type="text/javascript">

    //实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('commentEditor',{
    		toolbars: [['undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
             'fontfamily', 'fontsize', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink']]});
    
</script>

</body>
</html>
