
export default{
	initTab:function(){
		//点击 tabs 变为选中状态
		$(".menuTab").on("click",".tabs-item",function(){
			$(".tabs-item").removeClass("tab-active");
			$(this).addClass("tab-active");
		});

		//点击侧边栏添加到 tabs 中
		$(".side-menu").on("click",".js-select-item",function(){
			const _id = $(this).data("id");
			let lock = false;
			$(".tabs-item").each(function(index,ele){
				if($(ele).data("id") == _id){
					lock = true;
				}
			});
			if(!lock){
				$(".tabs-item").removeClass("tab-active");
				$(".menuTab").append('<li class="tabs-item tabs-append-item tab-active" data-id="'+_id+'">'+$(this).text()+'<span></span></li>')
			}
		});
		$(".js-select-item").click(function(){
			const _id = $(this).data("id");
			let lock = false;
			$(".tabs-item").each(function(index,ele){
				if($(ele).data("id") == _id){
					lock = true;
				}
			});
			if(!lock){
				$(".tabs-item").removeClass("tab-active");
				$(".menuTab").append('<li class="tabs-item tabs-append-item tab-active" data-id="'+_id+'">'+$(this).text()+'<span></span></li>')
			}
		});

	},
	handle(){

	}
}








