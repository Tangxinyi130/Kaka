const DAO = require("../model/DAO");

class DB {
    //users === 查询指定用户
    getOneUser(userId) {
        return DAO("select * from userinfo where userId = ?" , [userId]);
    }
    //users === 用户关注数
    countAttentionNum(userId) {
        return DAO("select count(attentionName) attentionNum " +
                    "from attention " +
                    "where attentionFan = ?", [userId]);
    }
    //users === 用户粉丝数
    countFansNum(userId) {
        return DAO("select count(attentionFan) fanNum " +
                    "from attention " +
                    "where attentionName = ?", [userId]);
    }
    //users === 寄出的明信片数量
    countSendNum(userId) {
        return DAO("select count(cardSender) sendNum " +
                    "from postcard " +
                    "where cardSender = ?", [userId]);
    }
    //users === 收到的明信片数量
    countReceiveNum(userId) {
        return DAO("select count(cardReceiver) receiveNum " +
                    "from postcard " +
                    "where cardReceiver = ? and cardReceiveTime is not null", [userId]);
    }
    //users === 寄出的明信片总距离
    countDistance(userId) {
        return DAO("select sum(cardDistance) distanceNum " +
                    "from postcard " +
                    "where cardSender = ?", [userId]);
    }
    //users === 加入网站的天数
    countJoinTime(userId) {
        return DAO("select TO_DAYS(now()) - TO_DAYS(userTime) joinTime " +
                    "from userinfo " +
                    "where userId = ?", [userId]);
    }
    //users === 更改关于我的
    updateAboutMe(userId, newAboutMe) {
        return DAO("update userinfo " +
                    "set userAboutMe = ? " +
                    "where userId = ?", [newAboutMe, userId]);
    }
    //users === 查询已发送的明信片
    getUserSend(userId) {
        return DAO("select cardId, cardReceiver, userNickname, cardReceiveRegion, cardSendTime, cardReceiveTime, cardPic " +
                    "from postcard, userinfo " +
                    "where cardSender = ? and postcard.cardReceiver = userinfo.userId " +
                    "order by cardSendTime desc", [userId]);
    }
    //users === 查询已收到的明信片
    getUserReceive(userId) {
        return DAO("select cardId, cardSender, userNickname, cardSendRegion, cardSendTime, cardReceiveTime, cardPic " +
            "from postcard, userinfo " +
            "where cardReceiver = ? and postcard.cardSender = userinfo.userId and cardReceiveTime is not null " +
            "order by cardReceiveTime desc", [userId]);
    }
    //users === 查看明信片图片
    getCardPic (postcardId) {
        return DAO("select cardPic\n" +
                    "from postcard\n" +
                    "where cardId = ?", [postcardId]);
    }
    //users === 上传图片
    updateCardPic (userId, postcardId, cardUrl) {
        return DAO("update postcard\n" +
                    "set cardPic = ?\n" +
                    "where cardId = ? and cardReceiver = ? ", [cardUrl, postcardId, userId]);
                    // cardReceiver为登录的用户，只有收件方为登录的用户才可上传图片
    }
    //users === 用户的明信片墙，查询收到的明信片图片
    showUserReceivePic (userId) {
        return DAO("select cardId, cardPic\n" +
                    "from postcard, userInfo\n" +
                    "where cardReceiver = ? and postcard.cardSender = userinfo.userId and cardReceiveTime is not null " +
                    "and cardPic is not null\n" +
                    "order by cardReceiveTime desc ", [userId]);
    }
    //users === 用户的明信片墙，查询发送的明信片图片
    showUserSendPic (userId) {
        return DAO("select cardId, cardPic\n" +
                    "from postcard, userInfo\n" +
                    "where cardSender = ? and postcard.cardReceiver = userinfo.userId and cardPic is not null\n" +
                    "order by cardSendTime desc ", [userId]);
    }
    //users === 用户的明信片墙，查询收藏的明信片图片
    showUserCollectionPic (userId) {
        return DAO("select cardId, cardPic\n" +
                    "from postcard, userinfo, collection\n" +
                    "where userinfo.userId = collection.collectionUserId and postcard.cardId = collection.collectionCardId\n" +
                        "and cardPic is not null and userId = ?\n" +
                    "order by collectionId desc", [userId]);
    }
    //users === 地区排行榜
    showMapCharts (userId) {
        return DAO("select cardSendRegion, count(cardId) cardSum\n" +
                    "from postcard\n" +
                    "where cardReceiver = ? and cardReceiveTime is not null\n" +
                    "group by cardSendRegion\n" +
                    "order by count(cardId) desc\n" +
                    "limit 0, 8", [userId]);
    }
    // //users === 我的活动(我的商品)
    // showMyActivity (userId) {
    //     return DAO("select activityId, activityName, goodsId, goodsName, goodsPrice, goodsPic, goodsDetails, myactivityUserId, mygoodsIsReceived\n" +
    //                 "from activity, goods, myactivity, mygoods\n" +
    //                 "where goodsActivityId = activityId and myactivityActivityId = activityId and mygoodsGoodsId = goodsId " +
    //                 "and myactivityUserId = ?  and mygoodsUserId = ?", [userId, userId]);
    // }
    // //users === 确认收货
    // receivedGoods (mygoodsId, userId) {
    //     return DAO("update mygoods\n" +
    //                 "set mygoodsIsReceived = 1\n" +
    //                 "where mygoodsGoodsId = ? and mygoodsUserId = ?", [mygoodsId, userId]);
    // }
    //users === 查询明信片
    searchCard (userId, province) {
        console.log("查询")
        return DAO("select cardId, cardSender, userNickname, cardSendTime, cardSendRegion\n" +
                    "from userinfo, postcard\n" +
                    "where userId = cardSender and cardReceiveTime is null " +
                    "and cardReceiver = ? and userProvince = ?", [userId, province]);
    }
    //users === 设置用户
    setUsers (userName, userNickname, userSex, userEmail, userBirthday, userProvince, userCity, userPostcode, userAddress, userId) {
        return DAO("update userinfo\n" +
                    "set userName = ?, \n" +
                    "   userNickname = ?, \n" +
                    "   userSex = ?, \n" +
                    "   userEmail = ?, \n" +
                    "   userBirthday = ?, \n" +
                    "   userProvince = ?, \n" +
                    "   userCity = ?, \n" +
                    "   userPostcode = ?, \n" +
                    "   userAddress = ? \n" +
                    "where userId = ?", [userName, userNickname, userSex, userEmail, userBirthday, userProvince, userCity, userPostcode, userAddress, userId]);
    }
    //users === 用户个人地图的显示
    showUserMap (userId) {
        return DAO("select userAddress\n" +
                    "from userinfo\n" +
                    "where userId = ?\n", [userId]);
    }
    //users === 地图板块的点亮部分，返回所有有明信片的地区和对应该地区的数量
    showMapCollection (userId) {
        return DAO("select cardSendRegion, count(cardId) cardSum\n" +
                    "from postcard\n" +
                    "where cardReceiver = ? and cardReceiveTime is not null\n" +
                    "group by cardSendRegion\n" +
                    "order by cardSum desc ", [userId]);
    }
    //users === 上传用户头像
    setUserHeadPic (src, userId) {
        return DAO("update userinfo\n" +
                    "set userHeadPic = ?\n" +
                    "where userId = ?\n", [src, userId]);
    }




    //index--获取用户头像
    getUserHeadPic(userId){
        return DAO('SELECT userHeadPic FROM userinfo where userId=?',[userId]);
    }
    //index--获取NickName用户名
    getUserNickName(userId){
        return DAO('SELECT userNickname FROM userinfo where userId = ?',[userId]);
    }
    //index--统计用户收藏总数
    countCollectionNum(userId){
        return DAO('SELECT COUNT(collectionUserId) collectionNum FROM collection WHERE collectionUserId = ?',[userId])
    }
    //index--用户以发送但未被确认收货的明信片数
    getUnabsorbedNum(userId){
        return DAO('\tSELECT COUNT(cardSender) unabsorbedNum FROM postcard WHERE cardSender = ? AND cardReceiveTime IS NULL;',[userId]);
    }
    //index--用户收件数排行前100名
    getSendRanking(){
        return DAO('call getRankingSend();')
    }
    //index-- 全网站总用户数量
    getUsersNum(){
        return DAO('SELECT COUNT(userId) AS usersCount FROM userinfo')
    }
    //index-- 参与本网站的城市总数
    getTotalOfCity(){
        return DAO('SELECT COUNT(DISTINCT userProvince) AS cityTotal FROM  userinfo')
    }


    //登录
    doLogin(username){
        return DAO('select userTel from userinfo where userTel=?',[username])
    }
    //登录，根据手机号查询用户密码
    userPw(username){
        return DAO('select userPwd from userinfo where userTel=?',[username])
    }

    //设置，根据用户ID查询用户密码
    getUserOldPwd(userId) {
        return DAO("select userPwd from userinfo where userId = ? ", [userId]);
    }
    //设置，设置新密码
    setUserNewPwd(userPwd, userId) {
        return DAO("update userinfo " +
                    "set userPwd = ? " +
                    "where userId = ?", [userPwd, userId]);
    }


    //根据手机号查询用户
    getLoginUser(userTel) {
        return DAO("select * from userinfo where userTel = ?" , [userTel]);
    }
    getUserId(userTel) {
        return DAO("select userId from userinfo where userTel = ?", [userTel]);
    }

    //根据明信片查看收发用户id
    getTwoUser (cardId) {
        return DAO("select cardSender, cardReceiver from postcard where cardId = ?", [cardId]);
    }




}

module.exports = new DB();