/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mouseOperator = __webpack_require__(1);

	var _mouseOperator2 = _interopRequireDefault(_mouseOperator);

	var _tabPage = __webpack_require__(2);

	var _tabPage2 = _interopRequireDefault(_tabPage);

	var _localStorage = __webpack_require__(3);

	var _localStorage2 = _interopRequireDefault(_localStorage);

	var _fileUpload = __webpack_require__(4);

	var _fileUpload2 = _interopRequireDefault(_fileUpload);

	var _router = __webpack_require__(5);

	var _router2 = _interopRequireDefault(_router);

	var _init = __webpack_require__(6);

	var _init2 = _interopRequireDefault(_init);

	var _personMsg = __webpack_require__(7);

	var _personMsg2 = _interopRequireDefault(_personMsg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_init2.default.init(); //初始化状态

	// import router from './router';
	_mouseOperator2.default.init(); // 侧边栏的操作
	_tabPage2.default.initTab(); // 横向菜单的操作状态
	_localStorage2.default.init(); //判断用户是否登录
	_fileUpload2.default.init(); //图片上传
	_router2.default.init(); // center content controll show or hide 
	_personMsg2.default.init();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		init: function init() {
			var secondSide = '';
			var lr = false; //为true往右滑动，反之往左

			secondSide += '<ul class="nav-second-class">';
			secondSide += '<li class="js-select-item">示例一</li>';
			secondSide += '<li class="js-select-item">示例二</li>';
			secondSide += '<li class="js-select-item">示例三</li>';
			secondSide += '<li class="js-select-item">示例四</li>';
			secondSide += '</ul>';

			//点击侧边栏的side-item
			var clickLock = true;
			$(".add-secon").click(function () {
				var _this = $(this);
				var _id = _this.data("id").toString();
				console.log(_id);
				/*防止连续点击*/
				if (!clickLock) {
					return false;
				};
				clickLock = false;

				/*侧边栏像右滑动*/
				lr = false;
				slideR();

				if (_this.hasClass("side-item-click")) {
					_this.next().slideToggle();
					clickLock = true;
					return false;
				}

				$(".side-item-click").removeClass("side-item-click");
				$(".last-second-side").slideUp("500", function () {
					$(".last-second-side").remove();
				});
				_this.after(secondSide).addClass("side-item-click");

				$(".nav-second-class").slideDown().find("li").each(function (index, ele) {
					$(ele).data("id", _id + index);
				});
				setTimeout(function () {
					_this.next().addClass("last-second-side");
					clickLock = true;
				}, 500);
			});

			//点击 right-page-button
			$(".js-side-nav-button").click(function () {
				if (!lr) {
					slideL();
					lr = !lr;
				} else {
					slideR();
					lr = !lr;
				}
			});

			//点击用户权限
			$(".auth-class").click(function (e) {
				e.stopPropagation();
				$(".drop-fadein").toggleClass("dropani");
			});

			//管理权限显示框隐藏
			$("body").click(function () {
				$(".drop-fadein").removeClass("dropani");
			});
			$(".drop-fadein").click(function (e) {
				e.stopPropagation();
			});

			function slideL() {
				setTimeout(function () {
					$(".nav-header").hide();
					$(".side-title").hide();
					$(".nav-second-class").hide();
					$(".side-menu").css({
						"marginTop": "160px"
					});
				}, 100);

				$(".page-wrapper").css({
					"paddingLeft": "70px"
				});
				$(".navbar").css({
					"width": "70px"
				});
			}
			function slideR() {
				setTimeout(function () {
					$(".nav-header").show();
					$(".side-title").show();
					$(".nav-second-class").show();
					$(".side-menu").css({
						"marginTop": "0"
					});
				}, 400);
				$(".page-wrapper").css({
					"paddingLeft": "220px"
				});
				$(".navbar").css({
					"width": "220px"
				});
			}
		}
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		initTab: function initTab() {
			//点击 tabs 变为选中状态
			$(".menuTab").on("click", ".tabs-item", function () {
				$(".tabs-item").removeClass("tab-active");
				$(this).addClass("tab-active");
			});

			//点击侧边栏添加到 tabs 中
			$(".side-menu").on("click", ".js-select-item", function () {
				var _id = $(this).data("id");
				var lock = false;
				$(".tabs-item").each(function (index, ele) {
					if ($(ele).data("id") == _id) {
						lock = true;
					}
				});
				if (!lock) {
					$(".tabs-item").removeClass("tab-active");
					$(".menuTab").append('<li class="tabs-item tabs-append-item tab-active" data-id="' + _id + '">' + $(this).text() + '<span></span></li>');
				}
			});
			$(".js-select-item").click(function () {
				var _id = $(this).data("id");
				var lock = false;
				$(".tabs-item").each(function (index, ele) {
					if ($(ele).data("id") == _id) {
						lock = true;
					}
				});
				if (!lock) {
					$(".tabs-item").removeClass("tab-active");
					$(".menuTab").append('<li class="tabs-item tabs-append-item tab-active" data-id="' + _id + '">' + $(this).text() + '<span></span></li>');
				}
			});
		},
		handle: function handle() {}
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		init: function init() {
			var userName = localStorage.username;
			var authClass = localStorage.auth;
			console.log(userName);
			if (userName) {
				$(".user-name").html(userName);
				if (authClass == 1) {
					$(".auth-class").html("超级管理员");
				} else {
					$(".auth-class").html("普通用户");
				}
			} else {
				$(".user-name").html("请登录").addClass("js-join-in");
				$(".auth-class").remove();

				$(".js-join-in").click(function () {
					location.href = "../../html/login.html";
				});
			}

			//点击安全退出
			$(".js-safe-exit").click(function () {

				$.ajax({
					type: "POST",
					url: "/clearUser",
					dataType: "json",
					data: {
						username: userName
					},
					success: function success(data) {
						console.log(data);
						if (data.status === "0000") {
							localStorage.clear();
							location.href = "../../html/login.html";
						}
					},
					error: function error() {
						console.log("clear error");
					}
				});
			});
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  init: function init() {

	    var fileVal = void 0;
	    var imgBase64 = void 0;
	    $("#img-add").change(function () {
	      var _this = this;
	      fileVal = document.querySelector("#img-add").files[0];
	      //-------just show img on document
	      var reader = new FileReader();
	      console.log(reader);
	      reader.onload = function () {
	        imgBase64 = reader.result;

	        $(".img-add-click").append('<img class="show-up-img" src="' + imgBase64 + '">');
	      };
	      reader.readAsDataURL(fileVal);
	    });

	    $(".click-img-submit").click(function () {
	      var formData = new FormData();
	      formData.append('file', fileVal);
	      formData.append('username', localStorage.username);

	      $.ajax({
	        type: "POST",
	        url: "/upfile",
	        data: formData,
	        processData: false,
	        contentType: false,
	        success: function success(data) {
	          console.log(data);
	          if (data.status === "0000") {
	            $(".js-img-circle").empty();
	            var ele = '<span class="img-circle"></span>';
	            $(".js-img-circle").append(ele);
	            $(".img-circle").css({
	              "backgroundImage": "url(" + data.imgPath + "?vs=" + new Date().getTime() + ")"
	            });
	            alert("修改头像成功");
	          }
	        },
	        error: function error() {
	          console.log("fileup error");
	        }
	      });
	    });
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		init: function init() {
			var currentTab = void 0;
			var tabArr = [];
			var contentBox = function contentBox(arg) {
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
			$(".menuTab").on("click", ".tabs-append-item span", function () {
				var _tab = $(this).parent();
				var judge = 0;
				if (_tab.next().length > 0) {
					judge = 1;
				}
				_tab.css({
					"opacity": 0
				});
				setTimeout(function () {
					if (judge === 1) {
						_tab.next().addClass("tab-active");
						currentTab = _tab.next().data("id");
					} else if (judge === 0) {
						$(".tabs-item:last-child").prev().addClass("tab-active");
						currentTab = $(".tabs-item:last-child").prev().data("id");
					}
					_tab.remove();
					contentBox(); //关闭 page
				}, 500);
			});

			//----修改头像
			$(".js-change-logo").click(function () {
				$(".content-first-child").removeClass("content-ani").hide();
				$("#change-logo").addClass("content-ani").show();
			});

			//个人资料
			$(".js-person-msg").click(function () {
				$(".content-first-child").removeClass("content-ani").hide();
				$("#person-msg").addClass("content-ani").show();
			});
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		init: function init() {
			(function () {
				var username = localStorage.username;
				if (!username) {
					location.href = "../../html/login.html";
				} else {
					$.ajax({
						type: "POST",
						url: "/init",
						dataType: "json",
						data: {
							username: username
						},
						success: function success(data) {
							console.log(data);
							if (data.status === "0000") {
								$(".user-name").html(data.username);
								$(".img-circle").css({
									"backgroundImage": "url(" + data.logoImg + ")"
								});
							}
						},
						error: function error() {}
					});
				}
			})();
		}
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		init: function init() {

			function time(arg) {
				if (arg) {
					var time = new Date(+arg);
				} else {
					var time = new Date();
				};

				var hh = time.getHours(); //获得小时
				var min = time.getMinutes(); //获得分钟
				console.log(hh);
				console.log(min);
				hh = hh < 10 ? "0" + hh : hh;
				min = min < 10 ? "0" + min : min;
				return {
					hh: hh,
					min: min
				};
			}

			var _logoImg = void 0;

			//----comment initivalibity----
			var username = localStorage.username;
			$.ajax({
				type: "POST",
				url: "/initComment",
				dataType: "json",
				data: {
					"username": username
				},
				success: function success(data) {
					console.log(data);
					if (data.status === "0000") {
						var val = "";
						_logoImg = data.result.logoImg;
						$.each(data.result.discuss, function (index, ele) {
							if (ele.name !== username) {
								return;
							}
							var getTime = time(ele.time);

							val += "\n\t\t\t\t\t\t<li class=\"trends-list clearfix\">\n\t\t\t\t\t\t\t<div class=\"trends-list-logo\">\n\t\t\t\t\t\t\t\t<img src=\"" + _logoImg + "\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"trends-list-text\">\n\t\t\t\t\t\t\t\t<p class=\"trends-detail-msg\" data-username=\"" + data.result.username + "\">" + ele.content + "</p>\n\t\t\t\t\t\t\t\t<p class=\"trends-detail-msg\">" + getTime.hh + ":" + getTime.min + "</p>\n\t\t\t\t\t\t\t\t<div class=\"comment-box\">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"comment-textarea-box\">\n\t\t\t\t\t\t\t\t\t<textarea class=\"trends-input-comment\" placeholder=\"评论吐槽\"></textarea>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class=\"trends-small-handler clearfix\">\n\t\t\t\t\t\t\t\t\t<span class=\"com-small-click-button trends-approve\">赞</span>\n\t\t\t\t\t\t\t\t\t<span class=\"com-small-click-button trends-collect\">收藏</span>\n\t\t\t\t\t\t\t\t\t<span class=\"com-small-click-button trends-comment js-comment-input\">评论</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t";
						});
						$(".per-trends").prepend(val);
					}
				},
				error: function error() {
					console.log("comment xhr error");
				}
			});

			//---发表的内容---
			$(".js-report-status").click(function () {

				var content = $(".js-report-self-value").val().trim();
				$.ajax({
					type: "POST",
					url: "/updataComment",
					dataType: "json",
					data: {
						"username": username,
						"name": username,
						"content": content
					},
					success: function success(data) {
						console.log(data);
						if (data.status !== "0000") {
							return;
						};
						var getTime = time();
						var ele = "\n\t\t\t\t\t\t<li class=\"trends-list clearfix\">\n\t\t\t\t\t\t\t<div class=\"trends-list-logo\">\n\t\t\t\t\t\t\t\t<img src=\"" + data.result.logoImg + "\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"trends-list-text\">\n\t\t\t\t\t\t\t\t<p class=\"trends-detail-msg\" data-username=\"" + username + "\">" + content + "</p>\n\t\t\t\t\t\t\t\t<p class=\"trends-detail-msg\">" + getTime.hh + ":" + getTime.min + "</p>\n\t\t\t\t\t\t\t\t<div class=\"comment-box\">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"comment-textarea-box\">\n\t\t\t\t\t\t\t\t\t<textarea class=\"trends-input-comment\" placeholder=\"评论吐槽\"></textarea>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class=\"trends-small-handler clearfix\">\n\t\t\t\t\t\t\t\t\t<span class=\"com-small-click-button trends-approve\">赞</span>\n\t\t\t\t\t\t\t\t\t<span class=\"com-small-click-button trends-collect\">收藏</span>\n\t\t\t\t\t\t\t\t\t<span class=\"com-small-click-button trends-comment js-comment-input\">评论</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t";
						$(".per-trends").prepend(ele);
						$(".js-report-self-value").val("");
					},
					error: function error() {
						console.log("发表请求错误");
					}
				});
			});

			//---好友评论-----
			$(".per-trends").on("click", ".js-comment-input", function () {
				var $parent = $(this).parents(".trends-list-text");
				var $comment = $parent.find(".comment-textarea-box");
				$comment.slideToggle(400);
				//-----提交评论------
				var comVal = $comment.find("textarea").val().trim();
				if (comVal.length > 0) {
					setTimeout(function () {
						var getTime = time();
						$parent.find(".comment-box").append("\n\t\t\t\t\t\t<div class=\"other-comment-item\">\n\t\t\t\t\t\t\t<div class=\"comment-small-logo\">\n\t\t\t\t\t\t\t\t<img src=\"../../image/a1.jpg\" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<ul class=\"comment-specific-content\">\n\t\t\t\t\t\t\t\t<li>" + comVal + "</li>\n\t\t\t\t\t\t\t\t<li>" + getTime.hh + ":" + getTime.min + "</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t");
					}, 500);
					$comment.find("textarea").val("");
					//----save comment
					$.ajax({
						type: "POST",
						url: "/updataComment",
						dataType: "json",
						data: {
							"username": username,
							"name": "张三",
							"content": comVal
						},
						success: function success(data) {},
						error: function error() {
							console.log("评论请求失败");
						}
					});
				}
			});
		}
	};

/***/ }
/******/ ]);