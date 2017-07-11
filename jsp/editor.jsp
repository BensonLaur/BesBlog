<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//ddD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.ddd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>编辑文章</title>
	<link rel="stylesheet" type="text/css" href="/BesBlog/css/bootstrap.min.css" media="all">
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/common.css" media="all"> 
  	<link rel="stylesheet" type="text/css" href="/BesBlog/css/editor.css">
	
    <script type="text/javascript" src="/BesBlog/js/etc/jquery-1.12.3.js"></script>
  	<script type="text/javascript" src="/BesBlog/js/etc/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/BesBlog/js/manager.js"></script>
    <script type="text/javascript" src="/BesBlog/js/editor.js"></script>
    <script type="text/javascript" src="/BesBlog/js/etc/global.js"></script>
    
   	<!-- 使用ueditor -->
    <script type="text/javascript" charset="utf-8" src="/BesBlog/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/BesBlog/ueditor/ueditor.all.min.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="/BesBlog/ueditor/lang/zh-cn/zh-cn.js"></script>
</head>

<%-- 没登录则跳转到登录提示界面 --%>
<c:if test="${empty uid}">
	<%-- 或者使用  <jsp:forward page="loginTip.jsp"></jsp:forward> --%>
	<c:redirect url="loginTip.jsp"></c:redirect>
</c:if>

<%
	String alterType = (String)request.getParameter("alterType");
	String aid = (String)request.getParameter("aid");
	String articleStatus =  (String)request.getParameter("articleStatus");
	String error="出错了！";
	if(alterType==null||alterType.equals("null")||!(alterType.equals("create")||alterType.equals("modify")))
		error="request type error!";
	else
		request.setAttribute("alterType", alterType);
	if(aid!=null&&!aid.equals(""))
		request.setAttribute("aid", aid);
%>

<%-- 没需要的参数则跳转到出错提示界面 --%>
<c:if test="${empty alterType or empty aid}">
	<c:redirect url="/jsp/errorTip.jsp">
		<c:param name="error" value="<%=error %>"></c:param>
	</c:redirect>
</c:if>
<%
	String uid = (String)request.getSession().getAttribute("uid");
%>

<body onload='initEditorPage("<%=alterType %>","<%=aid%>","<%=articleStatus %>")'>
	<div class="navbar-inner">
		<span class="top_Blog_name">
			BesBlog
		</span>
		<div class="top_button_div">
			<a class="span1 btn" onclick="onManagerArticle()" id="btn_manager_article">管理博文</a>
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
	
	
	<div class="container">
		<div class="greenTip margin_top10 hide" id="green_tip_article">
				<button type="button" class="close" data-hide="greenTip">×</button>
				<strong id="green_tip_content">这里提供用户友好的提示</strong>
		</div>
		<div class="editor_article_title"> 
			<span>
				<span class="label"> 文章标题：</span>
				<input id="input_title" style="width:550px;margin-top:10px;" type="text"/>

				<a class="btn" id="btn_publish" onclick="publishArticle()">发表文章</a>
				<a class="btn hide" id="btn_update" onclick="updateArticle()">更新文章</a>
				<a class="btn" id="btn_saveDraft" onclick="saveAsDraft()">转收为草稿</a>
				<a class="btn hide" id="btn_toPublish" onclick="saveAsPublishedArticle()">公开为文章</a>
				<a class="btn" id="btn_" onclick="" >预览</a>
				<a class="btn" onclick="onManagerArticle()">关闭</a>
			</span>
			<div class="clear"></div>
		</div>
		<div class="editor" >
    		<script id="ArticleEditor" type="text/plain" style="width:100%;height:400px;"></script>
		</div>
	</div>
	
	
<script type="text/javascript">

    //实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('ArticleEditor');
    
</script>

</body>
</html>