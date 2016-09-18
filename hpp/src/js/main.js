import operat from './mouseOperator';
import tabMenue from './tabPage';
import localStorage  from './localStorage';
import fileUpload from './fileUpload';
// import router from './router';
import router from './router';
import init from './init';
import personMsg from './personMsg';


init.init(); //初始化状态
operat.init(); // 侧边栏的操作
tabMenue.initTab(); // 横向菜单的操作状态
localStorage.init(); //判断用户是否登录
fileUpload.init(); //图片上传
router.init(); // center content controll show or hide 
personMsg.init(); 
