export default{
	init(){
		let userName = localStorage.username;
		let authClass = localStorage.auth;
		console.log(userName);
		if(userName){
			$(".user-name").html(userName);
			if(authClass == 1){
				$(".auth-class").html("超级管理员");
			}else{
				$(".auth-class").html("普通用户");
			}
			
		}else{
			$(".user-name").html("请登录").addClass("js-join-in");
			$(".auth-class").remove();

			$(".js-join-in").click(function(){
				location.href="../../html/login.html"
			});
		}

		//点击安全退出
		$(".js-safe-exit").click(function(){
			
			$.ajax({
				type:"POST",
				url:"/clearUser",
				dataType:"json",
				data:{
					username:userName
				},
				success:function(data){
					console.log(data);
					if(data.status === "0000"){
						localStorage.clear();
						location.href="../../html/login.html";
					}
				},
				error:function(){
					console.log("clear error")
				}
			});
		});
	}
}