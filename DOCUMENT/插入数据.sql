-- 插入用户userinfo
insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("tom", "111", "2018-07-01", "13811111111", "TOM", 0, "111@qq.com", "1997-01-01", "江苏", "南京");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("jack", "222", "2018-07-09", "13823243553", "JACK", 0, "222@qq.com", "1997-09-01", "江苏", "苏州");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("mary", "333", "2018-07-15", "13854353411", "MARY", 1, "333@qq.com", "1996-10-11", "浙江", "杭州");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("jane", "444", "2018-08-02", "13866653417", "JANE", 1, "444@qq.com", "1999-06-08", "上海", "");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("alex", "555", "2018-08-02", "13867858890", "ALEX", 1, "555@qq.com", "2000-04-15", "湖北", "武汉");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("cindy", "666", "2018-08-05", "13777858890", "CINDY", 1, "666@qq.com", "1995-03-30", "湖南", "长沙");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("迪丽热巴", "888", "2018-08-11", "13777858890", "热巴", 1, "reba@qq.com", "1992-06-03", "新疆", "乌鲁木齐");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("刘源", "haoran", "2018-08-23", "13777858888", "昊然", 0, "liuhaoran@qq.com", "1997-10-10", "河南", "平顶山");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("吴磊", "wulei", "2018-09-03", "13790858888", "磊磊", 0, "wulei@qq.com", "1999-12-26", "上海", "");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("宋祖儿", "zuer", "2018-09-06", "13790855688", "祖鹅", 1, "zuer@qq.com", "1998-05-23", "天津", "");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("张新成", "cheng", "2018-09-17", "13880858888", "新成", 0, "cheng@qq.com", "1995-08-24", "湖北", "荆州");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("李兰迪", "landi", "2018-09-17", "13790858880", "兰迪", 1, "landi@qq.com", "1999-09-02", "北京", "");

-- 插入地区编码数据，初始化(全), region
insert into region
values("AH", "安徽", 0);

insert into region
values("AM", "澳门", 0);

insert into region
values("BJ", "北京", 0);

insert into region
values("CQ", "重庆", 0);

insert into region
values("FJ", "福建", 0);

insert into region
values("GD", "广东", 0);

insert into region
values("GS", "甘肃", 0);

insert into region
values("GX", "广西", 0);

insert into region
values("GZ", "贵州", 0);

insert into region
values("HNA", "海南", 0);

insert into region
values("HNE", "河南", 0);

insert into region
values("HBE", "河北", 0);

insert into region
values("HLJ", "黑龙江", 0);

insert into region
values("HBU", "湖北", 0);

insert into region
values("HNU", "湖南", 0);

insert into region
values("JL", "吉林", 0);

insert into region
values("JS", "江苏", 0);

insert into region
values("JX", "江西", 0);

insert into region
values("LN", "辽宁", 0);

insert into region
values("NM", "内蒙", 0);

insert into region
values("NX", "宁夏", 0);

insert into region
values("QH", "青海", 0);

insert into region
values("SD", "山东", 0);

insert into region
values("SXA", "山西", 0);

insert into region
values("SXB", "陕西", 0);

insert into region
values("SH", "上海", 0);

insert into region
values("SC", "四川", 0);

insert into region
values("TJ", "天津", 0);

insert into region
values("TW", "台湾", 0);

insert into region
values("XG", "香港", 0);

insert into region
values("XZ", "西藏", 0);

insert into region
values("XJ", "新疆", 0);

insert into region
values("YN", "云南", 0);

insert into region
values("ZJ", "浙江", 0);


-- 插入postcard,同时region表更新
insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("JS-00001", 1, 3, "江苏", "浙江", "2018-09-12 15:55:09");

update region set regionNum = regionNum + 1
where regionName = "江苏";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("JS-00002", 2, 6, "江苏", "湖南", "2018-09-13 11:29:33");

update region set regionNum = regionNum + 1
where regionName = "江苏";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("SH-00001", 4, 1, "上海", "江苏", "2018-09-13 16:01:39");

update region set regionNum = regionNum + 1
where regionName = "上海";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("HBU-00001", 5, 1, "湖北", "江苏", "2018-09-13 19:45:01");

update region set regionNum = regionNum + 1
where regionName = "湖北";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("BJ-00001", 12, 11, "北京", "湖北", "2018-09-14 09:13:08");

update region set regionNum = regionNum + 1
where regionName = "北京";


insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("BJ-00002", 12, 1, "北京", "江苏", "2018-09-14 09:49:14");

update region set regionNum = regionNum + 1
where regionName = "北京";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("BJ-00003", 12, 9, "北京", "上海", "2018-09-14 10:34:12");

update region set regionNum = regionNum + 1
where regionName = "北京";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("XJ-00001", 7, 1, "新疆", "江苏", "2018-09-16 20:32:02");

update region set regionNum = regionNum + 1
where regionName = "新疆";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("SH-00002", 9, 1, "上海", "江苏", "2018-09-16 21:32:02");

update region set regionNum = regionNum + 1
where regionName = "上海";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("JS-00003", 2, 1, "江苏", "江苏", "2018-09-16 22:32:02");

update region set regionNum = regionNum + 1
where regionName = "江苏";


insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("SH-00003", 9, 1, "上海", "江苏", "2018-09-17 11:38:45");

update region set regionNum = regionNum + 1
where regionName = "上海";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("TJ-00001", 10, 1, "天津", "江苏", "2018-09-17 11:39:45");

update region set regionNum = regionNum + 1
where regionName = "天津";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("TJ-00002", 10, 9, "天津", "上海", "2018-09-17 23:19:45");

update region set regionNum = regionNum + 1
where regionName = "天津";


insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("HBU-00002", 11, 9, "湖北", "上海", "2018-09-17 23:29:45");

update region set regionNum = regionNum + 1
where regionName = "湖北";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("HBU-00003", 5, 9, "湖北", "上海", "2018-09-17 23:40:25");

update region set regionNum = regionNum + 1
where regionName = "湖北";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("HBU-00004", 5, 1, "湖北", "江苏", "2018-09-18 13:00:05");

update region set regionNum = regionNum + 1
where regionName = "湖北";

-- 已收到
update postcard
set cardReceiveTime = "2018-09-14 07:52:43", 
		cardDistance = 350.5,
		cardLike = 0
where cardId = "JS-00001";

update postcard
set cardReceiveTime = "2018-09-14 15:55:09", 
		cardDistance = 8908,
		cardLike = 0
where cardId = "HBU-00001";

update postcard
set cardReceiveTime = "2018-09-14 19:32:37", 
		cardDistance = 1000,
		cardLike = 0
where cardId = "SH-00001";


update postcard
set cardReceiveTime = "2018-09-17 08:43:56", 
		cardDistance = 253,
		cardLike = 0
where cardId = "SH-00002";

-- pool数据
insert into pool(poolUserId, poolTime)
values(1, "2018-09-14 07:52:43");

insert into pool(poolUserId, poolTime)
values(5, "2018-09-14 15:55:09");

insert into pool(poolUserId, poolTime)
values(4, "2018-09-14 19:32:37");

-- attention关注与粉丝
insert into attention(attentionFan, attentionName)
values(12, 11);

insert into attention(attentionFan, attentionName)
values(12, 10);

insert into attention(attentionFan, attentionName)
values(12, 8);

insert into attention(attentionFan, attentionName)
values(12, 9);

insert into attention(attentionFan, attentionName)
values(11, 12);

insert into attention(attentionFan, attentionName)
values(11, 8);

insert into attention(attentionFan, attentionName)
values(9, 8);

insert into attention(attentionFan, attentionName)
values(8, 11);

insert into attention(attentionFan, attentionName)
values(8, 12);

-- collection收藏明信片
insert into collection(collectionUserId, collectionCardId)
values(12, "HBU-00001");

insert into collection(collectionUserId, collectionCardId)
values(12, "JS-00001");

insert into collection(collectionUserId, collectionCardId)
values(12, "SH-00001");

insert into collection(collectionUserId, collectionCardId)
values(7, "HBU-00001");

insert into collection(collectionUserId, collectionCardId)
values(8, "HBU-00001");

insert into collection(collectionUserId, collectionCardId)
values(1, "HBU-00001");

-- comment评论表
insert into comment(commentCardId, commentUserId, commentTime, commentContent)
values("HBU-00001", 1, "2018-09-14 16:04:00", "good!");

insert into comment(commentCardId, commentUserId, commentTime, commentContent)
values("HBU-00001", 2, "2018-09-14 16:09:13", "very good!");

insert into comment(commentCardId, commentUserId, commentTime, commentContent)
values("JS-00001", 1, "2018-09-14 09:44:30", "like!");


-- activity活动
insert into activity(activityName, activityStartDate, activityType, activityDetails)
values("维护公告", "2018-09-12", "公告", "维护公告详情");

insert into activity(activityName, activityStartDate, activityType, activityDetails)
values("预售公告", "2018-09-13", "公告", "预售公告详情");

insert into activity(activityName, activityStartDate, activityEndDate, activityType, activityDetails)
values("新版明信片预订", "2018-09-14", "2018-09-16", "商品", "商品介绍详情");

insert into activity(activityName, activityStartDate, activityType, activityDetails)
values("限量发行公告", "2018-09-14", "公告", "发行公告详情");

insert into activity(activityName, activityStartDate, activityEndDate, activityType, activityDetails)
values("限量100张特色明信片", "2018-09-14", "2018-09-20", "商品", "特色明信片详情介绍");


-- goods商品
insert into goods(goodsActivityId, goodsName, goodsNum, goodsPrice, goodsPic, goodsDetails)
values(3, "新版明信片", 300, 25.0, "新版明信片的图片", "新版明信片简单介绍");

insert into goods(goodsActivityId, goodsName, goodsNum, goodsPrice, goodsPic, goodsDetails)
values(5, "限量100张特色明信片", 100, 39.9, "限量特色明信片的图片", "限量明信片简单介绍");

-- myactivity我的活动
insert into myactivity(myactivityUserId, myactivityActivityId)
values(11, 3);
insert into myactivity(myactivityUserId, myactivityActivityId)
values(11, 5);
insert into myactivity(myactivityUserId, myactivityActivityId)
values(10, 5);
insert into myactivity(myactivityUserId, myactivityActivityId)
values(12, 3);
insert into myactivity(myactivityUserId, myactivityActivityId)
values(9, 3);

update goods set goodsNum = goodsNum - 3
where goodsActivityId = 5;

update goods set goodsNum = goodsNum - 2
where goodsActivityId = 3;

-- mygoods我的商品表
insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived,mygoodsDate,mygoodsAddress)
values(9, 1, 0,'2017-01-09','福建省福州市鼓楼区');

insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived,mygoodsDate,mygoodsAddress)
values(10, 2, 0,'2018-10-09','江苏省苏州市');

insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived,mygoodsDate,mygoodsAddress)
values(11, 1, 0,'2018-05-08','福建省南平市');

insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived,mygoodsDate,mygoodsAddress)
values(11, 2, 0,'2019-10-09','浙江省杭州市');

insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived,mygoodsDate,mygoodsAddress)
values(12, 1, 0,'2020-01-09','福建省福州市');