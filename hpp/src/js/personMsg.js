"use strict";
export default{
	init(){

		function time(arg){
			if(arg){
				var time= new Date(+arg);
			}else{
				var time= new Date();
			};

			var hh = time.getHours(); //获得小时
			var min = time.getMinutes(); //获得分钟
			console.log(hh);
			console.log(min);
			hh = hh < 10 ? "0"+hh : hh;
			min = min < 10 ? "0"+min : min;
			return {
				hh,
				min
			}
		}

		let _logoImg;

		//----comment initivalibity----
		let username = localStorage.username;
		$.ajax({
			type:"POST",
			url:"/initComment",
			dataType:"json",
			data:{
				"username": username
			},
			success:function(data){
				console.log(data);
				if(data.status === "0000"){
					var val = "";
					_logoImg = data.result.logoImg;
					$.each(data.result.discuss,function(index,ele){
						if(ele.name !== username){
							return;
						}
						let getTime = time(ele.time);

						val += `
						<li class="trends-list clearfix">
							<div class="trends-list-logo">
								<img src="${_logoImg}">
							</div>
							<div class="trends-list-text">
								<p class="trends-detail-msg" data-username="${data.result.username}">${ele.content}</p>
								<p class="trends-detail-msg">${getTime.hh}:${getTime.min}</p>
								<div class="comment-box">
									
								</div>
								<div class="comment-textarea-box">
									<textarea class="trends-input-comment" placeholder="评论吐槽"></textarea>
								</div>
								<p class="trends-small-handler clearfix">
									<span class="com-small-click-button trends-approve">赞</span>
									<span class="com-small-click-button trends-collect">收藏</span>
									<span class="com-small-click-button trends-comment js-comment-input">评论</span>
								</p>
							</div>
						</li>
						`;
					});
					$(".per-trends").prepend(val);
				}
			},
			error:function(){
				console.log("comment xhr error")
			}
		});

		//---发表的内容---
		$(".js-report-status").click(function(){

			const content = $(".js-report-self-value").val().trim();
			$.ajax({
				type:"POST",
				url:"/updataComment",
				dataType:"json",
				data:{
					"username": username,
					"name": username,
					"content": content
				},
				success:function(data){
					console.log(data);
					if(data.status !== "0000"){
						return;
					};
					let getTime = time();
					const ele = `
						<li class="trends-list clearfix">
							<div class="trends-list-logo">
								<img src="${data.result.logoImg}">
							</div>
							<div class="trends-list-text">
								<p class="trends-detail-msg" data-username="${username}">${content}</p>
								<p class="trends-detail-msg">${getTime.hh}:${getTime.min}</p>
								<div class="comment-box">
									
								</div>
								<div class="comment-textarea-box">
									<textarea class="trends-input-comment" placeholder="评论吐槽"></textarea>
								</div>
								<p class="trends-small-handler clearfix">
									<span class="com-small-click-button trends-approve">赞</span>
									<span class="com-small-click-button trends-collect">收藏</span>
									<span class="com-small-click-button trends-comment js-comment-input">评论</span>
								</p>
							</div>
						</li>
					`;
					$(".per-trends").prepend(ele);
					$(".js-report-self-value").val("");
				},
				error:function(){
					console.log("发表请求错误");
				}
			});
		});


		//---好友评论-----
		$(".per-trends").on("click",".js-comment-input",function(){
			const $parent = $(this).parents(".trends-list-text");
			const $comment = $parent.find(".comment-textarea-box");
			$comment.slideToggle(400);
			//-----提交评论------
			const comVal = $comment.find("textarea").val().trim();
			if(comVal.length > 0){
				setTimeout(function(){
					let getTime = time();
					$parent.find(".comment-box").append(`
						<div class="other-comment-item">
							<div class="comment-small-logo">
								<img src="../../image/a1.jpg" />
							</div>
							<ul class="comment-specific-content">
								<li>${comVal}</li>
								<li>${getTime.hh}:${getTime.min}</li>
							</ul>
						</div>
					`);
				},500);
				$comment.find("textarea").val("");
				//----save comment
				$.ajax({
					type:"POST",
					url:"/updataComment",
					dataType:"json",
					data:{
						"username": username,
						"name": "张三",
						"content": comVal
					},
					success:function(data){

					},
					error:function(){
						console.log("评论请求失败")
					}
				});
			}

		});


		
	}
}
