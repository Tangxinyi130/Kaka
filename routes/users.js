const router = require('koa-router')();
const userinfoController = require("../controllers/userinfoController");
const attentionController = require("../controllers/attentionController");
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

module.exports = router;
