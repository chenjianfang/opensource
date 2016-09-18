(function(){

	$('.submit').click(function(){
		let username = $(".username").val().trim();
		let password = $(".password").val().trim();

		if(username.length === 0 || password.length === 0){
			alert("请输入完整用户名或密码！");
		}else if(password.length < 6){
			alert("密码最少6位");
		}else{
			$.ajax({
				type:"POST",
				url:"/login",
				dataType:"json",
				data:{
					username:username,
					password:password
				},
				success:function(data){
					console.log(data);
					if(data.error === "0000"){
						localStorage.username = username;
						localStorage.password = password;
						localStorage.auth = data.auth;

						location.href = "../../index.html"
					}else{
						alert(data.msg);
					}
				},
				error:function(){
					console.log("xhr error")
				}
			});
		}

	});
	


})();