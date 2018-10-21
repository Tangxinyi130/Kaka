const router = require('koa-router')();
const moment = require("moment");
const userinfoController = require("../controllers/userinfoController");
const attentionController = require("../controllers/attentionController");
const regionController = require("../controllers/regionController");
router.prefix('/users');

//查询指定用户
router.get('/:userId', async (ctx, next) => {
  await userinfoController.getOneUser(ctx, next);
});

//用户简介(关注数量、粉丝数量、姓名、id、头像、性别、生日)
router.get("/synopsis/:userId", async (ctx, next) => {
  await userinfoController.getUserSynopsis(ctx, next);
});

//用户详细信息(寄出的明信片数量、收到的明信片数量、寄出的明信片经过的距离总和、加入网站的天数)
router.get("/introduction/:userId", async (ctx, next) => {
  await userinfoController.getUserIntroduction(ctx, next);
});

//关于我的
router.get("/aboutUser/:userId", async (ctx, next) => {
  await userinfoController.showAboutUser(ctx, next);
});

//修改"关于我的"
router.post("/aboutUser/setAboutUser", async (ctx, next) => {
  await userinfoController.updateAboutMe(ctx, next);
});

//已发送的明信片
router.get("/userSend/:userId", async (ctx, next) => {
    await userinfoController.getUserSend(ctx, next);
});

//已收到的明信片
router.get("/userReceived/:userId", async (ctx, next) => {
    await userinfoController.getUserReceive(ctx, next);
});

//查看明信片图片
router.get("/showPic/:postcardId", async (ctx, next) => {
   await userinfoController.getCardPic(ctx, next);
});

//上传图片
router.post("/userReceived/updatePic", async (ctx, next) => {
    await userinfoController.updateCardPic(ctx, next);
});

//用户的明信片墙，查询收到的明信片图片
router.get("/userWallReceived/:userId", async (ctx, next) => {
    await userinfoController.showUserReceivePic(ctx, next);
});

//用户的明信片墙，查询发送的明信片图片
router.get("/userWallSend/:userId", async (ctx, next) => {
    await userinfoController.showUserSendPic(ctx, next);
});

//用户的明信片墙，查询收藏的明信片图片
router.get("/userWallCollection/:userId", async (ctx, next) => {
    await userinfoController.showUserCollectionPic(ctx, next);
});

//地区排行榜
router.get("/mapCharts/:userId", async (ctx, next) => {
    await userinfoController.showMapCharts(ctx, next);
});

//我的粉丝和我的关注(用户的头像和关注数量和粉丝数量)
router.get("/attention/:userId", async (ctx, next) => {
    await attentionController.getAttention(ctx, next);
});

//关注用户的用户简介
router.get("/attention/myAttention/:userId", async (ctx, next) => {
    await attentionController.getAttentionSynopsis(ctx, next);
});

//粉丝用户的用户简介
router.get("/attention/myFans/:userId", async (ctx, next) => {
    await attentionController.getFansSynopsis(ctx, next);
});

//搜索用户(userId: 登录者id, searchUser: 搜索的用户昵称)
router.get("/attention/searchUser/:userId/:searchUser", async (ctx, next) => {
    await attentionController.getUser(ctx, next);
});

//关注用户(userId: 登录者id, otherId: 准备关注的用户id)
router.get("/attention/focus/:userId/:otherId", async (ctx, next) => {
    await attentionController.insertAttention(ctx, next);
});

//取消关注
router.get("/attention/unfollow/:userId/:otherId", async (ctx, next) => {
    await attentionController.deleteAttention(ctx, next);
});

//关注者收件数排行榜(userId: 用户id)
router.get("/list/:userId", async (ctx, next) => {
    await attentionController.showAttentionList(ctx, next);
});

//我的活动(我的商品)(userId: 登录者id)
router.get("/myActivity/:userId", async (ctx, next) => {
    await userinfoController.showMyActivity(ctx, next);
});

//确认收货
router.get("/myActivity/receiving/:mygoodsId/:userId", async (ctx, next) => {
    await userinfoController.receivedGoods(ctx, next);
});

//查询明信片(userId: 登录者id，即收件人id)
router.post("/searchMyPostcards", async (ctx, next) => {
    await userinfoController.searchCard(ctx, next);
});

//设置用户
router.post("/updata", async (ctx, next) => {
    await userinfoController.setUsers(ctx, next);
});

//用户个人地图的显示
router.get("/map/:userId", async (ctx, next) => {
    await userinfoController.showUserMap(ctx, next);
});

//地图板块的点亮部分，返回所有有明信片的地区和对应该地区的数量
router.get("/mapCollection/:userId", async (ctx, next) => {
    await userinfoController.showMapCollection(ctx, next);
});
//登录
router.post("/doLogin", async (ctx, next) => {
    await userinfoController.doLogin(ctx, next);
});

//根据登录的手机号查询用户id
router.post("/getUserId", async (ctx, next) => {
    await userinfoController.getUserId(ctx, next);
});

//设置用户头像
// router.post("/setUserHeadPic", async (ctx, next) => {
//     await userinfoController.setUserHeadPic(ctx, next);
// });



const multer = require('koa-multer');//加载koa-multer模块
//文件上传
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, '../public/headpics/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var now = moment(new Date()).format("YYYYMMDDHHmmss");
        // console.log(moment(new Date().toLocaleString()).format("YYYYMMDDHHmmss"));
        var fileFormat = (file.originalname).split(".");
        cb(null, fileFormat[0] + "_" + now + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage });
//路由
router.post('/setUserHeadPic', upload.single('file'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename//返回文件名

    }
    await userinfoController.setUserHeadPic(ctx, next);
})
//查看该手机号是否被注册过了，该手机号在数据库中是否存在
router.get("/getTel/:tel", async (ctx, next) => {
    await regionController.getTel(ctx, next);
});
//如果手机没有被注册过，将手机号和密码存到数据库中
router.get("/insertUser/:tel/:pwd", async (ctx, next) => {
    await regionController.insertUser(ctx, next);
});
module.exports = router;
