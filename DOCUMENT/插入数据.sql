-- 插入用户userinfo
insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("tom", "111", now(), "13811111111", "TOM", 0, "111@qq.com", "1997-01-01", "江苏", "南京");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("jack", "222", now(), "13823243553", "JACK", 0, "222@qq.com", "1997-09-01", "江苏", "苏州");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("mary", "333", now(), "13854353411", "MARY", 1, "333@qq.com", "1996-10-11", "浙江", "杭州");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("jane", "444", now(), "13866653417", "JANE", 1, "444@qq.com", "1999-06-08", "上海", "");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("alex", "555", now(), "13867858890", "ALEX", 1, "555@qq.com", "2000-04-15", "湖北", "武汉");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("cindy", "666", now(), "13777858890", "CINDY", 1, "666@qq.com", "1995-03-30", "湖南", "长沙");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("热巴", "888", now(), "13777858890", "迪丽热巴", 1, "reba@qq.com", "1992-06-03", "新疆", "乌鲁木齐");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("昊然", "haoran", now(), "13777858888", "刘源", 0, "liuhaoran@qq.com", "1997-10-10", "河南", "平顶山");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("磊磊", "wulei", now(), "13790858888", "吴磊", 0, "wulei@qq.com", "1999-12-26", "上海", "");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("祖鹅", "zuer", now(), "13790855688", "宋祖儿", 1, "zuer@qq.com", "1998-05-23", "天津", "");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("新成", "cheng", now(), "13880858888", "张新成", 0, "cheng@qq.com", "1995-08-24", "湖北", "荆州");

insert into userinfo(userName, userPwd, userTime, userTel, userNickname, userSex, userEmail, userBirthday, userProvince, userCity)
values("兰迪", "landi", now(), "13790858880", "李兰迪", 1, "landi@qq.com", "1999-09-02", "北京", "");

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
values("JS-00001", 1, 3, "江苏", "浙江", now());

update region set regionNum = regionNum + 1
where regionName = "江苏";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("JS-00002", 2, 6, "江苏", "湖南", now());

update region set regionNum = regionNum + 1
where regionName = "湖南";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("SH-00001", 4, 1, "上海", "江苏", now());

update region set regionNum = regionNum + 1
where regionName = "上海";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("HBU-00001", 5, 1, "湖北", "江苏", now());

update region set regionNum = regionNum + 1
where regionName = "湖北";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("BJ-00001", 12, 11, "北京", "湖北", now());

update region set regionNum = regionNum + 1
where regionName = "北京";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("BJ-00001", 12, 11, "北京", "湖北", now());

update region set regionNum = regionNum + 1
where regionName = "北京";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("BJ-00002", 12, 1, "北京", "江苏", now());

update region set regionNum = regionNum + 1
where regionName = "北京";

insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
values("BJ-00003", 12, 9, "北京", "上海", now());

update region set regionNum = regionNum + 1
where regionName = "北京";

-- 已收到
update postcard
set cardReceiveTime = now(), 
		cardDistance = 350.5,
		cardLike = 0
where cardId = "JS-00001";

update postcard
set cardReceiveTime = now(), 
		cardDistance = 8908,
		cardLike = 0
where cardId = "HBU-00001";

update postcard
set cardReceiveTime = now(), 
		cardDistance = 1000,
		cardLike = 0
where cardId = "SH-00001";

-- pool数据
insert into pool(poolUserId, poolTime)
values(1, now());

insert into pool(poolUserId, poolTime)
values(5, now());

insert into pool(poolUserId, poolTime)
values(4, now());

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
values("HBU-00001", 1, now(), "good!");

insert into comment(commentCardId, commentUserId, commentTime, commentContent)
values("HBU-00001", 2, now(), "very good!");

insert into comment(commentCardId, commentUserId, commentTime, commentContent)
values("JS-00001", 1, now(), "like!");


-- activity活动
insert into activity(activityName, activityStartDate, activityEndDate, activityType, activityDetails)
values("维护公告", "2018-09-12", "2018-09-12", "公告", "维护公告详情");

insert into activity(activityName, activityStartDate, activityEndDate, activityType, activityDetails)
values("预售公告", "2018-09-13", "2018-09-13", "公告", "预售公告详情");

insert into activity(activityName, activityStartDate, activityEndDate, activityType, activityDetails)
values("新版明信片预订", "2018-09-14", "2018-09-16", "商品", "商品介绍详情");

insert into activity(activityName, activityStartDate, activityEndDate, activityType, activityDetails)
values("限量发行公告", "2018-09-14", "2018-09-14", "公告", "发行公告详情");

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
insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived)
values(9, 1, 0);

insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived)
values(10, 2, 0);

insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived)
values(11, 1, 0);

insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived)
values(11, 2, 0);

insert into mygoods(mygoodsUserId, mygoodsGoodsId, mygoodsIsReceived)
values(12, 1, 0);