create procedure p_receive(
	 p_cardId  varchar(9)
)
begin
	 declare p_sendUserId int;
	 declare t_error int;
	 declare continue handler for sqlexception set t_error = 1;
	 start transaction;
					 -- 根据输入明信片的id,更新postcad中明信片的接收时间,和cardlike=0
					  UPDATE postcard set  cardReceiveTime=now() , cardLike=0 where cardId=p_cardId;
						-- 根据输入明信片的id,查询接收方的userid
						select cardSender into p_sendUserId from postcard where cardId= p_cardId;
						-- 把发送方添加到pool池
					 INSERT into pool(poolUserId,poolTime) VALUES(p_sendUserId,now());
	if t_error = 1 then
		rollback;
	else
	  commit;
	end if;
end;
