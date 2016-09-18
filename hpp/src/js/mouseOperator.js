export default {
	init:function(){
		let secondSide = '';
		let lr = false;   //为true往右滑动，反之往左

		secondSide += '<ul class="nav-second-class">';
		secondSide += '<li class="js-select-item">示例一</li>';
		secondSide += '<li class="js-select-item">示例二</li>';
		secondSide += '<li class="js-select-item">示例三</li>';
		secondSide += '<li class="js-select-item">示例四</li>';
		secondSide += '</ul>';

		//点击侧边栏的side-item
		var clickLock = true;
		$(".add-secon").click(function(){
			const _this = $(this);
			const _id = _this.data("id").toString();
			console.log(_id);
			/*防止连续点击*/
			if(!clickLock){
				return false;
			};
			clickLock = false;

			/*侧边栏像右滑动*/
			lr = false;
			slideR();

			if(_this.hasClass("side-item-click")){
				_this.next().slideToggle();
				clickLock = true;
				return false;
			}


			$(".side-item-click").removeClass("side-item-click");
			$(".last-second-side").slideUp("500",function(){
				$(".last-second-side").remove();
			});
			_this.after(secondSide).addClass("side-item-click");

			$(".nav-second-class").slideDown().find("li").each(function(index,ele){
				$(ele).data("id",_id+index);
			});
			setTimeout(function(){
				_this.next().addClass("last-second-side");
				clickLock = true;
			},500);

		});

		//点击 right-page-button
		$(".js-side-nav-button").click(function(){
			if(!lr){
				slideL();
				lr = !lr;
			}else{
				slideR();
				lr = !lr;
			}
		});

		//点击用户权限
		$(".auth-class").click(function(e){
			e.stopPropagation();
			$(".drop-fadein").toggleClass("dropani");
		});

		//管理权限显示框隐藏
		$("body").click(function(){
			$(".drop-fadein").removeClass("dropani");
		});
		$(".drop-fadein").click(function(e){
			e.stopPropagation();
		});


		function slideL(){
			setTimeout(function(){
				$(".nav-header").hide();
				$(".side-title").hide();
				$(".nav-second-class").hide();
				$(".side-menu").css({
					"marginTop":"160px"
				});
			},100);

			$(".page-wrapper").css({
				"paddingLeft":"70px"
			});
			$(".navbar").css({
				"width":"70px"
			});
		}
		function slideR(){
			setTimeout(function(){
				$(".nav-header").show();
				$(".side-title").show();
				$(".nav-second-class").show();
				$(".side-menu").css({
					"marginTop":"0"
				});
			},400);
			$(".page-wrapper").css({
				"paddingLeft":"220px"
			});
			$(".navbar").css({
				"width":"220px"
			});
		}
	}
}