"use strict";
export default{
	init(){
		(function(){
			const username = localStorage.username;
			if(!username){
				location.href = "../../html/login.html";
			}else{
				$.ajax({
					type:"POST",
					url:"/init",
					dataType:"json",
					data:{
						username:username
					},
					success:function(data){
						console.log(data);
						if(data.status === "0000"){
							$(".user-name").html(data.username);
							$(".img-circle").css({
								"backgroundImage":"url("+data.logoImg+")"
							});
						}
					},
					error:function(){

					}
				});
			}
			

		})();
	}
}


