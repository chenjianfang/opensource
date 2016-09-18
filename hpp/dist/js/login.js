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
/***/ function(module, exports) {

	"use strict";

	(function () {

		$('.submit').click(function () {
			var username = $(".username").val().trim();
			var password = $(".password").val().trim();

			if (username.length === 0 || password.length === 0) {
				alert("请输入完整用户名或密码！");
			} else if (password.length < 6) {
				alert("密码最少6位");
			} else {
				$.ajax({
					type: "POST",
					url: "/login",
					dataType: "json",
					data: {
						username: username,
						password: password
					},
					success: function success(data) {
						console.log(data);
						if (data.error === "0000") {
							localStorage.username = username;
							localStorage.password = password;
							localStorage.auth = data.auth;

							location.href = "../../index.html";
						} else {
							alert(data.msg);
						}
					},
					error: function error() {
						console.log("xhr error");
					}
				});
			}
		});
	})();

/***/ }
/******/ ]);