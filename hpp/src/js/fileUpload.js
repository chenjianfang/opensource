export default{
	init(){

		let fileVal;
		let imgBase64;
		$("#img-add").change(function(){
			var _this = this;
			fileVal = document.querySelector("#img-add").files[0];
			//-------just show img on document
			var reader = new FileReader;
			console.log(reader);
			reader.onload = function(){
				imgBase64 = reader.result;

				$(".img-add-click").append('<img class="show-up-img" src="'+imgBase64+'">');
			};
			reader.readAsDataURL(fileVal);
		});

		$(".click-img-submit").click(function(){
			var formData = new FormData();
			formData.append('file',fileVal);
			formData.append('username',localStorage.username);

            $.ajax({
            	type:"POST",
            	url:"/upfile",
            	data:formData,
            	processData:false,
            	contentType:false,
            	success:function(data){
            		console.log(data);
            		if(data.status === "0000"){
            			$(".js-img-circle").empty();
            			const ele = '<span class="img-circle"></span>';
            			$(".js-img-circle").append(ele);
            			$(".img-circle").css({
            				"backgroundImage":"url("+data.imgPath+"?vs="+new Date().getTime()+")"
            			});
            			alert("修改头像成功");
            		}
            	},
            	error:function(){
            		console.log("fileup error");
            	}
            });


		});


	}
}