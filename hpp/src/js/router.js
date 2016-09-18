"use strict";
export default{
	init:function(){
		let currentTab;
		let tabArr = [];
		const contentBox = function(arg){
			console.log(currentTab);
			$(".content-first-child").hide();
			switch (currentTab) {
				case "drop1":
					$("#change-logo").show();
					break;
				case "drop2":
					$("#person-msg").show();
					break;
			}
		};



		//点击 tabs 项关闭
		$(".menuTab").on("click",".tabs-append-item span",function(){
			const _tab = $(this).parent();
			let judge = 0;
			if(_tab.next().length > 0){
				judge = 1;
			}
			_tab.css({
				"opacity":0
			});
			setTimeout(function(){
				if(judge === 1){
					_tab.next().addClass("tab-active");
					currentTab = _tab.next().data("id");
				}else if(judge === 0){
					$(".tabs-item:last-child").prev().addClass("tab-active");
					currentTab = $(".tabs-item:last-child").prev().data("id");
				}
				_tab.remove();
				contentBox(); //关闭 page

			},500);
		});



		//----修改头像
		$(".js-change-logo").click(function(){
			$(".content-first-child").removeClass("content-ani").hide();
			$("#change-logo").addClass("content-ani").show();
		});

		//个人资料
		$(".js-person-msg").click(function(){
			$(".content-first-child").removeClass("content-ani").hide();
			$("#person-msg").addClass("content-ani").show();
		});

	}
}