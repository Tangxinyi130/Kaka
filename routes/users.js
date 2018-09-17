const router = require('koa-router')();
const userinfoController = require("../controllers/userinfoController");
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

module.exports = router;
