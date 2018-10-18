CREATE DEFINER=`root`@`localhost` PROCEDURE `getNewSend`()
BEGIN
	SELECT
		from1.cardId,
		from1.userId AS cardSenderId,
		from1.userNickname cardSenderName,
		from1.cardSendRegion,
		from1.userHeadPic AS senderHeadPic,
		from1.cardReceiver AS cardReceiverId,
		userinfo.userNickname AS cardReceiverName,
		from1.cardReceiveRegion,
		userinfo.userHeadPic AS receiverHeadPic,
		from1.cardSendTime,
		from1.cardReceiveTime
	FROM
		(
		SELECT
			userId,
			userNickname,
			cardSendRegion,
			cardReceiver,
			userHeadPic,
			cardId,
			cardSendTime,
			cardReceiveRegion,
			cardReceiveTime
		FROM
			postcard pd
			LEFT JOIN userinfo ui ON pd.cardSender = ui.userId
		) AS from1
		LEFT JOIN userinfo ON from1.cardReceiver = userinfo.userId
	WHERE
		from1.cardSendTime > DATE_SUB( NOW( ), INTERVAL 2 DAY )
		AND cardReceiveTime IS NULL
	ORDER BY
		from1.cardSendTime DESC;
END