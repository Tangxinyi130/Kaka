create procedure p_shiyan(
   p_userId int
 
)
begin
    declare p_poolId int;
	  declare str varchar(10) default '-00';
		declare num int;
		declare strNum int;
	  declare t_error int;
	  declare p_poolTime datetime;
    declare p_cardId varchar(20);
	  declare p_cardReceive int;
	  declare p_cardSendRegion varchar(60);
	  declare p_cardReceiveRegion varchar(60);
		declare p_cardReceiveUserNickname varchar(32);
	  declare continue handler for sqlexception set t_error = 1;
	 start transaction;
	    
				-- 得到当前发送用户的地区明信片的编号加一
				update region set regionNum = regionNum + 1 where regionName =
				(	SELECT userProvince  from userinfo 
					where userId=p_userId
				);
				-- 判断当前发送用户的地区的明信片位数，来决定‘000’的个数
				select regionNum into num	
				from region where regionName=	( SELECT userProvince from userinfo where userId=p_userId);
				    if     num<10   then set str='-0000';
						elseif num<100  then set str='-000';
						elseif num<1000 then set str='-00';
						elseif num<10000 then set str='-0';
						else   set str='-';
						end if;
				 select concat(regionId,str,regionNum ) into p_cardId
				  from region 
				  where regionName = ( 
					    select userProvince 
					    from userinfo 
					    where userId = p_userId
				);
						select poolUserId into p_cardReceive 
						from pool where poolUserId!=p_userId 
						order by poolTime asc limit 1;
						select  poolId into p_poolId 
						from pool where poolUserId!=p_userId 
						order by poolTime asc limit 1;
						 
				-- 得到发送用户的地区
				SELECT userProvince into p_cardSendRegion from userinfo where userId=p_userId;
				-- 得到被抽到用户的地区
				SELECT userProvince into  p_cardReceiveRegion from userinfo where userId=p_cardReceive;
				-- 将得到基本信息插入到卡里
				insert into postcard(cardId, cardSender, cardReceiver, cardSendRegion, cardReceiveRegion, cardSendTime)
				values(p_cardId, p_userId, p_cardReceive, p_cardSendRegion, p_cardReceiveRegion, now());
				 -- 把接收方从最小的poolTime里删除
				  DELETE from pool where poolId=p_poolId;
					-- 得到被抽到用户的基本信息
					SELECT  userNickname into p_cardReceiveUserNickname from userinfo where userId=p_cardReceive;
				 select p_cardReceive, p_poolId,p_cardReceiveUserNickname;
			 
	if t_error = 1 then
		rollback;
	else
	  commit;
	end if;
end;
 call p_shiyan(4);