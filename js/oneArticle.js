//自定的，多个文件公用的全局变量 ，和方法
//document.writeln("<script src='/BesBlog/js/etc/global.js' type='text/javascript'></script>");


//为提示框添加自动隐藏功能
$(document).ready(function(){
	$("button.close").click(function(){
		$(this).parent().hide();
	});
});

var currentAid="";
var loginUid="";
function initOneArticlePage(_loginUid,uid,aid)
{
	currentAid = aid;
	loginUid = _loginUid;
	
	//增加文章的访问量数据
	increaceArticleReadCount(aid);
	
	//加载博客和个人基本信息
	loadBlogerInfo(uid);
	
	//加载文章的基本数据
	loadArticle(uid,aid);
	
	//加载评论数据
	loadComment(aid);
	
	//初始化评论区域
}

//添加文章的阅读量
function increaceArticleReadCount(aid)
{
	//异步请求用户的数据，填充文章页面
    $.post("/BesBlog/article/increaceArticleReadCount.action?aid="+aid,function(data,status){
    	if(status=="success"){}
    	else{}
    },"json");
}

function loadBlogerInfo(uid)
{
	//异步请求用户的数据，填充文章页面
    $.post("/BesBlog/getData/userInfo2.action?uid="+uid,function(data,status){
    	if(status=="success")
    	{
    		$("#bloger_top_name").html(data.nickname);
    		$("#blog_info_top").html(data.blogInfo);

    		$("#info_name").html(data.nickname);
    		$("#info_pic").attr("src","/BesBlog/photo/"+data.photo);
    		$("#profile_content").html(data.personInfo);
    		
    	}
    	else
    		alert("请求用户数据异常");
    },"json");
}

function loadArticle(uid,aid)
{
	//异步请求文章的数据
    $.post("/BesBlog/article/getPublishedArticleContent.action?aid="+aid,function(data,status){
    	if(status=="success")
    	{
    		$("#article_title").html(data.articleToShow.title);
    		$("#article_content").html(data.articleToShow.content);
    		
    		$("#crecomend").html(data.articleToShow.crecomendation);

    		$("#last_edit_time").html(data.articleToShow.stringEditTime);
    		$("#published_time").html(data.articleToShow.stringEstablishtime);

    		$("#ccomment").html(data.articleToShow.ccomment);
    		$("#cread").html(data.articleToShow.cread);
    		
    		
    		//上一篇下一篇文章链接
    		if( data.articleToShow.preArticleId == "")
    			$("#previous_article").html("<span>没有上一篇文章</span>");
    		else
    			$("#previous_article").html('<a href="/BesBlog/jsp/oneArticle.jsp?uid='+uid+'&aid='+data.articleToShow.preArticleId+'">'+data.articleToShow.preArticleTitle+'</a>');
    		
    		if(  data.articleToShow.nextArticleId == "" )
    			$("#next_article").html("<span>没有下一篇文章</span>");
    		else
    			$("#next_article").html('<a href="/BesBlog/jsp/oneArticle.jsp?uid='+uid+'&aid='+data.articleToShow.nextArticleId+'">'+data.articleToShow.nextArticleTitle+'</a>');
    		
    	}
    	else
    		alert("请求文章数据异常");
    },"json");
}

function loadComment(aid)
{
	//异步请求评论的数据
    $.post("/BesBlog/comment/getCommentUnderArticle.action?aid="+aid,function(data,status){
    	if(status=="success")
    	{
    		var commentsString="";
    		var commentsString2="";
    		var commentHtml="";
    		if(data.comments.length==0)
    			commentHtml= '<div><span class="label">文章评论:</span><span class="margin_left10">还没有评论</span></div>';
    		else
    		{
    			commentHtml = '<div><span class="label">文章评论:</span></div>';
    			 for(var i=0;i<data.comments.length;i++)
    			 {
    				 commentsString="";
    				 //针对文章的评论div头
    				 commentsString += '<div class="info_block" id="'+data.comments[i].cid+'" >';
    				 var deleteLink ='';
    				 if(loginUid == data.comments[i].uid)
    					 deleteLink = '			<span class=\"pull-right green_link\"><a  onclick=\'onDeleteComment(\"'+data.comments[i].cid+'\")\'>删除我的评论</a></span>		';
    				else
    					deleteLink = '			<span class=\"pull-right green_link hide\"><a  onclick=\'onDeleteComment(\"'+data.comments[i].cid+'\")\'>删除我的评论</a></span>		';
    				
    						 
    				 //添加评论主体
    				 commentsString +=
    				 ['<div class="comment_block">',
    				  '	<div class="comment_user_info pull-left" >',
    				  '		<span class="thumbnail comment_user_photo">',
    				  '			<img class="img-polaroid" alt="头像" src="/BesBlog/photo/'+data.comments[i].photo+'"/><br/>',
    				  '		</span>',
    				  '		<span class="comment_user_name">'+data.comments[i].nickname+'</span>',
    				  '	</div>',
    				  '	<div class="comment_content_board">',
    				  '		<div class="comment_content_head">',
    				  '			<span class="pull-left">发布时间：'+data.comments[i].time+'</span>',
    				  '			<span class="pull-right">楼层数：'+data.comments[i].cfloor+'</span>',
    				  '			<span class="pull-right green_link"><a  onclick=\'onReplyComment("'+data.comments[i].cfloor+'","'+data.comments[i].cid+'")\'>回复</a></span>		',
    				  deleteLink,
    				  '		</div>',
    				  '		<div class="comment_content_body">'+data.comments[i].content,
    				  '		</div>',
    				  '</div>',
    				  '</div>'].join("");
    				 
    				 if(data.comments[i].comments.length!=0)
    				 {
	    				 //添加增对评论的评论
	    				 commentsString +='<div class="comment_to_comment">';
	    				 for(var j=0;j<data.comments[i].comments.length;j++)
	    				 {
	    					 if(loginUid == data.comments[i].comments[j].uid)
	        					 deleteLink = '			<span class=\"pull-right green_link\"><a  onclick=\'onDeleteComment(\"'+data.comments[i].comments[j].cid+'\")\'>删除我的评论</a></span>		';
	        				else
	        					deleteLink = '			<span class=\"pull-right green_link hide\"><a  onclick=\'onDeleteComment(\"'+data.comments[i].comments[j].cid+'\")\'>删除我的评论</a></span>		';
	        				
	    					 
	    					 commentsString2="";
	    					 commentsString2+=
	    						 ['<div class="comment_block">',
	    						  '	<div class="comment_user_info pull-left" >',
	    						  '		<span class="thumbnail comment_user_photo" >',
	    						  '			<img class="img-polaroid" alt="头像" src="/BesBlog/photo/'+data.comments[i].comments[j].photo+'"/><br/>',
	    						  '		</span>',
	    						  '		<span class="comment_user_name" >'+data.comments[i].comments[j].nickname+'</span>',
	    						  '	</div>',
	    						  '	<div class="comment_content_board">',
	    						  '		<div class="comment_content_head">',
	    						  '			<span class="pull-left">发布时间：'+data.comments[i].comments[j].time+'</span>',
	    						  '			<span class="pull-right">单元数：'+data.comments[i].comments[j].cunit+'</span>',
	    						  deleteLink,
	    						  '		</div>',
	    						  '		<div class="comment_content_body">'+data.comments[i].comments[j].content,
	    						  '		</div>',
	    						  '	</div>',
	    						  '</div>'].join("");
	    						 
	    					 commentsString += commentsString2;
	    				 }
    				 }
    				 
    				 commentsString +='</div>';
    				 
    				 //针对文章的评论div头
    				 commentsString += '</div>';
    				 commentHtml += commentsString;
    			 }
    		}
    		
    		$("#comment_div").empty();
    		$("#comment_div").html(commentHtml);
    	}
    	else
    		alert("请求文章数据异常");
    },"json");
}

function onDeleteComment(cid)
{
	//异步请求用户的数据，填充文章页面
    $.post("/BesBlog/comment/deleteUnderArticle.action?uid="+loginUid+"&cid="+cid,function(data,status){
    	if(status=="success")
    	{
    		if(data.resultType=="success")
			{	
				alert("成功删除评论");
				window.location.reload();
			}
			else if(data.resultType=="fail")
			{
				alert(data.error);
			}
    	}
    	else
    		alert("请求用户数据异常");
    },"json");
}

function onReplyComment(cfloor,cid)
{
	commentTarget="comment";
	commentCid = cid;
	$("#span_comment_target").html(cfloor+"楼 评论");
	$("#reset_comment_target").show();

	//显示提示板块
	$("#green_tip_content").text("当前评论对象为："+cfloor+"楼 评论");
	$("#green_tip_article").show();
	
    $('body').animate({
        scrollTop: $("#commit_comment_div").offset().top
    }, 500);
    
}

function reset_comment_target()
{
	commentTarget="article";
	commentCid = "";
	$("#span_comment_target").html("博文");
	$("#reset_comment_target").hide();
	
	//显示提示板块
	$("#green_tip_content").text("当前评论对象为："+"博文");
	$("#green_tip_article").show();
	
    $('body').animate({
        scrollTop: $("#commit_comment_div").offset().top
    }, 500);
}

var commentTarget="article";
var commentCid="";
function onCommitComment(loginUid)
{
	if(loginUid==null||loginUid=="null"||loginUid=="")
	{	
		alert("请先登录！");
		return;
	}
	

	if(!UE.getEditor('commentEditor').hasContents())
	{
		$("#green_tip_content").text("评论不能为空");
		$("#green_tip_article").show();
	}
	else
	{
		//根据评论的类型设置不同的请求细节
		var idName="";
		var idNameData="";
		var requestName="";
		if(commentTarget=="article")
		{
			requestName = "addArticleComment";
			idName = "aid";
			idNameData = currentAid;
		}
		else
		{
			requestName = "addCommentComment";
			idName = "cid";
			idNameData = commentCid;
		}

		//获取文章的标题和内容
		var content = UE.getEditor('commentEditor').getContent();
		//使用ajax保存评论
		 $.ajax(
				{	url:"/BesBlog/comment/"+requestName+".action"
					,success:function(result)
					{
						if(result.resultType=="success")
						{	
							$("#green_tip_content").text("成功发表评论");
							//显示提示板块
							$("#green_tip_article").show();
							alert("评论发表成功");
							window.location.reload();
						}
						else if(result.resultType=="fail")
						{
							$("#green_tip_content").text(result.error);
						}
						//显示提示板块
						$("#green_tip_article").show();
					}
					,error:function(xhr,status,error)
					{
						$("#green_tip_content").text("请求出错，发表失败了");
						$("#green_tip_article").show();
					}
					,beforeSend:function(xhr)
					{}
					,complete:function(xhr,status)
					{}
					,data:{"uid":loginUid,"content":content,"aid":idNameData,"cid":idNameData}
					,dataType:"json"
					,type:"POST"
				});
	}
	
}



